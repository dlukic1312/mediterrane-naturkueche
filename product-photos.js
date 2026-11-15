(() => {
  'use strict';
  window.pantryPhotoStyle = product => {
    if(product[0]==='rosemary')return 'background-image:url(./assets/rosemary.jpg);background-size:cover;background-position:center';
    const key=product[5];if(key.startsWith('balkanfruit-')){const i=Number(key.split('-')[1]);return 'background-image:url(./assets/balkan-fruit.jpg);background-size:200% 200%;background-position:'+(i%2*100)+'% '+(Math.floor(i/2)*100)+'%';}if(key.startsWith('mandarin-')){const i=Number(key.split('-')[1]);return 'background-image:url(./assets/mandarin-pantry.jpg);background-size:200% 200%;background-position:'+(i%2*100)+'% '+(Math.floor(i/2)*100)+'%';}if(key.startsWith('seedoil-')){const i=Number(key.split('-')[1]);return 'background-image:url(./assets/seed-oils.jpg);background-size:200% 200%;background-position:'+(i%2*100)+'% '+(Math.floor(i/2)*100)+'%';}if(key==='table-olives')return 'background-image:url(./assets/table-olives.jpg);background-size:cover;background-position:center';
    if(key.startsWith('syrup-')){const i=Number(key.split('-')[1]);return 'background-image:url(./assets/syrups.jpg);background-size:400% 400%;background-position:'+(i%4*100/3)+'% '+(Math.floor(i/4)*100/3)+'%';}
    if(key.startsWith('pantry-')){
      const match=key.match(/^pantry-([ab])(\d+)$/);
      if(!match)return null;
      const i=Number(match[2]);
      return 'background-image:url(./assets/pantry-'+match[1]+'.jpg);background-size:400% 400%;background-position:'+(i%4*100/3)+'% '+(Math.floor(i/4)*100/3)+'%';
    }
    if(key.startsWith('giftroom-')){
      const i=Number(key.split('-')[1]);
      const slugs=['slavonija','istra','dalmacija','medimurje','pag','kvarner','bosna','hercegovina','montenegro','vojvodina','kosovo'];
      if(!Number.isInteger(i)||i<0||i>=slugs.length)return null;
      /* First image: individual, illustrative artwork. Second image: existing fallback
         until the WebP asset has been uploaded to the repository. */
      const image="url('./assets/regional-boxes/box-"+slugs[i]+".webp?v=editorial-hq-8')";
      const fallback=i===9?"url('./assets/spice-blends.jpg')":i===10?"url('./assets/shared-specialties.jpg')":"url('./assets/regional-gifts.jpg')";
      const fallbackSize=i>=9?(i===9?'300% 300%':'200% 200%'):'300% 300%';
      const fallbackPosition=i===9?'0% 0%':i===10?'100% 0%':(i%3*50)+'% '+(Math.floor(i/3)*50)+'%';
      return 'background-image:'+image+','+fallback+';background-size:cover,'+fallbackSize+';background-position:center,'+fallbackPosition+';background-repeat:no-repeat';
    }
    return null;
  };
})();
