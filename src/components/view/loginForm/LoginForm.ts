import './LoginForm.css';

class LoginForm {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
          <div class="main_login_form">
            <div class="box-form">
                <div class="left">
                    <div class="overlay">
                    <h1>Hello World.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur et est sed felis aliquet sollicitudin</p>
                    </div>
                </div>
                <form id="login-form" class="right">
                    <h5>Login</h5>
                    <p>Don't have an account? <a class="new-account" href="#">Create Your Account</a> it takes less than a minute</p>
                    <div class="inputs">
                        <input type="text" placeholder="user name" id="username" name="username" required>
                        <br>
                        <input type="password" id="password" name="password" placeholder="password" required>
                    </div><br><br>
                    <div class="remember-me--forget-password">
                        <label>
                            <input type="checkbox" name="item" checked/>
                            <span class="text-checkbox">Remember me</span>
                        </label>
                        <p>forget password?</p>
                    </div>
                    <br>
                    <div id="error-message" style="opacity: 0; color: red; height:20px"></div>
                    <div class="button">
                      <input class="submit-btn" type="submit" value="Login">
                    </div>
                </form>
            </div>
          </div>
        `;
    bodyContainer.innerHTML = content;
  }
}

export default LoginForm;
