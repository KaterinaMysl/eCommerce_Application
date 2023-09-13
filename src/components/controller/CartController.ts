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
    if (productItems !== false && productItems.length > 0) {
      await this.cartPage.draw(productItems);
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
      return cartDrawArray;
    } catch (error) {
      return false;
    }
  }
  initEventCart() {
    console.log('init Event');
    const clearBtn = document.querySelector('.clear-cart_btn');
    const removeProduct = document.querySelector('.btn-product_remove');
    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        const cartLS = JSON.parse(localStorage.getItem('cart') as string);
        const cart = await this.anonymsApi
          .carts()
          .withId({ ID: cartLS.id })
          .delete({
            queryArgs: {
              version: cartLS.version,
            },
          })
          .execute();
        localStorage.removeItem('cart');
        await this.cartPage.draw();
        console.log(cart);
      });
    }
    if (removeProduct) {
      removeProduct.addEventListener('click', async (event: Event) => {
        console.log('click');
        const id = (event.target as HTMLElement).dataset.id;
        if (id) {
          const response = await this.client.removeProductWithCart(id);
          if (response) {
            this.draw();
          }
        }
      });
    }
  }
}
