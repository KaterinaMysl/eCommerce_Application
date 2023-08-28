import MainPage from '../view/mainPage/MainPage';

import { Controller } from './Controller';
import StorageController from './StorageController';

class MainController implements Controller {
  private mainPage: MainPage;
  private storage: StorageController;

  constructor(storage: StorageController) {
    this.mainPage = new MainPage();
    this.storage = storage;
  }

  draw() {
    this.mainPage.draw(this.storage.isLoggedIn());
  }
}

export default MainController;
