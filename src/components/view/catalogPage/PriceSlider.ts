import noUiSlider, { API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import ProductController from '../../controller/ProductsController';
import FilterSelection from './FilterSelection';

export default class PriceSlider {
  private container: HTMLElement;
  private slider: API;
  private productController: ProductController;
  private type: string;
  private filterSelection: FilterSelection;
  constructor(from: number, to: number, type: string) {
    this.type = type;
    this.filterSelection = new FilterSelection();
    this.container = document.querySelector(
      `#range-slider_${this.type}`,
    ) as HTMLElement;
    this.productController = new ProductController();
    this.slider = noUiSlider.create(this.container, {
      start: [from, to],
      connect: true,
      range: {
        min: from,
        max: to,
      },
    });
    this.initEvent();
  }

  private initEvent(): void {
    const inputs = Array.from(
      document.querySelectorAll(`#input-${this.type}_0, #input-${this.type}_1`),
    ) as HTMLInputElement[];
    const priceButton = document.querySelector(
      `#filters-${this.type}_btn`,
    ) as HTMLElement;
    this.slider.on('update', () => {
      const values: number[] = this.getSliderValue();
      inputs.map(
        (input, index) => (input.value = `${Math.round(values[index])}`),
      );
    });
    inputs.forEach((input, index) => {
      input.addEventListener('change', (event: Event) => {
        const targetElement = event.currentTarget as HTMLInputElement;
        this.setSliderValue(index, targetElement);
      });
    });
    priceButton.addEventListener('click', () => {
      this.searchElement();
    });
  }

  private getSliderValue(): number[] {
    return this.slider.get(true) as number[];
  }

  private setSliderValue(index: number, input: HTMLInputElement) {
    const arr = [];
    arr[index] = input.value;
    this.slider.set(arr);
  }

  private searchElement() {
    const values: number[] = this.getSliderValue();
    let attr = this.type === 'price' ? undefined : this.type;
    this.productController.filterProducts(values[0], values[1], attr);
    attr = !attr ? 'price' : attr;
    this.filterSelection.createFilter(values, attr);
  }
}
