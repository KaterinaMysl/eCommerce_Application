export default class FormSubmitHandler {
  handlerSubmit(form: HTMLFormElement) {
    const inputs = Array.from(
      (form.querySelectorAll(
        'input:not([type="submit"]):not(#checkbox-address):not([type="checkbox"]), select',
      ) as unknown) as HTMLInputElement[],
    );

    if (inputs.every(input => input.classList.contains('valid'))) {
      return true;
    } else {
      inputs
        .filter(input => input.classList.contains('valid') === false)
        .forEach(input => this.markInvalid(input));
      return false;
    }
  }

  markInvalid(input: HTMLInputElement) {
    const div = input.parentElement as HTMLElement;
    const p = div.lastElementChild as HTMLElement;

    input.classList.remove('valid');
    input.classList.add('invalid');
    div?.classList.add('visible', 'invalidText');
    div?.lastElementChild?.classList.add('invalidText');

    p.textContent = p.dataset.message as string;
  }
}
