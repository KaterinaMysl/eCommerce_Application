import FormSubmitHandler from './FormSubmitHandler';

export default class ValidatorSelect {
  checkSelect(event: Event) {
    const select = event.target as HTMLSelectElement;

    if (select.tagName !== 'SELECT') {
      console.log('work select return');
      return;
    }
    select.classList.remove('invalid');
    select.classList.remove('valid');
    const codeP = select.value === 'NL' ? '2711 AN' : '60100';
    const codeV = select.value === 'NL' ? 'postalCode2' : 'postalCode';
    const selector =
      select.id === 'form-country' ? '#form-postalCode' : '#form-postalCode2';
    const input = document.querySelector(selector) as HTMLInputElement;
    const span = input.nextElementSibling as HTMLSpanElement;
    span.textContent = codeP;
    input.disabled = false;
    input.dataset.pattern = codeV;
    input.value = '';
    input.classList.remove('valid');

    if (select.value.length < 2) {
      const markInvalid = new FormSubmitHandler();
      markInvalid.markInvalid((select as unknown) as HTMLInputElement);
    } else {
      select.classList.add('valid');
      const p = select.nextElementSibling as HTMLElement;
      p.textContent = '';
    }
  }
}
