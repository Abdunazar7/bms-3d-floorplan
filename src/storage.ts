// ---------------------------------------------------------------------------
// Plan persistence — multiple named projects ("obyekt").
//
// Primary store: Home Assistant's per-user frontend storage
// (frontend/get_user_data + frontend/set_user_data) — no backend, no files,
// shared across all of that user's devices. Falls back to localStorage.
//
// Data shape: { active, projects: { [id]: FloorPlan } }. Each plan also carries
// a human `name`. Old projects persist until explicitly deleted; "New" creates
// a fresh id rather than overwriting.
// ---------------------------------------------------------------------------

import type { FloorPlan, HomeAssistant } from './types';

const HA_KEY = 'ha3d_floorplans';
const LS_KEY = 'ha3d-floorplan-default';

export interface StoredProjects {
  active?: string;
  projects: Record<string, FloorPlan>;
}

export interface ProjectInfo {
  id: string;
  name: string;
}

function valid(plan: any): plan is FloorPlan {
  return !!plan && Array.isArray(plan.floors) && plan.floors.length > 0;
}

async function readHA(hass: HomeAssistant): Promise<StoredProjects | null> {
  try {
    const res: any = await hass.callWS?.({ type: 'frontend/get_user_data', key: HA_KEY });
    const data = res?.value as StoredProjects | undefined;
    if (data && data.projects) return data;
  } catch {
    /* not available */
  }
  return null;
}

/** Load the full project set (HA preferred, else localStorage single project). */
export async function loadProjects(hass?: HomeAssistant): Promise<StoredProjects> {
  if (hass) {
    const data = await readHA(hass);
    if (data) return data;
  }
  const local = loadLocal();
  return local ? { active: 'default', projects: { default: local } } : { projects: {} };
}

/** Persist the full project set. Mirrors the active plan into localStorage. */
export async function saveProjects(
  data: StoredProjects,
  hass?: HomeAssistant,
): Promise<{ ha: boolean }> {
  const active = data.active ? data.projects[data.active] : undefined;
  if (active) saveLocal(active);
  if (!hass) return { ha: false };
  try {
    await hass.callWS?.({ type: 'frontend/set_user_data', key: HA_KEY, value: data });
    return { ha: true };
  } catch (e) {
    console.error('[3d-floorplan] HA save failed, kept localStorage copy:', e);
    return { ha: false };
  }
}

export function listProjects(data: StoredProjects): ProjectInfo[] {
  return Object.entries(data.projects)
    .filter(([, p]) => valid(p))
    .map(([id, p]) => ({ id, name: p.name || id }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Load the active (or first valid) plan — used for View mode / zero-config. */
export async function loadPlan(hass?: HomeAssistant): Promise<FloorPlan | null> {
  const data = await loadProjects(hass);
  const id =
    data.active && valid(data.projects[data.active])
      ? data.active
      : listProjects(data)[0]?.id;
  const plan = id ? data.projects[id] : null;
  return valid(plan) ? plan : null;
}

export function newProjectId(): string {
  // Stable-ish unique id (performance.now is available in the browser).
  return `p${Math.floor(performance.now()).toString(36)}${Math.floor((performance.now() * 1000) % 1000)}`;
}

export function loadLocal(): FloorPlan | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const plan = JSON.parse(raw);
    return valid(plan) ? plan : null;
  } catch {
    return null;
  }
}

export function saveLocal(plan: FloorPlan): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(plan));
  } catch {
    /* quota / unavailable */
  }
}

/** A fresh empty plan to draw on from scratch. */
export function blankPlan(name = 'New Plan'): FloorPlan {
  return {
    name,
    wallHeight: 2.6,
    floors: [{ name: 'Ground Floor', elevation: 0, wallHeight: 2.6, walls: [], rooms: [], furniture: [], bindings: [] }],
  };
}
