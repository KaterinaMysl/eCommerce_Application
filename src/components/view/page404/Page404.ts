import './Page404.css';
import image404 from '../../../assets/images/bird404.png';

function show404Page() {
  const bodyContainer = document.querySelector('.main') as HTMLElement;
  const content = `
    <div class="container-404 container-main">
      <div class="box-content-404">
        <div class="first-404 col-404">
          <h1 class="title-404">404</h1>
          <h2 class="text-404">We don't have such a page, but we have cool tours for your vacation.</h2>
        </div>
        <div class="second-404 col-404">
          <div class="picture-404">
            <img src="${image404}" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  bodyContainer.innerHTML = content;
}

export { show404Page };
