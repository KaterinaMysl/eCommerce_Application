import './Contact.css';
import logoImage from '../../../assets/images/logo.png';
import contactInfo from '../../../assets/images/contact-info.png';
import phone from '../../../assets/icons/phone-call.svg';
import message from '../../../assets/icons/message.svg';
import planet from '../../../assets/icons/planet-earth.svg';
import placeholder from '../../../assets/icons/placeholder.svg';

class Contact {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
        <div class="contact-container">
          <div class="contact-home">
            <div class="contact-home_background"></div>
            <div class="contact-home_content">
              <div class="contact-home_title">Contact</div>
            </div>
          </div>

          <div class="content-contact">
            <div class="container-contact">
              <div class="row-contact">
      
                <div class="col-lg-44 contact_column">
                  <div class="contact_content">
                    <div class="logo_container contact_logo">
                      <div class="logo">
                        <a href="/" class="navigator">
                          <img src="${logoImage}" alt="">
                            <div class="logo_text">seagull</div>
                        </a>
                      </div>
                    </div>
                    <p class="contact_about_text">
                    Travel with us and enjoy: <br>
                    <br>
                    Exclusive tours and excursions. Experienced guides who will share unique stories with you. Comfort and safety in every detail of your journey. Support at any time of day or night. Trust us and leave a mark in the world of adventures!</p>
                    <ul class="contact_social_list">
                      <li class="contact_social_item"><a href="#"><i class="fa fa-pinterest"></i></a></li>
                      <li class="contact_social_item"><a href="#"><i class="fa fa-facebook-f"></i></a></li>
                      <li class="contact_social_item"><a href="#"><i class="fa fa-twitter"></i></a></li>
                      <li class="contact_social_item"><a href="#"><i class="fa fa-dribbble"></i></a></li>
                      <li class="contact_social_item"><a href="#"><i class="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-33 contact_column">
                  <div class="contact_col">
                    <ul class="contact_info_list">
                      <li class="contact_info_item d-flex flex-row">
                        <div>
                          <div class="contact_info_icon">
                            <img src="${placeholder}" alt="">
                          </div>
                        </div>
                        <div class="contact_info_text">Exotic Avenue 123 WLD 45678 Adventureland</div>
                      </li>
                      <li class="contact_info_item d-flex flex-row">
                        <div>
                          <div class="contact_info_icon">
                            <img src="${phone}" alt="">
                          </div>
                        </div>
                        <div class="contact_info_text">256-06-8561</div>
                      </li>
                      <li class="contact_info_item d-flex flex-row">
                        <div>
                          <div class="contact_info_icon">
                            <img src="${message}" alt="">
                          </div>
                        </div>
                        <div class="contact_info_text">
                          <a href="#" target="_top">info@exoticave.com</a>
                        </div>
                      </li>
                      <li class="contact_info_item d-flex flex-row">
                        <div>
                          <div class="contact_info_icon">
                            <img src="${planet}" alt="">
                          </div>
                        </div>
                        <div class="contact_info_text">
                          <a href="/">www.seagull.com</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-lg-55 contact_column">
                  <div class="contact_image">
                    <img src="${contactInfo}" alt="">
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="travelix_map">
            <div id="google_map" class="google_map">
              <div class="map_container">
                <div id="map" style="position: relative; overflow: hidden;">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4828.590253344313!2d15.38017721286665!3d43.978044730853924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDU4JzQyLjciTiAxNcKwMjMnMDAuMSJF!5e0!3m2!1sru!2sge!4v1694656356131!5m2!1sru!2sge" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>

        </div>
        
    `;
    bodyContainer.innerHTML = content;
  }
}

export default Contact;
