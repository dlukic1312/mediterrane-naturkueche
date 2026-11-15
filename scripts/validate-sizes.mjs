import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=(file,prefix)=>JSON.parse(readFileSync(new URL(file,root),'utf8').trim().slice(prefix.length).replace(/;$/,''));
const data=read('regions-data.js','window.MEDITERRANEAN = '),sizes=read('product-sizes-data.js','window.PANTRY_SIZES = '),ids=new Set(data.catalog.map(p=>p[0]));
assert.deepEqual(Object.keys(sizes.products).sort(),[...ids].sort());
let count=0;
for(const p of data.catalog){const vs=sizes.products[p[0]],keys=new Set(vs.map(v=>v.id));assert.equal(keys.size,vs.length,p[0]+' duplicate sizes');assert(vs.length>=2&&vs.length<=3,p[0]+' needs a concise selection');const def=vs.find(v=>v.id===sizes.defaults[p[0]]);assert(def,p[0]+' default missing');assert.equal(Math.round(p[4]*100),def.priceCents,p[0]+' reference price out of sync');if(p[2]!=='Geschenke')assert.equal(p[3].replace(',','.'),def.pack.replace(',','.'));
 for(const [i,v] of vs.entries()){count++;assert(Number.isInteger(v.priceCents)&&v.priceCents>0,p[0]);if(v.amount){assert(v.amount>0&&['g','ml'].includes(v.unit));if(i)assert(v.priceCents/v.amount<vs[i-1].priceCents/vs[i-1].amount,p[0]+' larger pack must lower unit price');if(v.drainedWeightG)assert(v.drainedWeightG>0&&v.drainedWeightG<=v.amount)}else{assert(v.boxItems?.length>=3,p[0]+' box contents missing');let sum=0;for(const item of v.boxItems){assert(ids.has(item.product));assert(Number.isInteger(item.quantity)&&item.quantity>0);const content=sizes.products[item.product].find(v=>v.id===item.variant);assert(content,p[0]+' missing box item size');sum+=content.priceCents*item.quantity}assert.equal(sum,v.individualTotalCents);assert(v.priceCents>sum,p[0]+' packaging must be priced consistently');assert(v.priceCents-sum<=600,p[0]+' unexplained packaging premium')}}
}
assert.equal(data.catalog.find(p=>p[0]==='datesyrup')[4],4.9);assert.equal(data.catalog.find(p=>p[0]==='oregano')[4],3.9);assert(data.connections.saffron.launchSelection.included);assert(data.connections.carob.launchSelection.included);assert(data.connections.lemonsyrup.launchSelection.included);
console.log(`Validated ${ids.size} products, ${count} sizes, declining unit prices, drained weights and every box composition.`);
