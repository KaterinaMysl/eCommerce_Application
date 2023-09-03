import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import ProductItemPage from '../view/productPage/ProductPage';

export default class ProductItemController {
  private client: Client;
  private productPage: ProductItemPage;

  constructor() {
    this.client = new Client();
    this.productPage = new ProductItemPage();
  }

  async openProductPage(productKey: string) {
    const response = await this.client.getProductByKeyName(productKey);
    const product: ProductProjection = response;
    this.productPage.draw(product);
  }
}
