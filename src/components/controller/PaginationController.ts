import { Pagination } from '../type';
import CatalogController from './CatalogController';
import StorageController from './StorageController';

export default class PaginationController {
  private btnNext: HTMLButtonElement;
  private btnPrev: HTMLButtonElement;
  private btnLast: HTMLButtonElement;
  private btnFirst: HTMLButtonElement;
  private current: HTMLDivElement;
  private lastOffset: number;
  private offset: number;
  private catalogController: CatalogController;
  private pages: number;
  private storages: StorageController;
  constructor(catalogController: CatalogController) {
    this.catalogController = catalogController;
    this.storages = new StorageController();
    this.btnPrev = document.querySelector(
      '.pagination-prev',
    ) as HTMLButtonElement;
    this.btnNext = document.querySelector(
      '.pagination-next',
    ) as HTMLButtonElement;
    this.btnFirst = document.querySelector(
      '.pagination-first',
    ) as HTMLButtonElement;
    this.btnLast = document.querySelector(
      '.pagination-last',
    ) as HTMLButtonElement;
    this.current = document.querySelector(
      '.pagination-current',
    ) as HTMLDivElement;
    this.lastOffset = 0;
    this.offset = 0;
    this.pages = 0;
  }
  setPages() {
    const pagination: Pagination = this.storages.getPagination();
    this.pages = Math.ceil(pagination.total / 5);
    const currentPage = pagination.offset / 5 + 1;
    this.btnLast.textContent = `${this.pages}`;
    this.current.textContent = `${currentPage}`;
    this.btnFirst.textContent = '1';
    this.btnPrev.disabled = currentPage === 1 ? true : false;
    this.btnNext.disabled = this.pages === currentPage;
    this.btnFirst.disabled = currentPage === 1 ? true : false;
    this.btnLast.disabled = this.pages === currentPage;
    this.lastOffset = this.pages * 5 - 5;
    this.offset = pagination.offset;
  }
  async next() {
    await this.catalogController.getProductsWithFilters(this.offset + 5);
    this.setPages();
  }
  async prev() {
    await this.catalogController.getProductsWithFilters(this.offset - 5);
    this.setPages();
  }
  async last() {
    this.setPages();
    await this.catalogController.getProductsWithFilters(this.lastOffset);
    this.setPages();
  }
  async first() {
    await this.catalogController.getProductsWithFilters();
    this.setPages();
  }
}
