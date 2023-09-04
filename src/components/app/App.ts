import MainController from '../controller/MainController';
import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import RegisterController from '../controller/RegisterController';
import StorageController from '../controller/StorageController';
import Client from './Client';
import Validator from '../controller/Validator/Validator';
import UnexpectedErrorPage from '../view/unexpectedErrorPage/UnexpectedErrorPage';
import RouterController from '../controller/RouterController';
import CatalogPage from '../view/catalogPage/CatalogPage';
import ProductItemController from '../controller/ProductController';
class App {
  private mainController: MainController;
  private storage: StorageController;
  private loginController: LoginController;
  private registerController: RegisterController;
  private logoutController: LogoutController;
  private validator: Validator;
  private unexpectedErrorPage: UnexpectedErrorPage;
  private catalogPage: CatalogPage;
  private productItemController: ProductItemController;
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
    this.catalogPage = new CatalogPage();
    this.productItemController = new ProductItemController();
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
        path: '/catalog',
        view: this.checkRouteAndExecute.bind(this),
        name: 'Offers',
      },
      {
        path: '/unexpected-error',
        view: this.errorPage.bind(this),
        name: 'Error',
      },
    ];
    this.routerController.init(routes);
  }

  checkRouteAndExecute() {
    const productName = this.getProductNameFromURL();

    if (productName) {
      this.product(productName);
    } else {
      this.catalog();
    }
  }
  private async catalog() {
    await this.catalogPage.draw();
    this.initCatalogListeners();
  }
  private async product(productName: string) {
    if (!productName) {
      console.error('Product name is missing from the URL!');
      return;
    }
    await this.productItemController.openProductPage(productName);
    this.initProductModalListeners();
  }
  private getProductNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('name');
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

  private initCatalogListeners() {
    const offerItemBtns = document.querySelectorAll('.book_button');
    offerItemBtns.forEach(item => {
      item.addEventListener('click', e => {
        const targetEl = e.target as HTMLElement;
        const productName = targetEl.getAttribute('prod-name');
        if (productName) {
          window.location.href = `/catalog?name=${productName}`;
        }
      });
    });
  }

  private initProductModalListeners() {
    const modal = document.getElementById('product-modal') as HTMLElement;
    const closeBtn = document.getElementById('modal-close') as HTMLElement;
    const imgs = document
      .getElementById('slider')
      ?.querySelectorAll('.swiper-slide');

    imgs?.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflowY = 'hidden';
      });
    });

    closeBtn.onclick = function () {
      modal.style.display = 'none';
      document.body.style.overflowY = 'visible';
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflowY = 'visible';
      }
    };
  }
}

export default App;
