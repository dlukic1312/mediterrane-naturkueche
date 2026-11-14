# User-approved map design

The user explicitly approved the Mediterranean overview coloring and prohibited changes without an explicit new instruction. Preserve its geographic field, color, opacity, blur, and soft transitions. The protected values are recorded in `design-constraints.json` and checked by `scripts/validate-content.mjs`. Do not update those values merely to make a check pass.

Changing the viewport, zoom, or surrounding layout is allowed as long as the approved coloring remains unchanged. Country selections, shared regions, and product views must continue to work.
