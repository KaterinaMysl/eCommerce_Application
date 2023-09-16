import './About.css';
import partic1 from '../../../assets/images/portrait1.jpg';
import partic2 from '../../../assets/images/portrait2.jpg';
import partic3 from '../../../assets/images/portrait3.jpg';
import taras from '../../../assets/images/Taras.jpg';
import kate from '../../../assets/images/Kate.jpg';
import katerina from '../../../assets/images/Katerina.jpg';
import intro from '../../../assets/images/intro.png';
import sea from '../../../assets/images/sea.png';
import telegram from '../../../assets/icons/telegram.png';
import github from '../../../assets/icons/github.png';
import mail from '../../../assets/icons/mail.png';
import rss from '../../../assets/icons/rs_school.svg';

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
                <p class="intro_text">Our travel agency SEAGULL is a convenient and multifunctional online platform designed for travelers, leisure enthusiasts, and those dreaming of exciting adventures. We offer a wide range of services, including tour booking, flight ticket reservations, cruises, hotels, entertainment, and car rentals. Our intuitively designed application is created to provide maximum convenience for customers seeking the best options for an unforgettable vacation. Reliable, accessible, and perfect for anyone dreaming of the ideal getaway.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="testimonials">
        <div class="test_border"></div>
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
            <div class="details-about hidden">
              <div class="avatar-hidden">
                <img src="${taras}" alt="participant1">
              </div>
              <div class="text-container">
                <h2>Taras Kazymir</h2>
                <p> <span class="about-bio bio">About me: </span>"I am a highly motivated and detail-oriented individual with a passion for achieving success. With excellent communication and interpersonal skills, I am able to work effectively both independently and as part of a team. As a quick learner and problem solver, I am always eager to take on new challenges and develop my skillset. Overall, I am committed to delivering high-quality work and contributing to the success of any project or organization I am a part of."</p>
                <p> <span class="location bio">Location: </span>Khotyn, Ukraine</p>
                <p> <span class="education bio">Education: </span>Podillia State University</p>
                <p> <span class="english bio">English: </span>A1</p>
                <p> <span class="skills bio">Skills: </span>HTML, CSS/SASS, JavaScript, GIT, GitHub, VS Code</p>
                <p> <span class="contributions bio">Contributions: </span>Taras - our development guru, who doesn't just create applications but crafts them with love and passion. He was our captain navigating the turbulent waters of development, and here's what he achieved: registration form, product catalog, shopping cart - all smooth sailing! Don't forget that in challenging moments, he was always the guardian of our success, and his invaluable support was like a chocolate bar in times of hunger.</p>
                <p class="contact-bio"> 
                  <a href="https://t.me/T_Kazymir">
                    <img src="${telegram}" alt="Telegram Icon">
                  </a>
                  <a href="https://github.com/kazymirt">
                    <img src="${github}" alt="GitHub Icon">
                  </a>
                  <a href="mailto:kazemir.t23.23@gmail.com">
                    <img src="${mail}" alt="Email Icon">
                  </a>
                </p>
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
            <div class="details-about hidden">
              <div class="avatar-hidden">
                <img src="${katerina}" alt="participant1">
              </div>
              <div class="text-container">
                <h2>Katsiaryna Mysliuchyk</h2>
                <p> <span class="about-bio bio">About me: </span>"I want to change my job to a Frontend Developer. I study the relevant literature, take courses, master new technologies, improve the level of English. I believe that if you are in love with your work, your goal is achieved with great success.</p>

                <p> Engineering education and BIM technology help in better understanding of the logic and process of creating code. Drawing and photography skills allow me to better understand the aesthetic component of the desired profession, to achieve contact with the user, harmoniously applying the existing experience with color, proportions and other tools.</p>
                
                <p> My path is based on the principle: the accumulation of new knowledge to the existing experience will help me in the desired profession."</p>
                <p> <span class="location bio">Location: </span>Batumi, Georgia</p>
                <p> <span class="education bio">Education: </span>Belarusian National Technical University</p>
                <p> <span class="english bio">English: </span>B1</p>
                <p> <span class="skills bio">Skills: </span>HTML, CSS/SASS, JS, TS, GIT/GitHub, VS Code, WebPack, Figma, Photoshop</p>
                <p> <span class="contributions bio">Contributions: </span>Katerina - our super developer, who took on the role of the chief architect in the world of applications. She doesn't just code; she creates masterpieces! The repository, the main page, routing - all of it is her handiwork. But don't think she's boring – she added a ton of creativity and animations to make our project not only functional but also as beautiful as a sunrise. And, by the way, Katya is our chief puzzle solver, and team members can always rely on her smart advice.</p>
                <p class="contact-bio"> 
                  <a href="https://t.me/Katerina_382">
                    <img src="${telegram}" alt="Telegram Icon">
                  </a>
                  <a href="https://github.com/KaterinaMysl">
                    <img src="${github}" alt="GitHub Icon">
                  </a>
                  <a href="mailto:myslivchik382@gmail.com">
                    <img src="${mail}" alt="Email Icon">
                  </a>
                </p>
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
            <div class="details-about hidden">
              <div class="avatar-hidden">
                <img src="${kate}" alt="participant1">
              </div>
              <div class="text-container">
                <h2>Katsiaryna Mikhalouskaya</h2>
                <p> <span class="about-bio bio">About me: </span>"I’m an enthusiastic and detail-oriented Frontend Software Engineer seeking an entry-level position with Company to use my professional and soft skills in solving and troubleshooting of complex problems, and assisting in the timely completion of projects."</p>
                <p> <span class="location bio">Location: </span>Rotterdam, Netherlands</p>
                <p> <span class="education bio">Education: </span>Belarusian National Technical University</p>
                <p> <span class="english bio">English: </span>B1</p>
                <p> <span class="skills bio">Skills: </span>Javascript/ES5/ES6, HTML5, CSS3, Bootstrap, Webpack/NPM, AJAX/JSON, Git, Figma, Visual Studio Code</p>
                <p> <span class="contributions bio">Contributions: </span>Katerina - our super developer, who took on the role of the chief architect in the world of applications. She doesn't just code; she creates masterpieces! The repository, the main page, routing - all of it is her handiwork. But don't think she's boring – she added a ton of creativity and animations to make our project not only functional but also as beautiful as a sunrise. And, by the way, Katya is our chief puzzle solver, and team members can always rely on her smart advice.</p>
                <p class="contact-bio"> 
                  <a href="https://t.me/KatherinaMik">
                    <img src="${telegram}" alt="Telegram Icon">
                  </a>
                  <a href="https://github.com/katemihalovskaya">
                    <img src="${github}" alt="GitHub Icon">
                  </a>
                  <a href="mailto:ekaterina.mihalovskaya@gmail.com">
                    <img src="${mail}" alt="Email Icon">
                  </a>
                </p>
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
      <div class="add-info">
        <div class="add_container">
          <div class="add_background" style="background-image:url(${sea})"></div>
          <div class="add_content">
            <h1 class="add_title">How we managed to</h1>
            <p class="add_subtitle">    The success of our project can be compared to organizing the most unusual journey: we carefully allocated tasks on the Jira board as if we were planning a grand tour to the Uncharted Software Islands, where each sprint was a new stage of our exciting adventure. Our daily Discord meetings were so vivid that it seemed like we were not communicating through screens but gathered together by the seaside to discuss our adventure plans. However, this open and united approach allowed us to reach our goal and complete our "tourist" adventure with flying colors!</p>
          </div>
        </div>
      </div>
      <div class="rss">
        <div class="container-rss">
          <div class="rss-logo">
            <a href="https://rs.school/" class="rss-link">
              <img src="${rss}" alt="rss Icon" class="rss-image">
            </a>
          </div>
          <div class="rss-content">
            <h1 class="rss_title">How we managed to</h1>
            <p class="rss_subtitle">We acquired valuable frontend development skills thanks to RS School. This free program, organized by The Rolling Scopes community since 2013, is open to everyone regardless of age, profession, or location. Our mentors are experienced developers from various countries and companies. RS School played a pivotal role in our learning and growth in this field. If you're looking to enhance your frontend development skills too, we highly recommend exploring RS School.</p>
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
    const details = participant.querySelector('.details-about');
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
