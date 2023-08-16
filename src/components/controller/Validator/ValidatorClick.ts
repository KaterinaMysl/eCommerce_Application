import ValidatorPassword from './ValidatorPassword';

export default class ValidationClick {
  checkClick(event: Event): void {
    const element = event.target as HTMLElement;
    const input = element.previousElementSibling as HTMLInputElement;

    if (element.tagName === 'SPAN' && input.disabled === false) {
      element.classList.add('active-focus');
      input.focus();
    }
    if (element.tagName === 'IMG') {
      const validatorPassword = new ValidatorPassword();
      validatorPassword.passwordVisibility(element);
    }
  }
}
