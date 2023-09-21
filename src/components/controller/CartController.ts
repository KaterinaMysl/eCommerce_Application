import {
  CartAddDiscountCodeAction,
  CartAddLineItemAction,
  CartChangeLineItemQuantityAction,
  CartRemoveDiscountCodeAction,
  CartRemoveLineItemAction,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CartPage from '../view/cartPage/CartPage';
import { CartDraw, Discount } from '../type';
import StorageController from './StorageController';
import { cartToDrawProducts } from './Utils';
import { navigateTo } from '../app/Router';
import { alert } from './ToastifyControler';

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
    try {
      const cart = await this.client.getCartById(this.storage.getCart().id);
      const productItems = cartToDrawProducts(cart.body);
      if (productItems && productItems.cartProducts.length > 0) {
        await this.cartPage.draw(productItems.cartProducts, productItems.price);
        this.storage.saveCartProducts(productItems);
      } else {
        await this.cartPage.draw();
      }
    } catch (error) {
      // console.error(error);
      await this.cartPage.draw();
    } finally {
      this.initEventCart();
    }
  }

  initEventCart() {
    const clearBtn = document.querySelector('.clear-cart_btn');
    const goToOffersBtn = document.querySelector('.go-to-offers_btn');
    const addCoupon = document.querySelector('.add-coupon');
    const cartLineItems = Array.from(
      document.querySelectorAll('.cart-line-item'),
    ) as HTMLElement[];
    const removeProduct = Array.from(
      document.querySelectorAll('.btn-product_remove'),
    ) as HTMLElement[];
    const changeQuantity = Array.from(
      document.querySelectorAll('.product-minus, .product-plus'),
    ) as HTMLElement[];
    const items = Array.from(
      document.querySelectorAll('.discount-item'),
    ) as HTMLElement[];
    items.forEach(item =>
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-discountId') as string;
        this.removeDiscountWithCart(id);
      }),
    );
    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        const popup = document.getElementById('popup') as HTMLElement;
        const yesButton = document.getElementById('yesButton') as HTMLElement;
        const noButton = document.getElementById('noButton') as HTMLElement;

        popup.style.display = 'block';

        yesButton.addEventListener('click', async () => {
          popup.style.display = 'none';
          const cartProduct = this.storage.getAndRemoveCartProducts();
          const discount: Discount[] = this.storage.getAndRemoveDiscounts();
          const actionsProducts = await this.createRemoveItemActions(
            cartProduct.cartProducts,
          );
          const actionsDiscounts = await this.createRemoveDiscountAction(
            discount,
          );
          const actions = [...actionsProducts, ...actionsDiscounts];
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
          event.stopPropagation();
          this.removeProductWithCart(event);
        }),
      );
    }

    if (changeQuantity && changeQuantity.length > 0) {
      changeQuantity.forEach(product =>
        product.addEventListener('click', (event: Event) => {
          event.stopPropagation();
          const element = event.target as HTMLButtonElement;
          const change = element.dataset.change;
          change === 'plus'
            ? this.updateProductQuantity(true, element)
            : this.updateProductQuantity(false, element);
        }),
      );
    }

    if (cartLineItems && cartLineItems.length > 0) {
      cartLineItems.forEach(lineItem => {
        lineItem.addEventListener('click', (event: Event) => {
          const element = event.currentTarget as HTMLElement;
          const productKey = element.getAttribute('product-key') as string;
          navigateTo(`/catalog?name=${productKey}`);
        });
      });
    }

    if (addCoupon) {
      addCoupon.addEventListener('click', () => {
        const input = addCoupon.previousElementSibling as HTMLInputElement;
        const value = input.value;
        if (value.length > 3) {
          this.addDiscountToCart(value);
          input.value = '';
        } else {
          alert('Please enter valid discount code', false);
        }
      });
    }
  }
  async addDiscountToCart(code: string) {
    const actions = this.createAddDiscountAction(code);
    await this.client.updateProductsCart(
      actions,
      'Your discount has been successfully activated.',
    );
    await this.draw();
  }
  async removeDiscountWithCart(id: string) {
    const actions = this.createRemoveDiscountAction(id);
    await this.client.updateProductsCart(
      actions,
      'Your discount has been successfully deactivated.',
    );
    this.draw();
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

  async addProductToCart(productId: string): Promise<boolean> {
    const id = this.storage.getCustomerSessionId();
    if (id) {
      if (!this.storage.getCart()) {
        await this.client.createCart();
      }
      const actions = this.createAddItemActions(productId);
      const result = await this.client.updateProductsCart(
        actions,
        'Item has been added to the cart successfully.',
      );
      return result;
    } else {
      if (!this.storage.getCart()) {
        await this.client.createCartAnonymous();
      }
      const actions = this.createAddItemActions(productId);
      const result = await this.client.updateProductsCart(
        actions,
        'Item has been added to the cart successfully.',
      );
      return result;
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

  async removeProductFromCart(lineItemId: string): Promise<boolean> {
    const actions: CartUpdateAction[] = [];
    const action: CartRemoveLineItemAction = {
      action: 'removeLineItem',
      lineItemId: lineItemId,
    };
    actions.push(action);

    const result = await this.client.updateProductsCart(
      actions,
      'Your item has been deleted successfully.',
    );
    return result;
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
  createAddDiscountAction(code: string) {
    const actions: CartUpdateAction[] = [];
    const action: CartAddDiscountCodeAction = {
      action: 'addDiscountCode',
      code: code,
    };
    actions.push(action);
    return actions;
  }
  createRemoveDiscountAction(discount: Discount[] | string) {
    const actions: CartUpdateAction[] = [];
    if (typeof discount === 'string') {
      const action: CartRemoveDiscountCodeAction = {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: discount,
        },
      };
      actions.push(action);
    } else {
      discount.forEach(discoun => {
        const action: CartRemoveDiscountCodeAction = {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: discoun.id,
          },
        };
        actions.push(action);
      });
    }
    return actions;
  }
}
