import { navigateTo } from '../app/Router';
import { show404Page } from '../view/page404/page404';
import StorageController from './StorageController';

export default class RouterController {
  private storage: StorageController;

  constructor(storage: StorageController) {
    this.storage = storage;
  }

  private redirectToHome(): void {
    // window.location.href = '/';
    navigateTo('/');
  }

  init(routes: { path: string; view: () => void; name: string }[]): void {
    const isLoggedIn = this.storage.isLoggedIn();
    const currentPath = location.pathname;

    if (
      isLoggedIn &&
      (currentPath === '/login' || currentPath === '/register')
    ) {
      this.redirectToHome();
      document.title = 'Home';
      return;
    }

    const potentialMatches = routes.map(route => ({
      route,
      isMatch: currentPath === route.path,
      name: route.name,
    }));

    const match = potentialMatches.find(
      potentialMatch => potentialMatch.isMatch,
    );

    if (!match) {
      show404Page();
      document.title = '404 Not Found';
    } else {
      match.route.view();
      document.title = match.name;
    }
  }
}
