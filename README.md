# 3D Floor Plan Card for Home Assistant

An interactive **true-3D** floor plan custom Lovelace card. Renders your real
house layout — walls, doors, windows, furnished rooms — and binds every relevant
entity (lights, switches, climate, sensors, locks, media players, covers, fans)
live to the 3D scene. Tap a lamp to toggle it; watch temperatures and sensor
values float in the room; switch between floors of a multi-storey building.

Built specifically to fix two pain points of existing tools:

- **No entity-count caps.** Bind as many entities as you like.
- **Tablet-proof touch.** Pinch-zoom can never "lose" the model on a kiosk
  tablet — camera distance is clamped, panning is bounded to the building, and a
  one-tap **Reset view** button always recenters.

> Pure client-side custom card — **no Python, no add-on, no Supervisor**. Works
> on every HA install type (Core, Container, Supervised, OS).

## Features

- True 3D perspective scene (Three.js), not isometric.
- Accurate layouts from line-segment walls with door/window cutouts.
- Multi-floor support with a floor switcher.
- Built-in **procedural** furniture library (sofa, bed, table, chair, wardrobe,
  kitchen counter, TV, fridge, sink, toilet, door, window frame, ceiling light,
  AC unit, intercom) — recolorable, zero external assets to license.
- Custom `.glb` models per placement for advanced users.
- Live entity binding with targeted re-render (high frame rate with hundreds of
  entities).
- Multiple buildings ("obyekt") in one card via a project dropdown.
- Visual config editor (Phase 1) with a planned full 2D wall-drawing editor
  (Phase 2).

## Install

### HACS (recommended)

1. HACS → **Frontend** → ⋮ → **Custom repositories**.
2. Add this repo URL, category **Lovelace**.
3. Install **3D Floor Plan Card**, then reload your browser.

### Manual

1. Copy `dist/ha-3d-floorplan-card.js` to `/config/www/`.
2. Add the resource (Settings → Dashboards → ⋮ → Resources):

```yaml
resources:
  - url: /local/ha-3d-floorplan-card.js
    type: module
```

## Usage

Minimal card with an inline plan:

```yaml
type: custom:ha-3d-floorplan-card
height: 520px
plan:
  name: My Home
  wallHeight: 2.6
  floors:
    - name: Ground
      walls:
        - { start: [0, 0], end: [6, 0] }
        - { start: [6, 0], end: [6, 5] }
        - { start: [6, 5], end: [0, 5] }
        - { start: [0, 5], end: [0, 0], openings: [{ kind: door, position: 2, width: 1 }] }
      rooms:
        - { name: Living, polygon: [[0,0],[6,0],[6,5],[0,5]], color: "#cfc7ba" }
      furniture:
        - { model: ceiling_light, position: [3, 2.5, 2.5], id: lamp1 }
      bindings:
        - { entity_id: light.living_room, anchor_object: lamp1, behavior: light }
```

Load the plan from a file instead (put JSON under `/config/www/floorplans/`):

```yaml
type: custom:ha-3d-floorplan-card
url: /local/floorplans/home.json
```

Multiple buildings:

```yaml
type: custom:ha-3d-floorplan-card
projects:
  - { id: house, name: Main House, url: /local/floorplans/house.json }
  - { id: garage, name: Garage, plan: { floors: [ ... ] } }
```

A complete two-floor example lives in [`examples/home.json`](examples/home.json).

## Config reference

| Key | Type | Description |
| --- | --- | --- |
| `plan` | object | Inline floor plan (see schema below). |
| `url` | string | Load plan JSON from a URL/path. |
| `projects` | list | Multiple buildings; each has `id`, optional `name`, and `plan` or `url`. |
| `height` | string | Card height CSS value. Default `500px`. |
| `background` | string | Viewport background color. Default `#1b1d22`. |
| `backend` | string | Optional backend base URL for project CRUD (stretch goal). |

### Floor plan schema

```
FloorPlan: { name?, wallHeight?, floors: FloorDef[] }
FloorDef:  { name, elevation?, wallHeight?, walls[], rooms?[], furniture?[], bindings?[] }
WallDef:   { start: [x,y], end: [x,y], height?, thickness?, color?, openings?[] }
OpeningDef:{ kind: "door"|"window", position, width, sill?, top? }
RoomDef:   { name?, polygon: [[x,y],...], color? }
Furniture: { model, glb?, position: [x,y,z], rotation?, scale?, color?, id? }
Binding:   { entity_id, anchor_object?, anchor?: [x,y,z], behavior?, label? }
```

Coordinates are in **meters**; floor-plan `(x, y)` maps to the 3D `(X, Z)` ground
plane, height extrudes up `+Y`.

**Binding behaviors:** `auto` (derive from domain), `light`, `switch`, `climate`,
`sensor`, `binary_sensor`, `lock`, `media_player`, `cover`, `fan`, `label`.

**Furniture models:** `sofa`, `bed`, `table`, `chair`, `wardrobe`,
`kitchen_counter`, `tv`, `fridge`, `sink`, `toilet`, `door`, `window_frame`,
`ceiling_light`, `ac_unit`, `intercom`. Set `glb` to a `.glb` path to use a
custom model instead.

## Tablet / kiosk notes

- The canvas sets `touch-action: none` so the browser never converts a pinch
  into a page zoom.
- Camera min/max distance and pan bounds are clamped to the building.
- The top-right **Reset** button recenters the camera instantly — the kiosk
  safety net.
- For a standalone kiosk page, also set the viewport meta:
  `maximum-scale=1, user-scalable=no`.

## Development

```bash
npm install
npm run build      # → dist/ha-3d-floorplan-card.js (single bundled file)
npm run watch      # rebuild on change
npm run typecheck
```

Local preview without HA: serve the repo over HTTP and open `test/index.html`
(e.g. `npx serve` then visit `/test/`). It mounts the card with a mock `hass`
and buttons to simulate live state changes.

## Roadmap

- **Phase 1 (done):** render + bind + touch hardening + JSON/visual config editor.
- **Phase 2:** in-card top-down 2D wall-drawing editor, furniture palette,
  entity-binding dropdowns, save-to-Lovelace-config.
- **Stretch:** optional Node backend for versioned project files + GLB export.

## License

MIT. See [LICENSE](LICENSE). Built-in furniture is procedurally generated (no
third-party assets bundled).
