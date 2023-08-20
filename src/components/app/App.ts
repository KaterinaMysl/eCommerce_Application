import MainController from '../controller/MainController';
import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';

class App {
  private mainController: MainController;
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;
  private logoutController: LogoutController;

  constructor() {
    this.mainController = new MainController();
    const client = new Client();
    this.storage = new StorageController();
    this.loginController = new LoginController(client, this.storage);
    this.registerController = new RegisterController(client);
    this.logoutController = new LogoutController(client, this.storage);
  }

  start() {
    this.mainController.draw();
    this.initMainLoginListeners();
  }

  private initMainLoginListeners() {
    const loginButton = document.querySelector(
      '.user_box_login',
    ) as HTMLElement;

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.loginController.draw();
        this.initLoginListeners();
      });
    }
    const registerButton = document.querySelector(
      '.user_box_register',
    ) as HTMLElement;

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        this.registerController
          .draw()
          .finally(() => this.initRegisterListeners());
      });
    }
  }
  private initLoginListeners() {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const createAccountLink = document.querySelector(
      '.new-account',
    ) as HTMLElement;

    loginForm.addEventListener('submit', e => this.loginController.login(e));
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

    registrationForm.addEventListener('submit', e =>
      this.registerController.register(e),
    );
  }
}

export default App;
