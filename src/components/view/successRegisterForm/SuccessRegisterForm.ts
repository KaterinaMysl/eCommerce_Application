import '../registrationForm/RegistrationForm.css';
import './SuccessRegisterForm.css';

class SuccessRegisterForm {
  draw() {
    const bodyContainer = document.querySelector('.container') as HTMLElement;
    const content = `
        <div class="title">Registration</div>
        <div class="content">
          <div id="success-message">Your registration has been completed successfully!</div>
          <div class="button">
            <input class="submit-btn" value="Login">
          </div>
        </div>
    `;
    bodyContainer.innerHTML = content;
  }
}

export default SuccessRegisterForm;
