import { VALIDATOR_PATTERNS } from '../../constants';
import ValidatorPassword from './ValidatorPassword';
import FormSubmitHandler from './FormSubmitHandle';
import ValidatorDate from './ValidatorDate';

export class ValidatorForm {
  private incorrectLength: number;
  constructor(private input: HTMLInputElement) {
    this.input = input;
    this.incorrectLength = 0;
  }
  private writeErrorMessage(): string {
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
      return errorMessages.length > this.incorrectLength
        ? errorMessages.join(', ')
        : '';
    }
    return '';
  }
  public handleInput(): void {
    const span = this.input.parentElement?.lastElementChild as HTMLElement;
    this.input.closest('div')?.classList.add('visible');

    if (this.input.value.length === this.incorrectLength) {
      span.textContent = '';
      const markInvalid = new FormSubmitHandler();
      markInvalid.showErrorMessage(this.input);
    } else {
      let errorMessageString = this.writeErrorMessage();
      if (this.input.id === 'form-age') {
        const validatorDate = new ValidatorDate();
        errorMessageString += validatorDate.getAge(this.input.value);
      }
      span.textContent = this.handleValidationAndClasses(errorMessageString);
    }
  }
  private handleValidationAndClasses(message: string): string {
    if (message.length === this.incorrectLength) {
      message = '';
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');
    }
    if (this.input.id === 'form-password') {
      const validationPassword = new ValidatorPassword();
      validationPassword.updatePasswordConfirmStatus(this.input);
    }
    return message;
  }
}
