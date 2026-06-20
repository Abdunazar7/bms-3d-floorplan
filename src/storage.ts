// ---------------------------------------------------------------------------
// Plan persistence.
//
// Primary store: Home Assistant's per-user frontend storage
// (frontend/get_user_data + frontend/set_user_data). No backend, no files —
// and it's shared across all of that user's devices (design PC + kiosk tablet).
// Falls back to localStorage when HA WS isn't available.
// ---------------------------------------------------------------------------

import type { FloorPlan, HomeAssistant } from './types';

const HA_KEY = 'ha3d_floorplans';
const LS_KEY = 'ha3d-floorplan-default';

export interface StoredProjects {
  active?: string;
  projects: Record<string, FloorPlan>;
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

/** Load the active plan from HA (preferred) or localStorage. */
export async function loadPlan(hass?: HomeAssistant): Promise<FloorPlan | null> {
  if (hass) {
    const data = await readHA(hass);
    if (data) {
      const id =
        data.active && data.projects[data.active]
          ? data.active
          : Object.keys(data.projects)[0];
      const plan = id ? data.projects[id] : null;
      if (valid(plan)) return plan;
    }
  }
  return loadLocal();
}

/** Save the plan to HA (shared) and localStorage (fallback). */
export async function savePlan(
  plan: FloorPlan,
  hass?: HomeAssistant,
  id = 'default',
): Promise<{ ha: boolean }> {
  saveLocal(plan);
  if (!hass) return { ha: false };
  try {
    const existing = (await readHA(hass)) ?? { projects: {} };
    existing.projects[id] = plan;
    existing.active = id;
    await hass.callWS?.({
      type: 'frontend/set_user_data',
      key: HA_KEY,
      value: existing,
    });
    return { ha: true };
  } catch (e) {
    console.error('[3d-floorplan] HA save failed, kept localStorage copy:', e);
    return { ha: false };
  }
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
export function blankPlan(): FloorPlan {
  return {
    name: 'New Plan',
    wallHeight: 2.6,
    floors: [{ name: 'Ground Floor', elevation: 0, wallHeight: 2.6, walls: [], rooms: [], furniture: [], bindings: [] }],
  };
}
