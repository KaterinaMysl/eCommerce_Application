import App from './components/app/App';

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.start();
  app.routerControllers();
});

document.addEventListener('click', e => {
  const element = e.target as HTMLLinkElement;
  if (element.tagName === 'A' && element.classList.contains('navigator')) {
    e.preventDefault();
    app.navigateTo(element.href);
  }
});
window.addEventListener('popstate', () => app.routerControllers());
