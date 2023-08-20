import './MainPage.css';
import logoImage from '../../../assets/logo.png';
import homeSlider from '../../../assets/home_slider.jpg';

class MainPage {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setHeader();
    });
  }
  draw() {
    const content = `
<div class="body-container">
  <header class="header">
    <div class="top_bar">
      <div class="container-main">
        <div class="row">
          <div class="col d-flex flex-row">
            <div class="phone">+000 00 000 00 00</div>
            <div class="social">
              <ul class="social_list">
                <li class="social_list_item"><a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>
                <li class="social_list_item"><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li class="social_list_item"><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li class="social_list_item"><a href="#"><i class="fa fa-dribbble" aria-hidden="true"></i></a></li>
                <li class="social_list_item"><a href="#"><i class="fa fa-behance" aria-hidden="true"></i></a></li>
                <li class="social_list_item"><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
              </ul>
            </div>
            <div class="user_box ml-auto">
              <div class="user_box_login user_box_link"><a href="#">login</a></div>
              <div class="user_box_register user_box_link"><a href="#">register</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="main_nav">
      <div class="container-main">
        <div class="row">
          <div class="col main_nav_col d-flex flex-row align-items-center justify-content-start">
            <div class="logo_container">
              <div class="logo"><a href="#"><img src="${logoImage}" alt="">seagull</a></div>
            </div>
            <div class="main_nav_container">
              <ul class="main_nav_list">
                <li class="main_nav_item"><a href="#">home</a></li>
                <li class="main_nav_item"><a href="#">about us</a></li>
                <li class="main_nav_item"><a href="#">offers</a></li>
                <li class="main_nav_item"><a href="#">news</a></li>
                <li class="main_nav_item"><a href="#">contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="main">
    <div class="home">
      <div class="home_slider_container">
        <div class="owl-carousel owl-theme home_slider owl-loaded owl-drag">
          <div class="owl-stage-outer">
            <div class="owl-stage">
              <div class="owl-item">
                <div class="owl-item home_slider_item">
                  <div class="home_slider_background" style="background-image:url(${homeSlider})"></div>
                  <div class="home_slider_content text-center">
                    <div class="home_slider_content_inner" data-animation-in="flipInX" data-animation-out="animate-out fadeOut">
                      <h1>discover</h1>
                      <h1>the world</h1>
                      <div class="button home_slider_button">
                        <div class="button_bcg"></div>
                        <a href="#">
                        explore now
                        <span></span>
                        <span></span>
                        <span></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias expedita suscipit animi quibusdam, laboriosam nostrum? Nulla iure exercitationem cupiditate nobis tempore odio voluptate repellendus temporibus vel quo? Eos, aliquam repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem? Ducimus sapiente et corrupti eos adipisci numquam. Quasi eius quis earum qui cum minima. Ipsam sed beatae atque aut in?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae neque vero, sapiente commodi, esse rem porro eum alias sit, tempora ex impedit. Eaque, accusantium molestias ad repudiandae commodi velit hic!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. In delectus recusandae esse saepe rem repellendus quas quasi quam temporibus corrupti, natus rerum veritatis a dolor quaerat sit ducimus suscipit necessitatibus?
    </div>
  </div>
</div>
    `;
    document.body.innerHTML = content;
  }
  private setHeader() {
    const header = document.querySelector('.header') as HTMLElement;
    function handleScroll() {
      if (window.innerWidth < 992) {
        if (window.pageYOffset > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      } else {
        if (window.pageYOffset > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }
}

export default MainPage;
