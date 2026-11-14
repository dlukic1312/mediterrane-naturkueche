# User-approved map design

The user explicitly approved the Mediterranean overview coloring and prohibited changes without an explicit new instruction. Preserve its geographic field, color, opacity, blur, and soft transitions. The protected values are recorded in `design-constraints.json` and checked by `scripts/validate-content.mjs`. Do not update those values merely to make a check pass.

Changing the viewport, zoom, or surrounding layout is allowed as long as the approved coloring remains unchanged. Country selections, shared regions, and product views must continue to work.

The accepted main map uses direct map navigation, without dropdowns or on-map geographic labels. Keep subtle colored, soft selection surfaces and accessible keyboard controls; show names outside the map. Culinary rooms follow geography rather than whole-country membership. Adria and Balkan are separately selectable and may overlap; Istria and Italy's Adriatic coast belong to Adria. Preserve precise product references without adding subregion navigation.

Regional gift boxes use giftRooms and boxItems. Their theme is not a traditional product distribution: keep regions empty for modern gift boxes, show their thematic room on selection, and show them first in that room. Product images are selected through product-photos.js. Keep versioned JS/CSS references in all three HTML entry points synchronized when publishing catalog changes.
