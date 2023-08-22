import App from './components/app/App';

const app = new App();
app.start();

export const navigateTo = (url: string) => {
  history.pushState({}, '', url);
  app.routerControllers();
};

document.addEventListener('DOMContentLoaded', () => {
  app.routerControllers();
});

document.addEventListener('click', e => {
  const element = e.target as HTMLLinkElement;
  if (element) {
    if (element.tagName === 'A' && element.classList.contains('navigator')) {
      console.log(element);
      e.preventDefault();
      navigateTo(element.href);
    }
  }
});
window.addEventListener('popstate', () => app.routerControllers());
