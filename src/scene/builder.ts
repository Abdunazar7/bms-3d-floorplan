// ---------------------------------------------------------------------------
// Geometry builder: turns a FloorDef into Three.js meshes.
//   - Walls extruded from 2D segments, with door/window openings handled by
//     splitting each wall into solid sub-spans + headers/sills (no CSG needed,
//     stays fast on tablet-class GPUs).
//   - Floors from room polygons.
//   - Furniture resolved via the loader.
// ---------------------------------------------------------------------------

import * as THREE from 'three';
import type { FloorDef, WallDef, RoomDef } from '../types';
import { resolveFurniture } from '../furniture/loader';
import { TextLabel } from './labels';

const DEFAULT_WALL_HEIGHT = 2.6;
const DEFAULT_THICKNESS = 0.12;

export interface BuiltFloor {
  group: THREE.Group;
  /** Map of furniture id -> Object3D, for binding anchors. */
  furnitureById: Map<string, THREE.Object3D>;
  /** Map of wall array-index -> wall sub-group (for editor selection). */
  wallById: Map<number, THREE.Object3D>;
  /** Map of room array-index -> floor mesh (for editor selection). */
  roomById: Map<number, THREE.Object3D>;
  /** Bounding box of this floor in world space. */
  bbox: THREE.Box3;
  labels: TextLabel[];
}

function wallMaterial(color?: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color ?? '#e6e6e6',
    roughness: 0.95,
    metalness: 0.0,
  });
}

/** Add a single axis-aligned-along-segment wall box spanning [a, b] of the wall. */
function addWallSpan(
  group: THREE.Group,
  start: THREE.Vector2,
  dir: THREE.Vector2,
  normalAngle: number,
  from: number,
  to: number,
  yBottom: number,
  yTop: number,
  thickness: number,
  material: THREE.Material,
): void {
  const len = to - from;
  if (len <= 1e-4) return;
  const height = yTop - yBottom;
  if (height <= 1e-4) return;
  const geo = new THREE.BoxGeometry(len, height, thickness);
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const mid = from + len / 2;
  const cx = start.x + dir.x * mid;
  const cz = start.y + dir.y * mid;
  mesh.position.set(cx, yBottom + height / 2, cz);
  mesh.rotation.y = normalAngle;
  group.add(mesh);
}

function buildWall(
  parent: THREE.Group,
  wall: WallDef,
  defaultHeight: number,
  index: number,
): THREE.Group | null {
  const start = new THREE.Vector2(wall.start[0], wall.start[1]);
  const end = new THREE.Vector2(wall.end[0], wall.end[1]);
  const full = end.clone().sub(start);
  const length = full.length();
  if (length <= 1e-4) return null;
  const dir = full.clone().normalize();
  // Each wall's spans live in their own group so the editor can pick/select/
  // color/delete the whole wall as a unit.
  const group = new THREE.Group();
  group.userData.wallIndex = index;
  // Rotation so a box's local X aligns with the wall direction (in XZ plane).
  const angle = Math.atan2(dir.y, dir.x);
  const normalAngle = -angle;

  const height = wall.height ?? defaultHeight;
  const thickness = wall.thickness ?? DEFAULT_THICKNESS;
  const material = wallMaterial(wall.color);
  // Door/window frames are rendered INTO the wall group so they're owned by the
  // wall (deleted with it), coupled to the opening, and sized to the hole.
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x9c6b3f, roughness: 0.7 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x88c0d0,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    metalness: 0.1,
  });

  const openings = [...(wall.openings ?? [])].sort((a, b) => a.position - b.position);

  let cursor = 0;
  for (const op of openings) {
    const opStart = clamp(op.position, 0, length);
    const opEnd = clamp(op.position + op.width, 0, length);
    if (opEnd <= cursor) continue; // fully engulfed by a previous opening — skip
    // Solid wall before the opening.
    addWallSpan(group, start, dir, normalAngle, cursor, opStart, 0, height, thickness, material);
    // Sill below (windows) and header above the opening.
    const sill = op.sill ?? (op.kind === 'window' ? 0.9 : 0);
    const top = op.top ?? (op.kind === 'window' ? 2.1 : 2.05);
    if (sill > 0) {
      addWallSpan(group, start, dir, normalAngle, opStart, opEnd, 0, sill, thickness, material);
    }
    if (top < height) {
      addWallSpan(group, start, dir, normalAngle, opStart, opEnd, top, height, thickness, material);
    }
    // Fill the hole with a door leaf / window glass, sized to the opening.
    if (op.kind === 'door') {
      addWallSpan(group, start, dir, normalAngle, opStart, opEnd, sill, top, 0.05, doorMat);
    } else {
      addWallSpan(group, start, dir, normalAngle, opStart, opEnd, sill, top, 0.03, glassMat);
    }
    cursor = Math.max(cursor, opEnd);
  }
  // Remaining solid wall after the last opening.
  addWallSpan(group, start, dir, normalAngle, cursor, length, 0, height, thickness, material);

  parent.add(group);
  return group;
}

function buildFloor(
  group: THREE.Group,
  room: RoomDef,
  index: number,
): { centroid: THREE.Vector2; mesh: THREE.Mesh } | null {
  if (!room.polygon || room.polygon.length < 3) return null;
  const shape = new THREE.Shape();
  room.polygon.forEach((p, i) => {
    if (i === 0) shape.moveTo(p[0], p[1]);
    else shape.lineTo(p[0], p[1]);
  });
  shape.closePath();
  const geo = new THREE.ShapeGeometry(shape);
  // ShapeGeometry lies in XY; rotate to XZ and lift slightly to avoid z-fighting.
  geo.rotateX(Math.PI / 2);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({
      color: room.color ?? '#cfc7ba',
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide,
    }),
  );
  mesh.position.y = 0.005;
  mesh.receiveShadow = true;
  mesh.userData.roomIndex = index;
  group.add(mesh);

  // centroid for label
  let cx = 0, cz = 0;
  for (const p of room.polygon) {
    cx += p[0];
    cz += p[1];
  }
  return {
    centroid: new THREE.Vector2(cx / room.polygon.length, cz / room.polygon.length),
    mesh,
  };
}

export function buildFloorGroup(floor: FloorDef, planWallHeight?: number): BuiltFloor {
  const group = new THREE.Group();
  group.position.y = floor.elevation ?? 0;
  const defaultHeight = floor.wallHeight ?? planWallHeight ?? DEFAULT_WALL_HEIGHT;
  const labels: TextLabel[] = [];
  const wallById = new Map<number, THREE.Object3D>();
  const roomById = new Map<number, THREE.Object3D>();

  (floor.rooms ?? []).forEach((room, i) => {
    const built = buildFloor(group, room, i);
    if (built) {
      roomById.set(i, built.mesh);
      if (room.name) {
        const label = new TextLabel(1.4);
        label.setText(room.name, '#e8e8e8');
        label.setPosition(built.centroid.x, 0.05, built.centroid.y);
        labels.push(label);
        group.add(label.sprite);
      }
    }
  });

  (floor.walls ?? []).forEach((wall, i) => {
    const wg = buildWall(group, wall, defaultHeight, i);
    if (wg) wallById.set(i, wg);
  });

  const furnitureById = new Map<string, THREE.Object3D>();
  for (const f of floor.furniture ?? []) {
    const obj = resolveFurniture(f);
    group.add(obj);
    if (f.id) furnitureById.set(f.id, obj);
  }

  const bbox = new THREE.Box3().setFromObject(group);
  return { group, furnitureById, wallById, roomById, bbox, labels };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export { DEFAULT_WALL_HEIGHT };
