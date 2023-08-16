import imgHidden from '../../../assets/icons/icon-eye-hidden.png';
import imgVisible from '../../../assets/icons/icon-eye-visible.png';

export default class ValidatorPassword {
  passwordVisibility(event: HTMLElement) {
    const input = event.parentElement?.firstElementChild as HTMLInputElement;
    const img = event as HTMLImageElement;

    const isTextType = input.type === 'text';
    input.type = isTextType ? 'password' : 'text';
    img.src = isTextType ? imgHidden : imgVisible;
  }

  checkPassword(input: HTMLInputElement) {
    const passwordConfirm: HTMLInputElement | null = document.querySelector(
      '#confirm-password',
    );

    if (passwordConfirm && input.id === 'form-password') {
      const isDisabled = !input.classList.contains('valid');
      passwordConfirm.disabled = isDisabled;

      if (!isDisabled) {
        this.checkConfirmPassword(passwordConfirm);
      }
    }
  }

  checkConfirmPassword(element: HTMLInputElement) {
    const confirmPassword = element;
    const password = document.querySelector(
      '#form-password',
    ) as HTMLInputElement;

    confirmPassword.classList.remove('invalid', 'valid');
    confirmPassword.classList.add(
      confirmPassword.value === password.value ? 'valid' : 'invalid',
    );
  }
}
