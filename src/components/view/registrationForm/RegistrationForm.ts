import './RegistrationForm.css';

class RegistrationForm {
  draw(countries: string[]) {
    const bodyContainer = document.querySelector(
      '.body-container',
    ) as HTMLElement;
    const content = `
      <div class="container">
        <div class="title">Registration</div>
        <div class="content">
          <form id="register-form">
            <div class="user-details">
                <div class="input-box">
                    <span class="details">First name</span>
                    <input type="text" placeholder="Enter your first name" name="firstName" required>
                </div>
                <div class="input-box">
                    <span class="details">Last name</span>
                    <input type="text" placeholder="Enter your last name" name="lastName" required>
                </div>
                <div class="input-box">
                    <span class="details">Email</span>
                    <input type="text" placeholder="Enter your email" name="email" required>
                </div>
                <div class="input-box">
                    <span class="details">Date-Of-Birth</span>
                    <input type="date" name="dateOfBirth" required>
                </div>
            </div>
            <fieldset name="address"><legend>Address</legend>
                <div class="input-box">
                    <span class="details">Street</span>
                    <input type="text" placeholder="Enter your street" name="streetName" required>
                </div>
                <div class="input-box">
                    <span class="details">City</span>
                    <input type="text" placeholder="Enter your city" name="city" required>
                </div>
                    <div class="input-box">
                    <span class="details">Postal code</span>
                    <input type="text" placeholder="Enter your postal code" name="postalCode" required>
                </div>
                <div class="input-box">
                     <span class="details">Country</span>
                     <select name="country" required>
                        <option value="" disabled selected>Select your country</option>
                        ${this.buildContriesOptions(countries)}
                     </select>
                </div>
            </fieldset>
            <div class="user-details">
                <div class="input-box">
                    <span class="details">Password</span>
                    <input type="text" placeholder="Enter your password" name="password" required>
                </div>
                <div class="input-box">
                    <span class="details">Confirm Password</span>
                    <input type="text" placeholder="Confirm your password" required>
                </div>
              </div>
            <div id="error-message" style="opacity: 0; color: red; height:20px"></div>
            <div class="button">
              <input class="submit-btn" type="submit" value="Register">
            </div>
          </form>
        </div>
      </div>
    `;
    bodyContainer.innerHTML = content;
  }

  private buildContriesOptions(countries: string[]): string {
    let options = '';
    countries.forEach(c => (options += `<option value="${c}">${c}</option>`));
    return options;
  }
}

export default RegistrationForm;
