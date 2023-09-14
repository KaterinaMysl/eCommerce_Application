import { CartDrawProducts, CartLS } from '../type';

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

  isProductInCart(id: string) {
    const cart = this.getCartProducts();
    for (const product of cart.cartProducts) {
      if (product.id === id) {
        return true;
      }
    }
    return false;
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
}

export default StorageController;
