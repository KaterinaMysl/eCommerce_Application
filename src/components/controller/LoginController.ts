import StorageController from './StorageController';
import Client from '../app/Client';
import LoginForm from '../view/loginForm/LoginForm';
import LoginPage from '../view/loginPage/LoginPage';

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
    const errorMessageElement = document.getElementById(
      'error-message',
    ) as HTMLElement;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    this.client
      .login(username, password)
      .then((id: string) => {
        this.storage.saveCustomerSessionId(id);
        window.location.href = '/';
      })
      .catch(error => {
        console.log(error);
        errorMessageElement.textContent =
          'Invalid username or password. Please try again.';
        errorMessageElement.style.opacity = '1';
      });
  }

  draw() {
    this.loginPage.draw();
    this.loginForm.draw();
  }
}

export default LoginController;
