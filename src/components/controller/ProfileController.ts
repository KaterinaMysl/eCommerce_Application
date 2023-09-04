import Client from '../app/Client';
import { Customer } from '@commercetools/platform-sdk';
import ProfileForm from '../view/profileForm/ProfileForm';
import StorageController from './StorageController';
import { handleServerError } from './Validator/handleServerError';

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

  // async draw() {
  //   const sessionId = this.storage.getCustomerSessionId() as string;
  //   console.log('id', sessionId);
  //   const form = document.getElementById('profile-form') as HTMLFormElement;
  //   try {
  //     this.client
  //       .getCustomerDetails(sessionId)
  //       .then(customerData => {
  //         this.customerData = customerData;
  //         console.log('Customer Data in ProfileController:', this.customerData);
  //         return this.client.getCountries();
  //       })
  //       .then(countries => {
  //         this.fillProfileFormWithCustomerData(countries);
  //         console.log('ffff');
  //       })
  //       .catch(error => {
  //         handleServerError(error.body.errors, form);
  //       });
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  async draw() {
    const sessionId = this.storage.getCustomerSessionId() as string;
    console.log('id', sessionId);
    const form = document.getElementById('profile-form') as HTMLFormElement;
    try {
      this.client
        .getCustomerDetails(sessionId)
        .then(customerData => {
          this.customerData = customerData;
          console.log('Customer Data in ProfileController:', this.customerData);
          return this.client.getCountries();
        })
        .then(countries => {
          this.fillProfileFormWithCustomerData(countries);
          console.log('ffff');
        })
        .catch(error => {
          console.log('ooooo');
          handleServerError(error.body.errors, form);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  profile(e: Event) {
    e.preventDefault();
    // const form = e.currentTarget as HTMLFormElement;
    // const formData = new FormData(form);

    // this.customerData.email = formData.get('email') as string;
    // this.customerData.password = formData.get('password') as string;
    // this.customerData.firstName = formData.get('firstName') as string;
    // this.customerData.lastName = formData.get('lastName') as string;
    // this.customerData.dateOfBirth = formData.get('dateOfBirth') as string;

    // const billingAddress = {
    //   streetName: (formData.get('streetBilling') as string) ?? '',
    //   city: (formData.get('cityBilling') as string) ?? '',
    //   postalCode: (formData.get('postalCodeBilling') as string) ?? '',
    //   country: (formData.get('countryBilling') as string) ?? '',
    // };
    // const shippingAddress = {
    //   streetName: (formData.get('streetShipping') as string) ?? '',
    //   city: (formData.get('cityShipping') as string) ?? '',
    //   postalCode: (formData.get('postalCodeShipping') as string) ?? '',
    //   country: (formData.get('countryShipping') as string) ?? '',
    // };
    // this.customerData.addresses = [
    //   billingAddress,
    //   formData.get('billing-shipping') ? billingAddress : shippingAddress,
    // ];
    // this.client
    //   // .updateCustomer(this.customerData)
    //   .then(() => {
    //     // Обработка успешного обновления
    //   })
    //   .catch(error => {
    //     console.log('ooooo111');
    //     handleServerError(error.body.errors, form);
    //   });
  }

  private fillProfileFormWithCustomerData(countries: string[]) {
    if (this.customerData) {
      this.profileForm.draw(countries, this.customerData);
    }
  }
}

export default ProfileController;
