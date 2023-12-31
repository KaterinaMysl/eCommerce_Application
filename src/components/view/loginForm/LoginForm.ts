import './LoginForm.css';
import eyeHidden from '../../../assets/icons/icon-eye-hidden.png';

class LoginForm {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
          <div class="container-login">
            <div class="box-form">
              <div class="left">
                <div class="overlay">
                  <h1>Your journey starts here!</h1>
                  <p>Log in to your account to begin planning your future adventures with our exclusive tours.</p>
                </div>
              </div>
              <form id="login-form" class="right form-login">
                <h5>Login</h5>
                <p>Don't have an account? <a class="new-account navigator" href="/register">Create Your Account</a> it takes less than a minute</p>
                <div class="inputs">
                  <div class="login-container">
                    <input class="input-email required" type="text" data-pattern="email" name="email" id="form-email">
                    <span>user@example.com</span>
                    <p class="error-message" data-message="Please enter your email address"></p>
                  </div>
                  <div class="password-container">
                    <input class="input-password required" type="password" name="password" data-pattern="password" id="form-password">
                    <span>password</span>
                    <img src="${eyeHidden}" class="img-password">
                    <p class="error-message" data-message="Please enter your password."></p>
                  </div>
                </div>               
                <div class="button">
                  <input class="submit-btn" type="submit" value="Login">
                  <p class="error-message" style="color: red; height:20px"></p>
                </div>
              </form>
            </div>
          </div>                 
    `;
    bodyContainer.innerHTML = content;
  }
}

export default LoginForm;
