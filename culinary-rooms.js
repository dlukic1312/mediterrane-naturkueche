(() => {
  'use strict';
  const room = (id,name,label,anchor,polygons) => ({id,name,label,anchor,selectionFields:[{tone:'coast',polygons}]});
  const adriaticItaly=[[11.6,45.8],[12.3,46],[13.9,46],[14.2,45.1],[14.7,43.4],[16.2,42.1],[18.7,40.3],[18.6,39.7],[18.1,40],[17.3,40.8],[16,41.2],[14.8,41.7],[13.5,42.5],[12.8,43.5],[11.8,44.1],[11.4,44.8]];
  const adriaticEast=[[13.3,45.9],[14.9,46],[16.3,44.9],[17.5,43.9],[18.6,43.1],[19.8,42.6],[20.4,41.2],[20.5,40.2],[19.5,40],[18.5,41.3],[17.3,42.3],[15.3,43.3],[14,44.3],[13.1,45]];
  const balkanInland=[[13.6,45.8],[16.7,45.9],[19.2,45],[22.4,43.6],[22.6,41.1],[22,38.6],[20.3,38.6],[19.4,39.6],[18.5,41.3],[17.3,42.3],[15.3,43.3],[14,44.3],[13.6,45.1]];
  const areas=[
    room('NAV-IBERIA','Iberien und Balearen','Iberien & Balearen',[-3.5,39.5],[[[-10,36],[-10,42.5],[-4,43.2],[1.8,42.8],[4.6,40.6],[4.9,38.4],[.2,36],[-5,35.5]]]),
    room('NAV-LIGURIAN','Südfrankreich und Ligurien','Südfrankreich & Ligurien',[5.5,44.1],[[[1.4,42],[2,44.2],[6,45.6],[9.8,45.4],[10.2,43.7],[7.5,42.4],[4,42.4]]]),
    room('NAV-CENTRAL','Tyrrhenische Küsten und zentrale Inselwelt','Tyrrhenisches & zentrales Mittelmeer',[11.5,39.6],[[[9.5,44.4],[11.8,44.4],[13,43.3],[14.5,41.2],[16.5,40.3],[17.6,40.7],[18.2,40.1],[17.6,39.5],[17.5,38.9],[16.3,37.7],[14,36.2],[15,35],[11.5,35.1],[8,36.5],[7,40.5],[8.5,43]]]),
    room('NAV-ADRIA','Adria','Adria',[15.3,43.8],[adriaticItaly,adriaticEast]),
    {...room('NAV-BALKAN','Balkan','Balkan',[21,43.5],[balkanInland]),selectionFields:[{tone:'hinterland',polygons:[balkanInland]}]},
    room('NAV-AEGEAN','Ägäis','Ägäis',[26,38],[[[20.7,40.6],[23,41.6],[26.5,41.5],[29.5,40.5],[29,37],[27.8,35.3],[24,34.5],[21.5,36],[20.2,38.2]]]),
    room('NAV-EAST','Levante und östliches Mittelmeer','Levante',[34.8,34],[[[28.7,37.5],[31.5,38],[35,38.4],[38.4,38.1],[38.7,35],[37.6,31],[35,29.4],[33.4,30],[33.2,33.5],[30.3,35.1],[28.3,36.5]]]),
    room('NAV-NORTH','Nordafrikanischer Mittelmeerraum','Nordafrika',[5.5,32],[[[-10,32],[-8.5,35.9],[-5.5,36],[-2,35.5],[0,36.8],[5,37.4],[9,37.8],[11,37.2],[11.5,34.2],[15.5,33],[21.5,33],[26,32],[34,31.9],[34,29.4],[29,29.5],[24,30],[20,30.5],[15,30.2],[10,31.5],[5,33],[0,33],[-5,31.5]]])
  ];
  const palette={'NAV-IBERIA':'#99a273','NAV-LIGURIAN':'#b79a87','NAV-CENTRAL':'#b8a56f','NAV-ADRIA':'#c59c72','NAV-BALKAN':'#8298a4','NAV-AEGEAN':'#80a79b','NAV-EAST':'#af93a3','NAV-NORTH':'#bfac87'};
  areas.forEach(area=>{area.color=palette[area.id];area.selectionFields.forEach(part=>part.color=area.color)});
  const W='NAV-IBERIA',L='NAV-LIGURIAN',C='NAV-CENTRAL',A='NAV-ADRIA',B='NAV-BALKAN',G='NAV-AEGEAN',E='NAV-EAST',N='NAV-NORTH';
  // A coarse country reference may touch several rooms; it never owns its subregions.
  const countries={PRT:[W],ESP:[W],FRA:[L,C],ITA:[L,C,A],SVN:[A,B],HRV:[A,B],BIH:[A,B],MNE:[A,B],ALB:[A,B],MKD:[B],GRC:[B,G],TUR:[G,E],CYP:[E],MLT:[C],MAR:[N],DZA:[N],TUN:[N],LBY:[N],EGY:[N],LBN:[E],SYR:[E],ISR:[E],PSE:[E],JOR:[E]};
  const precise={'HR-IST':[A],'SI-IST':[A],'IT-IST':[A],'XB-ISTRIA':[A],'XB-NERETVA':[A,B],'HR-NER':[A,B],'BIH-NER':[A,B],'HR-DAL':[A,B],'BIH-HER':[A,B],'BIH-BOS':[B],'HR-NIN':[A],'HR-STON':[A],'SI-PIR':[A],'FR-COR':[C],'FR-PRO':[L],'FR-ROU':[L],'FR-RIV':[L],'IT-LIG':[L],'IT-PIE':[L],'IT-TOS':[C],'IT-UMB':[C],'IT-SAR':[C],'IT-SIC':[C],'GR-CRE':[G],'GR-AEG':[G],'TR-AEG':[G],'TR-GAZ':[E],'SY-ALE':[E],'XB-AEGEAN':[G],'XB-CATALAN':[W,L],'XB-RIVIERA':[L],'XB-GUADIANA':[W],'XB-LEVANT':[E],'XB-MAGHREB':[N]};
  const data=window.MEDITERRANEAN;
  const find=id=>data.regions.find(r=>r.id===id)||data.crossBorderAreas.find(r=>r.id===id);
  function inside(point,polygon){let yes=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const [x,y]=point,[xi,yi]=polygon[i],[xj,yj]=polygon[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)yes=!yes}return yes}
  function roomsFor(id){
    if(areas.some(a=>a.id===id))return[id];
    if(precise[id])return precise[id];
    if(countries[id])return countries[id];
    const r=find(id);if(!r)return[];
    if(r.members)return [...new Set(r.members.flatMap(roomsFor))];
    return countries[r.parent]||[];
  }
  function effective(ids){const parents=new Set(ids.map(id=>find(id)?.parent).filter(Boolean));return [...new Set(ids)].filter(id=>!(countries[id]?.length>1&&parents.has(id)))}
  function references(ids,roomId){return effective(ids).filter(id=>roomsFor(id).includes(roomId))}
  function hit(lon,lat){
    // Coastal geography, not a clicked country's identity, determines the room.
    return [N,A,E,G,B,W,L,C].find(id=>areas.find(a=>a.id===id).selectionFields.some(part=>part.polygons.some(poly=>inside([lon,lat],poly))))||null;
  }
  window.MEDITERRANEAN_ROOMS={areas,hitOrder:[N,A,E,G,B,W,L,C],roomsFor,references,effective,hit,isRoom:id=>areas.some(a=>a.id===id),isCoarse:id=>(countries[id]?.length||0)>1,find};
})();
