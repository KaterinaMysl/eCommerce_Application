import './MainPage.css';
import logoImage from '../../../assets/logo.png';
import homeSlider from '../../../assets/home_slider.jpg';

class MainPage {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setHeader();
      this.initElements();
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
            <div class="main_nav_container ml-auto">
              <ul class="main_nav_list">
                <li class="main_nav_item"><a href="#">home</a></li>
                <li class="main_nav_item"><a href="#">about us</a></li>
                <li class="main_nav_item"><a href="#">offers</a></li>
                <li class="main_nav_item"><a href="#">news</a></li>
                <li class="main_nav_item"><a href="#">contact</a></li>
              </ul>
            </div>
            <div class="content_search ml-lg-0 ml-auto">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="17px" height="17px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                <g>
                  <g>
                    <g>
                      <path class="mag_glass" fill="#FFFFFF" d="M78.438,216.78c0,57.906,22.55,112.343,63.493,153.287c40.945,40.944,95.383,63.494,153.287,63.494
											s112.344-22.55,153.287-63.494C489.451,329.123,512,274.686,512,216.78c0-57.904-22.549-112.342-63.494-153.286
											C407.563,22.549,353.124,0,295.219,0c-57.904,0-112.342,22.549-153.287,63.494C100.988,104.438,78.439,158.876,78.438,216.78z
											M119.804,216.78c0-96.725,78.69-175.416,175.415-175.416s175.418,78.691,175.418,175.416
											c0,96.725-78.691,175.416-175.416,175.416C198.495,392.195,119.804,313.505,119.804,216.78z"></path>
                    </g>
                  </g>
                  <g>
                    <g>
                      <path class="mag_glass" fill="#FFFFFF" d="M6.057,505.942c4.038,4.039,9.332,6.058,14.625,6.058s10.587-2.019,14.625-6.058L171.268,369.98
											c8.076-8.076,8.076-21.172,0-29.248c-8.076-8.078-21.172-8.078-29.249,0L6.057,476.693
											C-2.019,484.77-2.019,497.865,6.057,505.942z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <form id="search_form" class="search_form bez_1">
              <input type="search" class="search_content_input bez_1">
            </form>
            <div class="hamburger">
              <i class="fa fa-bars trans_200"></i>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  


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
  <div class="home">
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias expedita suscipit animi quibusdam, laboriosam nostrum? Nulla iure exercitationem cupiditate nobis tempore odio voluptate repellendus temporibus vel quo? Eos, aliquam repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem? Ducimus sapiente et corrupti eos adipisci numquam. Quasi eius quis earum qui cum minima. Ipsam sed beatae atque aut in?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae neque vero, sapiente commodi, esse rem porro eum alias sit, tempora ex impedit. Eaque, accusantium molestias ad repudiandae commodi velit hic!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. In delectus recusandae esse saepe rem repellendus quas quasi quam temporibus corrupti, natus rerum veritatis a dolor quaerat sit ducimus suscipit necessitatibus?
  </div>

</div>
    `;
    document.body.innerHTML = content;
  }
  private setHeader() {
    const header = document.querySelector('.header') as HTMLElement;
    const menuActive = false; // Используем const

    function closeMenu() {
      // Ваша реализация закрытия меню
    }

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
      if (window.innerWidth > 991 && menuActive) {
        closeMenu();
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }

  private initElements() {
    const loginButton = document.getElementById('user_box_login user_box_link');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        // Логика для обработки клика на кнопку логина
      });
    }

    // Добавьте обработчики для других элементов здесь
  }
}

export default MainPage;
