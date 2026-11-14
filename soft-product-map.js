(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  // Schematic culinary reference areas, not measured distribution boundaries.
  // Country-level references use geographic fields rather than state outlines.
  const fields = {
    PRT: [[-8,39,1.1,2.5]], ESP: [[-2,38.8,4.2,2.4],[2.7,39.6,1.3,.7]],
    FRA: [[4.8,43.6,3.2,1],[9,42.2,.65,1]],
    ITA: [[10,44,2.2,1.4],[12.6,41.8,2,1.8],[15.5,39.3,1.5,1.7],[14,37.5,1.8,.8],[9,40,.7,1.4]],
    SVN: [[13.8,45.6,.65,.5]], HRV: [[13.9,45.1,.7,.65],[15.5,44.3,1,.7],[17.1,43,1,.7]],
    BIH: [[17.6,43.4,1.1,.8]], MNE: [[19.1,42.4,.7,.6]], ALB: [[19.8,41,.7,1.3]],
    MKD: [[21.5,41.5,.9,.6]], GRC: [[22.4,39.1,1.8,1.8],[23.3,37.4,1.4,1.2],[25.3,38.1,1.2,1.6],[25,35.2,1.5,.4]],
    TUR: [[27.5,38.3,1.4,2],[30.7,36.8,2.4,.9],[35.7,36.7,1.1,.8]],
    CYP: [[33.2,35,1.3,.5]], MLT: [[14.4,35.9,.25,.2]],
    MAR: [[-5.4,34.5,2.8,1.6]], DZA: [[2.6,36,4.1,1.1]], TUN: [[9.8,35.6,1.2,1.9]],
    LBY: [[13.2,32.2,2.3,.7],[20.6,32.2,2.1,.7]], EGY: [[29,31,3.2,.7],[33.1,31,.8,.5]],
    LBN: [[35.8,33.9,.5,1]], SYR: [[36.1,35.4,.7,1],[37.1,36.2,.65,.6]],
    ISR: [[35,32.4,.5,1.2]], PSE: [[35.1,31.8,.4,.6],[34.4,31.4,.25,.25]], JOR: [[35.9,31.9,.7,1.1]]
  };
  const make = (name, attrs = {}) => {
    const node = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key,value]) => node.setAttribute(key,String(value)));
    return node;
  };
  const xy = (lon,lat) => [(lon+12)/58*1000,(49-lat)/24*560];
  window.createSoftProductMap = (svg,data) => {
    const filter = make('filter',{id:'product-range-soft',filterUnits:'userSpaceOnUse',x:-100,y:-100,width:1200,height:760,'color-interpolation-filters':'sRGB'});
    const blur = make('feGaussianBlur',{stdDeviation:5});
    filter.append(blur); svg.querySelector('defs').append(filter);
    const layer = make('g',{'class':'product-distribution','clip-path':'url(#influence-land-clip)','pointer-events':'none','aria-hidden':'true'});
    const variants = make('g',{'class':'product-range-variants',filter:'url(#product-range-soft)'});
    const primary = make('g',{'class':'product-range-primary',filter:'url(#product-range-soft)'});
    layer.append(variants,primary);
    svg.querySelector('.culinary-influence').before(layer);
    const add = (id,target) => {
      const group = make('g',{'data-reference':id});
      const region = data.regions.find(r => r.id===id);
      const shape = svg.querySelector('[data-region="'+id+'"]');
      if (!region || !shape) return;
      if (fields[id]) {
        fields[id].forEach(([lon,lat,rx,ry]) => {
          const [cx,cy] = xy(lon,lat);
          group.append(make('ellipse',{cx,cy,rx:rx/58*1000,ry:ry/24*560}));
        });
      } else if (shape.tagName.toLowerCase()==='path') {
        group.append(make('path',{d:shape.getAttribute('d')}));
      } else {
        // A documented place is a local soft reference, not an entire province.
        group.append(make('ellipse',{cx:shape.getAttribute('cx'),cy:shape.getAttribute('cy'),rx:5,ry:4}));
      }
      target.append(group);
    };
    return {
      render(connection) {
        primary.replaceChildren(); variants.replaceChildren();
        if (!connection) return;
        const ids = connection.mapRegions||connection.regions;
        ids.forEach(id=>add(id,primary));
        connection.relatedRegions.filter(r=>!ids.includes(r.id)).forEach(r=>add(r.id,variants));
      },
      bounds(id) { return layer.querySelector('[data-reference="'+id+'"]')?.getBBox(); },
      soften() {
        const width = svg.viewBox.baseVal.width;
        blur.setAttribute('stdDeviation',String(Math.max(.6,width*.012)));
      }
    };
  };
})();
