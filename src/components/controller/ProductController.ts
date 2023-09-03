import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CatalogPage from '../view/catalogPage/CatalogPage';
import ProductItemPage from '../view/productPage/ProductPage';

export default class ProductItemController {
  private client: Client;
  private productPage: ProductItemPage;
  private catalogPage: CatalogPage;
  constructor() {
    this.client = new Client();
    this.productPage = new ProductItemPage();
    this.catalogPage = new CatalogPage();
  }

  async openProductPage(productKey: string) {
    const response = await this.client.getProductByKeyName(productKey);
    const product: ProductProjection = response;
    this.catalogPage.draw();
    this.productPage.draw(product);
  }
}
