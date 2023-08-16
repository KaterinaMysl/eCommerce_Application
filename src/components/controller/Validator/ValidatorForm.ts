import { VALIDATOR_PATTERNS } from '../../constants';
import ValidatorPassword from './ValidatorPassword';
import FormSubmitHandler from './FormSubmitHandler';
import ValidatorDate from './ValidatorDate';

export class ValidatorForm {
  constructor(private input: HTMLInputElement) {
    this.input = input;
  }
  public writeErrorMessage(): string {
    const pattern = this.input.dataset.pattern as string;
    const patterns = VALIDATOR_PATTERNS[pattern];

    if (patterns) {
      const errorMessages: string[] = [];

      for (const pattern of patterns) {
        const regex = new RegExp(pattern.PATTERN);

        if (!regex.test(this.input.value)) {
          errorMessages.push(pattern.MESSAGE);
        }
      }
      return errorMessages.length > 0 ? errorMessages.join(', ') : '';
    }
    return '';
  }
  public checkInput() {
    const span = this.input.parentElement?.lastElementChild as HTMLElement;
    this.input.closest('div')?.classList.add('visible');

    if (this.input.value.length === 0) {
      span.textContent = '';
      const markInvalid = new FormSubmitHandler();
      markInvalid.markInvalid(this.input);
    } else {
      let errorMessageString = this.writeErrorMessage();
      if (this.input.id === 'form-age') {
        const validatorDate = new ValidatorDate();
        errorMessageString += validatorDate.getAge(this.input.value);
      }
      span.textContent = this.checkValid(errorMessageString);
    }
  }
  public checkValid(message: string): string {
    if (message.length === 0) {
      message = '';
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');
    }
    if (this.input.id === 'form-password') {
      const validationPassword = new ValidatorPassword();
      validationPassword.checkPassword(this.input);
    }
    return message;
  }
}
