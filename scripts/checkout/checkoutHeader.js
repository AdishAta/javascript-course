import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
  let html = `      
  <div class="header-content">
  <div class="checkout-header-left-section">
    <a href="amazon.html">
      <img class="amazon-logo" src="images/amazon-logo.png">
      <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
    </a>
  </div>

  <div class="checkout-header-middle-section">
    Checkout (<a class="return-to-home-link checkout-quantity"
      href="amazon.html">${calculateCartQuantity()}</a>)
      `

  document.querySelector('.checkout-header').innerHTML = html;
}