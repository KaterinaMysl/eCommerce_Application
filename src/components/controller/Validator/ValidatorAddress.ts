export default class ValidatorAddress {
  copyAddress(input: HTMLInputElement) {
    const shippingAddress = document.querySelector(
      'fieldset[name="shippingAddress"]',
    ) as HTMLFieldSetElement;
    const billingAddress = document.querySelector(
      'fieldset[name="billingAddress"]',
    ) as HTMLFieldSetElement;
    const elementsShipping = Array.from(
      shippingAddress.querySelectorAll('input:not([type="checkbox"]), select'),
    ) as HTMLInputElement[];
    const elementsBilling = Array.from(
      billingAddress.querySelectorAll('input, select'),
    ) as HTMLInputElement[];

    if (input.checked) {
      elementsBilling.map((element, index) => {
        element.focus();
        element.classList.add('valid');
        element.value = elementsShipping[index].value;
        element.disabled = true;
      });
    } else {
      elementsBilling.map(element => {
        element.classList.remove('valid');
        element.value = '';
        if (element.id !== 'form-postalCode2') {
          element.disabled = false;
        }
      });
    }
  }

  checkAddress(input: HTMLInputElement) {
    const fieldset = input.closest(
      'fieldset[name="shippingAddress"]',
    ) as HTMLElement;
    const checkbox = document.querySelector(
      '#checkbox-address',
    ) as HTMLInputElement;
    const inputs = Array.from(
      fieldset.querySelectorAll('input:not([type="checkbox"]), select'),
    );

    if (inputs.every(input => input.classList.contains('valid'))) {
      checkbox.disabled = false;
    } else {
      checkbox.checked = false;
      checkbox.disabled = true;
    }
  }
}
