// ---------------------------------------------------------------------------
// Built-in furniture library — procedural low-poly geometry.
//
// Rather than shipping (and licensing) GLB binaries, the built-in pieces are
// generated from Three.js primitives. This keeps the bundle tiny, sidesteps
// asset-licensing concerns entirely, and every piece is recolorable via a base
// tint. Custom .glb models are still supported per placement (see loader.ts).
//
// Each builder returns a THREE.Group whose origin is the footprint center at
// floor level (y = 0), so placements sit naturally on the floor.
// ---------------------------------------------------------------------------

import * as THREE from 'three';

export type FurnitureBuilder = (color: THREE.Color) => THREE.Group;

const WOOD = 0x9c6b3f;
const FABRIC = 0x6f7d8c;
const METAL = 0xb8bcc4;
const WHITE = 0xf2f2f2;
const DARK = 0x2b2f36;
const GLASS = 0x88c0d0;

function mat(color: number | THREE.Color, opts: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.8,
    metalness: 0.05,
    ...opts,
  });
}

function box(
  w: number,
  h: number,
  d: number,
  material: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(
  rTop: number,
  rBot: number,
  h: number,
  material: THREE.Material,
  x = 0,
  y = 0,
  z = 0,
  seg = 16,
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Tag a mesh as the "tintable" surface so a binding/recolor hits the right part. */
function tint(mesh: THREE.Mesh, color: THREE.Color): THREE.Mesh {
  (mesh.material as THREE.MeshStandardMaterial).color.copy(color);
  return mesh;
}

const builders: Record<string, FurnitureBuilder> = {
  sofa: (c) => {
    const g = new THREE.Group();
    const fabric = mat(FABRIC);
    g.add(tint(box(1.9, 0.4, 0.85, fabric, 0, 0.2, 0), c)); // base
    g.add(tint(box(1.9, 0.5, 0.2, fabric, 0, 0.55, -0.32), c)); // backrest
    g.add(tint(box(0.2, 0.45, 0.85, fabric, -0.85, 0.5, 0), c)); // left arm
    g.add(tint(box(0.2, 0.45, 0.85, fabric, 0.85, 0.5, 0), c)); // right arm
    return g;
  },
  bed: (c) => {
    const g = new THREE.Group();
    g.add(box(1.6, 0.3, 2.0, mat(WOOD), 0, 0.15, 0)); // frame
    g.add(tint(box(1.55, 0.18, 1.95, mat(WHITE), 0, 0.39, 0), c)); // mattress/duvet
    g.add(box(1.6, 0.6, 0.1, mat(WOOD), 0, 0.5, -0.95)); // headboard
    g.add(box(0.5, 0.12, 0.35, mat(WHITE), -0.45, 0.5, -0.7)); // pillow
    g.add(box(0.5, 0.12, 0.35, mat(WHITE), 0.45, 0.5, -0.7));
    return g;
  },
  table: (c) => {
    const g = new THREE.Group();
    const wood = mat(WOOD);
    g.add(tint(box(1.4, 0.06, 0.8, wood, 0, 0.74, 0), c)); // top
    const lx = 0.62, lz = 0.32;
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
      g.add(box(0.07, 0.74, 0.07, wood, sx * lx, 0.37, sz * lz));
    }
    return g;
  },
  chair: (c) => {
    const g = new THREE.Group();
    const wood = mat(WOOD);
    g.add(tint(box(0.45, 0.05, 0.45, wood, 0, 0.45, 0), c)); // seat
    g.add(tint(box(0.45, 0.45, 0.05, wood, 0, 0.68, -0.2), c)); // back
    const lx = 0.18, lz = 0.18;
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
      g.add(box(0.05, 0.45, 0.05, wood, sx * lx, 0.22, sz * lz));
    }
    return g;
  },
  wardrobe: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(1.2, 2.0, 0.6, mat(WOOD), 0, 1.0, 0), c));
    g.add(box(0.04, 1.8, 0.02, mat(METAL), -0.02, 1.0, 0.31)); // door split
    g.add(cyl(0.02, 0.02, 0.15, mat(METAL), -0.2, 1.0, 0.32)); // handle
    g.add(cyl(0.02, 0.02, 0.15, mat(METAL), 0.16, 1.0, 0.32));
    return g;
  },
  kitchen_counter: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(2.0, 0.85, 0.6, mat(WHITE), 0, 0.425, 0), c)); // cabinet
    g.add(box(2.05, 0.05, 0.65, mat(DARK), 0, 0.875, 0)); // worktop
    return g;
  },
  tv: (c) => {
    const g = new THREE.Group();
    g.add(box(1.2, 0.7, 0.05, mat(DARK), 0, 0.95, 0)); // screen
    const screen = box(1.1, 0.6, 0.02, mat(0x0a0a0a, { emissive: 0x111417 }), 0, 0.95, 0.03);
    g.add(screen);
    g.add(box(0.4, 0.05, 0.2, mat(DARK), 0, 0.6, 0)); // stand
    tint(g.children[0] as THREE.Mesh, c);
    return g;
  },
  fridge: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(0.7, 1.8, 0.7, mat(METAL), 0, 0.9, 0), c));
    g.add(box(0.04, 0.1, 0.02, mat(DARK), 0.3, 1.3, 0.36)); // handle upper
    g.add(box(0.04, 0.1, 0.02, mat(DARK), 0.3, 0.6, 0.36)); // handle lower
    return g;
  },
  sink: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(0.6, 0.8, 0.5, mat(WHITE), 0, 0.4, 0), c)); // base
    g.add(box(0.5, 0.08, 0.4, mat(METAL), 0, 0.82, 0)); // basin rim
    g.add(cyl(0.02, 0.02, 0.25, mat(METAL), 0, 0.95, -0.12)); // tap
    return g;
  },
  toilet: (c) => {
    const g = new THREE.Group();
    g.add(tint(cyl(0.22, 0.25, 0.4, mat(WHITE), 0, 0.2, 0.05), c)); // bowl
    g.add(box(0.35, 0.5, 0.18, mat(WHITE), 0, 0.45, -0.18)); // cistern
    g.add(cyl(0.24, 0.24, 0.05, mat(WHITE), 0, 0.42, 0.05)); // seat
    return g;
  },
  door: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(0.85, 2.0, 0.05, mat(WOOD), 0, 1.0, 0), c));
    g.add(cyl(0.03, 0.03, 0.1, mat(METAL), 0.32, 1.0, 0.05)); // knob
    return g;
  },
  window_frame: (c) => {
    const g = new THREE.Group();
    const frame = mat(WHITE);
    g.add(tint(box(1.0, 0.05, 0.08, frame, 0, 1.5, 0), c)); // top
    g.add(tint(box(1.0, 0.05, 0.08, frame, 0, 0.9, 0), c)); // bottom
    g.add(box(0.05, 0.6, 0.08, frame, -0.47, 1.2, 0)); // left
    g.add(box(0.05, 0.6, 0.08, frame, 0.47, 1.2, 0)); // right
    g.add(box(0.9, 0.55, 0.01, mat(GLASS, { transparent: true, opacity: 0.35 }), 0, 1.2, 0));
    return g;
  },
  ceiling_light: (c) => {
    const g = new THREE.Group();
    // Anchor at ceiling; the binding system attaches a PointLight to this.
    const shade = cyl(0.18, 0.22, 0.12, mat(WHITE, { emissive: 0x000000 }), 0, 0, 0);
    shade.name = 'emissive';
    g.add(tint(shade, c));
    g.add(cyl(0.01, 0.01, 0.25, mat(METAL), 0, 0.18, 0)); // cord
    return g;
  },
  ac_unit: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(0.9, 0.28, 0.18, mat(WHITE), 0, 0, 0), c));
    g.add(box(0.8, 0.04, 0.02, mat(DARK), 0, -0.1, 0.09)); // vent
    return g;
  },
  intercom: (c) => {
    const g = new THREE.Group();
    g.add(tint(box(0.16, 0.26, 0.04, mat(DARK), 0, 0, 0), c));
    const scr = box(0.12, 0.14, 0.01, mat(0x101418, { emissive: 0x0a2a3a }), 0, 0.03, 0.025);
    scr.name = 'emissive';
    g.add(scr);
    return g;
  },
  // Generic fallback marker so an unknown model key still renders something.
  marker: (c) => {
    const g = new THREE.Group();
    g.add(tint(cyl(0, 0.12, 0.3, mat(0xff5555), 0, 0.15, 0, 8), c));
    return g;
  },
};

export const FURNITURE_KEYS = Object.keys(builders).filter((k) => k !== 'marker');

export function buildFurniture(model: string, color?: string): THREE.Group {
  const builder = builders[model] ?? builders.marker;
  const c = new THREE.Color(color ?? '#ffffff');
  const group = builder(c);
  group.userData.model = model;
  return group;
}
