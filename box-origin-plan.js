/* Fiktiver Shop-Prototyp mit festen Muster-Herkünften, keine Lieferanten-/Herkunftsnachweise.
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
    "regional-exklusiv"
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
    "regional-exklusiv"
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
    "regional-exklusiv"
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
    "regional-exklusiv"
  ],
  "thyme": [
    "Herzegowina",
    "allgemein"
  ],
  "tableolives": [
    "Montenegro",
    "regional-exklusiv"
  ],
  "paprikapowdermild": [
    "Vojvodina",
    "allgemein"
  ],
  "dried-noodles": [
    "Vojvodina",
    "regional-exklusiv"
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
/* Ergänzende Planherkünfte für alle weiteren regulären Einzelartikel. */
const additionalPrototypes={
  "lemonoil": [
    "Dalmatien",
    "allgemein"
  ],
  "chilioil": [
    "Dalmatien",
    "allgemein"
  ],
  "fleur": [
    "Pag",
    "allgemein"
  ],
  "herbsalt": [
    "Dalmatien",
    "regional-exklusiv"
  ],
  "black": [
    "Dalmatien",
    "allgemein"
  ],
  "mustard": [
    "Dalmatien",
    "allgemein"
  ],
  "tapenade": [
    "Griechenland",
    "allgemein"
  ],
  "caponata": [
    "Sizilien",
    "allgemein"
  ],
  "romesco": [
    "Katalonien",
    "allgemein"
  ],
  "harissa": [
    "Tunesien",
    "allgemein"
  ],
  "saltlemons": [
    "Marokko",
    "allgemein"
  ],
  "olivepaste": [
    "Griechenland",
    "allgemein"
  ],
  "acuka": [
    "Türkei",
    "allgemein"
  ],
  "zaatar": [
    "Libanon",
    "allgemein"
  ],
  "muhammara": [
    "Syrien",
    "allgemein"
  ],
  "dates": [
    "Tunesien",
    "allgemein"
  ],
  "pinchos": [
    "Spanien",
    "allgemein"
  ],
  "provence": [
    "Provence",
    "allgemein"
  ],
  "aglio": [
    "Süditalien",
    "allgemein"
  ],
  "sharena": [
    "Nordmazedonien",
    "allgemein"
  ],
  "aegeanherbs": [
    "Griechenland",
    "allgemein"
  ],
  "raselhanout": [
    "Marokko",
    "allgemein"
  ],
  "dukkah": [
    "Ägypten",
    "allgemein"
  ],
  "fennelseed": [
    "Sizilien",
    "allgemein"
  ],
  "bay": [
    "Dalmatien",
    "allgemein"
  ],
  "rosehipjam": [
    "Bosnien",
    "allgemein"
  ],
  "mint": [
    "Marokko",
    "allgemein"
  ],
  "lemonbalm": [
    "Bosnien",
    "allgemein"
  ],
  "paprikaflakesmild": [
    "Vojvodina",
    "allgemein"
  ],
  "paprikaflakeshot": [
    "Vojvodina",
    "allgemein"
  ],
  "smokedpaprika": [
    "Spanien",
    "allgemein"
  ],
  "driedpeppers": [
    "Vojvodina",
    "allgemein"
  ],
  "driedaubergine": [
    "Türkei",
    "allgemein"
  ],
  "driedtomatoes": [
    "Süditalien",
    "allgemein"
  ],
  "carob": [
    "Zypern",
    "allgemein"
  ],
  "cruschi": [
    "Süditalien",
    "allgemein"
  ],
  "nora": [
    "Spanien",
    "allgemein"
  ],
  "sumac": [
    "Türkei",
    "allgemein"
  ],
  "cumin": [
    "Marokko",
    "allgemein"
  ],
  "coriander": [
    "Marokko",
    "allgemein"
  ],
  "nigella": [
    "Türkei",
    "allgemein"
  ],
  "saffron": [
    "Spanien",
    "allgemein"
  ],
  "anise": [
    "Griechenland",
    "allgemein"
  ],
  "baharat": [
    "Libanon",
    "allgemein"
  ],
  "tabil": [
    "Tunesien",
    "allgemein"
  ],
  "mastic": [
    "Griechenland",
    "allgemein"
  ],
  "caraway": [
    "Vojvodina",
    "allgemein"
  ],
  "elderflowersyrup": [
    "Bosnien",
    "allgemein"
  ],
  "elderberrysyrup": [
    "Bosnien",
    "allgemein"
  ],
  "rosesyrup": [
    "Libanon",
    "allgemein"
  ],
  "lemonsyrup": [
    "Sizilien",
    "allgemein"
  ],
  "cherrysyrup": [
    "Vojvodina",
    "allgemein"
  ],
  "mintsyrup": [
    "Marokko",
    "allgemein"
  ],
  "almondsyrup": [
    "Griechenland",
    "allgemein"
  ],
  "carobsyrup": [
    "Zypern",
    "allgemein"
  ],
  "datesyrup": [
    "Tunesien",
    "allgemein"
  ],
  "grapesyrup": [
    "Dalmatien",
    "allgemein"
  ],
  "mulberrymolasses": [
    "Türkei",
    "allgemein"
  ],
  "jallab": [
    "Libanon",
    "allgemein"
  ],
  "walnutoil": [
    "Vojvodina",
    "allgemein"
  ],
  "arganoil": [
    "Marokko",
    "allgemein"
  ],
  "mandarinsyrup": [
    "Dalmatien",
    "allgemein"
  ],
  "candiedmandarinpeel": [
    "Dalmatien",
    "allgemein"
  ],
  "quinceslatko": [
    "Bosnien",
    "allgemein"
  ],
  "kontonjata": [
    "Dalmatien",
    "allgemein"
  ],
  "walnutslatko": [
    "Bosnien",
    "allgemein"
  ],
  "herb-olives": [
    "Dalmatien",
    "allgemein"
  ],
  "green-olives": [
    "Griechenland",
    "allgemein"
  ],
  "black-olives": [
    "Griechenland",
    "allgemein"
  ],
  "cvarci": [
    "Slawonien",
    "allgemein"
  ],
  "dalmatinski-prsut": [
    "Dalmatien",
    "regional-exklusiv"
  ],
  "istarski-prsut": [
    "Istrien",
    "regional-exklusiv"
  ],
  "panceta": [
    "Dalmatien",
    "regional-exklusiv"
  ],
  "sheep-cheese": [
    "Pag",
    "allgemein"
  ],
  "truffle-cheese": [
    "Istrien",
    "allgemein"
  ],
  "srdele": [
    "Dalmatien",
    "allgemein"
  ],
  "sardine-lemon": [
    "Dalmatien",
    "allgemein"
  ],
  "tuna-filets": [
    "Dalmatien",
    "allgemein"
  ],
  "anchovy-paste": [
    "Dalmatien",
    "allgemein"
  ],
  "ajvar-hot": [
    "Kosovo",
    "allgemein"
  ],
  "pindjur": [
    "Nordmazedonien",
    "allgemein"
  ],
  "ljutenica": [
    "Bulgarien",
    "allgemein"
  ],
  "motar": [
    "Dalmatien",
    "regional-exklusiv"
  ],
  "arancini": [
    "Dalmatien",
    "allgemein"
  ],
  "limuncini": [
    "Dalmatien",
    "allgemein"
  ],
  "candied-almonds": [
    "Dalmatien",
    "allgemein"
  ],
  "black-garlic-cream": [
    "Istrien",
    "allgemein"
  ],
  "varenik": [
    "Dalmatien",
    "regional-exklusiv"
  ]
};
for(const [id,plan] of Object.entries(additionalPrototypes)){
 if(hypotheses[id])throw Error('Doppelte Herkunftsplanung: '+id);
 hypotheses[id]=plan;
}
hypotheses["ajvar-kosovo"]=["Kosovo","regional-exklusiv"];
const regionalKeys={
 'Slawonien':'slavonija','Istrien':'istra','Dalmatien':'dalmacija',
 'Međimurje':'medimurje','Pag':'pag','Kvarner':'kvarner',
 'Bosnien':'bosna','Herzegowina':'hercegovina','Montenegro':'montenegro',
 'Vojvodina':'vojvodina','Kosovo':'kosovo',
 'Griechenland':'griechenland','Sizilien':'sizilien','Katalonien':'katalonien',
 'Tunesien':'tunesien','Marokko':'marokko','Türkei':'tuerkei','Libanon':'libanon',
 'Syrien':'syrien','Spanien':'spanien','Provence':'provence',
 'Nordmazedonien':'nordmazedonien','Süditalien':'sueditalien',
 'Ägypten':'aegypten','Zypern':'zypern','Bulgarien':'bulgarien'
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
   likelyRegion:region,displayRegion:region,regionalExclusive:exclusive,originStatus:'prototype',
   rawMaterials:exclusive?'ausschließlich '+region:'in der Musterwelt '+region,
   processing:exclusive?'ausschließlich '+region:'noch nicht festgelegt',
   sourcingRequirement:exclusive?
    'Nur Rohstoffe aus '+region+' und Verarbeitung in '+region+' zulässig.': 
    'Allgemeines Produkt; mehrfach verwendbar. '+region+' ist derzeit nur vermutete Bezugsregion.',
   evidence:'Feste Herkunft der Musterwelt; vor Verkaufsstart mittels Lieferanten- und Herkunftsdokumenten zu ersetzen'
 });
 const connection=data.connections[id];
 if(connection)connection.originPlan=entries[id];
}
window.CULINARIA_ORIGIN_PLAN=Object.freeze(entries);
window.CULINARIA_ORIGIN_RULE=Object.freeze({mode:'prototype',productionRequiresVerification:true,regionalSpecificExclusive:true,sharedProductsAllowed:true});
})();
