export default class ValidatorAddress {
  private shippingAddress: HTMLFieldSetElement;
  private shippingAddressElements: HTMLElement[];

  constructor() {
    this.shippingAddress = document.querySelector(
      'fieldset[name="shippingAddress"]',
    ) as HTMLFieldSetElement;
    this.shippingAddressElements = Array.from(
      this.shippingAddress.querySelectorAll('input, select'),
    ) as HTMLElement[];
  }

  public toggleShippingAddressVisibility(input: HTMLInputElement): void {
    if (input.checked === true && input.id === 'set-billing-and-shipping') {
      this.shippingAddress.style.display = 'none';
      this.shippingAddressElements.forEach(element =>
        element.classList.add('valid'),
      );
    } else if (
      input.checked === false &&
      input.id === 'set-billing-and-shipping'
    ) {
      this.shippingAddress.style.display = 'block';
      this.shippingAddressElements.forEach(element =>
        element.classList.remove('valid'),
      );
    }
  }
}
