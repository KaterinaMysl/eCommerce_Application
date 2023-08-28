import '../registrationForm/RegistrationForm.css';
import './UnexpectedErrorPage.css';

class UnexpectedErrorPage {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
        <div class="unexpexted-error">
          <div class="title-un">Unexpected error occurred!</div>
          <div class="content">
            <div>Please contact Administrator!</div>
          </div>
        </div>
        
    `;
    bodyContainer.innerHTML = content;
  }
}

export default UnexpectedErrorPage;
