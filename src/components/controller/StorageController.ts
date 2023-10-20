import { CartDrawProducts, CartLS, Discount, Pagination } from '../type';

class StorageController {
  isLoggedIn(): boolean {
    return localStorage.getItem('session-id') ? true : false;
  }

  getCustomerSessionId(): string {
    return localStorage.getItem('session-id') || '';
  }

  saveCustomerSessionId(id: string) {
    localStorage.setItem(`session-id`, id);
  }

  deleteCustomerSessionId() {
    localStorage.removeItem(`session-id`);
  }

  getAnonymousSessionId(): string {
    return localStorage.getItem('session-anonymous') || '';
  }

  saveAnonymousSessionId(id: string) {
    localStorage.setItem('session-anonymous', id);
  }

  saveCartProducts(productItems: CartDrawProducts) {
    localStorage.setItem('cartProducts', JSON.stringify(productItems));
  }

  getCartProducts(): CartDrawProducts {
    return JSON.parse(localStorage.getItem('cartProducts') as string);
  }

  removeCartProducts() {
    localStorage.removeItem('cartProducts');
  }

  getAndRemoveCartProducts(): CartDrawProducts {
    const cartProducts = this.getCartProducts();
    this.removeCartProducts();
    return cartProducts;
  }
  getAndRemoveDiscounts(): Discount[] {
    const activeDiscounts = this.getActiveDiscounts();
    this.removeActiveDiscounts();
    return activeDiscounts;
  }

  isProductInCart(id: string): boolean {
    const cart = this.getCartProducts();
    if (cart) {
      for (const product of cart.cartProducts) {
        if (product.id === id) {
          return true;
        }
      }
    }
    return false;
  }

  getProductCartLineItem(id: string): string {
    const cart = this.getCartProducts();
    if (cart) {
      for (const product of cart.cartProducts) {
        if (product.id === id) {
          return product.lineItemId;
        }
      }
    }
    return '';
  }

  getCart(): CartLS {
    return JSON.parse(localStorage.getItem('cart') as string);
  }

  saveCart(cart: CartLS) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  deleteCart() {
    localStorage.removeItem('cart');
  }

  saveVersion(version: number) {
    localStorage.setItem('version', `${version}`);
  }

  getVersion() {
    return Number(localStorage.getItem('version')) as number;
  }
  setDiscounts(discounts: Discount[]) {
    localStorage.setItem('discounts', JSON.stringify(discounts));
  }
  getDiscounts() {
    return JSON.parse(localStorage.getItem('discounts') as string);
  }
  setActiveDiscounts(discounts: Discount[]) {
    localStorage.setItem('ActiveDiscounts', JSON.stringify(discounts));
  }
  getActiveDiscounts() {
    return JSON.parse(localStorage.getItem('ActiveDiscounts') as string);
  }
  removeActiveDiscounts() {
    localStorage.removeItem('ActiveDiscounts');
  }
  setPagination(pagination: Pagination) {
    localStorage.setItem('pagination', JSON.stringify(pagination));
  }
  getPagination() {
    return JSON.parse(localStorage.getItem('pagination') as string);
  }
}

export default StorageController;
