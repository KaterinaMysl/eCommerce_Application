import { ERROR_MESSAGES } from '../../constants';

export default class ValidatorFocusin {
  focusin(event: Event) {
    console.log('focusin');
    const targetElement = event.target as HTMLInputElement;
    if (targetElement.tagName === 'DETAILS') {
      return;
    }
    if (targetElement.id === 'checkbox-address') {
      console.log('focusin return');
      return;
    }
    this.addActiveFocus(event);

    if (
      targetElement.classList.contains('valid') ||
      targetElement.classList.contains('btn')
    ) {
      console.log('valid');
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
  }
  addActiveFocus(event: Event) {
    const element = event.target as HTMLElement;
    const form = element.closest('form') as HTMLFormElement;

    if (element.tagName === 'INPUT') {
      const formInput = Array.from(
        form.querySelectorAll('input'),
      ) as HTMLInputElement[];

      formInput.forEach(input => {
        if (input.value.length === 0) {
          const span = input.nextElementSibling as HTMLElement;
          span.classList.remove('active-focus');
        }
      });
      element.nextElementSibling?.classList.add('active-focus');
    }
    if (element.tagName === 'SPAN') {
      element.classList.add('active-focus');
    }
  }
}
