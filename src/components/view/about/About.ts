import './About.css';
import partic1 from '../../../assets/images/portrait1.jpg';
import partic2 from '../../../assets/images/portrait2.jpg';
import partic3 from '../../../assets/images/portrait3.jpg';

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
      <div class="about">
        <div class="title-about">Meet Our Creative Team</div>
        <div class="content-about">
          <div class="participant" id="participant1">
            <div class="avatar">
              <img src="${partic1}" alt="participant1">
            </div>
            <h2>Taras</h2>
            <p>Frontend Developer</p>
            <div class="button about_button show-details">
            <div class="button_bcg"></div>
          <buttom>More...</buttom>
          </div>
            <div class="details hidden">
              <p>Expert in building robust and scalable server-side solutions.</p>
              <a href="https://github.com/kazymirt">GitHub Profile</a>
            </div>
          </div>

          <div class="participant" id="participant2">
            <div class="avatar">
              <img src="${partic2}" alt="participant2">
            </div>
            <h2>Kate</h2>
            <p>Frontend Developer, Team Lead</p>
            <div class="button about_button show-details">
            <div class="button_bcg"></div>
          <buttom>More...</buttom>
          </div>
            <div class="details hidden">
              <p>Crafting beautiful and intuitive user interfaces.</p>
              <a href="https://github.com/katerinamysl">GitHub Profile</a>
            </div>
          </div>

          <div class="participant" id="participant3">
            <div class="avatar">
              <img src="${partic3}" alt="participant3">
            </div>
            <h2>Kate</h2>
            <p>Frontend Developer</p>
            <div class="button about_button show-details">
              <div class="button_bcg"></div>
            <buttom>More...</buttom>
            </div>
            <div class="details hidden">
              <p>Passionate about creating user-friendly web experiences.</p>
              <a href="https://github.com/katemihalovskaya">GitHub Profile</a>
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
    const modal = document.getElementById('modal-about');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}

export default About;
