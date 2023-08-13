import Client from '../app/Client';
import RegistrationForm from '../view/registrationForm/RegistrationForm';
import SuccessRegisterForm from '../view/successRegisterForm/SuccessRegisterForm';
import { Controller } from './Controller';

class RegisterController implements Controller {
  private registrationForm: RegistrationForm;
  private successRegisterForm: SuccessRegisterForm;

  private client: Client;

  constructor(client: Client) {
    this.registrationForm = new RegistrationForm();
    this.successRegisterForm = new SuccessRegisterForm();
    this.client = client;
  }

  async draw() {
    await this.client
      .getCountries()
      .then(c => this.registrationForm.draw(c))
      .catch(console.log);
  }

  register(e: Event) {
    e.preventDefault();
    const errorMessageElement = document.getElementById(
      'error-message',
    ) as HTMLElement;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const customer = {
      email: (formData.get('email') as string) ?? '',
      password: (formData.get('password') as string) ?? '',
      firstName: (formData.get('firstName') as string) ?? '',
      lastName: (formData.get('lastName') as string) ?? '',
      dateOfBirth: (formData.get('dateOfBirth') as string) ?? '',
      addresses: [
        {
          streetName: (formData.get('streetName') as string) ?? '',
          city: (formData.get('city') as string) ?? '',
          postalCode: (formData.get('postalCode') as string) ?? '',
          country: (formData.get('country') as string) ?? '',
        },
      ],
    };

    this.client
      .register(customer)
      .then(() => {
        this.successRegisterForm.draw();
      })
      .catch(error => {
        console.log(error);
        errorMessageElement.textContent =
          'Something goes wrong. Please try again.';
        errorMessageElement.style.opacity = '1';
      });
  }
}

export default RegisterController;
