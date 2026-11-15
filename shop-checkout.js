(() => {
  'use strict';
  const review=document.getElementById('order-review');
  window.openOrderReview=()=>{
    const chosen=cartItems();
    if(!chosen.length)return;
    const content=document.getElementById('order-content');
    content.replaceChildren();
    chosen.forEach(({product:p,variant:v,quantity})=>{const row=document.createElement('div');row.className='order-line';const name=document.createElement('span');name.textContent=quantity+' × '+p[1]+' · '+window.pantrySizes.pack(v);const amount=document.createElement('strong');amount.textContent=window.pantrySizes.money(quantity*v.priceCents);row.append(name,amount);content.append(row)});
    const t=orderTotals();
    [['Zwischensumme',t.subtotal],['Versand Deutschland',t.shipping],['Gesamt inkl. MwSt.',t.total]].forEach(([label,cents])=>{const row=document.createElement('div');row.className='order-line';const name=document.createElement('span');name.textContent=label;const amount=document.createElement('strong');amount.textContent=formatPrice(cents/100);row.append(name,amount);content.append(row)});
    showCart(false);review.showModal();
  };
  document.getElementById('order-close').onclick=()=>review.close();
  document.getElementById('order-back').onclick=()=>review.close();
})();
