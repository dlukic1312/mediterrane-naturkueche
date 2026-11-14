(() => {
  'use strict';
  window.pantryPhotoStyle = product => {
    const key=product[5];
    if(key.startsWith('pantry-')){
      const match=key.match(/^pantry-([ab])(\d+)$/);
      if(!match)return null;
      const i=Number(match[2]);
      return 'background-image:url(./assets/pantry-'+match[1]+'.jpg);background-size:400% 400%;background-position:'+(i%4*100/3)+'% '+(Math.floor(i/4)*100/3)+'%';
    }
    if(key.startsWith('giftroom-')){
      const i=Number(key.split('-')[1]);
      return 'background-image:url(./assets/regional-gifts.jpg);background-size:300% 300%;background-position:'+(i%3*50)+'% '+(Math.floor(i/3)*50)+'%';
    }
    return null;
  };
})();
