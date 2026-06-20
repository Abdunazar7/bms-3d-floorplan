// ---------------------------------------------------------------------------
// Floor-plan schema + card config types.
//
// Coordinate system: floor plans are authored in 2D meters (x, y). In the 3D
// scene this maps to x -> X, y -> Z (the floor is the XZ plane) and height
// extrudes upward along +Y. No part of this schema imposes a count limit on
// walls, rooms, furniture, or bindings — that is an explicit project goal.
// ---------------------------------------------------------------------------

export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export interface WallDef {
  /** Start point in meters. */
  start: Vec2;
  /** End point in meters. */
  end: Vec2;
  /** Wall height in meters. Defaults to the floor's wallHeight or 2.6. */
  height?: number;
  /** Wall thickness in meters. Defaults to 0.12. */
  thickness?: number;
  /** Base color tint (hex string, e.g. "#dddddd"). */
  color?: string;
  /** Openings (doors/windows) cut into this wall. */
  openings?: OpeningDef[];
}

export type OpeningKind = 'door' | 'window';

export interface OpeningDef {
  kind: OpeningKind;
  /** Distance in meters from the wall's start point to the opening's start. */
  position: number;
  /** Width of the opening in meters. */
  width: number;
  /** Bottom of the opening above the floor (windows). Default 0 for doors, 0.9 for windows. */
  sill?: number;
  /** Top of the opening above the floor. Default 2.05 for doors, 2.1 for windows. */
  top?: number;
}

export interface RoomDef {
  /** Optional label, drawn as floating text at the room centroid. */
  name?: string;
  /** Polygon outline in meters (auto-closed). */
  polygon: Vec2[];
  /** Floor material color. */
  color?: string;
}

export interface FurnitureDef {
  /** Built-in library key (see furniture/library.ts) OR ignored if `glb` set. */
  model: string;
  /** Optional path to a custom .glb (e.g. /local/models/sofa.glb). Overrides `model`. */
  glb?: string;
  /** Position in meters [x, y, z]. y is the vertical offset (usually 0 = on floor). */
  position: Vec3;
  /** Rotation in degrees about the vertical (Y) axis. */
  rotation?: number;
  /** Uniform scale, or per-axis [sx, sy, sz]. Default 1. */
  scale?: number | Vec3;
  /** Base color tint applied to the model. */
  color?: string;
  /** Unique id so entity bindings can anchor to this placement. */
  id?: string;
}

export type BindingBehavior =
  | 'auto' // pick a sensible default from the entity domain
  | 'light'
  | 'switch'
  | 'climate'
  | 'sensor'
  | 'binary_sensor'
  | 'lock'
  | 'media_player'
  | 'cover'
  | 'fan'
  | 'label'; // just show state as floating text, no interaction

export interface BindingDef {
  entity_id: string;
  /** Id of the furniture placement (FurnitureDef.id) this binds to. */
  anchor_object?: string;
  /** Explicit anchor position if not anchoring to a furniture object. */
  anchor?: Vec3;
  /** How the bound entity drives the scene. Defaults to "auto". */
  behavior?: BindingBehavior;
  /** Optional friendly label override for floating text. */
  label?: string;
}

export interface FloorDef {
  /** Display name shown in the floor switcher. */
  name: string;
  /** Vertical offset of this floor in meters (e.g. 0, 3, 6 for stories). */
  elevation?: number;
  /** Default wall height for walls on this floor. */
  wallHeight?: number;
  walls: WallDef[];
  rooms?: RoomDef[];
  furniture?: FurnitureDef[];
  bindings?: BindingDef[];
}

export interface FloorPlan {
  name?: string;
  /** Default wall height when not set per-floor or per-wall. */
  wallHeight?: number;
  floors: FloorDef[];
}

/** A named project entry in a multi-building card config. */
export interface ProjectRef {
  id: string;
  name?: string;
  /** Inline floor plan, OR... */
  plan?: FloorPlan;
  /** ...a URL/path to a JSON file (e.g. /local/floorplans/home.json). */
  url?: string;
}

export interface CardConfig {
  type: string;
  /** Single project: inline plan. */
  plan?: FloorPlan;
  /** Single project: load from URL. */
  url?: string;
  /** Multi-project: dropdown of buildings. */
  projects?: ProjectRef[];
  /** Card height (CSS value). Default "500px". */
  height?: string;
  /** Background color of the 3D viewport. */
  background?: string;
  /** Start in editor mode. Default false. */
  editor?: boolean;
  /** Optional backend base URL for project CRUD (stretch goal). */
  backend?: string;
}

// Minimal shape of the HA `hass` object we actually use.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, any>,
  ) => Promise<unknown>;
  callWS?: (msg: Record<string, any>) => Promise<any>;
  language?: string;
  locale?: { language: string };
  themes?: any;
  connection?: any;
}
