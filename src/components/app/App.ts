import MainController from '../controller/MainController';
import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';
import Validator from '../controller/Validator/Validator';
import { show404Page } from '../view/page404/page404';
import UnexpectedErrorPage from '../view/unexpectedErrorPage/UnexpectedErrorPage';

class App {
  private mainController: MainController;
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;
  private logoutController: LogoutController;
  private validator: Validator;
  private unexpectedErrorPage: UnexpectedErrorPage;
  constructor() {
    const client = new Client();
    this.storage = new StorageController();
    this.validator = new Validator();
    this.mainController = new MainController(this.storage);
    this.loginController = new LoginController(client, this.storage);
    this.registerController = new RegisterController(
      client,
      this.loginController,
    );
    this.logoutController = new LogoutController(client, this.storage);
    this.unexpectedErrorPage = new UnexpectedErrorPage();
  }
  async router() {
    const routes = [
      { path: '/', view: this.main.bind(this) },
      { path: '/login', view: this.login.bind(this) },
      { path: '/register', view: this.register.bind(this) },
      { path: '/unexpected-error', view: this.errorPage.bind(this) },
    ];
    const potentialMatches = routes.map(route => {
      return {
        route: route,
        isMatch: location.pathname === route.path,
      };
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
      match = {
        route: { path: '/404', view: this.page404 },
        isMatch: true,
      };
    }
    match.route.view();
  }
  page404() {
    show404Page();
  }
  errorPage() {
    this.unexpectedErrorPage.draw();
  }
  start() {
    this.mainController.draw();
    this.initMainLoginListeners();
  }
  main() {
    this.mainController.draw();
    this.initMainLoginListeners();
  }
  login() {
    console.log(this.loginController);
    this.loginController.draw();
    this.initLoginListeners();
  }
  register() {
    this.registerController.draw().finally(() => this.initRegisterListeners());
  }

  private initMainLoginListeners() {
    const loginButton = document.querySelector(
      '.user_box_login',
    ) as HTMLElement;

    const registerButton = document.querySelector(
      '.user_box_register',
    ) as HTMLElement;

    const logoutButton = document.querySelector(
      '.user_box_logout',
    ) as HTMLElement;

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.loginController.draw();
        this.initLoginListeners();
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', () => {
        this.registerController
          .draw()
          .finally(() => this.initRegisterListeners());
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        this.logoutController.logout();
        this.initLoginListeners();
      });
    }
  }
  private initLoginListeners() {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const createAccountLink = document.querySelector(
      '.new-account',
    ) as HTMLElement;
    this.validator.initFormListeners(loginForm);
    loginForm.addEventListener('submit', e => {
      if (this.validator.checkSubmit(e, loginForm)) {
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
    const loginAccount = document.querySelector(
      '.login-account',
    ) as HTMLElement;

    this.validator.initFormListeners(registrationForm);
    registrationForm.addEventListener('submit', e => {
      if (this.validator.checkSubmit(e, registrationForm)) {
        this.registerController.register(e);
      }
    });
    loginAccount.addEventListener('click', () => {
      this.loginController.draw();
      this.initLoginListeners();
    });
  }
}

export default App;
