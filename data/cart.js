export let cart = JSON.parse(localStorage.getItem('cart'))||[{
  productId:
  "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId:'1'
},{
  productId:
  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryOptionId:'2'
}];




export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){

  const element = document.querySelector(`.js-added-to-cart${productId}`);

  // Clear any previous timeout, if it exists
  clearTimeout(element.addedTimeout);

  // Add the "Added" class
  element.classList.add('Added');

  // Set a new timeout to remove the "Added" class after 2 seconds
  element.addedTimeout = setTimeout(() => {
    element.classList.remove('Added');
  }, 2000);

  let quantitySelector = Number(document.querySelector(`.js-quantity-selector${productId}`).value);
  console.log(typeof(quantitySelector));
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity+=quantitySelector;
  }else{
    
    cart.push({
      productId,
      quantity:quantitySelector,
      deliveryOptionId:'1'
    })
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

export function updateQuantity(productId,newQuantity){
    let matchingItem;
    cart.forEach(cartItem=>{
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    })
    matchingItem.quantity=newQuantity;
    saveToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }

  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

