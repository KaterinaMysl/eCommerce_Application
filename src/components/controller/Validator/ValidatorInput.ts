import { ValidatorForm } from './ValidatorForm';
import ValidatorPassword from './ValidatorPassword';
import ValidatorAddress from './ValidatorAddress';
import { toggleButtonError } from './handleServerError';

export default class ValidationInput {
  private validatorPassword: ValidatorPassword;

  constructor() {
    this.validatorPassword = new ValidatorPassword();
  }

  public handleInputEvent(event: Event): void {
    const targetInput = event.target as HTMLInputElement;

    if (this.shouldToggleErrorOnInput(targetInput)) {
      const form = targetInput.closest('form') as HTMLFormElement;
      toggleButtonError(form, false);
    }

    if (targetInput.id === 'confirm-password') {
      this.validatorPassword.validateConfirmPassword(targetInput);
    } else {
      this.processInput(targetInput);
    }
  }

  private shouldToggleErrorOnInput(input: HTMLInputElement): boolean {
    return input.id === 'form-email' || input.id === 'form-password';
  }

  private processInput(input: HTMLInputElement): void {
    if (input.type !== 'checkbox') {
      const validator = new ValidatorForm(input);
      validator.handleInput();
    } else {
      const validatorAddress = new ValidatorAddress();
      validatorAddress.toggleShippingAddressVisibility(input);
    }
  }
}
