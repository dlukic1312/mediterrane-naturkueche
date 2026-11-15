/* Sourcing-Hypothesen für Geschenkboxen; keine Lieferanten-/Herkunftsnachweise.
 * Regionsspezifische Leitprodukte: Rohstoffe UND Verarbeitung müssen aus genau
 * der genannten Region kommen. Ohne Beleg keine Herkunftsbehauptung/Verkaufsfreigabe.
 * Allgemeine Artikel: genau eine wahrscheinliche Herkunft als Ausgangspunkt der Suche;
 * derselbe Artikel kann in mehreren Boxen verwendet werden. */
(()=>{
'use strict';
const hypotheses={
  "kulen": [
    "Slawonien",
    "regional-exklusiv"
  ],
  "kulenova-seka": [
    "Slawonien",
    "regional-exklusiv"
  ],
  "slavonska-kobasica": [
    "Slawonien",
    "regional-exklusiv"
  ],
  "ajvar": [
    "Kosovo",
    "allgemein"
  ],
  "plum": [
    "Slawonien",
    "allgemein"
  ],
  "truffle": [
    "Istrien",
    "regional-exklusiv"
  ],
  "fuzi-pasta": [
    "Istrien",
    "regional-exklusiv"
  ],
  "trufflesalt": [
    "Istrien",
    "regional-exklusiv"
  ],
  "truffle-cream": [
    "Istrien",
    "regional-exklusiv"
  ],
  "dried-porcini": [
    "Istrien",
    "allgemein"
  ],
  "rosemary": [
    "Istrien",
    "allgemein"
  ],
  "oil": [
    "Dalmatien",
    "allgemein"
  ],
  "capers": [
    "Dalmatien",
    "allgemein"
  ],
  "oregano": [
    "Dalmatien",
    "allgemein"
  ],
  "incuni": [
    "Dalmatien",
    "allgemein"
  ],
  "fig": [
    "Dalmatien",
    "allgemein"
  ],
  "pumpkinoil": [
    "Međimurje",
    "regional-exklusiv"
  ],
  "pumpkinseeds": [
    "Međimurje",
    "regional-exklusiv"
  ],
  "mandarinspread": [
    "Dalmatien",
    "allgemein"
  ],
  "sage-honey": [
    "Pag",
    "allgemein"
  ],
  "shelf-biscuits": [
    "Međimurje",
    "allgemein"
  ],
  "sea": [
    "Pag",
    "allgemein"
  ],
  "sage": [
    "Pag",
    "allgemein"
  ],
  "paski-sir": [
    "Pag",
    "regional-exklusiv"
  ],
  "figjam": [
    "Herzegowina",
    "allgemein"
  ],
  "chestnut-honey": [
    "Kvarner",
    "allgemein"
  ],
  "figbread": [
    "Kvarner",
    "allgemein"
  ],
  "savory": [
    "Herzegowina",
    "allgemein"
  ],
  "apple-pekmez": [
    "Bosnien",
    "allgemein"
  ],
  "prunes": [
    "Bosnien",
    "allgemein"
  ],
  "plum-bestilj": [
    "Bosnien",
    "allgemein"
  ],
  "pomegranatemolasses": [
    "Herzegowina",
    "allgemein"
  ],
  "thyme": [
    "Herzegowina",
    "allgemein"
  ],
  "tableolives": [
    "Montenegro",
    "allgemein"
  ],
  "paprikapowdermild": [
    "Vojvodina",
    "allgemein"
  ],
  "dried-noodles": [
    "Vojvodina",
    "allgemein"
  ],
  "pickled-peppers": [
    "Kosovo",
    "allgemein"
  ],
  "sour-cherry-jam": [
    "Vojvodina",
    "allgemein"
  ],
  "paprikapowderhot": [
    "Kosovo",
    "allgemein"
  ],
  "berry-jam": [
    "Kosovo",
    "allgemein"
  ]
};
const regionalKeys={
 'Slawonien':'slavonija','Istrien':'istra','Dalmatien':'dalmacija',
 'Međimurje':'medimurje','Pag':'pag','Kvarner':'kvarner',
 'Bosnien':'bosna','Herzegowina':'hercegovina','Montenegro':'montenegro',
 'Vojvodina':'vojvodina','Kosovo':'kosovo'
};
const data=window.MEDITERRANEAN;
const sizes=window.PANTRY_SIZES;
const boxes=window.CULINARIA_BOX_CONTENTS;
if(!data||!sizes||!boxes)throw Error('Herkunftsplanung benötigt den bestehenden Shopkatalog');
const allProducts=new Set(data.catalog.map(p=>p[0]));
for(const [slug,variants] of Object.entries(boxes))for(const ids of variants)for(const id of ids){
 if(!allProducts.has(id)||!sizes.products[id])throw Error('Boxenartikel nicht im Shop: '+id);
 if(!hypotheses[id])throw Error('Fehlende Herkunftsannahme für '+id);
 const [region,kind]=hypotheses[id];
 if(!regionalKeys[region])throw Error('Unbekannte Herkunftsregion: '+region);
 if(kind==='regional-exklusiv'&&regionalKeys[region]!==slug)
  throw Error('Regionsexklusives Produkt ist der falschen Box zugeordnet: '+id+' / '+slug);
}
const entries={};
for(const [id,[region,kind]] of Object.entries(hypotheses)){
 if(!allProducts.has(id))throw Error('Herkunftsplanung verweist auf fehlenden Artikel: '+id);
 const exclusive=kind==='regional-exklusiv';
 entries[id]=Object.freeze({
   likelyRegion:region,regionalExclusive:exclusive,originStatus:'unverified',
   rawMaterials:exclusive?'ausschließlich '+region:'wahrscheinlich '+region,
   processing:exclusive?'ausschließlich '+region:'noch nicht bestimmt',
   sourcingRequirement:exclusive?
    'Nur Rohstoffe aus '+region+' und Verarbeitung in '+region+' zulässig.': 
    'Allgemeines Produkt; mehrfach verwendbar. '+region+' ist derzeit nur vermutete Bezugsregion.',
   evidence:'Beschaffungsannahme, kein geprüfter Lieferanten- oder Ursprungsnachweis'
 });
 const connection=data.connections[id];
 if(connection)connection.originPlan=entries[id];
}
window.CULINARIA_ORIGIN_PLAN=Object.freeze(entries);
window.CULINARIA_ORIGIN_RULE=Object.freeze({verifiedOnlyForFactualClaims:true,regionalSpecificExclusive:true,sharedProductsAllowed:true});
})();
