/* Sortimentsentwurf: 60 Kandidaten, keine realen Lieferartikel. Bestehende Artikel bleiben erhalten. */
(()=>{
'use strict';
const rows=[["oil","oil"],["herb-olives","Marinierte Oliven mit Kräutern","Oliven & Öl","200 g","6.90","tableolives","NAV-ADRIA"],["truffle","truffle"],["lemonoil","lemonoil"],["chilioil","chilioil"],["green-olives","Grüne Tafeloliven","Oliven & Öl","200 g","5.90","tableolives","NAV-ADRIA"],["black-olives","Schwarze Tafeloliven","Oliven & Öl","200 g","5.90","tableolives","NAV-ADRIA"],["tapenade","tapenade"],["kulen","Slavonski kulen","Fleischspezialitäten","250 g","17.90","ajvar","NAV-BALKAN"],["kulenova-seka","Kulenova seka","Fleischspezialitäten","250 g","12.90","ajvar","NAV-BALKAN"],["slavonska-kobasica","Slavonska kobasica","Fleischspezialitäten","300 g","10.90","ajvar","NAV-BALKAN"],["cvarci","Čvarci","Fleischspezialitäten","150 g","7.90","ajvar","NAV-BALKAN"],["dalmatinski-prsut","Dalmatinski pršut","Fleischspezialitäten","100 g","8.90","ajvar","NAV-ADRIA"],["istarski-prsut","Istarski pršut","Fleischspezialitäten","100 g","9.90","ajvar","NAV-ADRIA"],["panceta","Dalmatinska panceta","Fleischspezialitäten","150 g","8.90","ajvar","NAV-ADRIA"],["paski-sir","Paški sir","Käse","200 g","13.90","fig","NAV-ADRIA"],["sheep-cheese","Gereifter Schafskäse","Käse","200 g","10.90","fig","NAV-ADRIA"],["truffle-cheese","Hartkäse mit echtem Trüffel","Käse","180 g","13.90","truffle","NAV-ADRIA"],["incuni","Inćuni · Sardellen in Öl","Fisch & Meer","90 g","6.90","capers","NAV-ADRIA"],["srdele","Srdele · Sardinen in Olivenöl","Fisch & Meer","120 g","4.90","capers","NAV-ADRIA"],["sardine-lemon","Sardinen mit Zitrone","Fisch & Meer","120 g","5.50","capers","NAV-ADRIA"],["tuna-filets","Thunfischfilets in Olivenöl","Fisch & Meer","150 g","8.90","capers","NAV-ADRIA"],["anchovy-paste","Sardellenpaste","Fisch & Meer","60 g","5.90","capers","NAV-ADRIA"],["fleur","fleur"],["sea","sea"],["trufflesalt","trufflesalt"],["herbsalt","herbsalt"],["sage","sage"],["oregano","oregano"],["savory","savory"],["thyme","thyme"],["ajvar","ajvar"],["ajvar-hot","Ajvar scharf","Gemüse & Antipasti","350 g","4.90","ajvar","NAV-BALKAN"],["pindjur","Pinđur","Gemüse & Antipasti","350 g","5.90","ajvar","NAV-BALKAN"],["ljutenica","Ljutenica","Gemüse & Antipasti","350 g","5.90","ajvar","NAV-BALKAN"],["motar","Motar · eingelegter Meerfenchel","Gemüse & Antipasti","180 g","7.90","capers","NAV-ADRIA"],["capers","capers"],["driedtomatoes","driedtomatoes"],["fig","fig"],["figbread","figbread"],["figjam","figjam"],["plum","plum"],["rosehipjam","rosehipjam"],["arancini","Arancini · kandierte Orangenschalen","Früchte & Süßes","100 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["limuncini","Limuncini · kandierte Zitronenschalen","Früchte & Süßes","100 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["sage-honey","Salbeihonig","Honig & Kerne","250 g","8.90","figjam","NAV-ADRIA"],["chestnut-honey","Kastanienhonig","Honig & Kerne","250 g","8.90","figjam","NAV-BALKAN"],["pumpkinoil","pumpkinoil"],["pumpkinseeds","Geröstete Kürbiskerne","Honig & Kerne","150 g","4.90","pumpkinoil","NAV-BALKAN"],["candied-almonds","Kandierte Mandeln","Honig & Kerne","150 g","5.90","candiedmandarinpeel","NAV-ADRIA"],["black","black"],["black-garlic-cream","Schwarze-Knoblauch-Creme","Würzprodukte","120 g","7.90","black","NAV-ADRIA"],["varenik","Varenik · Traubenmostreduktion","Würzprodukte","150 ml","9.90","grapesyrup","NAV-ADRIA"],["pomegranatemolasses","pomegranatemolasses"],["mustard","mustard"],["gift-adria","gift-adria"],["gift-balkan","gift-balkan"],["gift2","gift2"],["gift-salt-oil","Geschenkbox Salz & Öl","Geschenke","Set","32.90","gift-adria","NAV-ADRIA"],["gift-fig-cheese","Geschenkbox Feigen & Käse","Geschenke","Set","34.90","gift-adria","NAV-ADRIA"]];
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
/* Elf regionale Geschenkboxen mit je zwei Varianten; reine Shopvorschau. */
const regionalBoxes=[
 ['slavonija','Slavonija · Herzhaft & würzig','Kulenova seka, Slavonska kobasica, Ajvar','Kulen, Kulenova seka, Slavonska kobasica, Ajvar, Pflaumenmus',34.90,59.90,0,'NAV-BALKAN'],
 ['istra','Istra · Olivenöl & Trüffel','Istrisches Olivenöl, Fuži, Trüffelsalz','Istrisches Olivenöl, Fuži, Trüffelcreme mit echtem Trüffel, getrocknete Steinpilze, Kräutersalz',39.90,69.90,1,'NAV-ADRIA'],
 ['dalmacija','Dalmacija · Sonne & Meer','Olivenöl, Kapern, dalmatinische Kräuter','Dalmatinisches Olivenöl, Inćuni (raumtemperaturstabile Konserve), Kapern, Feigen, Kräuter',34.90,59.90,2,'NAV-ADRIA'],
 ['medimurje','Međimurje · Gold des Nordens','Kürbiskernöl, geröstete Kürbiskerne, Fruchtaufstrich','Kürbiskernöl, Kürbiskerne, Honig, regionaltypischer Fruchtaufstrich, haltbares Gebäck',29.90,49.90,3,'NAV-BALKAN'],
 ['pag','Pag · Salz & Salbei','Paška sol, Salbeihonig, Kräuter','Paška sol, Salbeihonig, Kräuter, Paški sir (nur nach Versandfreigabe), weitere Insel-Spezialität',34.90,59.90,4,'NAV-ADRIA'],
 ['kvarner','Kvarner · Inseln & Berge','Kastanienhonig, Feigenkonfekt, Kräuter','Kastanienhonig, Feigenkonfekt, Olivenöl, regionale Kräuter, Fruchtaufstrich',29.90,49.90,5,'NAV-ADRIA'],
 ['bosna','Bosna · Pflaumen & Vorratsküche','Bosnischer Apfelpekmez, getrocknete Pflaumen, Bergkräuter','Apfelpekmez, Pflaumenbestilj, getrocknete Pflaumen, Bergkräuter, traditionelles haltbares Gebäck',29.90,49.90,6,'NAV-BALKAN'],
 ['hercegovina','Hercegovina · Feigen & Granatapfel','Getrocknete Feigen, Granatapfelzubereitung, Kräuter','Herzegowinische Trockenfeigen, Granatapfelzubereitung, Feigenkonfitüre, Honig, mediterrane Kräuter',34.90,54.90,7,'NAV-ADRIA'],
 ['montenegro','Crna Gora · Küste & Berge','Olivenöl aus der Region Bar, Oliven, getrocknete Feigen','Olivenöl aus der Region Bar, Tafeloliven, getrocknete Feigen, Honig, Bergkräuter',34.90,59.90,8,'NAV-ADRIA'],
 ['vojvodina','Vojvodina · Paprika & Obstgarten','Paprikagewürz, traditionelle Trockennudeln, Pflaumenaufstrich','Paprikagewürz, traditionelle Trockennudeln, Pflaumenaufstrich, eingelegtes Gemüse, Sauerkirschkonfitüre',29.90,49.90,9,'NAV-BALKAN'],
 ['kosovo','Kosovo · Paprika & Bergkräuter','Ajvar, eingelegte Paprika, Bergkräuter','Ajvar, eingelegte Paprika, Gewürzpaprika, Bergkräuter, Beerenkonfitüre',29.90,49.90,10,'NAV-BALKAN']
];
for(const [slug,title,small,large,smallPrice,largePrice,picture,room] of regionalBoxes){
 const id='regionalbox-'+slug;
 if(root.catalog.some(p=>p[0]===id))continue;
 root.catalog.push([id,'Genussbox '+title,'Geschenke','Entdeckerbox / Genussbox',smallPrice,(picture>8?'demo-'+id:'giftroom-'+picture),'Regionale Geschenkidee','Entdeckerbox: '+small+'. Genussbox: '+large+'. Unverbindliche Zusammenstellung; Bestandteile, Herkunft und ungekühlte Versandfähigkeit sind noch nicht geprüft.']);
 sizes.defaults[id]='entdecker';
 sizes.products[id]=[
  {id:'entdecker',pack:'Entdeckerbox · 3 Produkte',amount:null,unit:null,priceCents:Math.round(smallPrice*100),label:'Entdeckerbox · '+small},
  {id:'genuss',pack:'Genussbox · 5 Produkte',amount:null,unit:null,priceCents:Math.round(largePrice*100),label:'Genussbox · '+large}
 ];
 root.connections[id]={
  regions:[],text:'Regionale Geschenkidee. Keine bestätigte Herkunft oder tatsächliche Zusammenstellung.',
  kind:'Kuratiertes Geschenkset',type:'modern',giftRooms:[room],relatedRegions:[],sources:[],
  boxItems:[small,large],
  shopDescription:'Entdeckerbox: '+small+'. Genussbox: '+large+'. Beispielkonzept; die konkrete Zusammensetzung wird vor einem Verkauf festgelegt.',
  commercialOrigin:{ingredients:null,processing:null,status:'Noch keine Lieferanten- und Herkunftsfreigabe'},
  preservation:{format:'Nur ungekühlt versandfähige Artikel',freshProduct:false,verifiedShelfLife:null,note:'Alle Bestandteile müssen vor Verkauf einzeln freigegeben werden.'},
  pricePresentation:{currency:'EUR',taxIncluded:true,basis:'Unverbindlicher Entwurfspreis'},
  review:{date:'2026-11-15',scope:'Gestaltungsentwurf',exclusiveOriginClaim:false,supplierOriginVerified:false},
  culinaryRange:{label:'Regionale Inspiration',summary:'Kulinarisch inspirierte Kollektion; keine verifizierte Lieferherkunft.',basis:'provisional',exclusive:false},
  launchSelection:{included:true,focus:['NAV-ADRIA','NAV-BALKAN'],reason:'Regionale Geschenkbox in zwei Größen',reviewed:'2026-11-15'}
 };
}
window.CULINARIA_REGIONAL_BOXES=Object.freeze(regionalBoxes.map(r=>'regionalbox-'+r[0]));
})();
