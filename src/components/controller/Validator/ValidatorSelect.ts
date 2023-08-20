import FormSubmitHandler from './FormSubmitHandle';

export default class ValidatorSelect {
  public handleSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    if (select.tagName !== 'SELECT') {
      return;
    }
    this.clearSelectClasses(select);
    this.updateInput(select);
    this.updateErrorMessage(select);
  }

  private clearSelectClasses(select: HTMLSelectElement): void {
    select.classList.remove('invalid', 'valid');
  }

  private updatePostalCode(
    select: HTMLSelectElement,
    input: HTMLElement,
  ): void {
    const codeP = select.value === 'NL' ? '2711 AN' : '60100';
    const span = input.nextElementSibling as HTMLSpanElement;

    span.textContent = codeP;
  }

  private updateInput(select: HTMLSelectElement): void {
    const codeV = select.value === 'NL' ? 'postalCode2' : 'postalCode';
    const selector =
      select.id === 'form-country' ? '#form-postalCode' : '#form-postalCode2';
    const input = document.querySelector(selector) as HTMLInputElement;
    input.disabled = false;
    input.dataset.pattern = codeV;
    input.value = '';
    input.classList.remove('valid');
    this.updatePostalCode(select, input);
  }

  private updateErrorMessage(select: HTMLSelectElement): void {
    const correctLengthValue = 2;
    if (select.value.length < correctLengthValue) {
      const formSubmitHandler = new FormSubmitHandler();
      formSubmitHandler.showErrorMessage(select as unknown as HTMLInputElement);
    } else {
      select.classList.add('valid');
      const p = select.nextElementSibling as HTMLElement;
      p.textContent = '';
    }
  }
}
