import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import ProductItemPage from '../view/productPage/ProductPage';
import StorageController from './StorageController';
import CartController from './CartController';

export default class ProductItemController {
  private client: Client;
  private storage: StorageController;
  private productPage: ProductItemPage;
  private cartController: CartController;

  constructor(
    client: Client,
    storage: StorageController,
    cartController: CartController,
  ) {
    this.client = client;
    this.storage = storage;
    this.cartController = cartController;
    this.productPage = new ProductItemPage();
  }

  async openProductPage(productKey: string) {
    const response = await this.client.getProductByKeyName(productKey);
    const product: ProductProjection = response;
    this.productPage.draw(product);
    this.initProductBtnsListeners(product.id);
  }

  private initProductBtnsListeners(productId: string) {
    const addBtn = document.querySelector(
      '.add-product-to-cart',
    ) as HTMLElement;
    const removeBtn = document.querySelector(
      '.remove-product-from-cart',
    ) as HTMLElement;
    const isProductInCart = this.storage.isProductInCart(productId);
    if (!isProductInCart) {
      removeBtn.classList.add('hidden');
    } else {
      addBtn.classList.add('hidden');
      removeBtn.classList.remove('hidden');
    }
    this.addButtonListener(addBtn, removeBtn);
    this.removeButtonListener(productId, addBtn, removeBtn);
  }

  private addButtonListener(addBtn: HTMLElement, removeBtn: HTMLElement) {
    addBtn.addEventListener('click', async () => {
      const productKey = addBtn.getAttribute('prod-key') as string;
      const result = await this.cartController.addProductToCart(productKey);
      if (result) {
        addBtn.classList.add('hidden');
        removeBtn.classList.remove('hidden');
      } else {
        addBtn.classList.remove('hidden');
        removeBtn.classList.add('hidden');
      }
    });
  }

  private removeButtonListener(
    productId: string,
    addBtn: HTMLElement,
    removeBtn: HTMLElement,
  ) {
    removeBtn.addEventListener('click', async () => {
      const result = await this.cartController.removeProductFromCart(
        this.storage.getProductCartLineItem(productId),
      );
      if (result) {
        removeBtn.classList.add('hidden');
        addBtn.classList.remove('hidden');
      } else {
        removeBtn.classList.remove('hidden');
        addBtn.classList.add('hidden');
      }
    });
  }
}
