import './Contact.css';

class Contact {
  draw() {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
        <div class="contact">
          <div class="title-contact">About</div>
          <div class="content-contact">
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
            <div>contact</div>
          </div>
        </div>
        
    `;
    bodyContainer.innerHTML = content;
  }
}

export default Contact;
