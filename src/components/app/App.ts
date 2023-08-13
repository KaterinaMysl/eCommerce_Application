import LoginController from '../controller/LoginController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';

class App {
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;

  constructor() {
    const client = new Client();
    this.storage = new StorageController();
    this.loginController = new LoginController(client, this.storage);
    this.registerController = new RegisterController(client);
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
