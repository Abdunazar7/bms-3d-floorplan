// ---------------------------------------------------------------------------
// Built-in demo floor plan. Used as a zero-config fallback so the card always
// shows something — no /config/www file required just to see it work.
// ---------------------------------------------------------------------------

import type { FloorPlan } from '../types';

export const DEMO_PLAN: FloorPlan = {
  name: 'Demo Home',
  wallHeight: 2.6,
  floors: [
    {
      name: 'Ground Floor',
      elevation: 0,
      wallHeight: 2.6,
      walls: [
        { start: [0, 0], end: [8, 0], openings: [{ kind: 'window', position: 3, width: 1.4 }] },
        { start: [8, 0], end: [8, 6] },
        { start: [8, 6], end: [0, 6], openings: [{ kind: 'door', position: 3.5, width: 1.0 }] },
        { start: [0, 6], end: [0, 0] },
        { start: [4.5, 0], end: [4.5, 6], openings: [{ kind: 'door', position: 2.5, width: 0.9 }] },
      ],
      rooms: [
        { name: 'Living Room', polygon: [[0, 0], [4.5, 0], [4.5, 6], [0, 6]], color: '#cdbfa6' },
        { name: 'Kitchen', polygon: [[4.5, 0], [8, 0], [8, 6], [4.5, 6]], color: '#c2c8c4' },
      ],
      furniture: [
        { model: 'sofa', position: [1.2, 0, 4.6], rotation: 0, color: '#5b6b7a', id: 'sofa1' },
        { model: 'table', position: [2.2, 0, 2.6], color: '#8a5a30', id: 'table1' },
        { model: 'chair', position: [2.2, 0, 1.7], rotation: 180, id: 'chair1' },
        { model: 'tv', position: [2.2, 0, 0.3], rotation: 0, id: 'tv1' },
        { model: 'ceiling_light', position: [2.2, 2.45, 3.0], color: '#ffffff', id: 'living_lamp' },
        { model: 'kitchen_counter', position: [6.2, 0, 0.5], rotation: 0, color: '#e8e8e8', id: 'counter1' },
        { model: 'fridge', position: [7.5, 0, 1.5], rotation: -90, id: 'fridge1' },
        { model: 'sink', position: [5.2, 0, 0.5], id: 'sink1' },
        { model: 'ceiling_light', position: [6.2, 2.45, 3.0], id: 'kitchen_lamp' },
      ],
      // No entity bindings in the demo, so nothing shows as "unavailable".
      bindings: [],
    },
  ],
};
