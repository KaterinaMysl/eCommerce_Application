import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CatalogProductPage from '../view/catalogPage/CatalogProductPage';
import FilterSelection from '../view/catalogPage/FilterSelection';
import { FILTERS_ACTIVE } from '../constants';

export default class CatalogController {
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

  async getChildrenCategory(parentId: string) {
    const response = await this.anonymsApi
      .categories()
      .get({
        queryArgs: {
          where: `parent(id="${parentId}")`,
        },
      })
      .execute();
    const categories = response.body.results;
    const details = document.querySelector('.details-container') as HTMLElement;

    if (categories.length > 0) {
      details.innerHTML = '';
      categories.forEach(category =>
        details.insertAdjacentHTML(
          'beforeend',
          `<a data-category="${category.name.en}">${category.name.en}</a>`,
        ),
      );
      const links = details.querySelectorAll('a');
      links.forEach(link =>
        link.addEventListener('click', () => {
          links.forEach(link => link.classList.remove('active'));
          link.classList.add('active');
          this.getCategory(link.dataset.category as string);
        }),
      );
    } else {
      const detailsParent = details.closest('details') as HTMLDetailsElement;
      details.innerHTML = '';
      detailsParent.classList.remove('active');
    }
  }
  async getCategory(nameCategory: string) {
    const response = await this.anonymsApi
      .categories()
      .get({
        queryArgs: { where: `name(en="${nameCategory}")` },
      })
      .execute();

    await this.getCategoryProduct(response.body.results[0].id);
    if (response.body.results[0].ancestors.length === 0) {
      this.getChildrenCategory(response.body.results[0].id);
      this.createCatalogNavigator(nameCategory, 'container_box');
    } else {
      this.createCatalogNavigator(nameCategory, 'subcategory');
    }
  }

  async getCategoryProduct(id: string) {
    FILTERS_ACTIVE.category = id;
    this.getProductsWithFilters();
  }

  async getProducts() {
    const response = await this.anonymsApi.productProjections().get().execute();
    const products: ProductProjection[] = response.body.results;
    products.forEach(product => this.catalogProduct.draw(product));
  }

  async sortProducts(typeSort: string) {
    FILTERS_ACTIVE.sort = typeSort;
    this.getProductsWithFilters();
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
      FILTERS_ACTIVE.search = searchName.join(' ');
      this.getProductsWithFilters();
    }
  }

  async filterProducts(from: number, to: number, attr: string | undefined) {
    FILTERS_ACTIVE[attr ? attr : 'price'] = `variants.${
      attr ? `attributes.${attr}` : 'price.centAmount'
    }:range (${Math.round(attr ? from : from * 100)} to ${Math.round(
      attr ? to : to * 100,
    )})` as string;
    this.getProductsWithFilters();
  }

  createProductsCart(products: ProductProjection[]) {
    const offerGrid = document.querySelector('.offers_grid') as HTMLElement;
    const searchCount = document.querySelector('.search-count') as HTMLElement;
    searchCount.textContent = `${products.length}`;
    offerGrid.innerHTML = '';
    products.reverse().forEach(product => {
      this.catalogProduct.draw(product);
    });
  }

  async getProductsWithFilters() {
    const category =
      FILTERS_ACTIVE.category.length > 2
        ? `categories.id:"${FILTERS_ACTIVE.category}"`
        : '';
    const response = await this.anonymsApi
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            category,
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
    this.createProductsCart(products);
  }
  createCatalogNavigator(name: string, type: string) {
    const containerBox = document.querySelector(
      '.navigator-container_box',
    ) as HTMLElement;
    const details = containerBox.closest('details') as HTMLDetailsElement;
    const category = document.querySelector(
      '.navigator_category',
    ) as HTMLElement;
    const subcategory = document.querySelector(
      '.navigator_subcategory',
    ) as HTMLElement;
    let link: HTMLLinkElement | null = null;
    if (type === 'subcategory') {
      link = subcategory.firstElementChild as HTMLLinkElement;
      subcategory.style.display = 'flex';
    } else {
      const link2 = subcategory.firstElementChild as HTMLElement;
      link2.textContent = '';
      subcategory.style.display = 'none';
      link = category.firstElementChild as HTMLLinkElement;
      category.style.display = 'flex';
      containerBox.style.display = 'flex';
    }
    details.open = true;
    link.textContent = name;
  }
}
