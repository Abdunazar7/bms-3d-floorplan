// ---------------------------------------------------------------------------
// <ha-3d-floorplan-card> — the custom Lovelace card entry point.
// ---------------------------------------------------------------------------

import { LitElement, html, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type {
  CardConfig,
  FloorPlan,
  HomeAssistant,
  ProjectRef,
} from './types';
import { SceneManager, ClickResult } from './scene/scene-manager';
import { clickToService } from './scene/bindings';
import { CARD_VERSION } from './version';
import { installSidebar } from './sidebar';
import { DEMO_PLAN } from './scene/demo-plan';
import { EditorController, EditTool } from './editor/editor-controller';
import { loadPlan as loadStoredPlan, savePlan, blankPlan } from './storage';
import { FURNITURE_KEYS, LIGHT_KEYS } from './furniture/library';

@customElement('ha-3d-floorplan-card')
export class Ha3dFloorplanCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private activeProjectId?: string;
  @state() private loadError?: string;
  @state() private floorNames: string[] = [];
  @state() private activeFloorIndex = 0;
  @state() private editing = false;
  @state() private editTool: EditTool = 'wall';
  @state() private editPoints = 0;
  @state() private editSelectedId: string | null = null;
  @state() private editSelectedModel = 'sofa';
  @state() private editSelectedEntity: string | null = null;
  @state() private toast?: string;

  @query('.viewport') private viewport?: HTMLDivElement;

  private sceneManager?: SceneManager;
  private planLoaded = false;
  private lastHass?: HomeAssistant;
  private pendingHass?: HomeAssistant;
  private currentPlan?: FloorPlan;
  private editor?: EditorController;
  private toastTimer?: number;

  // -- Lovelace lifecycle -----------------------------------------------------

  public setConfig(config: CardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    // Empty config is allowed: the card falls back to a saved (localStorage)
    // plan or the built-in demo, so it works with zero files / zero YAML.
    this.config = config;
    this.loadError = undefined;
    this.planLoaded = false;
    this.activeProjectId =
      config.projects && config.projects.length
        ? config.projects[0].id
        : undefined;
    // Reload if scene already exists.
    if (this.sceneManager) this.loadActiveProject();
  }

  public getCardSize(): number {
    return 8;
  }

  static getStubConfig(): CardConfig {
    return {
      type: 'custom:ha-3d-floorplan-card',
      height: '500px',
      plan: {
        name: 'Demo',
        wallHeight: 2.6,
        floors: [
          {
            name: 'Ground',
            walls: [
              { start: [0, 0], end: [6, 0] },
              { start: [6, 0], end: [6, 5] },
              { start: [6, 5], end: [0, 5] },
              { start: [0, 5], end: [0, 0], openings: [{ kind: 'door', position: 2, width: 1 }] },
            ],
            rooms: [{ name: 'Living', polygon: [[0, 0], [6, 0], [6, 5], [0, 5]], color: '#cfc7ba' }],
            furniture: [
              { model: 'sofa', position: [1.5, 0, 1], rotation: 0, color: '#5b6b7a', id: 'sofa1' },
              { model: 'ceiling_light', position: [3, 2.5, 2.5], id: 'lamp1' },
            ],
            bindings: [
              { entity_id: 'light.living_room', anchor_object: 'lamp1', behavior: 'light' },
            ],
          },
        ],
      },
    };
  }

  static async getConfigElement() {
    await import('./editor');
    return document.createElement('ha-3d-floorplan-card-editor');
  }

  // -- hass updates -----------------------------------------------------------

  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass) {
      this.pendingHass = this.hass;
    }
  }

  protected override updated(_changed: PropertyValues): void {
    if (!this.sceneManager && this.viewport) {
      this.initScene();
    }
    if (this.pendingHass && this.sceneManager && this.planLoaded) {
      this.applyHass(this.pendingHass);
      this.pendingHass = undefined;
    }
  }

  private applyHass(hass: HomeAssistant): void {
    if (!this.sceneManager) return;
    if (!this.lastHass) {
      // First sync: push everything.
      this.sceneManager.syncAll(hass);
    } else {
      // Targeted: only update entities whose state object reference changed.
      for (const id in hass.states) {
        if (hass.states[id] !== this.lastHass.states[id]) {
          this.sceneManager.updateEntity(id, hass);
        }
      }
    }
    this.lastHass = hass;
  }

  // -- Scene setup ------------------------------------------------------------

  private initScene(): void {
    if (!this.viewport) return;
    const bg = this.config?.background ?? '#1b1d22';
    this.sceneManager = new SceneManager(this.viewport, bg);
    this.sceneManager.setPickHandler((r) => this.handlePick(r));
    this.sceneManager.start();
    this.loadActiveProject();
  }

  private async loadActiveProject(): Promise<void> {
    if (!this.config || !this.sceneManager) return;
    this.loadError = undefined;
    this.planLoaded = false;
    try {
      const plan = await this.resolvePlan();
      this.currentPlan = plan;
      this.sceneManager.loadPlan(plan);
      this.floorNames = plan.floors.map((f, i) => f.name || `Floor ${i + 1}`);
      this.activeFloorIndex = 0;
      this.planLoaded = true;
      // Push current state into the freshly built scene.
      if (this.hass) {
        this.lastHass = undefined;
        this.applyHass(this.hass);
      }
    } catch (err: any) {
      this.loadError = err?.message ?? String(err);
      console.error('[3d-floorplan] load failed:', err);
    }
  }

  private async resolvePlan(): Promise<FloorPlan> {
    const cfg = this.config!;
    if (cfg.projects && cfg.projects.length) {
      const proj =
        cfg.projects.find((p) => p.id === this.activeProjectId) ?? cfg.projects[0];
      return this.loadProjectRef(proj);
    }
    if (cfg.plan) return cfg.plan;
    if (cfg.url) return this.fetchPlan(cfg.url);
    // Nothing configured → saved plan (HA shared / localStorage) or built-in demo.
    const saved = await loadStoredPlan(this.hass);
    return saved ?? DEMO_PLAN;
  }

  private async loadProjectRef(proj: ProjectRef): Promise<FloorPlan> {
    if (proj.plan) return proj.plan;
    if (proj.url) return this.fetchPlan(proj.url);
    if (this.config?.backend) {
      return this.fetchPlan(`${this.config.backend.replace(/\/$/, '')}/projects/${proj.id}`);
    }
    throw new Error(`Project "${proj.id}" has no plan, url, or backend.`);
  }

  private async fetchPlan(url: string): Promise<FloorPlan> {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return (await res.json()) as FloorPlan;
  }

  // -- Interaction ------------------------------------------------------------

  private handlePick(r: ClickResult | null): void {
    if (!r || !this.hass) return;
    const ent = this.hass.states[r.entity_id];

    // Lock toggles need current state.
    if (r.behavior === 'lock' && ent) {
      const service = ent.state === 'locked' ? 'unlock' : 'lock';
      this.hass.callService('lock', service, { entity_id: r.entity_id });
      return;
    }

    const call = clickToService(r.entity_id, r.behavior as any);
    if (call) {
      this.hass.callService(call.domain, call.service, call.data);
    } else {
      this.fireMoreInfo(r.entity_id);
    }
  }

  private fireMoreInfo(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private onSelectFloor(index: number): void {
    this.activeFloorIndex = index;
    this.sceneManager?.setActiveFloor(index);
    // Re-sync state to the now-visible floor.
    if (this.hass) this.sceneManager?.syncAll(this.hass);
  }

  private onSelectProject(e: Event): void {
    this.activeProjectId = (e.target as HTMLSelectElement).value;
    this.loadActiveProject();
  }

  private onResetView(): void {
    this.sceneManager?.resetView();
  }

  // -- Editor -----------------------------------------------------------------

  private enterEdit(): void {
    if (!this.sceneManager || !this.currentPlan) return;
    // Edit a deep copy so View mode keeps the last saved/loaded plan until save.
    const editable: FloorPlan = JSON.parse(JSON.stringify(this.currentPlan));
    this.editor = new EditorController(this.sceneManager, editable);
    this.editor.onChange = () => {
      const ed = this.editor!;
      this.editTool = ed.tool;
      this.editPoints = ed.pointCount;
      this.editSelectedId = ed.selectedId;
      this.editSelectedModel = ed.selectedModel;
      this.editSelectedEntity = ed.selectedEntity;
      this.requestUpdate();
    };
    this.sceneManager.loadPlan(editable, true);
    this.editor.start();
    this.editing = true;
    this.editTool = this.editor.tool;
    this.showToast('Edit mode — pick "Draw wall", tap the floor to place points');
  }

  private exitEdit(): void {
    this.editor?.stop();
    this.editor = undefined;
    this.editing = false;
    // Reload the last saved/loaded plan for clean View mode.
    if (this.currentPlan && this.sceneManager) {
      this.sceneManager.loadPlan(this.currentPlan);
      if (this.hass) {
        this.lastHass = undefined;
        this.applyHass(this.hass);
      }
    }
  }

  private onEditTool(t: EditTool): void {
    this.editor?.setTool(t);
  }

  private onFinishChain(): void {
    this.editor?.finishChain();
  }

  private onUndoPoint(): void {
    this.editor?.undoPoint();
  }

  private onNewPlan(): void {
    if (!this.editor) return;
    this.editor.loadPlan(blankPlan());
    this.showToast('Blank plan — draw your walls');
  }

  private onSelectModel(e: Event): void {
    if (!this.editor) return;
    this.editor.selectedModel = (e.target as HTMLSelectElement).value;
    this.editSelectedModel = this.editor.selectedModel;
  }

  private onRotateSelected(): void {
    this.editor?.rotateSelected();
  }

  private onDeleteSelected(): void {
    this.editor?.deleteSelected();
  }

  private onBindEntity(e: CustomEvent): void {
    const entityId = (e.detail?.value as string) || null;
    this.editor?.bindEntity(entityId);
    this.showToast(entityId ? `Bound ${entityId}` : 'Binding cleared');
  }

  private async onSavePlan(): Promise<void> {
    if (!this.editor) return;
    const plan = this.editor.plan;
    const res = await savePlan(plan, this.hass);
    // Adopt the saved plan as the current View-mode plan.
    this.currentPlan = JSON.parse(JSON.stringify(plan));
    this.floorNames = plan.floors.map((f, i) => f.name || `Floor ${i + 1}`);
    this.showToast(
      res.ha ? 'Saved to Home Assistant (all devices)' : 'Saved locally (HA unavailable)',
    );
  }

  private showToast(msg: string): void {
    this.toast = msg;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toast = undefined;
      this.requestUpdate();
    }, 3200);
  }

  // -- Lit lifecycle ----------------------------------------------------------

  public override connectedCallback(): void {
    super.connectedCallback();
    this.sceneManager?.start();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sceneManager?.stop();
  }

  private renderEditor() {
    const tool = this.editTool;
    const label = (k: string) =>
      k.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    const furnitureKeys = FURNITURE_KEYS.filter((k) => !LIGHT_KEYS.includes(k));
    const hasSelection = tool === 'select' && !!this.editSelectedId;

    return html`
      <div class="overlay top-left toolbar">
        <div class="toolrow">
          <button class="btn ${tool === 'wall' ? 'active' : ''}" title="Draw walls"
            @click=${() => this.onEditTool('wall')}>▟ Wall</button>
          <button class="btn ${tool === 'furniture' ? 'active' : ''}" title="Place furniture"
            @click=${() => this.onEditTool('furniture')}>🛋 Furniture</button>
          <button class="btn ${tool === 'select' ? 'active' : ''}" title="Select / move / bind"
            @click=${() => this.onEditTool('select')}>☝ Select</button>
          <button class="btn ${tool === 'orbit' ? 'active' : ''}" title="Move camera"
            @click=${() => this.onEditTool('orbit')}>✋ View</button>
        </div>

        ${tool === 'wall'
          ? html`<div class="toolrow">
              <button class="btn" ?disabled=${this.editPoints < 2}
                title="Finish this run of walls" @click=${this.onFinishChain}>✓ Finish</button>
              <button class="btn" ?disabled=${this.editPoints < 1}
                title="Undo last point" @click=${this.onUndoPoint}>⤺ Undo</button>
            </div>`
          : nothing}

        ${tool === 'furniture'
          ? html`<div class="toolrow">
              <select class="select wide" @change=${this.onSelectModel} .value=${this.editSelectedModel}>
                <optgroup label="Lighting">
                  ${LIGHT_KEYS.map(
                    (k) => html`<option value=${k} ?selected=${k === this.editSelectedModel}>${label(k)}</option>`,
                  )}
                </optgroup>
                <optgroup label="Furniture">
                  ${furnitureKeys.map(
                    (k) => html`<option value=${k} ?selected=${k === this.editSelectedModel}>${label(k)}</option>`,
                  )}
                </optgroup>
              </select>
              <span class="hint">tap floor to place</span>
            </div>`
          : nothing}

        ${hasSelection
          ? html`<div class="toolrow">
              <button class="btn" title="Rotate 45°" @click=${this.onRotateSelected}>⟳ Rotate</button>
              <button class="btn" title="Delete" @click=${this.onDeleteSelected}>🗑 Delete</button>
            </div>
            ${this.hass
              ? html`<div class="toolrow">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${this.editSelectedEntity ?? ''}
                    allow-custom-entity
                    @value-changed=${this.onBindEntity}
                  ></ha-entity-picker>
                </div>`
              : nothing}`
          : nothing}

        ${tool === 'select' && !this.editSelectedId
          ? html`<span class="hint">tap a piece to select; tap floor to move it</span>`
          : nothing}

        <div class="toolrow">
          <button class="btn" title="Start a blank plan" @click=${this.onNewPlan}>✚ New</button>
          <button class="btn primary" title="Save" @click=${this.onSavePlan}>💾 Save</button>
        </div>
      </div>
    `;
  }

  // -- Render -----------------------------------------------------------------

  protected override render() {
    if (!this.config) return nothing;
    const height = this.config.height ?? '500px';
    const projects = this.config.projects ?? [];

    return html`
      <ha-card>
        <div class="viewport" style="height:${height}"></div>

        ${this.loadError
          ? html`<div class="error">⚠ ${this.loadError}</div>`
          : nothing}

        <div class="overlay top-right">
          <button class="btn" title="Reset view" @click=${this.onResetView}>
            ⌂ Reset
          </button>
          ${this.editing
            ? html`<button class="btn primary" title="Exit editor" @click=${this.exitEdit}>
                ✓ Done
              </button>`
            : html`<button class="btn" title="Edit floor plan" @click=${this.enterEdit}>
                ✎ Edit
              </button>`}
        </div>

        ${this.editing ? this.renderEditor() : nothing}

        ${this.toast ? html`<div class="toast">${this.toast}</div>` : nothing}

        ${projects.length > 1
          ? html`
              <div class="overlay top-left">
                <select class="select" @change=${this.onSelectProject}>
                  ${projects.map(
                    (p) => html`<option value=${p.id} ?selected=${p.id === this.activeProjectId}>
                      ${p.name || p.id}
                    </option>`,
                  )}
                </select>
              </div>
            `
          : nothing}

        ${this.floorNames.length > 1 && !this.editing
          ? html`
              <div class="overlay bottom">
                ${this.floorNames.map(
                  (name, i) => html`
                    <button
                      class="tab ${i === this.activeFloorIndex ? 'active' : ''}"
                      @click=${() => this.onSelectFloor(i)}
                    >
                      ${name}
                    </button>
                  `,
                )}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      padding: 0;
    }
    .viewport {
      position: relative;
      width: 100%;
      /* Critical for tablets: stop the browser hijacking pinch into page zoom. */
      touch-action: none;
      overscroll-behavior: contain;
      background: #1b1d22;
    }
    .overlay {
      position: absolute;
      z-index: 2;
      display: flex;
      gap: 6px;
    }
    .top-right {
      top: 10px;
      right: 10px;
    }
    .top-left {
      top: 10px;
      left: 10px;
    }
    .bottom {
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      flex-wrap: wrap;
      justify-content: center;
      max-width: 90%;
    }
    .btn,
    .tab,
    .select {
      font: inherit;
      font-size: 13px;
      color: #fff;
      background: rgba(30, 33, 40, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      padding: 7px 12px;
      cursor: pointer;
      backdrop-filter: blur(4px);
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover,
    .tab:hover {
      background: rgba(55, 60, 70, 0.9);
    }
    .tab.active,
    .btn.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
    }
    .btn.primary {
      background: #2e7d32;
      border-color: #2e7d32;
    }
    .btn[disabled] {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
    .toolbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      max-width: min(360px, calc(100% - 130px));
    }
    .toolrow {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .select.wide {
      min-width: 150px;
    }
    .hint {
      font-size: 12px;
      color: #cfe0ff;
      background: rgba(30, 33, 40, 0.7);
      padding: 4px 8px;
      border-radius: 6px;
    }
    ha-entity-picker {
      width: 240px;
      max-width: 70vw;
    }
    .toast {
      position: absolute;
      z-index: 4;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      background: rgba(20, 22, 26, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 9px 14px;
      border-radius: 10px;
      font-size: 13px;
      max-width: 86%;
      text-align: center;
      backdrop-filter: blur(4px);
    }
    .error {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffb3b3;
      background: rgba(40, 20, 20, 0.9);
      padding: 12px 16px;
      border-radius: 8px;
      max-width: 80%;
      text-align: center;
    }
  `;
}

// Register in the Lovelace card picker.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'ha-3d-floorplan-card',
  name: '3D Floor Plan Card',
  description: 'Interactive true-3D floor plan with live entity bindings.',
  preview: false,
  documentationURL: 'https://github.com/your-org/ha-3d-floorplan-card',
});

// eslint-disable-next-line no-console
console.info(
  `%c 3D-FLOORPLAN-CARD %c v${CARD_VERSION} `,
  'color:#fff;background:#03a9f4;border-radius:4px 0 0 4px;padding:2px 6px',
  'color:#03a9f4;background:#222;border-radius:0 4px 4px 0;padding:2px 6px',
);

// Auto-add a sidebar entry (frontend-only, no YAML). Disable with
// `window.ha3dFloorplan = { sidebar: false }`. See src/sidebar.ts.
installSidebar();

declare global {
  interface HTMLElementTagNameMap {
    'ha-3d-floorplan-card': Ha3dFloorplanCard;
  }
}
