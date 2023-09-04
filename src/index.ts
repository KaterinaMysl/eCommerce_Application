import App from './components/app/App';

const app = new App();
app.start();

document.addEventListener('DOMContentLoaded', () => {
  app.routerControllers();
});

document.addEventListener('click', e => {
  const element = e.target as HTMLLinkElement;
  if (element.tagName === 'A' && element.classList.contains('navigator')) {
    e.preventDefault();
    app.navigateTo(element.href);
    alert(
      'Рады вас видеть! Лучшие туры еще готовятся для вас. Просьба вернуться к нам через пару дней. Большое спасибо за понимание :)',
    );
  }
});
window.addEventListener('popstate', () => app.routerControllers());
