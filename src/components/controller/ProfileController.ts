import Client from '../app/Client';
import { Customer } from '@commercetools/platform-sdk';
import ProfileForm from '../view/profileForm/ProfileForm';
import StorageController from './StorageController';

class ProfileController {
  private client: Client;
  private storage: StorageController;
  private profileForm: ProfileForm;
  private anonymsApi;

  constructor(client: Client, storage: StorageController) {
    this.client = client;
    this.storage = storage;
    this.profileForm = new ProfileForm();
    this.anonymsApi = this.client.getAnonymsApi();
  }

  async draw() {
    console.log('dddddd');
    const sessionId = this.storage.getCustomerSessionId() as string;
    console.log(sessionId);
    try {
      const response = await this.anonymsApi.customers().get().execute();
      console.log(response);
      if (response && response.body) {
        const userProfile = response.body.results;
        // userProfile.forEach(profile => this.profileForm.draw(profile));
        console.log('User Profile:', userProfile);
        // console.log('User Profile:', profile);
      } else {
        throw new Error('Failed to fetch profile');
      }
      console.log('eeeee');
      // this.getProfile(sessionId)
      //   .then((customer: Customer | undefined) => {
      //     console.log('dgvfsgv');
      //     if (customer) {
      //       console.log(customer);
      //       this.profileForm.drawProfileData(customer);
      //       const editButton = document.getElementById('editProfileButton');
      //       if (editButton) {
      //         editButton.addEventListener('click', () => {
      //           this.profileForm.enableEditMode();
      //         });
      //       }

      //       const saveButton = document.getElementById('saveProfileButton');
      //       if (saveButton) {
      //         saveButton.addEventListener('click', () => {
      //           const updatedProfileData = this.profileForm.getUpdatedData();
      //           this.updateProfile(sessionId, updatedProfileData)
      //             .then(() => {
      //               this.profileForm.disableEditMode();
      //             })
      //             .catch(console.error);
      //         });
      //       }
      //     }
      //   })
      //   .catch(console.error);

      this.client
        .getCountries()
        .then(c => this.profileForm.draw(c))
        .catch(console.log);
      console.log('ffff');
    } catch (error) {
      console.error('Error:', error);
      // Обработка ошибки при запросе профиля
    }
  }
}

export default ProfileController;
