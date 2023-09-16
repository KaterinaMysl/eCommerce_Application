import StorageController from './StorageController';
import Client from '../app/Client';
import LoginForm from '../view/loginForm/LoginForm';
import LoginPage from '../view/loginPage/LoginPage';
import { Controller } from './Controller';
import { handleServerError } from './Validator/handleServerError';
import { navigateTo } from '../app/Router';
import { ErrorResponse } from '../type';

class LoginController implements Controller {
  private client: Client;
  private storage: StorageController;
  private loginPage: LoginPage;
  private loginForm: LoginForm;

  constructor(client: Client, storage: StorageController) {
    this.client = client;
    this.storage = storage;
    this.loginPage = new LoginPage();
    this.loginForm = new LoginForm();
  }

  async login(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('email') as string;
    const password = formData.get('password') as string;
    const response = await this.client.login(username, password);
    if (typeof response === 'string') {
      this.storage.saveCustomerSessionId(response as string);
      this.client.getCustomerDetails(response as string);
      navigateTo('/');
    } else {
      handleServerError(response as ErrorResponse[], form);
    }
  }

  async loginWithCreds(username: string, password: string) {
    const response = await this.client.login(username, password);
    if (typeof response === 'string') {
      this.storage.saveCustomerSessionId(response);
      navigateTo('/');
    } else {
      navigateTo('/unexpected-error');
    }
  }

  draw() {
    this.loginPage.draw();
    this.loginForm.draw();
  }
}

export default LoginController;
