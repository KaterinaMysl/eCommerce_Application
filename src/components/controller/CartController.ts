import {
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartRemoveLineItemAction,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CartPage from '../view/cartPage/CartPage';
import { CartDraw } from '../type';
import StorageController from './StorageController';
import { cartToDrawProducts } from './Utils';
import { navigateTo } from '../app/Router';

export default class CartController {
  private client: Client;
  private cartPage: CartPage;
  private storage: StorageController;

  constructor(client: Client, storage: StorageController) {
    this.client = client;
    this.storage = storage;
    this.cartPage = new CartPage();
  }

  async draw() {
    const productItems = await this.getCart();
    if (productItems !== false && productItems.cartProducts.length > 0) {
      await this.cartPage.draw(productItems.cartProducts, productItems.price);
      this.storage.saveCartProducts(productItems);
    } else {
      await this.cartPage.draw();
    }
    this.initEventCart();
  }

  async getCart() {
    const cartProducts = this.storage.getCartProducts();
    if (!cartProducts) {
      try {
        const cart = await this.client.getCartById(this.storage.getCart().id);
        return cartToDrawProducts(cart.body);
      } catch (error) {
        return false;
      }
    }
    return cartProducts;
  }

  initEventCart() {
    const clearBtn = document.querySelector('.clear-cart_btn');
    const goToOffersBtn = document.querySelector('.go-to-offers_btn');
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
          const cartProduct = this.storage.getAndRemoveCartProducts();
          const actions = await this.createRemoveItemActions(
            cartProduct.cartProducts,
          );
          this.client.updateProductsCart(actions, '');
          await this.cartPage.draw();
        });

        noButton.addEventListener('click', () => {
          popup.style.display = 'none';
        });
      });
    }

    if (goToOffersBtn) {
      goToOffersBtn.addEventListener('click', () => navigateTo('/catalog'));
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
      const response = await this.client.updateProductsCart(
        actions,
        'Your item has been deleted successfully.',
      );
      if (response) {
        this.draw();
      }
      const cartProduct = this.storage.getCartProducts();
      const index = cartProduct.cartProducts.findIndex(
        product => product.lineItemId === id,
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
    await this.client.updateProductsCart(
      actions,
      'Your item quantity has been updated successfully.',
    );
    this.draw();
  }

  async addProductToCart(productId: string) {
    const id = this.storage.getCustomerSessionId();
    if (id) {
      if (!this.storage.getCart()) {
        await this.client.createCart();
      }
      const actions = this.createAddItemActions(productId);
      await this.client.updateProductsCart(
        actions,
        'Item has been added to the cart successfully.',
      );
    } else {
      if (!this.storage.getCart()) {
        await this.client.createCartAnonymous();
      }
      const actions = this.createAddItemActions(productId);
      await this.client.updateProductsCart(
        actions,
        'Item has been added to the cart successfully.',
      );
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

  createRemoveItemActions(products: CartDraw[] | string) {
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
          lineItemId: product.lineItemId,
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
