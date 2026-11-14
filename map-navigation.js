(() => {
  'use strict';
  if (document.body.dataset.navigation !== 'map') return;
  const data = window.MEDITERRANEAN;
  const geography=window.MEDITERRANEAN_ROOMS,areas=geography.areas;
  areas.forEach(a=>data.crossBorderAreas.push({...a,members:data.regions.filter(r=>r.parent?geography.roomsFor(r.id).includes(a.id):geography.roomsFor(r.id).length===1&&geography.roomsFor(r.id).includes(a.id)).map(r=>r.id),countries:data.regions.filter(r=>!r.parent&&geography.roomsFor(r.id).includes(a.id)).map(r=>r.id),subtitle:'Kulinarischer Entdeckungsraum',text:'Diese Ansicht verbindet geografische Landschaften über Staatsgrenzen hinweg. Präzise regionale Bezüge haben Vorrang vor groben Länderangaben. Ein Produkt ist nicht automatisch überall im Raum üblich.',sources:[{title:'Geografische Orientierung · Mittelmeerraum',url:'https://de.wikipedia.org/wiki/Mittelmeerraum'}]}));
  window.createMapNavigation = api => {
    const {svg,panel,showRegion,showProduct,reset,countryRegions,publicId,restore,productTile} = api;
    const wrap=svg.closest('.map-wrap'),labels=document.getElementById('map-hotspots'),lines=document.getElementById('map-label-lines');
    const location=document.getElementById('map-location'),back=document.getElementById('map-back'),results=document.getElementById('map-results');
    let state={currentRegion:'',currentProduct:'',countryContext:''},history=[],restoring=false;
    const region=id=>data.regions.find(r=>r.id===id)||data.crossBorderAreas.find(r=>r.id===id);
    const key=s=>[s.currentRegion,s.currentProduct,s.countryContext].join('|');
    const xy=(lon,lat)=>[(lon+12)/58*1000,(49-lat)/24*560];
    function areaFor(id){if(id==='NAV-WEST')return 'NAV-IBERIA';const matches=geography.roomsFor(id);return matches.length===1?matches[0]:null}
    const ns='http://www.w3.org/2000/svg',make=(name,attrs={})=>{const n=document.createElementNS(ns,name);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));return n};
    const defs=svg.querySelector('defs'),influence=svg.querySelector('.influence-field');
    const mask=make('mask',{id:'room-navigation-mask',maskUnits:'userSpaceOnUse',x:0,y:0,width:1000,height:560});mask.append(make('path',{d:influence.getAttribute('d'),style:'fill:white;stroke:none',filter:'url(#influence-soft)'}));defs.append(mask);
    const footprint=make('clipPath',{id:'room-navigation-footprint'});footprint.append(make('path',{d:influence.getAttribute('d')}));defs.append(footprint);
    const filter=make('filter',{id:'room-navigation-soft',filterUnits:'userSpaceOnUse',x:-100,y:-100,width:1200,height:760,'color-interpolation-filters':'sRGB'}),guideBlur=make('feGaussianBlur',{stdDeviation:6});filter.append(guideBlur);defs.append(filter);
    const paint=make('g',{'class':'room-color-guides','clip-path':'url(#influence-land-clip)',mask:'url(#room-navigation-mask)','pointer-events':'none','aria-hidden':'true'});
    const hits=make('g',{'class':'room-hit-surfaces','clip-path':'url(#room-navigation-footprint)'});
    const hint=document.createElement('p');hint.id='map-room-hint';hint.className='map-help';hint.setAttribute('aria-live','polite');hint.textContent='Eine Farbfläche anklicken oder antippen, um den Raum zu entdecken.';wrap.before(hint);
    areas.forEach(area=>{const group=make('g',{'data-room-paint':area.id,'class':'room-color-guide',filter:'url(#room-navigation-soft)'});area.selectionFields.forEach(part=>part.polygons.forEach(polygon=>group.append(make('path',{d:'M'+polygon.map(p=>xy(...p).join(',')).join(' L')+' Z',style:'fill:'+area.color+';stroke:none'}))));paint.append(group)});
    [...geography.hitOrder].reverse().forEach(id=>{const area=areas.find(a=>a.id===id),group=make('g',{'data-map-room':id,role:'button',tabindex:0,'aria-label':area.name+' entdecken','aria-pressed':'false'});area.selectionFields.forEach(part=>part.polygons.forEach(polygon=>group.append(make('path',{d:'M'+polygon.map(p=>xy(...p).join(',')).join(' L')+' Z'}))));
      const preview=on=>{paint.querySelector('[data-room-paint="'+id+'"]').classList.toggle('preview',on);paint.classList.toggle('has-preview',!!paint.querySelector('.preview'));hint.textContent=on?'Auswahl: '+area.name:'Eine Farbfläche anklicken oder antippen, um den Raum zu entdecken.'};
      group.addEventListener('pointerenter',()=>preview(true));group.addEventListener('pointerleave',()=>preview(false));group.addEventListener('focus',()=>preview(true));group.addEventListener('blur',()=>preview(false));group.onclick=e=>{e.stopPropagation();showRegion(id)};group.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showRegion(id)}};hits.append(group)
    });
    svg.querySelector('.culinary-influence').after(paint);svg.append(hits);
    function layout(){labels.replaceChildren();lines.replaceChildren();guideBlur.setAttribute('stdDeviation',String(Math.max(.3,svg.viewBox.baseVal.width*.004)))}
    function chooser(){
      panel.replaceChildren();const title=document.createElement('h2');title.textContent='Mit einer Spezialität beginnen';const note=document.createElement('p');note.textContent='Wähle ein Produkt und entdecke seine kulinarischen Bezüge auf der Karte.';
      const input=document.createElement('input');input.type='search';input.placeholder='Spezialität suchen …';input.setAttribute('aria-label','Produkte durchsuchen');input.className='map-product-search';
      const list=document.createElement('div');list.className='region-products map-product-list';
      const render=()=>{const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(window.MEDITERRANEAN_I18N?.locale||'de-DE');const query=normalize(input.value);const matches=data.catalog.filter(p=>normalize(p[1]+' '+p[2]+' '+(window.MEDITERRANEAN_I18N?.text(p[1])||p[1])+' '+(window.MEDITERRANEAN_I18N?.text(p[2])||p[2])).includes(query));list.replaceChildren(...matches.map(p=>productTile(p)));if(!matches.length){const empty=document.createElement('p');empty.textContent='Keine passende Spezialität gefunden.';list.append(empty)}};
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
      appendIdeas(){},
      regionFor:id=>areaFor(id)||'',
      isRoom:geography.isRoom,
      references:geography.references,
      variants:(connection,id)=>{const refs=geography.references(connection.relatedRegions.map(r=>r.id),id);return connection.relatedRegions.filter(r=>refs.includes(r.id))},
      connectionNote(connection,id){if(connection.distributionRooms)return 'Kulinarischer Raum · '+(areas.find(a=>a.id===id)?.name||'');if(connection.giftRooms)return 'Kulinarische Zusammenstellung · '+connection.boxItems.length+' Spezialitäten';if(!geography.isRoom(id))return '';const ids=geography.references(connection.mapRegions||connection.regions,id);const names=ids.map(ref=>geography.find(ref)?.name||ref);if(!names.length)return '';return 'Hier erfasst: '+[...new Set(names)].join(' · ')+(ids.some(geography.isCoarse)?' · Grober Länderbezug; räumlich noch nicht vollständig präzisiert.':'')},
      frameRoom(id){const area=areas.find(a=>a.id===id);if(!area)return false;const points=area.selectionFields.flatMap(part=>part.polygons.flat()).map(([lon,lat])=>xy(lon,lat));const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);let w=(Math.max(...xs)-Math.min(...xs))*1.13,h=(Math.max(...ys)-Math.min(...ys))*1.13;if(w/h<1000/560)w=h*1000/560;else h=w*560/1000;w=Math.min(w,1000);h=Math.min(h,560);const x=Math.max(0,Math.min(1000-w,(Math.min(...xs)+Math.max(...xs)-w)/2)),y=Math.max(0,Math.min(560-h,(Math.min(...ys)+Math.max(...ys)-h)/2));svg.setAttribute('viewBox',[x,y,w,h].join(' '));api.soften();svg.dataset.mode='culinary-room';svg.dataset.focusIds=id;return true},
      legend(legend,r,connection){
        legend.classList.remove('room-overview-legend','room-selection-legend');legend.classList.add('room-overview-legend');if(!connection)legend.replaceChildren();
        const choices=document.createElement('div');choices.className='room-region-options';choices.setAttribute('role','group');choices.setAttribute('aria-label','Kulinarische Region auswählen');
        areas.forEach(area=>{const button=document.createElement('button');button.type='button';button.className='room-region-option';button.textContent=area.name;button.dataset.selectRoom=area.id;button.style.setProperty('--room-color',area.color);button.setAttribute('aria-pressed',String(!connection&&r?.id===area.id));button.onclick=()=>showRegion(area.id);choices.append(button)});legend.append(choices);
      },
      handleRegionClick(id,event){if(event&&(event.clientX||event.clientY)){const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse()),area=geography.hit(point.x/1000*58-12,49-point.y/560*24);if(area)showRegion(area);return}const area=areaFor(id);if(area)showRegion(area)},
      update(next){if(key(state)!==key(next)){if(!restoring)history.push({...state});state={...next}}restoring=false;hits.querySelectorAll('[data-map-room]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.mapRoom===state.currentRegion)));back.disabled=!history.length;const r=region(state.currentRegion),product=data.catalog.find(p=>p[0]===state.currentProduct);location.textContent=product?'Mittelmeer › '+product[1]:r?'Mittelmeer › '+r.name:'Das Mittelmeer entdecken';const count=panel.querySelectorAll('.region-product').length;results.hidden=!state.currentRegion;results.textContent=count?'Produktbezüge ansehen ↓ ('+count+')':'Region entdecken ↓';layout()}
    };
  };
})();
