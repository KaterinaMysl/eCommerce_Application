import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const someFunction = (text: string, ifGood: boolean) => {
  Toastify({
    text: text,
    duration: 3000, // Продолжительность показа уведомления (в миллисекундах)
    gravity: 'top', // Расположение уведомления (например, "bottom" для нижней части экрана)
    position: 'center',
    style: {
      background: ifGood ? 'green' : 'red',
      color: 'black',
    },
    // backgroundColor: 'linear-gradient(to right, #71b7e6, #9b59b6)',
  }).showToast();
};
