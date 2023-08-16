import FormSubmitHandler from './FormSubmitHandler';

export default class ValidatorFocusOut {
  focusout(event: Event) {
    this.removeActiveFocus(event);
    const targetElement = event.target as HTMLInputElement;

    if (targetElement.tagName === 'DETAILS') {
      return;
    }
    if (
      !targetElement.classList.contains('valid') &&
      !targetElement.classList.contains('btn') &&
      targetElement.value.length === 0
    ) {
      const markInvalid = new FormSubmitHandler();
      markInvalid.markInvalid(targetElement);
    }
    if (targetElement.classList.contains('valid')) {
      targetElement.classList.remove('active');
    }
  }

  removeActiveFocus(event: Event) {
    const element = event.target as HTMLElement;
    const form = element.closest('form') as HTMLFormElement;
    const formInput = Array.from(
      form.querySelectorAll('input'),
    ) as HTMLInputElement[];

    formInput.forEach(input => {
      if (input.value.length === 0) {
        const span = input.nextElementSibling as HTMLElement;
        span.classList.remove('active-focus');
      }
    });
  }
}
