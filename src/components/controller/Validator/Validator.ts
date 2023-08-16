import ValidatorSelect from './ValidatorSelect';
import ValidationInput from './ValidatorInput';
import ValidationClick from './ValidatorClick';
import ValidatorFocusin from './ValidatorFocusin';
import ValidatorFocusOut from './ValidatorFocusOut';
import FormSubmitHandler from './FormSubmitHandler';

export default class Validator {
  constructor(private form: HTMLFormElement) {
    this.form = form;
  }

  public initFormListeners(): void {
    this.form.addEventListener('focusin', (event: Event) =>
      this.focusin(event),
    );
    this.form.addEventListener('focusout', (event: Event) =>
      this.focusout(event),
    );
    this.form.addEventListener('input', (event: Event) => this.input(event));
    this.form.addEventListener('click', (event: Event) => this.click(event));
    this.form.addEventListener('change', (event: Event) => this.select(event));
  }

  private focusin(event: Event): void {
    const validatorFocusin = new ValidatorFocusin();
    validatorFocusin.focusin(event);
  }

  private focusout(event: Event): void {
    const validatorFocusOut = new ValidatorFocusOut();
    validatorFocusOut.focusout(event);
  }

  private click(event: Event): void {
    const validatorClick = new ValidationClick();
    validatorClick.checkClick(event);
  }

  private input(event: Event): void {
    const validatorInput = new ValidationInput();
    validatorInput.checkInput(event);
  }

  public checkSubmit(event: Event): boolean {
    event.preventDefault();
    const handlerSubmit = new FormSubmitHandler();
    return handlerSubmit.handlerSubmit(this.form);
  }

  private select(event: Event): void {
    const validatorSelect = new ValidatorSelect();
    validatorSelect.checkSelect(event);
  }
}
