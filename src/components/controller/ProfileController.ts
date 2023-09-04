import Client from '../app/Client';
import { Customer } from '@commercetools/platform-sdk';
import ProfileForm from '../view/profileForm/ProfileForm';
import StorageController from './StorageController';

class ProfileController {
  private client: Client;
  private storage: StorageController;
  private profileForm: ProfileForm;
  private customerData: Customer | undefined;

  constructor(
    client: Client,
    storage: StorageController,
    customerData?: Customer,
  ) {
    this.client = client;
    this.storage = storage;
    this.profileForm = new ProfileForm();
    this.customerData = customerData;
  }

  async draw(customer: Customer) {
    await this.profileForm.draw(customer);
    await this.profileForm.markInput();
  }
  updateData(e: Event) {
    const form = new FormData(e.target as HTMLFormElement);
    const customer = {
      email: (form.get('email') as string) ?? '',
      password: (form.get('password') as string) ?? '',
      firstName: (form.get('firstName') as string) ?? '',
      lastName: (form.get('lastName') as string) ?? '',
      dateOfBirth: (form.get('dateOfBirth') as string) ?? '',
    };
    this.client.updateCustomer(
      customer.firstName,
      customer.lastName,
      customer.dateOfBirth,
      customer.email,
    );
  }
}

export default ProfileController;