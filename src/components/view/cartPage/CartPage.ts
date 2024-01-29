import { CartDraw, Discount } from '../../type';
import './cartPage.css';
import StorageController from '../../controller/StorageController';

export default class CartPage {
  async draw(productItems?: CartDraw[], price?: number) {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    bodyContainer.innerHTML = `
      <div class="container-cart">
        <div class="container_inner">
          
        </div>
      </div>`;
    this.drawProducts(productItems, price);
    this.createDiscountItem();
  }

  private drawProducts(productItems?: CartDraw[], price?: number) {
    const container = document.querySelector('.container_inner') as HTMLElement;
    if (productItems) {
      console.log(productItems);
      const subTotal = productItems.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      );
      const saveTotal = productItems.reduce(
        (acc, product) => acc + (product.discount || 0) * product.quantity,
        0,
      );
      const discountTotal = productItems.reduce(
        (acc, product) => acc + (product.discountCode || 0) * product.quantity,
        0,
      );
      console.log(subTotal);
      console.log(saveTotal);
      console.log(discountTotal);
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="cart-products">
          <ul class="products-list">
            <li class="title-list">
              <div class="block-one">
                <div class="product-data">Product</div>
              </div>
              <div class="block-two">
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
                <div></div>
              </div>
            </li>
        </ul>
    </div>
    <div id="popup" class="popup">
        <div class="popup-content">
            <p>Do you really want to clear the cart?</p>
            <button class="popup-btn-yes popup-btn" id="yesButton">Yes</button>
            <button class="popup-btn-no popup-btn" id="noButton">No</button>
        </div>
    </div>
    <div class="cart-block-btn">
      <div class="clear-cart_btn">Clear cart</div>
      <div class="go-to-offers_btn">Go to offers</div>
      </div>
    <div class="cart-option">
      <div class="discount">
        <input type="text">
        <div class="add-coupon">Apply Coupon</div>
      </div>
      
      <div class="cart-total">
        <h4>Cart total</h4>
        <ul>
          <li><span>Subtotal:</span><span class="cart-subtotal_price">${
            subTotal / 100
          }${'$'}</span></li>
          <li class="${
            saveTotal === 0 ? 'price-none' : 'save-line'
          }"><span>Save:</span><span>-${(
          subTotal / 100 -
          saveTotal / 100
        ).toFixed(2)}${'$'}</span></li>
          <li class="${
            discountTotal === 0 ? 'price-none' : 'discount-line'
          }"><span>Discount:</span><span>-${(saveTotal
          ? saveTotal / 100 - discountTotal / 100
          : subTotal / 100 - discountTotal / 100
        ).toFixed(2)}${'$'}</span></li>
          <li><span>Total:</span><span class="cart-total_price">${
            price ? price / 100 : 0
          }${'$'}</span></li>
        </ul>
        <div class="discount-items">
          
        </div>
      <div class="process-to-checkout">Process to checkout</div>
    </div>
  </div>`,
      );
      const ul = document.querySelector('.products-list') as HTMLElement;
      productItems.forEach(product => {
        const subTotal = product.discountCode
          ? product.discountCode
          : product.discount
          ? product.discount
          : product.price;
        ul.insertAdjacentHTML(
          'beforeend',
          `<li class="cart-line-item" product-key="${product.key}">
            <div class="block-one">
              <div class="product-data">
                <div class="product-data_image" style="background-image:url(${
                  product.images
                })">
                </div>
                <div class="product-data_name">${product.name}</div>
              </div>
            </div>
            <div class="block-two">
              <div class="product-price">
                <p class="base-price ${
                  product.discount
                    ? 'price-inactive'
                    : product.discountCode
                    ? 'price-inactive'
                    : ''
                }">
                $${product.price / 100}
                </p>
                <p class="discount-price ${
                  product.discountCode ? 'price-inactive' : ''
                } ${product.discount ? '' : 'price-none'}">
                $${product.discount ? product.discount / 100 : ''}
                </p>  
                <p class="discountCode-price ${
                  product.discountCode ? '' : 'price-none'
                }">
                $${product.discountCode ? product.discountCode / 100 : ''}
                </p>
              </div>    
              
              <div class="product-quantity">
                <button class="product-minus" data-change="minus" ${
                  product.quantity === 1 ? 'disabled' : ''
                }>-</button>
                <div class="product-count" data-id="${product.lineItemId}">${
            product.quantity
          }</div>
                <button class="product-plus" data-change="plus">+</button>
              </div>    
              
              <div class="product-subtotal">                  
                $${(subTotal * product.quantity) / 100}
              </div>
              <div class="product-remove" >
                <div class="btn-product_remove" data-id="${product.lineItemId}">
              </div>
              </div>
            </div>
            
            
          </li>`,
        );
      });
    } else {
      container.insertAdjacentHTML(
        'beforeend',
        `<div class="cart-empty">
           <div class="cart-empty_images"></div>
           <h2>The basket is empty</h2>
           <p>But it's never too late to fix it :)</p>
           <div><a href="/catalog" class="navigator cart-empty-btn">to offers</a></div>
         </div>`,
      );
    }
  }

  private createDiscountItem() {
    const storages = new StorageController();
    const discounts: Discount[] = storages.getActiveDiscounts();
    const items = document.querySelector('.discount-items') as HTMLElement;
    if (items) {
      discounts.forEach(discount => {
        items.insertAdjacentHTML(
          'beforeend',
          `<div class="discount-item" data-discountId="${discount.id}">${discount.name}<span>X</span></div>`,
        );
      });
    }
  }
}
