import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const someFunction = (text: string, ifGood: boolean) => {
  Toastify({
    text: text,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    style: {
      background: ifGood
        ? 'linear-gradient(to right, #20B2AA, #594ae9)'
        : 'linear-gradient(to right, #8e236c, #DC143C)',
      color: 'white',
    },
  }).showToast();
};
