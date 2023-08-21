import '../registrationForm/RegistrationForm.css';
import './UnexpectedErrorPage.css';

class UnexpectedErrorPage {
  draw() {
    const bodyContainer = document.querySelector(
      '.body-container',
    ) as HTMLElement;
    const content = `
        <div class="title">Unexpexted error occured!</div>
        <div class="content">
          <div>Please contact Administrator!</div>
        </div>
    `;
    bodyContainer.innerHTML = content;
  }
}

export default UnexpectedErrorPage;
