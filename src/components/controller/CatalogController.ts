import { ProductProjection } from '@commercetools/platform-sdk';
import Client from '../app/Client';
import CatalogProductPage from '../view/catalogPage/CatalogProductPage';
import FilterSelection from '../view/catalogPage/FilterSelection';
import { FILTERS_ACTIVE } from '../constants';
import CartController from './CartController';

export default class CatalogController {
  private client: Client;
  private catalogProduct: CatalogProductPage;
  private filtersSelection: FilterSelection;
  private cartController: CartController;

  constructor(client: Client, cartController: CartController) {
    this.client = client;
    this.catalogProduct = new CatalogProductPage();
    this.filtersSelection = new FilterSelection(this);
    this.cartController = cartController;
  }

  async getChildrenCategory(parentId: string) {
    const response = await this.client.getProductCategoryByParentId(parentId);
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

  async getCategory(name: string) {
    const response = await this.client.getProductCategoryByName(name);

    await this.getCategoryProduct(response.body.results[0].id);
    if (response.body.results[0].ancestors.length === 0) {
      this.getChildrenCategory(response.body.results[0].id);
      this.createCatalogNavigator(name, 'container_box');
    } else {
      this.createCatalogNavigator(name, 'subcategory');
    }
  }

  async getCategoryProduct(id: string) {
    FILTERS_ACTIVE.category = id;
    this.getProductsWithFilters();
  }

  async getProducts() {
    const response = await this.client.getProductProjections();
    const products: ProductProjection[] = response.body.results;
    await products.forEach(product => this.catalogProduct.draw(product));
    this.addEventCart();
  }

  addEventCart() {
    const addCart = document.querySelectorAll('.add-product-to-cart');
    addCart.forEach(item => {
      item.addEventListener('click', e => {
        const targetEl = e.target as HTMLElement;
        const productKey = targetEl.getAttribute('prod-key') as string;
        this.cartController.addProductToCart(productKey);
      });
    });
  }

  async sortProducts(typeSort: string) {
    FILTERS_ACTIVE.sort = typeSort;
    this.getProductsWithFilters();
  }

  async searchProducts(searchText: string) {
    const response = await this.client.getProductProjectionsBySearchQuery(
      searchText,
    );
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

  async createProductsCart(products: ProductProjection[]) {
    const offerGrid = document.querySelector('.offers_grid') as HTMLElement;
    const searchCount = document.querySelector('.search-count') as HTMLElement;
    searchCount.textContent = `${products.length}`;
    offerGrid.innerHTML = '';
    await products.reverse().forEach(product => {
      this.catalogProduct.draw(product);
    });
    this.addEventCart();
  }

  async getProductsWithFilters() {
    const category =
      FILTERS_ACTIVE.category.length > 2
        ? `categories.id:"${FILTERS_ACTIVE.category}"`
        : '';
    const response = await this.client.getProductProjectionsFilteredByCategory(
      category,
    );
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
