import Client from '../app/Client';
import { navigateTo } from '../app/Router';
import StorageController from './StorageController';

class LogoutController {
  private client: Client;
  private storage: StorageController;

  constructor(client: Client, storage: StorageController) {
    this.client = client;
    this.storage = storage;
  }

  logout() {
    this.client.logout(this.storage.getCustomerSessionId());
    this.storage.deleteCustomerSessionId();
    navigateTo('/');
  }
}

export default LogoutController;
