import ValidatorSelect from './ValidatorSelect';
import ValidationInput from './ValidatorInput';
import ValidationClick from './ValidatorClick';
import ValidatorFocusin from './ValidatorFocusin';
import ValidatorFocusOut from './ValidatorFocusOut';
import FormSubmitHandle from './FormSubmitHandle';

export default class Validator {
  public initFormListeners(form: HTMLFormElement): void {
    form.addEventListener('focusin', (event: Event) => this.focusin(event));
    form.addEventListener('focusout', (event: Event) => this.focusout(event));
    form.addEventListener('input', (event: Event) => this.input(event));
    form.addEventListener('click', (event: Event) => this.click(event));
    form.addEventListener('change', (event: Event) => this.select(event));
  }

  private focusin(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.classList.contains('input_address')) {
      return;
    } else {
      const validatorFocusin = new ValidatorFocusin();
      validatorFocusin.handleFocusValidation(event);
    }
  }

  private focusout(event: Event): void {
    const validatorFocusOut = new ValidatorFocusOut();
    validatorFocusOut.handleBlurValidation(event);
  }

  private click(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.classList.contains('input_address')) {
      return;
    } else {
      const validatorClick = new ValidationClick();
      validatorClick.handleClick(event);
    }
  }

  private input(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.classList.contains('input_address')) {
      return;
    } else {
      const validatorInput = new ValidationInput();
      validatorInput.handleInputEvent(event);
    }
  }

  public checkSubmit(event: Event, form: HTMLFormElement): boolean {
    event.preventDefault();
    const handlerSubmit = new FormSubmitHandle();
    return handlerSubmit.handleSubmit(form);
  }

  private select(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.classList.contains('input_address')) {
      return;
    } else {
      const validatorSelect = new ValidatorSelect();
      validatorSelect.handleSelectChange(event);
    }
  }
}
