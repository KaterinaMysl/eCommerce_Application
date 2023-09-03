import ProductController from '../../controller/ProductsController';
import { FILTERS_ACTIVE } from '../../constants';

export default class FilterSelection {
  createSearchFilter(value: string) {
    const parentDiv = document.querySelector('.catalog-selection_filters');
    this.removeFilter('search');
    if (parentDiv) {
      parentDiv.insertAdjacentHTML(
        'beforeend',
        `<a class="catalog-selection__link" data-type="search" src="#"><span>${value}</span><span class="span_svg">X</span></a>`,
      );
    }
    this.initEvent('search');
  }

  createFilter(values: number[], attr: string) {
    const parentDiv = document.querySelector('.catalog-selection_filters');
    this.removeFilter(attr);
    if (parentDiv) {
      parentDiv.insertAdjacentHTML(
        'beforeend',
        `<a class="catalog-selection__link" data-type="${attr}" src="#"><span>${Math.round(
          values[0],
        )}</span> - <span>${Math.round(
          values[1],
        )}</span><span>  ${attr}</span><span class="span_svg">X</span></a>`,
      );
    }
    this.initEvent(attr);
  }

  removeFilter(attr: string) {
    const isFilter = document.querySelector(`[data-type="${attr}"]`);
    if (isFilter) {
      isFilter.remove();
    }
  }
  initEvent(attr: string) {
    const div = document.querySelector('.catalog-settings_none') as HTMLElement;
    div.style.display = 'flex';
    const reset = document.querySelector('.catalog-selection_reset');
    const element = document.querySelector(`[data-type="${attr}"]`);
    if (element) {
      element.addEventListener('click', () => {
        const type: string = attr;
        FILTERS_ACTIVE[type] = '';
        this.getProducts();
        element.remove();
        const link = document.querySelector('.catalog-selection__link');
        if (!link) {
          div.style.display = 'none';
        }
      });
    }
    if (reset) {
      reset.addEventListener('click', () => {
        const filters = div.lastElementChild as HTMLElement;
        filters.innerHTML = '';
        const keyFilters = Object.keys(FILTERS_ACTIVE);
        keyFilters.forEach(key => (FILTERS_ACTIVE[key] = ''));
        this.getProducts();
        div.style.display = 'none';
      });
    }
  }
  getProducts() {
    const productController = new ProductController();
    productController.getProd();
  }
}
