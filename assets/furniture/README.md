# Furniture assets

The **built-in** furniture library is generated procedurally from Three.js
primitives (see `src/furniture/library.ts`) — there are no binary assets to
license or ship, which keeps the bundle small and avoids any redistribution
concerns.

## Adding custom `.glb` models

You don't need to put files here. Drop a `.glb` anywhere HA can serve it
(typically `/config/www/models/`) and reference it per furniture placement:

```yaml
furniture:
  - model: sofa            # ignored when glb is set
    glb: /local/models/my_sofa.glb
    position: [1.5, 0, 1]
    rotation: 90
    scale: 1.0
    color: "#5b6b7a"       # optional tint multiplied over the model
```

If you do want to bundle CC0 models with the card, drop them in this folder and
note attribution below. Recommended CC0 sources:

- Kenney.nl (CC0)
- Poly Pizza (filter to CC0)
- Quaternius asset packs (CC0)

Do **not** add copyrighted or branded furniture assets.

## Attribution

_(none — all built-in furniture is procedural)_
