import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';
import Validator from '../controller/Validator/Validator';

class App {
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;
  private logoutController: LogoutController;

  constructor() {
    const client = new Client();
    this.storage = new StorageController();
    this.loginController = new LoginController(client, this.storage);
    this.registerController = new RegisterController(client);
    this.logoutController = new LogoutController(client, this.storage);
  }

  start() {
    this.loginController.draw();
    this.initLoginListeners();
  }

  private initLoginListeners() {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const createAccountLink = document.querySelector(
      '.new-account',
    ) as HTMLElement;
    const validator = new Validator(loginForm);
    validator.initFormListeners();
    loginForm.addEventListener('submit', e => {
      if (validator.checkSubmit(e)) {
        this.loginController.login(e);
      }
    });
    createAccountLink.addEventListener('click', () => {
      this.registerController
        .draw()
        .finally(() => this.initRegisterListeners());
    });
  }

  private initRegisterListeners() {
    const registrationForm = document.getElementById(
      'register-form',
    ) as HTMLFormElement;
    const validator = new Validator(registrationForm);
    validator.initFormListeners();
    registrationForm.addEventListener('submit', e => {
      if (validator.checkSubmit(e)) {
        this.registerController.register(e);
      }
    });
  }
}

export default App;
