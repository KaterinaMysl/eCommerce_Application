import FormSubmitHandler from './FormSubmitHandle';

export default class ValidatorFocusOut {
  public handleBlurValidation(event: Event): void {
    this.removeActiveFocus(event);
    const targetElement = event.target as HTMLInputElement;

    if (this.shouldSkipValidation(targetElement)) {
      return;
    }

    const formSubmitHandler = new FormSubmitHandler();

    if (
      !targetElement.classList.contains('valid') &&
      !targetElement.classList.contains('btn') &&
      targetElement.value.length === 0
    ) {
      formSubmitHandler.showErrorMessage(targetElement);
    }

    if (targetElement.classList.contains('valid')) {
      targetElement.classList.remove('active');
    }
  }

  private shouldSkipValidation(targetElement: HTMLInputElement): boolean {
    return (
      targetElement.tagName === 'DETAILS' ||
      targetElement.classList.contains('new-account')
    );
  }

  private removeActiveFocus(event: Event): void {
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
