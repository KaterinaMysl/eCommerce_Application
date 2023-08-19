import imgHidden from '../../../assets/icons/icon-eye-hidden.png';
import imgVisible from '../../../assets/icons/icon-eye-visible.png';

export default class ValidatorPassword {
  public togglePasswordVisibility(event: HTMLElement): void {
    const input = event.parentElement?.firstElementChild as HTMLInputElement;
    const img = event as HTMLImageElement;

    const isTextType = input.type === 'text';
    input.type = isTextType ? 'password' : 'text';
    img.src = isTextType ? imgHidden : imgVisible;
  }

  public updatePasswordConfirmStatus(input: HTMLInputElement): void {
    const passwordConfirm: HTMLInputElement | null = document.querySelector(
      '#confirm-password',
    );

    if (passwordConfirm && input.id === 'form-password') {
      const isDisabled = !input.classList.contains('valid');
      passwordConfirm.disabled = isDisabled;

      if (!isDisabled) {
        this.validateConfirmPassword(passwordConfirm);
      }
    }
  }

  public validateConfirmPassword(element: HTMLInputElement): void {
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
