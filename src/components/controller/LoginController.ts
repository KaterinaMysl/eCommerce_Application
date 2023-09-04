import StorageController from './StorageController';
import Client from '../app/Client';
import LoginForm from '../view/loginForm/LoginForm';
import LoginPage from '../view/loginPage/LoginPage';
import { Controller } from './Controller';
import { handleServerError } from './Validator/handleServerError';

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

  login(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('email') as string;
    const password = formData.get('password') as string;
    this.client
      .login(username, password)
      .then((id: string) => {
        this.storage.saveCustomerSessionId(id);
        return this.client.getCustomerDetails(id);
      })
      .then(customerData => {
        this.client.setCustomerData(customerData);
        // window.location.href = '/';
      })
      .catch(error => {
        handleServerError(error, form);
      });
  }

  loginWithCreds(username: string, password: string) {
    this.client
      .login(username, password)
      .then((id: string) => {
        this.storage.saveCustomerSessionId(id);
        window.location.href = '/';
      })
      .catch(() => {
        window.location.href = '/unexpected-error';
      });
  }

  draw() {
    this.loginPage.draw();
    this.loginForm.draw();
  }
}

export default LoginController;
