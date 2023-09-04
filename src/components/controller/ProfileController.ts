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
    console.log(e.target);
  }
}

export default ProfileController;
