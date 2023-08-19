import { ERROR_MESSAGES } from '../../constants';

export default class ValidatorFocusin {
  handleFocusValidation(event: Event): void {
    const targetElement = event.target as HTMLInputElement;

    if (
      targetElement.tagName === 'DETAILS' ||
      targetElement.classList.contains('new-account') ||
      targetElement.type === 'checkbox' ||
      targetElement.classList.contains('submit-btn') ||
      targetElement.classList.contains('valid')
    ) {
      return;
    } else {
      targetElement.classList.add('active');
      const parentElement = targetElement.parentElement;
      const lastElementChild = parentElement?.lastElementChild;

      parentElement?.lastElementChild?.classList.remove('invalidText');

      if (lastElementChild) {
        const pattern = targetElement.dataset.pattern as string;
        lastElementChild.textContent = ERROR_MESSAGES[pattern];

        parentElement.classList.add('visible');
        parentElement.classList.remove('invalidText');
      } else {
        parentElement?.classList.remove('visible');
      }
    }
    this.addActiveFocus(event);
  }

  addActiveFocus(event: Event): void {
    const element = event.target as HTMLElement;
    const form = element.closest('form') as HTMLFormElement;
    const incorrectLength = 0;

    if (element.tagName === 'INPUT') {
      const formInputs = form.querySelectorAll('input');

      formInputs.forEach(input => {
        const inputElement = input as HTMLInputElement;

        if (inputElement.value.length === incorrectLength) {
          const siblingSpan = inputElement.nextElementSibling as HTMLElement;
          siblingSpan.classList.remove('active-focus');
        }
      });

      const nextSibling = element.nextElementSibling as HTMLElement;
      nextSibling?.classList.add('active-focus');
    } else if (element.tagName === 'SPAN') {
      element.classList.add('active-focus');
    }
  }
}
