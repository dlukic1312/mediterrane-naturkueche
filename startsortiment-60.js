/* Sortimentsentwurf: 60 Kandidaten, keine realen Lieferartikel. Bestehende Artikel bleiben erhalten. */
(()=>{
'use strict';
const rows=[["oil","oil"],["herb-olives","Marinierte Oliven mit Kräutern","Oliven & Öl","200 g","6.90","tableolives","NAV-ADRIA"],["truffle","truffle"],["lemonoil","lemonoil"],["chilioil","chilioil"],["green-olives","Grüne Tafeloliven","Oliven & Öl","200 g","5.90","tableolives","NAV-ADRIA"],["black-olives","Schwarze Tafeloliven","Oliven & Öl","200 g","5.90","tableolives","NAV-ADRIA"],["tapenade","tapenade"],["kulen","Slavonski kulen","Fleischspezialitäten","250 g","17.90","ajvar","NAV-BALKAN"],["kulenova-seka","Kulenova seka","Fleischspezialitäten","250 g","12.90","ajvar","NAV-BALKAN"],["slavonska-kobasica","Slavonska kobasica","Fleischspezialitäten","300 g","10.90","ajvar","NAV-BALKAN"],["cvarci","Čvarci","Fleischspezialitäten","150 g","7.90","ajvar","NAV-BALKAN"],["dalmatinski-prsut","Dalmatinski pršut","Fleischspezialitäten","100 g","8.90","ajvar","NAV-ADRIA"],["istarski-prsut","Istarski pršut","Fleischspezialitäten","100 g","9.90","ajvar","NAV-ADRIA"],["panceta","Dalmatinska panceta","Fleischspezialitäten","150 g","8.90","ajvar","NAV-ADRIA"],["paski-sir","Paški sir","Käse","200 g","13.90","fig","NAV-ADRIA"],["sheep-cheese","Gereifter Schafskäse","Käse","200 g","10.90","fig","NAV-ADRIA"],["truffle-cheese","Hartkäse mit echtem Trüffel","Käse","180 g","13.90","truffle","NAV-ADRIA"],["incuni","Inćuni · Sardellen in Öl im Glas","Fisch & Meer","90 g","6.90","capers","NAV-ADRIA"],["srdele","Srdele · Sardinen in Olivenöl im Glas","Fisch & Meer","120 g","4.90","capers","NAV-ADRIA"],["sardine-lemon","Sardinen mit Zitrone im Glas","Fisch & Meer","120 g","5.50","capers","NAV-ADRIA"],["tuna-filets","Thunfischfilets in Olivenöl im Glas","Fisch & Meer","150 g","8.90","capers","NAV-ADRIA"],["anchovy-paste","Sardellenpaste","Fisch & Meer","60 g","5.90","capers","NAV-ADRIA"],["fleur","fleur"],["sea","sea"],["trufflesalt","trufflesalt"],["herbsalt","herbsalt"],["sage","sage"],["oregano","oregano"],["savory","savory"],["thyme","thyme"],["ajvar","ajvar"],["ajvar-hot","Ajvar scharf","Gemüse & Antipasti","350 g","4.90","ajvar","NAV-BALKAN"],["pindjur","Pinđur","Gemüse & Antipasti","350 g","5.90","ajvar","NAV-BALKAN"],["ljutenica","Ljutenica","Gemüse & Antipasti","350 g","5.90","ajvar","NAV-BALKAN"],["motar","Motar · eingelegter Meerfenchel","Gemüse & Antipasti","180 g","7.90","capers","NAV-ADRIA"],["capers","capers"],["driedtomatoes","driedtomatoes"],["fig","fig"],["figbread","figbread"],["figjam","figjam"],["plum","plum"],["rosehipjam","rosehipjam"],["arancini","Arancini · kandierte Orangenschalen","Früchte & Süßes","100 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["limuncini","Limuncini · kandierte Zitronenschalen","Früchte & Süßes","100 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["sage-honey","Salbeihonig","Honig & Kerne","250 g","8.90","figjam","NAV-ADRIA"],["chestnut-honey","Kastanienhonig","Honig & Kerne","250 g","8.90","figjam","NAV-BALKAN"],["pumpkinoil","pumpkinoil"],["pumpkinseeds","Geröstete Kürbiskerne","Honig & Kerne","150 g","4.90","pumpkinoil","NAV-BALKAN"],["candied-almonds","Kandierte Mandeln","Honig & Kerne","150 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["black","black"],["black-garlic-cream","Schwarze-Knoblauch-Creme","Würzprodukte","120 g","7.90","black","NAV-ADRIA"],["varenik","Varenik · Traubenmostreduktion","Würzprodukte","150 ml","9.90","grapesyrup","NAV-ADRIA"],["pomegranatemolasses","pomegranatemolasses"],["mustard","mustard"],["gift-adria","gift-adria"],["gift-balkan","gift-balkan"],["gift2","gift2"],["gift-salt-oil","Geschenkbox Salz & Öl","Geschenke","Set","32.90","gift-adria","NAV-ADRIA"],["gift-fig-cheese","Geschenkbox Feigen & Käse","Geschenke","Set","34.90","gift-adria","NAV-ADRIA"]];
const root=window.MEDITERRANEAN;
const sizes=window.PANTRY_SIZES;
const ids=[];
const idSet=new Set(root.catalog.map(p=>p[0]));
const byId=Object.fromEntries(root.catalog.map(p=>[p[0],p]));
for(const entry of rows){
 const [id,name,cat,pack,price,reference,room]=entry;
 if(!idSet.has(id)){
   const cost=Math.round(Number(price)*100);
   const number=parseFloat(pack.replace(',','.'))||0;
   const unit=pack.includes('ml')?'ml':pack.includes('g')?'g':null;
   root.catalog.push([id,name,cat,pack,Number(price),'demo-'+id,'Sortimentsentwurf','Für die vorgeschlagene Startkollektion. Produkt und Lagerfähigkeit sind vor einem Verkauf zu prüfen.']);
   sizes.defaults[id]=unit?String(number)+unit:'classic';
   sizes.products[id]=[{id:sizes.defaults[id],pack,amount:unit?number:null,unit,priceCents:cost,label:unit?pack:'Standard'}];
   const isGift=cat==='Geschenke';
   root.connections[id]={
     regions:isGift?[]:room==='NAV-BALKAN'?['HRV','BIH','MKD']:['HRV'],
     text:'Vorgeschlagene regionale Produktfamilie; keine verifizierte Lieferherkunft.',
     kind:isGift?'Kuratiertes Geschenkset':'Sortimentskandidat',
     type:isGift?'modern':'shared',
     relatedRegions:[], sources:[], relatedLabel:'Weitere Hinweise',
     commercialOrigin:{ingredients:null,processing:null,status:'Noch kein Lieferant geprüft'},
     preservation:{format:'Ungekühlte Variante nur nach Produktspezifikation',freshProduct:false,verifiedShelfLife:null,note:'Lager- und Versandbedingungen sind noch nicht bestätigt.'},
     review:{date:'2026-11-15',scope:'Design- und Sortimentsplanung',exclusiveOriginClaim:false,supplierOriginVerified:false},
     culinaryRange:{label:'Kulinarische Einordnung',summary:'Geplante Produktauswahl; keine bestätigte Warenherkunft.',basis:'provisional',exclusive:false},
     shopDescription:'Sortimentsentwurf. Verpackung, Zutaten, Allergene und Haltbarkeit vor Verkauf prüfen.',
     pricePresentation:{currency:'EUR',taxIncluded:true,basis:'Unverbindlicher Entwurfspreis'},
     ...(isGift?{giftRooms:[room],boxItems:[]}:{culinaryRooms:[room]}),
     launchSelection:{included:true,focus:['NAV-ADRIA','NAV-BALKAN'],reason:'Entwurf einer 60-Artikel-Kollektion',reviewed:'2026-11-15'}
   };
   idSet.add(id);
 } 
 ids.push(id);
}
if(new Set(ids).size!==60)throw new Error('Die Startkollektion benötigt 60 unterschiedliche Artikel.');
window.CULINARIA_START60=Object.freeze(ids);
const byCategory={};for(const id of ids){const p=root.catalog.find(x=>x[0]===id);(byCategory[p[2]]??=[]).push(id);}
window.CULINARIA_START60_BY_CATEGORY=byCategory;
/* Zusätzliche Einzelartikel: Entwürfe, keine bestätigten Lieferprodukte. */
const supplemental=[["fuzi-pasta","Fuži · trockene Pasta","Gemüse & Antipasti","250 g",5.9],["truffle-cream","Trüffelcreme mit echtem Trüffel","Würzprodukte","90 g",10.9],["dried-porcini","Getrocknete Steinpilze","Gemüse & Antipasti","30 g",7.9],["shelf-biscuits","Haltbares Traditionsgebäck","Früchte & Süßes","150 g",5.9],["apple-pekmez","Apfelpekmez","Früchte & Süßes","220 g",5.9],["plum-bestilj","Pflaumenbestilj","Früchte & Süßes","220 g",5.9],["dried-noodles","Traditionelle Trockennudeln","Gemüse & Antipasti","250 g",4.9],["sour-cherry-jam","Sauerkirschkonfitüre","Früchte & Süßes","220 g",5.9],["pickled-peppers","Eingelegte Paprika","Gemüse & Antipasti","350 g",5.9],["berry-jam","Beerenkonfitüre","Früchte & Süßes","220 g",5.9],["ajvar-kosovo","Ajvar aus Kosovo","Gemüse & Antipasti","350 g",5.9]];
for(const [id,name,cat,pack,price] of supplemental){
 if(root.catalog.some(p=>p[0]===id))continue;
 const amount=parseFloat(pack),unit=pack.includes('ml')?'ml':'g',priceCents=Math.round(price*100);
 root.catalog.push([id,name,cat,pack,price,'demo-'+id,'Produktskizze','Geplanter Einzelartikel für Geschenkboxen. Weder Herkunft noch konkrete Ware, Zutaten, Allergenangaben oder Versandfähigkeit sind bestätigt.']);
 sizes.defaults[id]=String(amount)+unit;
 sizes.products[id]=[{id:sizes.defaults[id],pack,amount,unit,priceCents,label:pack}];
 root.connections[id]={
  regions:[],text:'Nur ein Shop-Entwurf; keine Herkunftsbehauptung.',
  kind:'Sortimentskandidat',type:'modern',relatedRegions:[],sources:[],
  commercialOrigin:{ingredients:null,processing:null,status:'Nicht verifiziert'},
  preservation:{format:'Ungekühlte Ware nur nach Produktspezifikation',freshProduct:false,verifiedShelfLife:null,note:'Versandfähigkeit vor Aufnahme prüfen.'},
  review:{date:'2026-11-15',scope:'Sortimentskonzept',exclusiveOriginClaim:false,supplierOriginVerified:false},
  culinaryRange:{label:'Kulinarische Verwendung',summary:'Vorgeschlagener Artikel, ohne zugewiesene Herkunft.',basis:'provisional',exclusive:false},
  shopDescription:'Entwurfsartikel; Verpackung, Herkunft, Zutaten und Versandfähigkeit sind noch nicht geprüft.',
  pricePresentation:{currency:'EUR',taxIncluded:true,basis:'Unverbindlicher Entwurfspreis'},
  launchSelection:{included:true,focus:['NAV-ADRIA','NAV-BALKAN'],reason:'Einzelartikel für regionale Themenboxen',reviewed:'2026-11-15'}
 };
}
/* Elf regionale Geschenkboxen mit je zwei Varianten; reine Shopvorschau. */
const regionalBoxes=[
 ['slavonija','Slawonien · Herzhaft & würzig','Kulenova seka, Slavonska kobasica, Ajvar','Kulen, Kulenova seka, Slavonska kobasica, Ajvar, Pflaumenmus',34.90,59.90,0,'NAV-BALKAN'],
 ['istra','Istrien · Olivenöl & Trüffel','Olivenöl, Fuži, Trüffelsalz','Olivenöl, Fuži, Trüffelcreme mit echtem Trüffel, getrocknete Steinpilze, Kräutersalz',39.90,69.90,1,'NAV-ADRIA'],
 ['dalmacija','Dalmatien · Sonne & Meer','Olivenöl, Kapern, Meerfenchel','Olivenöl, Inćuni, Kapern, Feigen, Meerfenchel',34.90,59.90,2,'NAV-ADRIA'],
 ['medimurje','Međimurje · Gold des Nordens','Kürbiskernöl, geröstete Kürbiskerne, Fruchtaufstrich','Kürbiskernöl, Kürbiskerne, Honig, Fruchtaufstrich, haltbares Gebäck',29.90,49.90,3,'NAV-BALKAN'],
 ['pag','Pag · Salz & Salbei','Meersalz, Salbeihonig, Kräuter','Meersalz, Salbeihonig, Kräuter, gereifter Hartkäse (nur nach Produkt- und Versandfreigabe), weitere passende Spezialität',34.90,59.90,4,'NAV-ADRIA'],
 ['kvarner','Kvarner · Inseln & Berge','Kastanienhonig, Feigenkonfekt, Kräuter','Kastanienhonig, Feigenkonfekt, Olivenöl, Kräuter, Fruchtaufstrich',29.90,49.90,5,'NAV-ADRIA'],
 ['bosna','Bosnien · Pflaumen & Vorratsküche','Apfelpekmez, getrocknete Pflaumen, Bergkräuter','Apfelpekmez, Pflaumenbestilj, getrocknete Pflaumen, Bergkräuter, traditionelles haltbares Gebäck',29.90,49.90,6,'NAV-BALKAN'],
 ['hercegovina','Herzegowina · Feigen & Granatapfel','Getrocknete Feigen, Granatapfelzubereitung, Kräuter','Trockenfeigen, Granatapfelzubereitung, Feigenkonfitüre, Honig, mediterrane Kräuter',34.90,54.90,7,'NAV-ADRIA'],
];
const boxContents={"slavonija":[["kulenova-seka","slavonska-kobasica","ajvar"],["kulen","kulenova-seka","slavonska-kobasica","ajvar","plum"]],"istra":[["truffle","fuzi-pasta","trufflesalt"],["truffle","fuzi-pasta","truffle-cream","dried-porcini","rosemary"]],"dalmacija":[["oil","capers","motar"],["oil","incuni","capers","fig","motar"]],"medimurje":[["pumpkinoil","pumpkinseeds","mandarinspread"],["pumpkinoil","pumpkinseeds","sage-honey","mandarinspread","shelf-biscuits"]],"pag":[["sea","sage-honey","sage"],["sea","sage-honey","sage","paski-sir","figjam"]],"kvarner":[["chestnut-honey","figbread","savory"],["chestnut-honey","figbread","oil","savory","figjam"]],"bosna":[["apple-pekmez","prunes","savory"],["apple-pekmez","plum-bestilj","prunes","savory","shelf-biscuits"]],"hercegovina":[["fig","pomegranatemolasses","thyme"],["fig","pomegranatemolasses","figjam","sage-honey","thyme"]]};
const giftWorldNames={"istra":"Histria","dalmacija":"Dalmatia","pag":"Mare Adriaticum","kvarner":"Mare Adriaticum","bosna":"Dalmatia","hercegovina":"Dalmatia","slavonija":"Pannonia","medimurje":"Pannonia"};
for(const [slug,title,small,large,smallPrice,largePrice,picture,room] of regionalBoxes){
 const id='regionalbox-'+slug;
 if(root.catalog.some(p=>p[0]===id))continue;
 root.catalog.push([id,'Genussbox '+(giftWorldNames[slug] ? giftWorldNames[slug]+' · ' : '')+title,'Geschenke','Entdeckerbox / Genussbox',smallPrice,'giftroom-'+picture,'Regionale Geschenkidee','Entdeckerbox: '+small+'. Genussbox: '+large+'. Unverbindliche Zusammenstellung; Bestandteile, Herkunft und ungekühlte Versandfähigkeit sind noch nicht geprüft.']);
 sizes.defaults[id]='entdecker';
 sizes.products[id]=[
  {id:'entdecker',pack:'Entdeckerbox · 3 Produkte',amount:null,unit:null,priceCents:Math.round(smallPrice*100),label:'Entdeckerbox · 3 Produkte',includedDescription:small,boxItems:boxContents[slug][0].map(product=>({product,quantity:1}))},
  {id:'genuss',pack:'Genussbox · 5 Produkte',amount:null,unit:null,priceCents:Math.round(largePrice*100),label:'Genussbox · 5 Produkte',includedDescription:large,boxItems:boxContents[slug][1].map(product=>({product,quantity:1}))}
 ];
 root.connections[id]={
  regions:[],text:'Kulinarische Themenbox: Der Regionsname bezeichnet die geschmackliche Inspiration, nicht die Herkunft der Produkte. Derselbe Artikel kann in mehreren Boxen enthalten sein.',
  kind:'Kuratiertes Geschenkset',type:'modern',giftRooms:[room],relatedRegions:[],sources:[],
  boxItems:[small,large],
  shopDescription:'Kulinarisch inspiriert von '+title.split(' · ')[0]+'. Entdeckerbox: '+small+'. Genussbox: '+large+'. Regionsspezifische Spezialitäten müssen vollständig aus der benannten Region stammen. Bei ergänzenden Artikeln wird die wahrscheinliche Bezugsregion als unverifizierte Planungsannahme gezeigt.',
  commercialOrigin:{ingredients:null,processing:null,status:'Noch keine Lieferanten- und Herkunftsfreigabe'},
  preservation:{format:'Nur ungekühlt versandfähige Artikel',freshProduct:false,verifiedShelfLife:null,note:'Alle Bestandteile müssen vor Verkauf einzeln freigegeben werden.'},
  pricePresentation:{currency:'EUR',taxIncluded:true,basis:'Unverbindlicher Entwurfspreis'},
  review:{date:'2026-11-15',scope:'Gestaltungsentwurf',exclusiveOriginClaim:false,supplierOriginVerified:false},
  culinaryRange:{label:'Kulinarische Inspiration – keine Herkunftsangabe',summary:'Produkte werden wegen ihres Geschmacks und ihrer Verwendung zusammengestellt. Ein und derselbe Artikel kann in verschiedenen Regionsboxen vorkommen. Für regionale Leitprodukte gilt ausschließlich die namensgebende Region; für andere Artikel wird eine getrennte, zunächst unverifizierte Bezugsregion geplant.',basis:'provisional',exclusive:false},
  launchSelection:{included:true,focus:['NAV-ADRIA','NAV-BALKAN'],reason:'Regionale Geschenkbox in zwei Größen',reviewed:'2026-11-15'}
 };
}
for(const [slug,variants] of Object.entries(boxContents))for(const ids of variants)for(const id of ids){if(!root.catalog.some(p=>p[0]===id)||!sizes.products[id]?.length)throw new Error('Fehlender Geschenkboxartikel: '+slug+' / '+id);}
window.CULINARIA_BOX_CONTENTS=Object.freeze(boxContents);
window.CULINARIA_BOX_ORIGIN_RULE='Regional charakteristische Leitprodukte müssen ausschließlich aus der genannten Region stammen (Rohstoffe und Verarbeitung). Allgemeine Artikel dürfen mehrfach verwendet werden; geplante Herkunft ist bis zur Lieferantenprüfung eine unverifizierte Annahme.';
window.CULINARIA_REGIONAL_BOXES=Object.freeze(regionalBoxes.map(r=>'regionalbox-'+r[0]));
})();
