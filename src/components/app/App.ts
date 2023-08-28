import MainController from '../controller/MainController';
import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';
import Validator from '../controller/Validator/Validator';
import UnexpectedErrorPage from '../view/unexpectedErrorPage/UnexpectedErrorPage';
import RouterController from '../controller/RouterController';

class App {
  private mainController: MainController;
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;
  private logoutController: LogoutController;
  private validator: Validator;
  private unexpectedErrorPage: UnexpectedErrorPage;
  private routerController: RouterController;
  constructor() {
    const client = new Client();
    this.storage = new StorageController();
    this.validator = new Validator();
    this.routerController = new RouterController(this.storage);
    this.mainController = new MainController(this.storage);
    this.loginController = new LoginController(client, this.storage);
    this.registerController = new RegisterController(
      client,
      this.loginController,
    );
    this.logoutController = new LogoutController(client, this.storage);
    this.unexpectedErrorPage = new UnexpectedErrorPage();
  }
  navigateTo(url: string) {
    history.pushState({}, '', url);
    this.routerControllers();
  }

  routerControllers() {
    const routes = [
      { path: '/', view: this.start.bind(this), name: 'Home' },
      { path: '/login', view: this.login.bind(this), name: 'Login' },
      { path: '/register', view: this.register.bind(this), name: 'Register' },
      {
        path: '/unexpected-error',
        view: this.errorPage.bind(this),
        name: 'Error',
      },
    ];
    this.routerController.init(routes);
  }

  errorPage() {
    this.unexpectedErrorPage.draw();
  }
  start() {
    this.mainController.draw();
    this.initMainLoginListeners();
  }
  login() {
    this.loginController.draw();
    this.initLoginListeners();
  }
  register() {
    this.registerController.draw().finally(() => this.initRegisterListeners());
  }

  private initMainLoginListeners() {
    const logoutButton = document.querySelector(
      '.user_box_logout',
    ) as HTMLElement;

    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        this.logoutController.logout();
        this.initLoginListeners();
      });
    }
  }
  private initLoginListeners() {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    this.validator.initFormListeners(loginForm);

    loginForm.addEventListener('submit', e => {
      if (this.validator.checkSubmit(e, loginForm)) {
        this.loginController.login(e);
      }
    });
  }

  private initRegisterListeners() {
    const registrationForm = document.getElementById(
      'register-form',
    ) as HTMLFormElement;

    this.validator.initFormListeners(registrationForm);

    registrationForm.addEventListener('submit', e => {
      if (this.validator.checkSubmit(e, registrationForm)) {
        this.registerController.register(e);
      }
    });
  }
}

export default App;
