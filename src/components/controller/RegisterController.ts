import Client from '../app/Client';
import RegistrationForm from '../view/registrationForm/RegistrationForm';
import { Controller } from './Controller';
import LoginController from './LoginController';
import { handleServerError } from './Validator/handleServerError';

class RegisterController implements Controller {
  private registrationForm: RegistrationForm;
  private loginController: LoginController;
  private client: Client;

  constructor(client: Client, loginController: LoginController) {
    this.registrationForm = new RegistrationForm();
    this.loginController = loginController;
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
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const billingAddress = {
      streetName: (formData.get('streetBilling') as string) ?? '',
      city: (formData.get('cityBilling') as string) ?? '',
      postalCode: (formData.get('postalCodeBilling') as string) ?? '',
      country: (formData.get('countryBilling') as string) ?? '',
    };
    const shippingAddress = {
      streetName: (formData.get('streetShipping') as string) ?? '',
      city: (formData.get('cityShipping') as string) ?? '',
      postalCode: (formData.get('postalCodeShipping') as string) ?? '',
      country: (formData.get('countryShipping') as string) ?? '',
    };
    const customer = {
      email: (formData.get('email') as string) ?? '',
      password: (formData.get('password') as string) ?? '',
      firstName: (formData.get('firstName') as string) ?? '',
      lastName: (formData.get('lastName') as string) ?? '',
      dateOfBirth: (formData.get('dateOfBirth') as string) ?? '',
      addresses: [
        billingAddress,
        formData.get('billing-shipping') ? billingAddress : shippingAddress,
      ],
      billingAddresses: [0],
      shippingAddresses: [1],
      defaultBillingAddress: formData.get('default-billing') ? 0 : undefined,
      defaultShippingAddress: formData.get('default-shipping') ? 1 : undefined,
    };
    this.client
      .register(customer)
      .then(() => {
        this.loginController.loginWithCreds(customer.email, customer.password);
      })
      .catch(error => {
        console.log(error);
        handleServerError(error.body.errors, form);
      });
  }
}

export default RegisterController;
