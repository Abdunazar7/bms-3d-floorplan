// ---------------------------------------------------------------------------
// EditorController — draw walls directly in the 3D view.
//
// Clicks are raycast onto the floor plane (y = floor elevation) and snapped to
// a grid; walls extrude upward live as you place points. Click near the start
// point to close a room (adds a floor polygon); Finish ends an open run.
//
// This is the "full 3D drawing" approach: you're working in the perspective 3D
// scene, placing wall bases on the floor plane (the only depth-unambiguous
// surface), and seeing real 3D walls rise as you go.
// ---------------------------------------------------------------------------

import * as THREE from 'three';
import type { FloorPlan, FloorDef, Vec2 } from '../types';
import type { SceneManager } from '../scene/scene-manager';
import { defaultY } from '../furniture/library';

export type EditTool = 'orbit' | 'wall' | 'furniture' | 'select';

const SNAP = 0.1; // grid snap, meters
const CLOSE_DIST = 0.4; // distance to first point that closes a room

const snap = (v: number) => Math.round(v / SNAP) * SNAP;

export class EditorController {
  plan: FloorPlan;
  floorIndex = 0;
  tool: EditTool = 'wall';
  onChange?: () => void;
  /** Furniture model to drop with the furniture tool. */
  selectedModel = 'sofa';
  /** Currently selected placement id (select tool). */
  selectedId: string | null = null;

  private sm: SceneManager;
  private points: Vec2[] = [];
  private cursor: Vec2 | null = null;

  constructor(sm: SceneManager, plan: FloorPlan) {
    this.sm = sm;
    this.plan = plan;
  }

  get pointCount(): number {
    return this.points.length;
  }

  start(): void {
    this.applySceneEditState();
    this.setTool('wall');
  }

  stop(): void {
    this.cancelChain();
    this.sm.setGroundHandler(undefined);
    this.sm.setEditMode(false);
    this.sm.setControlsEnabled(true);
  }

  setTool(t: EditTool): void {
    this.tool = t;
    // Orbit tool: free camera. Other tools: taps act on the scene; zoom stays on.
    this.sm.setControlsEnabled(t === 'orbit');
    if (t !== 'wall') this.cancelChain();
    if (t !== 'select') this.select(null);
    this.onChange?.();
  }

  private floor(): FloorDef {
    return this.plan.floors[this.floorIndex];
  }

  get selectedEntity(): string | null {
    if (!this.selectedId) return null;
    const b = this.floor().bindings?.find((x) => x.anchor_object === this.selectedId);
    return b?.entity_id ?? null;
  }

  // -- Furniture / selection --------------------------------------------------

  private placeFurniture(p: THREE.Vector3): void {
    const fl = this.floor();
    if (!fl.furniture) fl.furniture = [];
    const wh = fl.wallHeight ?? this.plan.wallHeight ?? 2.6;
    const id = `f${fl.furniture.length}_${Math.floor(performance.now() % 100000)}`;
    fl.furniture.push({
      model: this.selectedModel,
      position: [snap(p.x), defaultY(this.selectedModel, wh), snap(p.z)],
      rotation: 0,
      id,
    });
    this.rebuild();
    this.select(id);
    this.onChange?.();
  }

  private moveSelected(p: THREE.Vector3): void {
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    if (!f) return;
    f.position = [snap(p.x), f.position[1], snap(p.z)];
    this.rebuild();
    this.select(this.selectedId);
    this.onChange?.();
  }

  select(id: string | null): void {
    this.selectedId = id;
    const obj = id ? this.sm.getFurnitureObject(id) : null;
    this.sm.setSelection(obj ?? null);
    this.onChange?.();
  }

  rotateSelected(): void {
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    if (!f) return;
    f.rotation = ((f.rotation ?? 0) + 45) % 360;
    this.rebuild();
    this.select(this.selectedId);
    this.onChange?.();
  }

  deleteSelected(): void {
    if (!this.selectedId) return;
    const fl = this.floor();
    fl.furniture = (fl.furniture ?? []).filter((x) => x.id !== this.selectedId);
    fl.bindings = (fl.bindings ?? []).filter((b) => b.anchor_object !== this.selectedId);
    this.selectedId = null;
    this.sm.setSelection(null);
    this.rebuild();
    this.onChange?.();
  }

  bindEntity(entityId: string | null): void {
    if (!this.selectedId) return;
    const fl = this.floor();
    if (!fl.bindings) fl.bindings = [];
    fl.bindings = fl.bindings.filter((b) => b.anchor_object !== this.selectedId);
    if (entityId) {
      fl.bindings.push({ entity_id: entityId, anchor_object: this.selectedId, behavior: 'auto' });
    }
    this.rebuild();
    this.select(this.selectedId);
    this.onChange?.();
  }

  private elevation(): number {
    return this.plan.floors[this.floorIndex]?.elevation ?? 0;
  }

  private wallHeight(): number {
    return (
      this.plan.floors[this.floorIndex]?.wallHeight ?? this.plan.wallHeight ?? 2.6
    );
  }

  private applySceneEditState(): void {
    this.sm.setEditMode(true, this.elevation());
    this.sm.setGroundHandler({
      click: (p, e) => this.onClick(p, e),
      move: (p) => this.onMove(p),
    });
    this.sm.setControlsEnabled(this.tool === 'orbit');
  }

  private onClick(p: THREE.Vector3, e?: PointerEvent): void {
    if (this.tool === 'furniture') {
      this.placeFurniture(p);
      return;
    }
    if (this.tool === 'select') {
      const hit = e ? this.sm.pickFurniture(e) : null;
      if (hit) this.select(hit.id);
      else if (this.selectedId) this.moveSelected(p);
      else this.select(null);
      return;
    }
    if (this.tool !== 'wall') return;
    const pt: Vec2 = [snap(p.x), snap(p.z)];
    if (this.points.length >= 2) {
      const s = this.points[0];
      if (Math.hypot(pt[0] - s[0], pt[1] - s[1]) < CLOSE_DIST) {
        this.commit(true);
        return;
      }
    }
    // Ignore a duplicate click on the same snapped cell.
    const last = this.points[this.points.length - 1];
    if (last && last[0] === pt[0] && last[1] === pt[1]) return;
    this.points.push(pt);
    this.renderPreview();
    this.onChange?.();
  }

  private onMove(p: THREE.Vector3): void {
    if (this.tool !== 'wall' || this.points.length === 0) return;
    this.cursor = [snap(p.x), snap(p.z)];
    this.renderPreview();
  }

  undoPoint(): void {
    if (!this.points.length) return;
    this.points.pop();
    this.renderPreview();
    this.onChange?.();
  }

  finishChain(): void {
    this.commit(false);
  }

  cancelChain(): void {
    this.points = [];
    this.cursor = null;
    this.sm.clearPreview();
    this.onChange?.();
  }

  /** Start a fresh blank plan to draw from scratch. */
  loadPlan(plan: FloorPlan): void {
    this.plan = plan;
    this.floorIndex = 0;
    this.cancelChain();
    this.selectedId = null;
    this.sm.setSelection(null);
    this.sm.loadPlan(plan, true);
    this.applySceneEditState();
    this.onChange?.();
  }

  private commit(closed: boolean): void {
    if (this.points.length < 2) {
      this.cancelChain();
      return;
    }
    const floor = this.plan.floors[this.floorIndex];
    if (!floor.walls) floor.walls = [];
    const pts = this.points;
    const segs = closed ? pts.length : pts.length - 1;
    for (let i = 0; i < segs; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      floor.walls.push({ start: a, end: b });
    }
    if (closed) {
      if (!floor.rooms) floor.rooms = [];
      floor.rooms.push({ polygon: pts.slice() });
    }
    this.cancelChain();
    this.rebuild();
    this.onChange?.();
  }

  private rebuild(): void {
    this.sm.loadPlan(this.plan, true); // keep camera where it is
    this.applySceneEditState();
  }

  private renderPreview(): void {
    this.sm.clearPreview();
    const group = this.sm.previewGroup;
    const elev = this.elevation();
    const h = this.wallHeight();
    const chain = this.cursor ? [...this.points, this.cursor] : [...this.points];

    // Vertices.
    for (const p of this.points) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x44aaff }),
      );
      dot.position.set(p[0], elev + 0.06, p[1]);
      group.add(dot);
    }

    // Segment ghosts.
    for (let i = 0; i < chain.length - 1; i++) {
      const a = chain[i];
      const b = chain[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len < 1e-3) continue;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(len, h, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.35 }),
      );
      const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
      mesh.position.set((a[0] + b[0]) / 2, elev + h / 2, (a[1] + b[1]) / 2);
      mesh.rotation.y = -angle;
      group.add(mesh);
    }

    // Highlight the closing target when near the start.
    if (this.points.length >= 2 && this.cursor) {
      const s = this.points[0];
      if (Math.hypot(this.cursor[0] - s[0], this.cursor[1] - s[1]) < CLOSE_DIST) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.22, 0.04, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0x4fd06a }),
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(s[0], elev + 0.06, s[1]);
        group.add(ring);
      }
    }
  }
}
