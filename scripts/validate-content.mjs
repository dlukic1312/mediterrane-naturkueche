import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const raw=readFileSync(root+'regions-data.js','utf8').trim();
assert.ok(raw.startsWith('window.MEDITERRANEAN = '),'Unexpected data format');
const data=JSON.parse(raw.slice('window.MEDITERRANEAN = '.length).replace(/;$/,''));
const geoIds=new Set(data.regions.map(r=>r.id));
assert.equal(geoIds.size,data.regions.length,'Duplicate region IDs');
const countryIds=new Set(data.regions.filter(r=>!r.parent).map(r=>r.id));
const productIds=new Set(data.catalog.map(p=>p[0]));
assert.equal(productIds.size,data.catalog.length,'Duplicate product IDs');
assert.deepEqual([...countryIds].sort(),data.countryBorderReview.map(r=>r.country).sort(),'Every country needs a border review');
const source=s=>{assert.ok(s.title?.trim(),'Source title missing');assert.equal(new URL(s.url).protocol,'https:','Use explicit HTTPS source URLs')};
const html=readFileSync(root+'mittelmeer.html','utf8');
const approved=JSON.parse(readFileSync(root+'design-constraints.json','utf8')).approvedMediterraneanColoring.sha256;
const css=readFileSync(root+'mittelmeer.css','utf8');
const frozen={field:html.match(/<g class="culinary-influence"[\s\S]*?<\/g>/)?.[0],softness:html.match(/<filter id="influence-soft"[\s\S]*?<\/filter>/)?.[0],color:css.match(/\.map-wrap \.culinary-influence path\{[^}]*\}/)?.[0]};
for(const [key,value] of Object.entries(frozen)){assert.ok(value,'Missing approved map '+key);assert.equal(createHash('sha256').update(value).digest('hex'),approved[key],'Approved map '+key+' requires explicit user instruction to change')}
for(const r of data.regions){assert.ok(html.includes('data-region="'+r.id+'"'),'Missing map target '+r.id);if(r.parent)assert.ok(countryIds.has(r.parent),'Unknown parent '+r.id)}
for(const group of data.crossBorderAreas){assert.ok(group.members.length&&group.countries.length,'Empty shared space');for(const id of group.members)assert.ok(geoIds.has(id),'Unknown shared-region member '+id);for(const id of group.countries)assert.ok(countryIds.has(id),'Unknown shared-region country '+id);assert.ok(group.sources.length,'Shared-space source missing');group.sources.forEach(source)}
for(const r of data.regions.filter(r=>r.sharedRegion)){const g=data.crossBorderAreas.find(g=>g.id===r.sharedRegion);assert.ok(g?.unified&&g.members.includes(r.id)&&g.countries.includes(r.parent),'Shared region must be reachable from its country: '+r.id)}
for(const id of productIds){const c=data.connections[id];assert.ok(c,'No regional record for '+id);assert.ok(c.culinaryRange?.summary&&c.culinaryRange.label,'Missing culinary range for '+id);assert.equal(c.culinaryRange.exclusive,false,'Do not imply an exclusive culinary homeland');if(c.mapRegions){assert.ok(c.mapRegions.length,'Empty explicit map range');for(const r of c.mapRegions)assert.ok(geoIds.has(r)&&c.regions.includes(r),'Map precision must use a documented product region: '+id)}assert.ok(c.sources?.length,'No sources for '+id);c.sources.forEach(source);assert.ok(c.review?.date&&c.review.scope,'Review missing for '+id);assert.equal(c.review.exclusiveOriginClaim,false,'Do not publish an unreviewed exclusive-origin claim');assert.equal(c.preservation?.freshProduct,false,'Fresh products are outside this assortment: '+id);assert.ok(c.preservation.format&&c.preservation.note,'Preservation specification missing for '+id);if(c.preservation.verifiedShelfLife!==null)assert.ok(c.shelfLifeEvidence?.length,'Shelf life requires supplier evidence');if(c.commercialOrigin.ingredients!==null||c.commercialOrigin.processing!==null)assert.ok(c.supplierEvidence?.length,'Actual origin requires supplier evidence: '+id);assert.equal(c.regions.length,new Set(c.regions).size,'Duplicate region link '+id);for(const r of c.regions)assert.ok(geoIds.has(r),'Unknown product region '+r);for(const rel of c.relatedRegions){assert.ok(geoIds.has(rel.id),'Unknown variant region');assert.ok(rel.note&&rel.title,'Variant needs an explanation');rel.sources.forEach(source)}if(c.type==='modern')assert.equal(c.regions.length,0,'Do not infer a traditional homeland from a modern recipe: '+id)}
assert.ok(data.connections.oil.regions.includes('PRT'),'Portugal must remain in the olive-oil range');
assert.ok(data.connections.oil.regions.includes('BIH-HER'),'Documented Herzegovinian olive oil must remain represented');
for(const id of ['truffle','trufflesalt'])assert.ok(data.connections[id].regions.includes('HR-IST'),'Istrian truffle-product families must be present');
assert.ok(['MAR','TUN','TN-MED'].every(id=>data.connections.saltlemons.regions.includes(id)),'Salzzitronen must show their documented shared range');
assert.equal(data.catalog.find(p=>p[0]==='saltlemons')[1],'Salzzitronen','Avoid an unsupported exclusive country name');
assert.ok(!data.connections.figbread.sources.some(s=>s.url==='https://en.wikipedia.org/wiki/Fig_cake'),'Baked cake is not the compressed dried-fruit product');
for(const r of data.countryBorderReview){assert.ok(r.summary&&r.sources.length,'Border review needs explanation and sources');r.sources.forEach(source)}
for(const r of data.rawMaterialIdeas){assert.ok(r.formats.length&&r.sources.length,'Raw-material ideas require processed formats and sources');for(const id of r.regions)assert.ok(geoIds.has(id),'Unknown raw-material region');r.sources.forEach(source)}
for(const name of ['mittelmeer.js','product-regions.js'])new Function(readFileSync(root+name,'utf8'));
for(const match of readFileSync(root+'index.html','utf8').matchAll(/<script>([\s\S]*?)<\/script>/g))new Function(match[1]);
console.log(`Validated ${productIds.size} preserved-product drafts, ${geoIds.size} map targets, ${countryIds.size} country reviews, and ${data.crossBorderAreas.length} shared regions. Editorial sources still require human factual review.`);
