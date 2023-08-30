import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CatalogProductPage from '../view/catalogPage/CatalogProductPage';

export default class ProductController {
  private client: Client;
  private anonymsApi;
  private catalogProduct: CatalogProductPage;
  constructor() {
    this.client = new Client();
    this.anonymsApi = this.client.getAnonymsApi();
    this.catalogProduct = new CatalogProductPage();
  }
  // async getProduct(categoryID: string) {
  //   const response = await this.anonumApi
  //     .productProjections()
  //     .withId({ ID: categoryID })
  //     .get()
  //     .execute();
  //   const product: ProductProjection = response.body;
  //   this.catalogProduct.draw(product);
  // }
  // async getCategories() {
  //   this.getProducts();
  // }
  async getProducts() {
    const response = await this.anonymsApi.productProjections().get().execute();
    const products: ProductProjection[] = response.body.results;
    products.forEach(product => this.catalogProduct.draw(product));
  }

  async sortProducts(typeSort: string) {
    // console.log(typeSort);
    const response = await this.anonymsApi
      .productProjections()
      .search()
      .get({ queryArgs: { sort: typeSort } })
      .execute();
    const products: ProductProjection[] = await response.body.results;
    this.createProducts(products);
    // this.filterProducts(4, 5, 'stars');
  }
  async searchProducts(searchText: string) {
    const response = await this.anonymsApi
      .productProjections()
      .suggest()
      .get({
        queryArgs: {
          'searchKeywords.en': searchText,
          fuzzy: true,
          staged: true,
          fuzzyLevel: 0,
        },
      })
      .execute();
    const searchName: string[] = [];
    response.body['searchKeywords.en'].forEach(async word => {
      searchName.push(word.text);
    });
    if (searchName.length !== 0) {
      console.log('run search');
      this.searchProductsName(searchName.join(' '));
    }
  }
  async searchProductsName(searchName: string) {
    const response = await this.anonymsApi
      .productProjections()
      .search()
      .get({
        queryArgs: { fuzzy: true, 'text.en': searchName },
      })
      .execute();
    const products: ProductProjection[] = response.body.results;
    this.createProducts(products);
  }
  async filterProducts(from: number, to: number, attr: string | undefined) {
    type FilterObject = {
      url: string;
      from: string;
      to: string;
    };
    const filterObject: FilterObject = {
      url: '',
      from: '',
      to: '',
    };
    if (attr) {
      filterObject.url = `attributes.${attr}`;
      filterObject.from = `${from}`;
      filterObject.to = `${to}`;
    } else {
      filterObject.url = 'price.centAmount';
      filterObject.from = `${from * 100}`;
      filterObject.to = `${to * 100}`;
    }
    const response = await this.anonymsApi
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `variants.${filterObject.url}:range (${filterObject.from} to ${filterObject.to})`,
        },
      })
      .execute();
    const products: ProductProjection[] = response.body.results;
    // console.log(products[0].masterVariant.attributes);
    products.forEach(product => console.log(product.masterVariant.attributes));
  }
  createProducts(products: ProductProjection[]) {
    const offerGrid = document.querySelector('.offers_grid') as HTMLElement;
    offerGrid.innerHTML = '';
    products.reverse().forEach(product => {
      this.catalogProduct.draw(product);
    });
  }
}
