import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CatalogProductPage from '../view/catalogPage/CatalogProductPage';
import FilterSelection from '../view/catalogPage/FilterSelection';
import { FILTERS_ACTIVE } from '../constants';

export default class ProductController {
  private client: Client;
  private anonymsApi;
  private catalogProduct: CatalogProductPage;
  private filtersSelection: FilterSelection;
  constructor() {
    this.client = new Client();
    this.anonymsApi = this.client.getAnonymsApi();
    this.catalogProduct = new CatalogProductPage();
    this.filtersSelection = new FilterSelection();
  }
  async getCategory(nameCategory: string) {
    const response = await this.anonymsApi
      .categories()
      .get({
        queryArgs: { where: `name(en="${nameCategory}")` },
      })
      .execute();
    // console.log(response.body.results[0].id);
    await this.getCategoryProduct(response.body.results[0].id);
  }
  async getCategoryProduct(id: string) {
    console.log(id);
    const response = await this.anonymsApi
      .productProjections()
      .get({
        queryArgs: { where: `categories(id="${id}")` },
      })
      .execute();
    console.log(response.body);
    this.createProducts(response.body.results);
  }
  async getProducts() {
    const response = await this.anonymsApi.productProjections().get().execute();
    const products: ProductProjection[] = response.body.results;
    products.forEach(product => this.catalogProduct.draw(product));
  }

  async sortProducts(typeSort: string) {
    FILTERS_ACTIVE.sort = typeSort;
    this.getProd();
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
      this.filtersSelection.createSearchFilter(searchText);
      console.log('run search');
      FILTERS_ACTIVE.search = searchName.join(' ');
      this.getProd();
    }
  }

  async filterProducts(from: number, to: number, attr: string | undefined) {
    FILTERS_ACTIVE[attr ? attr : 'price'] = `variants.${
      attr ? `attributes.${attr}` : 'price.centAmount'
    }:range (${Math.round(attr ? from : from * 100)} to ${Math.round(
      attr ? to : to * 100,
    )})` as string;
    this.getProd();
  }
  createProducts(products: ProductProjection[]) {
    const offerGrid = document.querySelector('.offers_grid') as HTMLElement;
    const searchCount = document.querySelector('.search-count') as HTMLElement;
    searchCount.textContent = `${products.length}`;
    offerGrid.innerHTML = '';
    products.reverse().forEach(product => {
      this.catalogProduct.draw(product);
    });
  }

  async getProd() {
    const response = await this.anonymsApi
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            FILTERS_ACTIVE.days,
            FILTERS_ACTIVE.stars,
            FILTERS_ACTIVE.price,
            FILTERS_ACTIVE.rating,
          ],
          limit: 5,
          sort: [FILTERS_ACTIVE.sort],
          ['text.en']: FILTERS_ACTIVE.search,
        },
      })
      .execute();
    const products: ProductProjection[] = response.body.results;
    this.createProducts(products);
  }
}
