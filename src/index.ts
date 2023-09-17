import App from './components/app/App';

const app = new App();

document.addEventListener('DOMContentLoaded', async () => {
  await app.start();
  const url = new URL(window.location.href);
  if (url.pathname.length > 1) {
    app.routerControllers();
  }
});

document.addEventListener('click', e => {
  const element = e.target as HTMLElement;
  if (element.classList.contains('navigator')) {
    if (element.tagName === 'A') {
      const link = element as HTMLLinkElement;
      e.preventDefault();
      app.navigateTo(link.href);
    } else if (element.tagName === 'SPAN') {
      const link = element.closest('a') as unknown as HTMLLinkElement;
      e.preventDefault();
      app.navigateTo(link.href);
    }
  }
});
window.addEventListener('popstate', () => app.routerControllers());
