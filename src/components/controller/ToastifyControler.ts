import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const someFunction = (text: string, ifGood: boolean) => {
  Toastify({
    text: text,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    style: {
      background: ifGood ? 'green' : 'red',
      color: 'black',
    },
  }).showToast();
};
