(() => {
  'use strict';
  if (document.body.dataset.navigation !== 'map') return;
  const data = window.MEDITERRANEAN;
  const areas = [
    {id:'NAV-WEST',name:'Westliches Mittelmeer',label:'Westliches Mittelmeer',anchor:[-1,41],countries:['PRT','ESP','FRA'],members:['PRT','ESP','FR-PRO','FR-ROU','FR-RIV','ES-IB']},
    {id:'NAV-CENTRAL',name:'Zentrale Küsten und Inseln',label:'Zentrales Mittelmeer',anchor:[11.5,39.6],countries:['ITA','MLT'],members:['ITA','IT-LIG','IT-TOS','IT-SAR','IT-SIC','FR-COR','MLT']},
    {id:'NAV-ADRIA',name:'Adria und Balkan',label:'Adria & Balkan',anchor:[17,44.8],countries:['SVN','HRV','BIH','MNE','ALB','MKD'],members:['SVN','HRV','BIH','MNE','ALB','MKD']},
    {id:'NAV-AEGEAN',name:'Ägäis',label:'Ägäis',anchor:[26,38],countries:['GRC','TUR'],members:['GRC','TUR']},
    {id:'NAV-EAST',name:'Levante und östliches Mittelmeer',label:'Levante',anchor:[34.8,34],countries:['CYP','LBN','SYR','ISR','PSE','JOR'],members:['CYP','LBN','SYR','ISR','PSE','JOR','TR-GAZ']},
    {id:'NAV-NORTH',name:'Nordafrikanischer Mittelmeerraum',label:'Nordafrika',anchor:[5.5,32],countries:['MAR','DZA','TUN','LBY','EGY'],members:['MAR','DZA','TUN','LBY','EGY']}
  ];
  areas.filter(a=>a.members).forEach(a=>data.crossBorderAreas.push({...a,subtitle:'Kulinarischer Entdeckungsraum · Probeansicht',text:'Diese Ansicht sammelt die erfassten kulinarischen Bezüge ihrer Landschaften. Ein Produkt ist dadurch nicht automatisch überall im Raum üblich. Die Produktansicht zeigt die jeweils dokumentierten Gebiete und Rezepturbezüge.',sources:[{title:'Geografische Orientierung · Mittelmeerraum',url:'https://de.wikipedia.org/wiki/Mittelmeerraum'}]}));
  const countryPoints={PRT:[-8,39],ESP:[-3,39],FRA:[4.5,44],ITA:[12.2,42],MLT:[14.4,35.9],SVN:[14,45.7],HRV:[16,44.3],BIH:[18,43.6],MNE:[19.2,42.5],ALB:[20,41],MKD:[21.6,41.6],GRC:[23,38],TUR:[29,38],CYP:[33.2,35],LBN:[35.8,34],SYR:[36.3,35.4],ISR:[35,32.5],PSE:[35.2,31.6],JOR:[35.9,32],MAR:[-5,34.5],DZA:[3,36],TUN:[10,35.5],LBY:[17,32],EGY:[30.5,31]};
  window.createMapNavigation = api => {
    const {svg,panel,showRegion,showProduct,reset,countryRegions,publicId,restore,productTile} = api;
    const wrap=svg.closest('.map-wrap'),labels=document.getElementById('map-hotspots'),lines=document.getElementById('map-label-lines');
    const location=document.getElementById('map-location'),back=document.getElementById('map-back'),results=document.getElementById('map-results');
    let state={currentRegion:'',currentProduct:'',countryContext:''},history=[],restoring=false;
    const region=id=>data.regions.find(r=>r.id===id)||data.crossBorderAreas.find(r=>r.id===id);
    const key=s=>[s.currentRegion,s.currentProduct,s.countryContext].join('|');
    const xy=(lon,lat)=>[(lon+12)/58*1000,(49-lat)/24*560];
    function point(id){
      const area=areas.find(a=>a.id===id);if(area)return xy(...area.anchor);
      if(countryPoints[id])return xy(...countryPoints[id]);
      const r=region(id);if(!r)return null;
      if(r.members){const members=r.members.filter(m=>!state.countryContext||region(m)?.parent===state.countryContext);const points=(members.length?members:r.members).map(point).filter(Boolean);return points.length?[points.reduce((s,p)=>s+p[0],0)/points.length,points.reduce((s,p)=>s+p[1],0)/points.length]:null}
      if(Number.isFinite(r.lon))return xy(r.lon,r.lat);
      const n=svg.querySelector('[data-region="'+id+'"]');if(!n)return null;const b=n.getBBox();return [b.x+b.width/2,b.y+b.height/2];
    }
    function areaFor(id){
      if(areas.some(a=>a.id===id))return id;
      const r=region(id);if(!r)return null;
      if(id==='FR-COR')return 'NAV-CENTRAL';
      if(['HR-IST','SI-IST','IT-IST','XB-ISTRIA','XB-NERETVA'].includes(id))return 'NAV-ADRIA';
      if(id==='TR-GAZ'||id==='SY-ALE')return 'NAV-EAST';
      if(r.members)return r.members.map(areaFor).find(Boolean)||null;
      return areas.find(a=>a.countries.includes(r.parent||id))?.id||null;
    }
    function ids(){
      if(state.currentProduct){const c=data.connections[state.currentProduct];return [...new Set([...(c.mapRegions||c.regions),...c.relatedRegions.map(r=>r.id)].map(areaFor).filter(Boolean))]}
      return areas.map(a=>a.id).filter(id=>id!==state.currentRegion);
    }
    function layout(){
      labels.replaceChildren();lines.replaceChildren();
      const matrix=svg.getScreenCTM();if(!matrix)return;
      const rect=wrap.getBoundingClientRect(),placed=[];
      const offsets=[[0,0],[0,-48],[0,48],[-92,0],[92,0],[-62,-44],[62,44],[62,-44],[-62,44],[0,-96],[0,96],[-120,48],[120,-48]];
      ids().forEach(id=>{
        const p=point(id),r=region(id)||areas.find(a=>a.id===id);if(!p||!r)return;
        const projected=new DOMPoint(...p).matrixTransform(matrix),ax=projected.x-rect.left,ay=projected.y-rect.top;
        if(ax<0||ay<0||ax>rect.width||ay>rect.height)return;
        const button=document.createElement('button');button.type='button';button.className='map-hotspot';button.dataset.mapTarget=id;button.textContent=areas.find(a=>a.id===id)?.label||r.name;button.setAttribute('aria-label',r.name+' entdecken');button.onclick=()=>{showRegion(id);location.setAttribute('tabindex','-1');location.focus({preventScroll:true})};labels.append(button);
        const w=Math.min(108,button.offsetWidth),h=button.offsetHeight;let chosen;
        for(const [dx,dy] of offsets){const x=Math.max(w/2+5,Math.min(rect.width-w/2-5,ax+dx)),y=Math.max(h/2+5,Math.min(rect.height-h/2-5,ay+dy));const box={x:x-w/2,y:y-h/2,w,h};if(!placed.some(q=>box.x<q.x+q.w+5&&box.x+box.w+5>q.x&&box.y<q.y+q.h+5&&box.y+box.h+5>q.y)){chosen={x,y,box};break}}
        if(!chosen){button.remove();return}
        placed.push(chosen.box);button.style.left=chosen.x+'px';button.style.top=chosen.y+'px';
        if(Math.hypot(chosen.x-ax,chosen.y-ay)>14){const line=document.createElementNS('http://www.w3.org/2000/svg','line');[['x1',ax],['y1',ay],['x2',chosen.x],['y2',chosen.y]].forEach(([k,v])=>line.setAttribute(k,v));lines.append(line)}
      });
      lines.setAttribute('viewBox','0 0 '+rect.width+' '+rect.height);
    }
    function chooser(){
      panel.replaceChildren();const title=document.createElement('h2');title.textContent='Mit einer Spezialität beginnen';const note=document.createElement('p');note.textContent='Wähle ein Produkt und entdecke seine kulinarischen Bezüge auf der Karte.';
      const input=document.createElement('input');input.type='search';input.placeholder='Spezialität suchen …';input.setAttribute('aria-label','Produkte durchsuchen');input.className='map-product-search';
      const list=document.createElement('div');list.className='region-products map-product-list';
      const render=()=>{const query=input.value.toLocaleLowerCase('de');const matches=data.catalog.filter(p=>(p[1]+' '+p[2]).toLocaleLowerCase('de').includes(query));list.replaceChildren(...matches.map(p=>productTile(p)));if(!matches.length){const empty=document.createElement('p');empty.textContent='Keine passende Spezialität gefunden.';list.append(empty)}};
      input.oninput=render;panel.append(title,note,input,list);render();
    }
    function home(){history=[];restoring=true;reset()}
    async function openPanel(){
      if(document.fullscreenElement)await document.exitFullscreen();
      stage.classList.remove('map-expanded');expand.textContent='Große Karte';
      panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    }
    document.getElementById('map-products').onclick=()=>{chooser();openPanel()};
    results.onclick=openPanel;
    back.onclick=()=>{const previous=history.pop();if(!previous)return;restoring=true;restore(previous)};
    function changeZoom(factor){const b=svg.viewBox.baseVal;const width=Math.min(1000,Math.max(65,b.width*factor)),height=width*560/1000;const x=Math.max(0,Math.min(1000-width,b.x+(b.width-width)/2)),y=Math.max(0,Math.min(560-height,b.y+(b.height-height)/2));svg.setAttribute('viewBox',[x,y,width,height].join(' '));api.soften()}
    document.getElementById('map-zoom-in').onclick=()=>changeZoom(.72);document.getElementById('map-zoom-out').onclick=()=>changeZoom(1/.72);
    const stage=document.getElementById('map-stage'),expand=document.getElementById('map-expand');
    expand.onclick=async()=>{if(document.fullscreenElement){await document.exitFullscreen();return}if(stage.requestFullscreen){try{await stage.requestFullscreen();return}catch{}}stage.classList.toggle('map-expanded');expand.textContent=stage.classList.contains('map-expanded')?'Verkleinern':'Große Karte';layout()};
    document.addEventListener('fullscreenchange',()=>{expand.textContent=document.fullscreenElement?'Verkleinern':'Große Karte';layout()});
    let drag=null,suppressClick=false;
    wrap.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,box:{x:svg.viewBox.baseVal.x,y:svg.viewBox.baseVal.y,width:svg.viewBox.baseVal.width,height:svg.viewBox.baseVal.height},moved:false}});
    wrap.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<5&&!drag.moved)return;drag.moved=true;wrap.setPointerCapture(e.pointerId);const rect=svg.getBoundingClientRect(),x=Math.max(0,Math.min(1000-drag.box.width,drag.box.x-dx/rect.width*drag.box.width)),y=Math.max(0,Math.min(560-drag.box.height,drag.box.y-dy/rect.height*drag.box.height));svg.setAttribute('viewBox',[x,y,drag.box.width,drag.box.height].join(' '));e.preventDefault()});
    wrap.addEventListener('pointerup',()=>{if(drag?.moved){suppressClick=true;setTimeout(()=>suppressClick=false,0)}drag=null});wrap.addEventListener('pointercancel',()=>drag=null);
    wrap.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation()}},true);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&stage.classList.contains('map-expanded')){stage.classList.remove('map-expanded');expand.textContent='Große Karte';layout()}});
    new ResizeObserver(layout).observe(wrap);new MutationObserver(layout).observe(svg,{attributes:true,attributeFilter:['viewBox']});
    return {
      home,chooser,
      appendIdeas(target,id){
        if(!['NAV-NORTH','NAV-EAST'].includes(id))return;
        const card=document.createElement('aside');card.className='raw-idea';
        const title=document.createElement('h3');title.textContent='Datteln · Sortimentsidee';
        const text=document.createElement('p');text.textContent='Als haltbare Ergänzung prüfen wir getrocknete oder halbtrockene Datteln, Dattelpaste und Dattelsirup. Dattelanbau verbindet Nordafrika mit dem Nahen Osten, etwa dem Jordantal. Viele Anbauräume liegen im Oasen- und Hinterland.';
        const note=document.createElement('small');note.textContent='Noch kein verfügbares Shopprodukt. Herkunft, Verarbeitung und Haltbarkeit werden erst anhand eines konkreten Lieferprodukts festgelegt.';
        const source=document.createElement('a');source.href='./docs/datteln-sortimentsidee.md';source.textContent='Recherche und Quellen →';
        card.append(title,text,note,document.createElement('br'),source);target.append(card);
      },
      regionFor:id=>areaFor(id)||id,
      handleRegionClick(id){const area=areaFor(id);if(area)showRegion(area)},
      update(next){if(key(state)!==key(next)){if(!restoring)history.push({...state});state={...next}}restoring=false;back.disabled=!history.length;const r=region(state.currentRegion),product=data.catalog.find(p=>p[0]===state.currentProduct);location.textContent=product?'Mittelmeer › '+product[1]:r?'Mittelmeer › '+r.name:'Das Mittelmeer entdecken';const count=panel.querySelectorAll('.region-product').length;results.hidden=!state.currentRegion;results.textContent=count?count+' Produktbezüge ansehen ↓':'Region entdecken ↓';layout()}
    };
  };
})();
