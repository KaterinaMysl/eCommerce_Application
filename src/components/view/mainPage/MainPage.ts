import './MainPage.css';
import logoImage from '../../../assets/images/logo.png';
import homeSlider from '../../../assets/images/home_slider.jpg';
import map from '../../../assets/images/map.png';
import blog1 from '../../../assets/images/blog1.jpg';
import blog2 from '../../../assets/images/blog2.png';
import blog3 from '../../../assets/images/blog3.jpg';
import phone from '../../../assets/icons/phone-call.svg';
import message from '../../../assets/icons/message.svg';
import planet from '../../../assets/icons/planet-earth.svg';
import placeholder from '../../../assets/icons/placeholder.svg';
import { SCROLL_THRESHOLD } from '../../constants';

class MainPage {
  draw(isLoggedIn: boolean) {
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
              ${this.getButtons(isLoggedIn)}
            </div>
            <div class="burger_menu">
              <div class="burger_icon">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
              </div>
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
              <div class="logo">
                <a href="/" class="navigator">
                  <img src="${logoImage}" alt="">
                  <div class="logo_text">seagull</div>
                </a>
              </div>
            </div>
            <div class="main_nav_container">
              <ul class="main_nav_list">
                <li class="main_nav_item"><a href="/" class="navigator">home</a></li>
                <li class="main_nav_item"><a href="#">about us</a></li>
                <li class="main_nav_item"><a href="/catalog" class="navigator">offers</a></li>
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
                        <a href="/catalog">
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
    <div class="text-info-main">
        <h1>travel with us</h1>
        <img src="${map}" alt="">
        <div class="main_info_container">
              <ul class="main_info_list">
                <li class="main_info_item">Travel with Confidence</li>
                <li class="main_info_item">Expert Guides</li>
                <li class="main_info_item">Cultural Immersion</li>
                <li class="main_info_item">Convenience</li>
                <li class="main_info_item">Safety</li>
                <li class="main_info_item">Flexibility</li>
                <li class="main_info_item">Sustainability</li>
                <li class="main_info_item">Memorable Souvenirs</li>
                <li class="main_info_item">Personalized Service</li>
                <li class="main_info_item">Positive Reviews</li>
              </ul>
        </div>
    </div>
  </div>
  <footer class="footer">
    <div class="container-footer">
      <div class="row">
  
        <div class="col-lg-4 footer_column">
          <div class="footer_col">
            <div class="footer_content footer_about">
              <div class="logo_container footer_logo">
                <div class="logo"><a href="/" class="navigator">
                <img src="${logoImage}" alt="">
                <div class="logo_text">seagull</div>
              </a></div>
              </div>
              <p class="footer_about_text">
              Travel with us and enjoy: <br>
              <br>
              Exclusive tours and excursions.<br>
              Experienced guides who will share unique stories with you.<br>
              Comfort and safety in every detail of your journey.<br>
              Support at any time of day or night.<br>
              <br>
              Trust us and leave a mark in the world of adventures!</p>
              <ul class="footer_social_list">
                <li class="footer_social_item"><a href="#"><i class="fa fa-pinterest"></i></a></li>
                <li class="footer_social_item"><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                <li class="footer_social_item"><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li class="footer_social_item"><a href="#"><i class="fa fa-dribbble"></i></a></li>
                <li class="footer_social_item"><a href="#"><i class="fa fa-behance"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="col-lg-4 footer_column">
          <div class="footer_col">
            <div class="footer_title">blog posts</div>
            <div class="footer_content footer_blog">
  
              <div class="footer_blog_item clearfix">
                <div class="footer_blog_image"><img src="${blog1}" alt=""></div>
                <div class="footer_blog_content">
                  <div class="footer_blog_title"><a href="#">Travel with us this year</a></div>
                  <div class="footer_blog_date">Nov 29, 2023</div>
                </div>
              </div>
  
              <div class="footer_blog_item clearfix">
                <div class="footer_blog_image"><img src="${blog2}" alt=""></div>
                <div class="footer_blog_content">
                  <div class="footer_blog_title"><a href="#">New destinations for you</a></div>
                  <div class="footer_blog_date">Nov 29, 2023</div>
                </div>
              </div>
  
              <div class="footer_blog_item clearfix">
                <div class="footer_blog_image"><img src="${blog3}" alt=""></div>
                  <div class="footer_blog_content">
                    <div class="footer_blog_title"><a href="#">Travel with us this year</a></div>
                    <div class="footer_blog_date">Nov 29, 2023</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
  
    
        <div class="col-lg-4 footer_column">
          <div class="footer_col">
            <div class="footer_title">contact info</div>
            <div class="footer_content footer_contact">
              <ul class="contact_info_list">
                <li class="contact_info_item d-flex flex-row">
                  <div><div class="contact_info_icon"><img src="${placeholder}" alt=""></div></div>
                  <div class="contact_info_text">4127 Raoul Wallenber 45b-c Gibraltar</div>
                </li>
                <li class="contact_info_item d-flex flex-row">
                  <div><div class="contact_info_icon"><img src="${phone}" alt=""></div></div>
                  <div class="contact_info_text">2556-808-8613</div>
                </li>
                <li class="contact_info_item d-flex flex-row">
                  <div><div class="contact_info_icon"><img src="${message}" alt=""></div></div>
                  <div class="contact_info_text"><a href="#" target="_top">contactme@gmail.com</a></div>
                </li>
                <li class="contact_info_item d-flex flex-row">
                  <div><div class="contact_info_icon"><img src="${planet}" alt=""></div></div>
                  <div class="contact_info_text"><a href="#">www.seagull.com</a></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <div class="background">
  </div>
</div>
    `;
    document.body.innerHTML = content;
    this.setHeader();
    this.setupBurgerMenu();
  }

  private setHeader() {
    const header = document.querySelector('.header') as HTMLElement;
    function handleScroll() {
      const scrollOffset = window.scrollY || window.scrollY;
      if (scrollOffset > SCROLL_THRESHOLD) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
  }

  private setupBurgerMenu() {
    const burgerMenuButton = document.querySelector(
      '.burger_icon',
    ) as HTMLElement;
    const burgerNavCont = document.querySelector(
      '.main_nav_container',
    ) as HTMLElement;
    const burgerNav = document.querySelector('.main_nav') as HTMLElement;
    const topBar = document.querySelector('.top_bar') as HTMLElement;
    const header = document.querySelector('.header') as HTMLElement;
    const background = document.querySelector('.background') as HTMLElement;

    burgerMenuButton.addEventListener('click', () => {
      burgerNav.classList.toggle('show');
      burgerNavCont.classList.toggle('show');
      topBar.classList.toggle('show');
      burgerMenuButton.classList.toggle('cross');
      header.classList.toggle('show');
      background.classList.toggle('show');

      if (burgerNav.classList.contains('show')) {
        header.classList.add('scrollable-nav');
        document.body.classList.add('no-scroll');
      } else {
        header.classList.remove('scrollable-nav');
        document.body.classList.remove('no-scroll');
      }
    });

    const menuItems = document.querySelectorAll(
      '.main_nav_item a, .logo, .user_box_login, .user_box_register, .user_box_logout, .user_box_profile',
    ) as NodeListOf<HTMLElement>;

    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', () => {
        burgerNav.classList.remove('show');
        burgerNavCont.classList.remove('show');
        topBar.classList.remove('show');
        burgerMenuButton.classList.remove('cross');
        document.body.classList.remove('no-scroll');
        header.classList.remove('show');
        background.classList.remove('show');
      });
    });
  }

  private getButtons(isLoggedIn: boolean): string {
    return isLoggedIn
      ? `<div class="user_box_logout user_box_link"><a href="/" class="navigator">logout</a></div>
         <div class="user_box_profile user_box_link"><a href="/profile" class="navigator">profile</a></div>
        `
      : `
        <div class="user_box_login user_box_link"><a href="/login" class="navigator">login</a></div>
        <div class="user_box_register user_box_link"><a href="/register" class="navigator">register</a></div>
      `;
  }
}

export default MainPage;
