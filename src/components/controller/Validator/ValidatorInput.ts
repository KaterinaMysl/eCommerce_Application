import { ValidatorForm } from './ValidatorForm';
import ValidatorPassword from './ValidatorPassword';
import ValidatorAddress from './ValidatorAddress';

export default class ValidationInput {
  checkInput(event: Event) {
    const targetElement = event.target as HTMLInputElement;

    if (targetElement.id === 'confirm-password') {
      const validationPassword = new ValidatorPassword();
      return validationPassword.checkConfirmPassword(targetElement);
    }

    if (targetElement.type !== 'checkbox') {
      const validator = new ValidatorForm(targetElement);
      validator.checkInput();
    } else {
      const validatorAddress = new ValidatorAddress();
      validatorAddress.copyAddress(targetElement);
    }

    if (targetElement.closest('fieldset[name="shippingAddress"]')) {
      const validatorAddress = new ValidatorAddress();
      validatorAddress.checkAddress(targetElement);
    }
  }
}
