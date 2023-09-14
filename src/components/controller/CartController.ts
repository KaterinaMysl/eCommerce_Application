import {
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartRemoveLineItemAction,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CartPage from '../view/cartPage/CartPage';
export type cartDraw = {
  name: string;
  quantity: number;
  price: number;
  discount?: number;
  images: string;
  id: string;
};
export type CartDrawProducts = {
  cartProducts: cartDraw[];
  price: number;
};
export default class CartController {
  private client: Client;
  private anonymsApi;
  private cartPage: CartPage;
  constructor() {
    this.client = new Client();
    this.cartPage = new CartPage();
    this.anonymsApi = this.client.getAnonymsApi();
  }
  async draw() {
    const productItems = await this.getCart();
    if (productItems !== false && productItems.cartProducts.length > 0) {
      await this.cartPage.draw(productItems.cartProducts, productItems.price);
      localStorage.setItem('cartProducts', JSON.stringify(productItems));
    } else {
      await this.cartPage.draw();
    }
    this.initEventCart();
  }
  async getCart() {
    try {
      const cartDrawArray: cartDraw[] = [];
      const cartLS = JSON.parse(localStorage.getItem('cart') as string);
      const cart = await this.anonymsApi
        .carts()
        .withId({ ID: cartLS.id })
        .get()
        .execute();
      cart.body.lineItems.forEach(product => {
        const productItem = {
          name: product.name.en,
          quantity: product.quantity,
          price: product.price.value.centAmount,
          discount: product.price.discounted?.value.centAmount,
          images: product.variant.images?.[0].url as string,
          id: product.id,
        };
        cartDrawArray.push(productItem);
      });
      const cartResult: CartDrawProducts = {
        cartProducts: cartDrawArray,
        price: cart.body.totalPrice.centAmount,
      };
      return cartResult;
    } catch (error) {
      return false;
    }
  }
  initEventCart() {
    const clearBtn = document.querySelector('.clear-cart_btn');
    const removeProduct = Array.from(
      document.querySelectorAll('.btn-product_remove'),
    ) as HTMLElement[];
    const changeQuantity = Array.from(
      document.querySelectorAll('.product-minus, .product-plus'),
    ) as HTMLElement[];
    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        const popup = document.getElementById('popup') as HTMLElement;
        const yesButton = document.getElementById('yesButton') as HTMLElement;
        const noButton = document.getElementById('noButton') as HTMLElement;

        popup.style.display = 'block';

        yesButton.addEventListener('click', async () => {
          popup.style.display = 'none';
          const cartProduct: CartDrawProducts = JSON.parse(
            localStorage.getItem('cartProducts') as string,
          );
          localStorage.removeItem('cartProducts');
          const actions = await this.createRemoveItemActions(
            cartProduct.cartProducts,
          );
          this.client.updateProductsCart(actions);
          await this.cartPage.draw();
        });

        noButton.addEventListener('click', () => {
          popup.style.display = 'none';
        });
      });
    }
    if (removeProduct && removeProduct.length > 0) {
      removeProduct.forEach(product =>
        product.addEventListener('click', async (event: Event) => {
          this.removeProductWithCart(event);
        }),
      );
    }
    if (changeQuantity && changeQuantity.length > 0) {
      changeQuantity.forEach(product =>
        product.addEventListener('click', (event: Event) => {
          const element = event.target as HTMLButtonElement;
          const change = element.dataset.change;
          change === 'plus'
            ? this.updateProductQuantity(true, element)
            : this.updateProductQuantity(false, element);
        }),
      );
    }
  }
  async removeProductWithCart(event: Event) {
    const id = (event.target as HTMLElement).dataset.id;
    if (id) {
      const actions = await this.createRemoveItemActions(id);
      const response = await this.client.updateProductsCart(actions);
      if (response) {
        this.draw();
      }
      const cartProduct: CartDrawProducts = JSON.parse(
        localStorage.getItem('cartProducts') as string,
      );
      const index = cartProduct.cartProducts.findIndex(
        product => product.id === id,
      );
      cartProduct.cartProducts.splice(index, 1);
    }
  }
  async updateProductQuantity(change: boolean, element: HTMLButtonElement) {
    let id = '';
    let count = 0;
    if (change) {
      const elementCount = element.previousElementSibling as HTMLElement;
      const currentCount = elementCount.textContent;
      count = Number(currentCount) + 1;
      id = elementCount.dataset.id as string;
      elementCount.textContent = `${count}`;
      if (currentCount === '1') {
        const btnMinus =
          elementCount.previousElementSibling as HTMLButtonElement;
        btnMinus.disabled = false;
      }
    } else {
      const elementCount = element.nextElementSibling as HTMLElement;
      const currentCount = elementCount.textContent;
      count = Number(currentCount) - 1;
      id = elementCount.dataset.id as string;
      elementCount.textContent = `${count}`;
      if (currentCount === '2') {
        element.disabled = true;
      }
    }
    const actions = await this.createUpdateItemActions(id, count);
    await this.client.updateProductsCart(actions);
    this.draw();
  }
  async addProductToCart(productId: string) {
    const id = localStorage.getItem('session-id');
    if (id) {
      console.log('with login');
      if (!localStorage.getItem('cart')) {
        console.log('create cart with login');
        await this.client.createCart();
      }
      const actions = await this.createAddItemActions(productId);
      await this.client.updateProductsCart(actions);
    } else {
      console.log('no login');
      if (!localStorage.getItem('cart')) {
        console.log('create cart with anonymous');
        await this.client.createCartAnonymous();
      }
      const actions = await this.createAddItemActions(productId);
      await this.client.updateProductsCart(actions);
    }
  }

  createAddItemActions(id: string) {
    const actions: CartUpdateAction[] = [];
    const action: CartAddLineItemAction = {
      action: 'addLineItem',
      productId: id,
    };
    actions.push(action);
    return actions;
  }
  createRemoveItemActions(products: cartDraw[] | string) {
    const actions: CartUpdateAction[] = [];
    if (typeof products === 'string') {
      const action: CartRemoveLineItemAction = {
        action: 'removeLineItem',
        lineItemId: products,
      };
      actions.push(action);
    } else {
      products.forEach(product => {
        const action: CartRemoveLineItemAction = {
          action: 'removeLineItem',
          lineItemId: product.id,
        };
        actions.push(action);
      });
    }
    return actions;
  }
  createUpdateItemActions(id: string, count: number) {
    const actions: CartUpdateAction[] = [];
    const action: CartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId: id,
      quantity: count,
    };
    actions.push(action);
    return actions;
  }
}
