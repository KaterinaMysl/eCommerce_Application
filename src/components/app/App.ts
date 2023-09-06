import MainController from '../controller/MainController';
import LoginController from '../controller/LoginController';
import LogoutController from '../controller/LogoutController';
import ProfileController from '../controller/ProfileController';
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
  private profileController: ProfileController;
  private validator: Validator;
  private unexpectedErrorPage: UnexpectedErrorPage;
  private catalogPage: CatalogPage;
  private productItemController: ProductItemController;
  private routerController: RouterController;
  private client: Client;

  constructor() {
    this.client = new Client();
    this.storage = new StorageController();
    this.validator = new Validator();
    this.routerController = new RouterController(this.storage);
    this.mainController = new MainController(this.storage);
    this.loginController = new LoginController(this.client, this.storage);
    this.registerController = new RegisterController(
      this.client,
      this.loginController,
    );
    this.logoutController = new LogoutController(this.client, this.storage);
    this.profileController = new ProfileController(this.client, this.storage);
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
      { path: '/test', view: this.profile.bind(this), name: 'Home' },
      { path: '/login', view: this.login.bind(this), name: 'Login' },
      { path: '/register', view: this.register.bind(this), name: 'Register' },
      { path: '/profile', view: this.profile.bind(this), name: 'Profile' },
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
  async profile() {
    const customer = await this.client.getCustomer();
    if (customer) {
      this.profileController.draw(customer);
      this.initUserFormListener();
    }
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
    if (loginForm) {
      this.validator.initFormListeners(loginForm);

      loginForm.addEventListener('submit', e => {
        if (this.validator.checkSubmit(e, loginForm)) {
          this.loginController.login(e);
        }
      });
    }
  }
  private initUserFormListener() {
    const addNewAddress = document.querySelector(
      '.add-new_address',
    ) as HTMLElement;
    addNewAddress.addEventListener('click', async () => {
      await this.profileController.addNewAddress();
      const createAddress = Array.from(
        document.querySelectorAll('.create_address'),
      ) as HTMLElement[];
      await createAddress.forEach(create =>
        create.addEventListener('click', async (event: Event) => {
          await this.profileController.addCreateNewAddress(event);
          updateEvent();
        }),
      );
    });

    const userForm = document.querySelector('#profile-form') as HTMLFormElement;
    this.validator.initFormListeners(userForm);

    const saveAddress = Array.from(
      document.querySelectorAll('.edit_address'),
    ) as HTMLElement[];
    const deleteAddress = Array.from(
      document.querySelectorAll('.delete_address'),
    ) as HTMLElement[];
    const saveEdit = Array.from(
      document.querySelectorAll('.img-input-icon'),
    ) as HTMLElement[];
    const password = document.querySelector('.edit-password') as HTMLElement;

    const updateEvent = () => {
      const saveAddress = Array.from(
        document.querySelectorAll('.edit_address'),
      ) as HTMLElement[];
      saveAddress.forEach(save => {
        save.removeEventListener('click', (event: Event) => {
          this.profileController.editAddress(event);
        });
      });
      saveAddress.forEach(save =>
        save.addEventListener('click', (event: Event) => {
          this.profileController.editAddress(event);
        }),
      );
      const deleteAddress = Array.from(
        document.querySelectorAll('.delete_address'),
      ) as HTMLElement[];
      deleteAddress.forEach(address =>
        address.removeEventListener('click', (event: Event) => {
          this.profileController.deleteAddress(event);
        }),
      );
      deleteAddress.forEach(address =>
        address.addEventListener('click', (event: Event) => {
          this.profileController.deleteAddress(event);
        }),
      );
    };
    deleteAddress.forEach(address =>
      address.addEventListener('click', (event: Event) => {
        this.profileController.deleteAddress(event);
      }),
    );
    saveEdit.forEach(save => {
      save.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLImageElement;
        this.profileController.editElements(target);
      });
    });
    saveAddress.forEach(save =>
      save.addEventListener('click', (event: Event) => {
        this.profileController.editAddress(event);
      }),
    );
    password.addEventListener('click', (event: Event) => {
      this.profileController.editPasswords(event);
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
