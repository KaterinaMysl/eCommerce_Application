import MainPage from '../view/mainPage/MainPage';
import { Controller } from './Controller';
import StorageController from './StorageController';
import Client from '../app/Client';
import { Discount } from '../type';

class MainController implements Controller {
  private mainPage: MainPage;
  private client: Client;
  private storage: StorageController;

  constructor(client: Client, storage: StorageController) {
    this.mainPage = new MainPage();
    this.storage = storage;
    this.client = client;
  }

  async draw() {
    const discountCodes = await this.client.getDiscountCodes();
    const discounts: Discount[] = discountCodes.map(discountCode => ({
      id: discountCode.id,
      name: discountCode.name?.en || '',
    }));
    this.storage.setDiscounts(discounts);
    this.mainPage.draw(this.storage.isLoggedIn(), discountCodes);
  }
}

export default MainController;
