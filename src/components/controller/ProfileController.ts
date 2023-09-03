import Client, { Customer } from '../app/Client';
import { ClientResponse } from '@commercetools/platform-sdk';
import ProfileForm from '../view/profileForm/ProfileForm';
import StorageController from './StorageController';

class ProfileController {
  private client: Client;
  private storage: StorageController;
  private profileForm: ProfileForm;
  private anonymsApi;
  private customerData: Customer | undefined;

  constructor(
    client: Client,
    storage: StorageController,
    customerData?: Customer,
  ) {
    this.client = client;
    this.storage = storage;
    this.profileForm = new ProfileForm();
    this.anonymsApi = this.client.getAnonymsApi();
    this.customerData = customerData;
  }

  async draw() {
    const sessionId = this.storage.getCustomerSessionId() as string;
    console.log('id', sessionId);

    try {
      this.client
        .getCustomerDetails(sessionId)
        .then(customerData => {
          this.customerData = customerData;
          console.log('Customer Data in ProfileController:', this.customerData);
          return this.client.getCountries();
        })
        .then(countries => {
          this.profileForm.draw(countries);
          console.log('ffff');
        })
        .catch(console.log);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // async draw() {
  //   const sessionId = this.storage.getCustomerSessionId() as string;
  //   console.log('id', sessionId);
  //   this.customerData = this.client.getCustomerData();
  //   console.log('Customer Data in ProfileController:', this.customerData);

  //   try {
  //     this.client
  //       .getCountries()
  //       .then(c => this.profileForm.draw(c))
  //       .catch(console.log);
  //     console.log('ffff');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
}

export default ProfileController;
