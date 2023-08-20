export default class FormSubmitHandle {
  public handleSubmit(form: HTMLFormElement): boolean {
    const inputs = Array.from(
      (form.querySelectorAll('.required') as unknown) as HTMLInputElement[],
    );

    if (inputs.every(input => input.classList.contains('valid'))) {
      return true;
    } else {
      inputs
        .filter(input => input.classList.contains('valid') === false)
        .forEach(input => this.showErrorMessage(input));
      return false;
    }
  }

  public showErrorMessage(input: HTMLInputElement): void {
    const div = input.parentElement as HTMLElement;
    const p = div.lastElementChild as HTMLElement;

    input.classList.remove('valid');
    input.classList.add('invalid');
    div?.classList.add('visible', 'invalidText');
    div?.lastElementChild?.classList.add('invalidText');
    const errorMessage = p.dataset.serverError
      ? p.dataset.serverError
      : p.dataset.message;
    p.textContent = errorMessage as string;
  }

  public hiddenErrorMessage(input: HTMLElement): void {
    const div = input.parentElement as HTMLElement;
    const p = div.lastElementChild as HTMLElement;

    input.classList.remove('invalid');
    div?.classList.remove('visible', 'invalidText');
    div?.lastElementChild?.classList.remove('invalidText');
    p.textContent = '';
  }
}
