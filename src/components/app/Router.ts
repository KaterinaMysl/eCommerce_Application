import App from './App';
export const navigateTo = (url: string) => {
  const app = new App();
  history.pushState({}, '', url);
  app.routerControllers();
};
