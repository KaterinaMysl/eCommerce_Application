import './LoginForm.css';
import eyeHidden from '../../../assets/icons/icon-eye-hidden.png';

class LoginForm {
  draw() {
    const bodyContainer = document.querySelector(
      '.body-container',
    ) as HTMLElement;
    const content = `
            <div class="form-box">
                <div class="form-container">
                  <div class="form-content">
                    <h3>Sign in</h3>
                    <p>Don't have an account? <a class="new-account" href="#">Sign Up</a></p>
                    <form id="login-form" class="form-login">   
                      <div>
                        <div>
                          <input class="input-email" type="text" data-pattern="email" name="username" id="form-email">
                          <span>user@example.com</span>
                          <p class="error-message" data-message="Please enter your email address"></p>
                        </div>
                      </div>
                      <div class="password-container">
                        <div>
                          <input class="input-password" type="password" name="password" data-pattern="password" id="form-password">
                          <span>password</span>
                            <img src="${eyeHidden}" class="img-password">
                          <p class="error-message" data-message="Please enter your password."></p>
                        </div>
                      </div>
                      <div>
                        <input class="submit-btn" type="submit" value="Login">
                        <p id="error-message" class="error-message" style="opacity: 0; color: red;"></p>
                      </div>
                  </form>
                  </div> 
                </div>
            </div>                 
        `;
    bodyContainer.innerHTML = content;
  }
}

export default LoginForm;
