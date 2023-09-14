import { cartDraw } from '../../controller/CartController';
import './cartPage.css';

export default class CartPage {
  async draw(productItems?: cartDraw[], price?: number) {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
    <div class="container-cart">
      <div class="container_inner">
        
      </div>
    </div>
    `;
    bodyContainer.innerHTML = content;
    this.productDraw(productItems, price);
  }
  productDraw(productItems?: cartDraw[], price?: number) {
    const container = document.querySelector('.container_inner') as HTMLElement;
    if (productItems) {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="cart-products">
      <table class="product-lists">
        <thead>
            <td class="table-left">Product</td>
            <td></td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Remove</td>
            <td class="table-right">Subtotal</td>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
    <div id="popup" class="popup">
        <div class="popup-content">
            <p>Це текст Pop-up.</p>
            <button id="yesButton">Yes</button>
            <button id="noButton">No</button>
        </div>
    </div>
    <div class="cart-block-btn">
      <div class="clear-cart_btn">clear cart</div>
      <div class="clear-cart_btn">to offers</div>
      </div>
    <div class="cart-option">
      <div class="discount">
        <input type="text">
        <div>Apply Coupon</div>
      </div>
      
      <div class="cart-total">
        <h4>Cart total</h4>
        <ul>
          <li><span>Subtotal:</span><span class="cart-total_price">$</span></li>
          <li><span>Shipping:</span><span>free</span></li>
          <li><span>Total:</span><span class="cart-total_price">$${
            price ? price / 100 : 0
          }</span></li>
        </ul>
      <div>Procees to checkout</div>
    </div>
  </div>`,
      );
      const tBody = document.querySelector(
        '.product-lists tbody',
      ) as HTMLElement;
      productItems.forEach(product => {
        tBody.insertAdjacentHTML(
          'beforeend',
          `<tr>
                <td class="table-left"><div class="cart-product_image" style="background-image:url(${
                  product.images
                })"></div></td>
                <td>${product.name}</td>
                <td><span>$</span>${product.price / 100}</td>
                <td>
                  <div>
                    <button class="product-minus" data-change="minus" ${
                      product.quantity === 1 ? 'disabled' : ''
                    }>-</button>
                    <div class="product-count" data-id="${product.id}">${
            product.quantity
          }</div>
                    <button class="product-plus" data-change="plus">+</button>
                  </div>
                </td>
                <td><div class="btn-product_remove" data-id="${
                  product.id
                }">remove</div></td>
                <td class="table-right"><span>$</span>${
                  (product.price * product.quantity) / 100
                }</td>
              </tr>`,
        );
      });
    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="cart-empty">
           <div class="cart-empty_images"></div>
           <h2>The basket is empty</h2>
           <p>But it's never too late to fix it :)</p>
           <div><a href="/catalog" class="navigator">to offers</a></div>
         </div>`,
      );
    }
  }
}
