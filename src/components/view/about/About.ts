import './About.css';
import partic1 from '../../../assets/images/portrait1.jpg';
import partic2 from '../../../assets/images/portrait2.jpg';
import partic3 from '../../../assets/images/portrait3.jpg';
import taras from '../../../assets/images/Taras.jpg';
import kate from '../../../assets/images/Kate.jpg';
import katerina from '../../../assets/images/Katerina.jpg';
import intro from '../../../assets/images/intro.png';

class About {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
    <div class="container-about">
      <div class="about-home">
        <div class="about-home_background"></div>
        <div class="about-home_content">
          <div class="about-home_title">ABOUT US</div>
        </div>
      </div>
      <div class="intro">
        <div class="container-intro">
          <div class="row-intro">
            <div class="col-lg-5">
              <div class="intro_image"><img src="${intro}" alt=""></div>
            </div>
            <div class="col-lg-7">
              <div class="intro_content">
                <div class="intro_title">About Project</div>
                <p class="intro_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis vulputate eros, iaculis consequat nisl. Nunc et suscipit urna. Integer elementum orci eu vehicula pretium. Donec bibendum tristique condimentum. Aenean in lacus ligula. Phasellus euismod gravida eros. Aenean nec ipsum aliquet, pharetra magna id, interdum sapien. Etiam id lorem eu nisl pellentesque semper. Nullam tincidunt metus placerat, suscipit leo ut, tempus nulla. Fusce at eleifend tellus. Ut eleifend dui nunc, non fermentum quam placerat non. Etiam venenatis nibh augue, sed eleifend justo tristique eu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="about">
        <div class="title-about">Meet Our Creative Team</div>
        <div class="content-about">
          <div class="participant" id="participant1">
            <div class="avatar">
              <img src="${partic1}" alt="participant1">
            </div>
            <h2>Taras Kazymir</h2>
            <p>Frontend Developer</p>
            <div class="button about_button show-details">
              <div class="button_bcg"></div>
              <buttom>More...</buttom>
            </div>
            <div class="details hidden">
              <div class="avatar-hidden">
                <img src="${taras}" alt="participant1">
              </div>
              <div class="text-container">
                <p>Taras - our development guru, who doesn't just create applications but crafts them with love and passion. He was our captain navigating the turbulent waters of development, and here's what he achieved: registration form, product catalog, shopping cart - all smooth sailing! Don't forget that in challenging moments, he was always the guardian of our success, and his invaluable support was like a chocolate bar in times of hunger.</p>
                <a href="https://github.com/kazymirt">GitHub Profile</a>
              </div>
            </div>
          </div>

          <div class="participant" id="participant2">
            <div class="avatar">
              <img src="${partic2}" alt="participant2">
            </div>
            <h2>Katsiaryna Mysliuchyk</h2>
            <p>Frontend Developer, Team Lead</p>
            <div class="button about_button show-details">
              <div class="button_bcg"></div>
            <buttom>More...</buttom>
            </div>
            <div class="details hidden">
              <div class="avatar-hidden">
                <img src="${katerina}" alt="participant1">
              </div>
              <div class="text-container">
                <p>Katerina - our super developer, who took on the role of the chief architect in the world of applications. She doesn't just code; she creates masterpieces! The repository, the main page, routing - all of it is her handiwork. But don't think she's boring – she added a ton of creativity and animations to make our project not only functional but also as beautiful as a sunrise. And, by the way, Katya is our chief puzzle solver, and team members can always rely on her smart advice.</p>
                <a href="https://github.com/katerinamysl">GitHub Profile</a>
              </div>
            </div>
          </div>

          <div class="participant" id="participant3">
            <div class="avatar">
              <img src="${partic3}" alt="participant3">
            </div>
            <h2>Katsiaryna Mikhalouskaya</h2>
            <p>Frontend Developer</p>
            <div class="button about_button show-details">
              <div class="button_bcg"></div>
              <buttom>More...</buttom>
            </div>
            <div class="details hidden">
              <div class="avatar-hidden">
                <img src="${kate}" alt="participant1">
              </div>
              <div class="text-container">
                <p>Kate - our "web wizard" who made our project better than a magic ball! She was responsible for user login, creating product cards, and perfect work with the shopping cart. And just when you think that's all, don't forget about her meticulous testing, which made our project as solid as a rock against all challenges.</p>
                <a href="https://github.com/katemihalovskaya">GitHub Profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-about" id="modal-about">
        <div class="modal-content-about">
          <span class="close" id="close">&times;</span>
          <div class="modal-details" id="modal-details">
          </div>
        </div>
      </div>
    </div>
    `;
    bodyContainer.innerHTML = content;

    const showDetailsButtons = document.querySelectorAll('.show-details');
    showDetailsButtons.forEach(button => {
      button.addEventListener('click', (event: Event) =>
        this.openModal(event as MouseEvent),
      );
    });

    const closeModalButton = document.getElementById('close');
    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => this.closeModal());
    }
  }

  openModal(event: MouseEvent) {
    this.disableBodyScroll();
    const button = event.target as HTMLElement;
    const participant = button.closest('.participant');
    if (!participant) {
      return;
    }
    const details = participant.querySelector('.details');
    const modal = document.getElementById('modal-about');
    const modalDetails = document.getElementById('modal-details');

    if (modal && modalDetails && details) {
      modalDetails.innerHTML = '';

      const clonedDetails = details.cloneNode(true) as HTMLElement;
      clonedDetails.classList.remove('hidden');
      modalDetails.appendChild(clonedDetails);

      modal.style.display = 'block';
    }
  }

  closeModal() {
    this.enableBodyScroll();
    const modal = document.getElementById('modal-about');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  disableBodyScroll() {
    const fixedHeader = document.querySelector('.header') as HTMLElement;
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = scrollWidth + 'px';
    if (fixedHeader) {
      fixedHeader.style.width = `calc(100% - ${scrollWidth}px)`;
    }
  }

  enableBodyScroll() {
    const fixedHeader = document.querySelector('.header') as HTMLElement;
    document.body.style.overflowY = 'auto';
    document.body.style.paddingRight = '0';
    if (fixedHeader) {
      fixedHeader.style.width = `calc(100%)`;
    }
  }
}

export default About;
