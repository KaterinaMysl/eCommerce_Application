import './LoginPage.css';

class LoginPage {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
      <div class="main">
        
      </div>
    `;
    bodyContainer.innerHTML = content;
  }
}

export default LoginPage;
