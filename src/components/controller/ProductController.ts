import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import ProductItemPage from '../view/productPage/ProductPage';
import StorageController from './StorageController';

export default class ProductItemController {
  private client: Client;
  private storage: StorageController;
  private productPage: ProductItemPage;

  constructor(client: Client, storage: StorageController) {
    this.client = client;
    this.storage = storage;
    this.productPage = new ProductItemPage();
  }

  async openProductPage(productKey: string) {
    const response = await this.client.getProductByKeyName(productKey);
    const product: ProductProjection = response;
    this.productPage.draw(product, this.storage.isProductInCart(product.id));
  }
}
