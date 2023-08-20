import MainPage from '../view/mainPage/MainPage';

import { Controller } from './Controller';

class MainController implements Controller {
  private mainPage: MainPage;

  constructor() {
    this.mainPage = new MainPage();
  }

  draw() {
    this.mainPage.draw();
  }
}

export default MainController;
