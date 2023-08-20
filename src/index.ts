import App from './components/app/App';
import './global.css';
// import { show404Page } from './components/view/page404/Page404';

const app = new App();
app.start();

// const validRoutes = ['/', '/about', '/products', '/contact'];
// if (!validRoutes.includes(window.location.pathname)) {
//   show404Page();
// }
