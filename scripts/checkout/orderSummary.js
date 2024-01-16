import {calculateCartQuantity, cart,removeFromCart,updateDeliveryOption, updateQuantity} from '../../data/cart.js'; 
import { products,getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js'; 

export function renderOrderSummary(){
  renderCheckoutHeader();

  let cartSummaryHTML=``;


  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);


    cartSummaryHTML+=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link  link-primary"
          data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}" >
          Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>
    `;
  })

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  function isWeekend(date){
   return date === 'Saturday' || date === 'Sunday';
  }

  function calculateDeliveryDate(option){
    const today = dayjs();

    let cnt = 0;
    let threshold = option.deliveryDays;
    for(let i = 1; i <= threshold ;i++){
      let tmpDate = today.add(i,'days');
      tmpDate = tmpDate.format('dddd');
      isWeekend(tmpDate) && threshold++;
      cnt++;
    }
    let deliveryDate = today.add(cnt,'days');
    return deliveryDate.format('dddd, MMMM D');
  }

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html = '';
    deliveryOptions.forEach(option=>{
      const dateString = calculateDeliveryDate(option);
      const priceString = option.priceCents == 0? 'FREE': formatCurrency(option.priceCents);

      let isChecked = option.id === cartItem.deliveryOptionId;

      html += 
      `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${option.id}">
            <input type="radio" ${isChecked ? 'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `;
    })
    return html;
    
  }




  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      
      removeFromCart(productId);

      renderOrderSummary();
      renderPaymentSummary();
    })
    
  })



  document.querySelectorAll('.update-quantity-link').forEach(link=>{
    const {productId} = link.dataset;
    link.addEventListener('click',()=>{

      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    })
  })

  document.querySelectorAll('.save-quantity-link').forEach(link=>{
    link.addEventListener('click',()=>{
      const {productId} = link.dataset;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
      const newQuantity = Number(quantityInput);
      updateQuantity(productId,newQuantity);
      
      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      renderPaymentSummary();
      renderOrderSummary();
    });
  });



  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
