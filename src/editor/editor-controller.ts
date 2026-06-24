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
import type { FloorPlan, FloorDef, WallDef, Vec2 } from '../types';
import type { SceneManager } from '../scene/scene-manager';
import { defaultY } from '../furniture/library';
import { TextLabel } from '../scene/labels';

export type EditTool = 'orbit' | 'wall' | 'furniture' | 'select' | 'door' | 'window';

const SNAP = 0.1; // grid snap, meters
const CLOSE_DIST = 0.4; // distance to first point that closes a room
const VERT_SNAP = 0.3; // snap a new point onto an existing wall endpoint

// Drawing aids ("magnet"):
const ANGLE_STEP = Math.PI / 12; // 15° — strong pull to parallel/perpendicular
const LEN_TOL = 0.12; // snap a segment's length to a nearby existing wall length
const ALIGN_TOL = 0.25; // align the first point's x/z with an existing endpoint

const snap = (v: number) => Math.round(v / SNAP) * SNAP;
const sameVertex = (a: Vec2, b: Vec2) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-4;

interface SnapResult {
  pt: Vec2;
  /** Snapped onto an existing endpoint (walls join). */
  joined: boolean;
  /** Segment length equals an existing wall's length. */
  matchedLen: boolean;
  /** Segment is parallel to an existing wall. */
  parallel: boolean;
  lengthM: number;
  angleDeg: number;
}

export class EditorController {
  plan: FloorPlan;
  floorIndex = 0;
  tool: EditTool = 'wall';
  onChange?: () => void;
  /** Transient user-facing messages (e.g. "tap closer to a wall"). */
  onMessage?: (msg: string) => void;
  /** Furniture model to drop with the furniture tool. */
  selectedModel = 'sofa';
  /** Current selection (select tool). */
  selectedKind: 'furniture' | 'wall' | 'room' | null = null;
  selectedId: string | null = null; // furniture id
  selectedWall = -1; // wall array index
  selectedRoom = -1; // room array index

  private sm: SceneManager;
  /** Points of the wall run being drawn; each new click commits a wall. */
  private chain: Vec2[] = [];
  private cursor: Vec2 | null = null;
  /** Drawing aids on/off (angle/length/alignment snapping). */
  snapEnabled = true;
  private snapInfo: SnapResult | null = null;
  private measureLabel?: TextLabel;
  private dragMode: 'furniture' | 'endpoint' | null = null;
  private dragVertex: Vec2 | null = null;

  constructor(sm: SceneManager, plan: FloorPlan) {
    this.sm = sm;
    this.plan = plan;
  }

  get pointCount(): number {
    return this.chain.length;
  }

  start(): void {
    // A persistent floating label that shows the live segment length/angle while
    // drawing. Kept outside previewGroup so it survives clearPreview().
    this.measureLabel = new TextLabel(1.2);
    this.measureLabel.sprite.visible = false;
    this.sm.scene.add(this.measureLabel.sprite);
    this.sm.setDragHandler({
      start: (e) => this.dragStart(e),
      move: (p) => this.dragMoveTo(p),
      end: () => this.dragEnd(),
    });
    this.applySceneEditState();
    this.setTool('wall');
  }

  stop(): void {
    this.cancelChain();
    if (this.measureLabel) {
      this.sm.scene.remove(this.measureLabel.sprite);
      this.measureLabel.dispose();
      this.measureLabel = undefined;
    }
    this.sm.setGroundHandler(undefined);
    this.sm.setDragHandler(undefined);
    this.sm.setEditMode(false);
    this.sm.setDrawMode(false);
  }

  setSnap(on: boolean): void {
    this.snapEnabled = on;
    this.onChange?.();
  }

  /** Switch the floor being edited; keeps the scene's visible floor, grid
   *  elevation and edit target in lockstep. */
  setFloor(index: number): void {
    if (index < 0 || index >= this.plan.floors.length) return;
    this.cancelChain();
    this.clearSelection();
    this.floorIndex = index;
    this.sm.setActiveFloor(index);
    this.applySceneEditState();
    this.onChange?.();
  }

  addFloor(): void {
    const wh = this.plan.floors[0]?.wallHeight ?? this.plan.wallHeight ?? 2.6;
    const maxElev = Math.max(0, ...this.plan.floors.map((f) => f.elevation ?? 0));
    const idx = this.plan.floors.length;
    this.plan.floors.push({
      name: `Floor ${idx + 1}`,
      elevation: maxElev + wh + 0.4,
      wallHeight: wh,
      walls: [],
      rooms: [],
      furniture: [],
      bindings: [],
    });
    this.sm.loadPlan(this.plan, true); // build the new floor
    this.setFloor(idx); // switch to it
    this.onMessage?.(`Added "${this.plan.floors[idx].name}" — draw it`);
  }

  deleteFloor(): void {
    if (this.plan.floors.length <= 1) {
      this.onMessage?.('Cannot delete the only floor');
      return;
    }
    this.plan.floors.splice(this.floorIndex, 1);
    const ni = Math.min(this.floorIndex, this.plan.floors.length - 1);
    this.clearSelection();
    this.floorIndex = ni;
    this.sm.loadPlan(this.plan, false);
    this.setFloor(ni);
  }

  // -- Drag to move (furniture) / reshape (wall endpoints) --------------------

  private dragStart(e: PointerEvent): boolean {
    if (this.tool !== 'select') return false;
    const f = this.sm.pickFurniture(e);
    if (f) {
      this.selectFurniture(f.id);
      this.dragMode = 'furniture';
      return true;
    }
    const gp = this.sm.groundIntersect(e);
    if (gp) {
      const v = this.nearestEndpoint(gp.x, gp.z, 0.45);
      if (v) {
        this.dragMode = 'endpoint';
        this.dragVertex = v;
        const wi = (this.floor().walls ?? []).findIndex(
          (w) => sameVertex(w.start as Vec2, v) || sameVertex(w.end as Vec2, v),
        );
        if (wi >= 0) this.selectWall(wi);
        return true;
      }
    }
    return false;
  }

  private dragMoveTo(p: THREE.Vector3): void {
    if (this.dragMode === 'furniture' && this.selectedId) {
      const obj = this.sm.getFurnitureObject(this.selectedId);
      if (obj) {
        obj.position.x = snap(p.x);
        obj.position.z = snap(p.z);
        this.sm.refreshSelection();
      }
    } else if (this.dragMode === 'endpoint' && this.dragVertex) {
      const nv: Vec2 = [snap(p.x), snap(p.z)];
      if (sameVertex(nv, this.dragVertex)) return;
      this.moveVertex(this.dragVertex, nv);
      this.dragVertex = nv;
      this.rebuild();
      this.reselect();
    }
  }

  private dragEnd(): void {
    if (this.dragMode === 'furniture' && this.selectedId) {
      const obj = this.sm.getFurnitureObject(this.selectedId);
      const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
      if (obj && f) f.position = [obj.position.x, f.position[1], obj.position.z];
    }
    this.dragMode = null;
    this.dragVertex = null;
    this.onChange?.();
  }

  private nearestEndpoint(x: number, z: number, tol: number): Vec2 | null {
    let best: Vec2 | null = null;
    let bd = tol;
    for (const w of this.floor().walls ?? []) {
      for (const pt of [w.start, w.end]) {
        const d = Math.hypot(x - pt[0], z - pt[1]);
        if (d < bd) {
          bd = d;
          best = [pt[0], pt[1]];
        }
      }
    }
    return best;
  }

  /** Move a shared vertex: all walls + room polygon points at `from` go to `to`. */
  private moveVertex(from: Vec2, to: Vec2): void {
    for (const w of this.floor().walls ?? []) {
      if (sameVertex(w.start as Vec2, from)) w.start = [to[0], to[1]];
      if (sameVertex(w.end as Vec2, from)) w.end = [to[0], to[1]];
    }
    for (const r of this.floor().rooms ?? []) {
      r.polygon = r.polygon.map((pt) =>
        sameVertex(pt as Vec2, from) ? ([to[0], to[1]] as Vec2) : pt,
      );
    }
  }

  // -- Wall length ------------------------------------------------------------

  get selectedWallLength(): number | null {
    if (this.selectedKind !== 'wall') return null;
    const w = this.floor().walls?.[this.selectedWall];
    if (!w) return null;
    return Math.hypot(w.end[0] - w.start[0], w.end[1] - w.start[1]);
  }

  /** Set the selected wall's length, moving its END along the wall direction. */
  setWallLength(len: number): void {
    if (this.selectedKind !== 'wall' || !(len > 0)) return;
    const w = this.floor().walls?.[this.selectedWall];
    if (!w) return;
    const dx = w.end[0] - w.start[0];
    const dz = w.end[1] - w.start[1];
    const cur = Math.hypot(dx, dz) || 1;
    w.end = [w.start[0] + (dx / cur) * len, w.start[1] + (dz / cur) * len];
    this.rebuild();
    this.reselect();
    this.onChange?.();
  }

  setTool(t: EditTool): void {
    this.tool = t;
    // Orbit tool: left/one-finger orbits. Drawing tools: left/one-finger acts,
    // right mouse / two fingers always orbit + zoom (no tool-switch needed).
    this.sm.setDrawMode(t !== 'orbit');
    if (t !== 'wall') this.cancelChain();
    if (t !== 'select') this.clearSelection();
    this.onChange?.();
  }

  private floor(): FloorDef {
    return this.plan.floors[this.floorIndex];
  }

  get selectedEntity(): string | null {
    if (this.selectedKind !== 'furniture' || !this.selectedId) return null;
    const b = this.floor().bindings?.find((x) => x.anchor_object === this.selectedId);
    return b?.entity_id ?? null;
  }

  /** Model key of the currently selected furniture (for domain-filtered binding). */
  get selectedObjectModel(): string | null {
    if (this.selectedKind !== 'furniture' || !this.selectedId) return null;
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    return f?.model ?? null;
  }

  /** Current color of the selected furniture / wall / room (for the color picker). */
  get selectedColor(): string | null {
    const fl = this.floor();
    if (this.selectedKind === 'furniture')
      return fl.furniture?.find((x) => x.id === this.selectedId)?.color ?? null;
    if (this.selectedKind === 'wall') return fl.walls?.[this.selectedWall]?.color ?? null;
    if (this.selectedKind === 'room') return fl.rooms?.[this.selectedRoom]?.color ?? null;
    return null;
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
    this.selectFurniture(id);
  }

  private moveSelected(p: THREE.Vector3): void {
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    if (!f) return;
    f.position = [snap(p.x), f.position[1], snap(p.z)];
    this.rebuild();
    this.reselect();
    this.onChange?.();
  }

  selectFurniture(id: string | null): void {
    this.selectedKind = id ? 'furniture' : null;
    this.selectedId = id;
    this.selectedWall = -1;
    this.selectedRoom = -1;
    this.sm.setSelection(id ? this.sm.getFurnitureObject(id) ?? null : null);
    this.onChange?.();
  }

  selectWall(index: number): void {
    this.selectedKind = 'wall';
    this.selectedWall = index;
    this.selectedId = null;
    this.selectedRoom = -1;
    this.sm.setSelection(this.sm.getWallObject(index) ?? null);
    this.onChange?.();
  }

  selectRoom(index: number): void {
    this.selectedKind = 'room';
    this.selectedRoom = index;
    this.selectedId = null;
    this.selectedWall = -1;
    this.sm.setSelection(this.sm.getRoomObject(index) ?? null);
    this.onChange?.();
  }

  clearSelection(): void {
    this.selectedKind = null;
    this.selectedId = null;
    this.selectedWall = -1;
    this.selectedRoom = -1;
    this.sm.setSelection(null);
    this.onChange?.();
  }

  /** Re-apply the selection highlight after a rebuild (object instances change). */
  private reselect(): void {
    if (this.selectedKind === 'furniture' && this.selectedId)
      this.sm.setSelection(this.sm.getFurnitureObject(this.selectedId) ?? null);
    else if (this.selectedKind === 'wall' && this.selectedWall >= 0)
      this.sm.setSelection(this.sm.getWallObject(this.selectedWall) ?? null);
    else if (this.selectedKind === 'room' && this.selectedRoom >= 0)
      this.sm.setSelection(this.sm.getRoomObject(this.selectedRoom) ?? null);
  }

  rotateSelected(): void {
    if (this.selectedKind !== 'furniture') return;
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    if (!f) return;
    f.rotation = ((f.rotation ?? 0) + 45) % 360;
    this.rebuild();
    this.reselect();
    this.onChange?.();
  }

  /** Move the selected furniture up/down along the vertical axis. */
  nudgeHeight(delta: number): void {
    if (this.selectedKind !== 'furniture') return;
    const f = this.floor().furniture?.find((x) => x.id === this.selectedId);
    if (!f) return;
    f.position[1] = Math.max(0, Math.round((f.position[1] + delta) * 100) / 100);
    this.rebuild();
    this.reselect();
    this.onChange?.();
  }

  /** Set the color of the selected furniture / wall / room. */
  setColor(color: string): void {
    const fl = this.floor();
    if (this.selectedKind === 'furniture') {
      const f = fl.furniture?.find((x) => x.id === this.selectedId);
      if (f) f.color = color;
    } else if (this.selectedKind === 'wall' && fl.walls?.[this.selectedWall]) {
      fl.walls[this.selectedWall].color = color;
    } else if (this.selectedKind === 'room' && fl.rooms?.[this.selectedRoom]) {
      fl.rooms[this.selectedRoom].color = color;
    } else {
      return;
    }
    this.rebuild();
    this.reselect();
    this.onChange?.();
  }

  deleteSelected(): void {
    const fl = this.floor();
    if (this.selectedKind === 'furniture' && this.selectedId) {
      fl.furniture = (fl.furniture ?? []).filter((x) => x.id !== this.selectedId);
      fl.bindings = (fl.bindings ?? []).filter((b) => b.anchor_object !== this.selectedId);
    } else if (this.selectedKind === 'wall' && this.selectedWall >= 0) {
      fl.walls?.splice(this.selectedWall, 1);
    } else if (this.selectedKind === 'room' && this.selectedRoom >= 0) {
      fl.rooms?.splice(this.selectedRoom, 1);
    } else {
      return;
    }
    this.clearSelection();
    this.rebuild();
  }

  bindEntity(entityId: string | null): void {
    if (this.selectedKind !== 'furniture' || !this.selectedId) return;
    const fl = this.floor();
    if (!fl.bindings) fl.bindings = [];
    fl.bindings = fl.bindings.filter((b) => b.anchor_object !== this.selectedId);
    if (entityId) {
      fl.bindings.push({ entity_id: entityId, anchor_object: this.selectedId, behavior: 'auto' });
    }
    this.rebuild();
    this.reselect();
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
    this.sm.setDrawMode(this.tool !== 'orbit');
  }

  private onClick(p: THREE.Vector3, e?: PointerEvent): void {
    if (this.tool === 'furniture') {
      this.placeFurniture(p);
      return;
    }
    if (this.tool === 'door' || this.tool === 'window') {
      this.addOpening(p, this.tool);
      return;
    }
    if (this.tool === 'select') {
      const hitF = e ? this.sm.pickFurniture(e) : null;
      if (hitF) {
        this.selectFurniture(hitF.id);
        return;
      }
      const hitW = e ? this.sm.pickWall(e) : null;
      if (hitW) {
        this.selectWall(hitW.index);
        return;
      }
      // A selected furniture piece: tap the floor to move it.
      if (this.selectedKind === 'furniture' && this.selectedId) {
        this.moveSelected(p);
        return;
      }
      // Otherwise tapping the floor selects the room (e.g. to recolor it).
      const hitR = e ? this.sm.pickRoom(e) : null;
      if (hitR) this.selectRoom(hitR.index);
      else this.clearSelection();
      return;
    }
    if (this.tool !== 'wall') return;
    const { pt } = this.snapPoint(p.x, p.z);

    // First click of a run: just drop the start point.
    if (this.chain.length === 0) {
      this.chain = [pt];
      this.renderPreview();
      this.onChange?.();
      return;
    }

    const start = this.chain[0];
    const last = this.chain[this.chain.length - 1];

    // Returning to the start closes the loop into a room.
    if (this.chain.length >= 3 && Math.hypot(pt[0] - start[0], pt[1] - start[1]) < CLOSE_DIST) {
      this.commitWall(last, start);
      this.addRoom(this.chain);
      this.chain = [];
      this.cursor = null;
      this.rebuild();
      this.onChange?.();
      return;
    }

    // Ignore a duplicate click on the same point.
    if (last[0] === pt[0] && last[1] === pt[1]) return;

    // Two points → a wall appears immediately (no Finish needed); the run
    // continues from the new point so you can keep adding connected walls.
    this.commitWall(last, pt);
    this.chain.push(pt);
    this.rebuild();
    this.renderPreview();
    this.onChange?.();
  }

  private onMove(p: THREE.Vector3): void {
    if (this.tool !== 'wall' || this.chain.length === 0) return;
    const r = this.snapPoint(p.x, p.z);
    this.cursor = r.pt;
    this.snapInfo = r;
    this.renderPreview();
  }

  private commitWall(a: Vec2, b: Vec2): void {
    const fl = this.floor();
    if (!fl.walls) fl.walls = [];
    fl.walls.push({ start: [a[0], a[1]], end: [b[0], b[1]] });
  }

  private addRoom(points: Vec2[]): void {
    const fl = this.floor();
    if (!fl.rooms) fl.rooms = [];
    fl.rooms.push({ polygon: points.map((p) => [p[0], p[1]] as Vec2) });
  }

  /**
   * Snap a candidate point with drawing aids, in priority:
   *  1) join — onto a nearby existing endpoint / chain vertex,
   *  2) angle — snap the segment direction to 15° steps (parallel / perpendicular),
   *  3) length — match a nearby existing wall's length (equal-length walls),
   * plus first-point axis alignment. Disabled when snapEnabled is false (free grid).
   */
  private snapPoint(x: number, z: number): SnapResult {
    const last = this.chain[this.chain.length - 1] as Vec2 | undefined;
    const angTo = (a: Vec2, b: Vec2) =>
      (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    const make = (pt: Vec2, extra: Partial<SnapResult> = {}): SnapResult => ({
      pt,
      joined: false,
      matchedLen: false,
      parallel: false,
      lengthM: last ? Math.hypot(pt[0] - last[0], pt[1] - last[1]) : 0,
      angleDeg: last ? angTo(last, pt) : 0,
      ...extra,
    });

    // 1) Join to an existing endpoint or chain vertex.
    let best: Vec2 | null = null;
    let bd = VERT_SNAP;
    for (const c of [...this.existingEndpoints(), ...this.chain]) {
      const d = Math.hypot(x - c[0], z - c[1]);
      if (d < bd) {
        bd = d;
        best = c;
      }
    }
    if (best) return make([best[0], best[1]], { joined: true });

    if (!this.snapEnabled) return make([snap(x), snap(z)]);

    // First point of a run: align x/z with an existing endpoint if close.
    if (!last) {
      let px = snap(x);
      let pz = snap(z);
      for (const e of this.existingEndpoints()) {
        if (Math.abs(x - e[0]) < ALIGN_TOL) px = e[0];
        if (Math.abs(z - e[1]) < ALIGN_TOL) pz = e[1];
      }
      return make([px, pz]);
    }

    // 2) Angle snap relative to the previous point.
    const dx = x - last[0];
    const dz = z - last[1];
    const rawLen = Math.hypot(dx, dz);
    if (rawLen < 1e-4) return make([last[0], last[1]]);
    const ang = Math.round(Math.atan2(dz, dx) / ANGLE_STEP) * ANGLE_STEP;

    // 3) Length: match a nearby existing wall length, else grid.
    let finalLen = Math.round(rawLen / SNAP) * SNAP;
    let matchedLen = false;
    let bestDiff = LEN_TOL;
    for (const w of this.floor().walls ?? []) {
      const wl = Math.hypot(w.end[0] - w.start[0], w.end[1] - w.start[1]);
      if (Math.abs(wl - rawLen) < bestDiff) {
        bestDiff = Math.abs(wl - rawLen);
        finalLen = wl;
        matchedLen = true;
      }
    }

    // Keep the exact angle-snapped direction and matched/grid length — do NOT
    // re-grid-snap the coordinates (that would distort both angle and length).
    const pt: Vec2 = [last[0] + Math.cos(ang) * finalLen, last[1] + Math.sin(ang) * finalLen];

    // Parallel test uses the actual committed direction.
    const fang = Math.atan2(pt[1] - last[1], pt[0] - last[0]);
    const parallel = (this.floor().walls ?? []).some((w) => {
      const wa = Math.atan2(w.end[1] - w.start[1], w.end[0] - w.start[0]);
      let diff = Math.abs(wa - fang) % Math.PI;
      if (diff > Math.PI / 2) diff = Math.PI - diff;
      return diff < 0.03;
    });

    return make(pt, { matchedLen, parallel });
  }

  private existingEndpoints(): Vec2[] {
    const out: Vec2[] = [];
    for (const w of this.floor().walls ?? []) {
      out.push([w.start[0], w.start[1]], [w.end[0], w.end[1]]);
    }
    return out;
  }

  private isConnection(pt: Vec2): boolean {
    return this.existingEndpoints().some(
      (e) => Math.hypot(e[0] - pt[0], e[1] - pt[1]) < 1e-3,
    );
  }

  /** Add a door/window opening to the wall nearest the tapped point. */
  private addOpening(p: THREE.Vector3, kind: 'door' | 'window'): void {
    const fl = this.floor();
    let best: WallDef | null = null;
    let bd = 0.6;
    let along = 0;
    let wallLen = 0;
    for (const w of fl.walls ?? []) {
      const ax = w.start[0], az = w.start[1], bx = w.end[0], bz = w.end[1];
      const dx = bx - ax, dz = bz - az;
      const len2 = dx * dx + dz * dz;
      if (len2 < 1e-6) continue;
      let t = ((p.x - ax) * dx + (p.z - az) * dz) / len2;
      t = Math.max(0, Math.min(1, t));
      const cx = ax + dx * t, cz = az + dz * t;
      const d = Math.hypot(p.x - cx, p.z - cz);
      if (d < bd) {
        bd = d;
        best = w;
        const len = Math.sqrt(len2);
        along = t * len;
        wallLen = len;
      }
    }
    if (!best) {
      this.onMessage?.(
        (this.floor().walls?.length ?? 0) === 0
          ? 'Draw a wall first, then tap it to add a door/window'
          : 'Tap closer to a wall',
      );
      return;
    }
    if (!best.openings) best.openings = [];
    const width = kind === 'door' ? 0.9 : 1.0;
    const position = Math.max(0, Math.min(wallLen - width, along - width / 2));
    // Cut the hole AND let buildWall render a fitted door leaf / window glass
    // into it — the frame is owned by the wall, so it's removed with the wall
    // and always lines up with the opening (no orphaned floating frames).
    best.openings.push({ kind, position, width });

    this.rebuild();
    this.onChange?.();
  }

  /** Undo: remove the last committed wall of the current run (and its point). */
  undoPoint(): void {
    if (this.chain.length >= 2) {
      this.floor().walls?.pop(); // the last wall belongs to this run
      this.chain.pop();
      this.rebuild();
      this.renderPreview();
    } else if (this.chain.length === 1) {
      this.chain = [];
      this.cursor = null;
      this.snapInfo = null;
      if (this.measureLabel) this.measureLabel.sprite.visible = false;
      this.sm.clearPreview();
    }
    this.onChange?.();
  }

  /** End the current wall run (walls are already committed). */
  finishChain(): void {
    this.cancelChain();
  }

  cancelChain(): void {
    this.chain = [];
    this.cursor = null;
    this.snapInfo = null;
    if (this.measureLabel) this.measureLabel.sprite.visible = false;
    this.sm.clearPreview();
    this.onChange?.();
  }

  /** Start a fresh blank plan to draw from scratch. */
  loadPlan(plan: FloorPlan): void {
    this.plan = plan;
    this.floorIndex = 0;
    this.cancelChain();
    this.clearSelection();
    this.sm.loadPlan(plan, false); // blank → frame the origin, don't keep far camera
    this.applySceneEditState();
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
    const chain = this.cursor ? [...this.chain, this.cursor] : [...this.chain];

    // Vertices. Points that land on an existing wall endpoint get a larger
    // green "connection" node so you can see two walls joining.
    for (const p of chain) {
      const connected = this.isConnection(p);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(connected ? 0.12 : 0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color: connected ? 0x4fd06a : 0x44aaff }),
      );
      dot.position.set(p[0], elev + 0.06, p[1]);
      group.add(dot);
    }

    // Segment ghosts. The active (last) segment is tinted green when a drawing
    // aid is engaged (length matched or parallel to an existing wall).
    for (let i = 0; i < chain.length - 1; i++) {
      const a = chain[i];
      const b = chain[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (len < 1e-3) continue;
      const isActive = i === chain.length - 2 && !!this.cursor;
      const aided = isActive && this.snapInfo && (this.snapInfo.matchedLen || this.snapInfo.parallel);
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(len, h, 0.1),
        new THREE.MeshBasicMaterial({
          color: aided ? 0x4fd06a : 0x44aaff,
          transparent: true,
          opacity: aided ? 0.5 : 0.35,
        }),
      );
      const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
      mesh.position.set((a[0] + b[0]) / 2, elev + h / 2, (a[1] + b[1]) / 2);
      mesh.rotation.y = -angle;
      group.add(mesh);
    }

    // Live measurement label on the active segment.
    if (this.measureLabel) {
      if (this.cursor && this.chain.length >= 1 && this.snapInfo) {
        const a = this.chain[this.chain.length - 1];
        const b = this.cursor;
        const si = this.snapInfo;
        const tags = `${si.parallel ? ' ∥' : ''}${si.matchedLen ? ' =' : ''}`;
        this.measureLabel.setText(
          `${si.lengthM.toFixed(2)}m  ${Math.round(((si.angleDeg % 360) + 360) % 360)}°${tags}`,
          si.matchedLen || si.parallel ? '#7CFC8A' : '#ffffff',
        );
        this.measureLabel.setPosition((a[0] + b[0]) / 2, elev + h + 0.4, (a[1] + b[1]) / 2);
        this.measureLabel.sprite.visible = true;
      } else {
        this.measureLabel.sprite.visible = false;
      }
    }

    // Highlight the closing target when near the start.
    if (this.chain.length >= 2 && this.cursor) {
      const s = this.chain[0];
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
