import { LOGIN_ERROR } from '../../constants';
import { ErrorResponse } from '../../type';
import FormSubmitHandler from './FormSubmitHandle';
import { handleSdkError } from './serverError';

export const handleServerError = (
  errors: ErrorResponse[],
  form: HTMLElement,
): void => {
  const markError = new FormSubmitHandler();
  const errorMessage = form.querySelector(
    '.button .error-message',
  ) as HTMLElement;
  errorMessage.dataset.message = '';

  const errorArray =
    form.id === 'login-form' ? LOGIN_ERROR : handleSdkError(errors);

  errorArray.forEach(error => {
    if (error.error !== 'address') {
      const input = form.querySelector(
        `[name="${error.error}"]`,
      ) as HTMLInputElement;
      const p = input.parentElement?.lastElementChild as HTMLElement;
      p.dataset.serverError = error.message;
      markError.showErrorMessage(input);
    } else {
      const selects = Array.from(
        document.querySelectorAll('select'),
      ) as unknown as HTMLInputElement[];
      selects
        .filter(select => select.value.length)
        .forEach(select => {
          const p = select.nextElementSibling as HTMLElement;
          p.dataset.serverError = error.message;
          markError.showErrorMessage(select);
        });
    }
    errorMessage.dataset.message = error.message as string;
  });
  toggleButtonError(form, true);
};

export const toggleButtonError = (form: HTMLElement, showMessage: boolean) => {
  const errorMessageElement = form.querySelector(
    '.button .error-message',
  ) as HTMLElement;
  const errorMessage = showMessage ? errorMessageElement.dataset.message : '';
  errorMessageElement.textContent = errorMessage as string;
};
