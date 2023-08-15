import './RegistrationForm.css';
import eyeHidden from '../../../assets/icons/icon-eye-hidden.png';

class RegistrationForm {
  draw(countries: string[]) {
    const bodyContainer = document.querySelector(
      '.body-container',
    ) as HTMLElement;
    const content = `
      <div class="container">
        <div class="title">Sign Up</div>
        <div class="content">
          <form id="register-form" class="form-registration">
            <div class="form-registration__one">
                <div class="input-box">
                    <label class="details" for="first-name">First name</label>
                    <div>
                      <input type="text" data-pattern="firstName" id="first-name" name="firstName">
                      <span>Taras</span>
                      <p class="error-message" data-message="Please enter your first name."></p>
                    </div>
                </div>
                <div class="input-box">
                    <label class="details" for="last-name">Last name</label>
                    <div>
                      <input type="text" data-pattern="lastName" id="last-name" name="lastName">
                      <span>Kazymir</span>
                      <p class="error-message" data-message="Please enter your last name."></p>
                    </div>
                </div>
                <div class="input-box">
                    <label class="details" for="last-name">Email</label>
                    <div>
                      <input type="text" data-pattern="email" id="form-email" name="email">
                      <span>user@example.com</span>
                      <p class="error-message" data-message="Please enter your email."></p>
                    </div>
                </div>
                <div class="input-box">
                    <label class="details" for="form-age">Date of birth</label>
                    <div>
                      <input type="date" data-pattern="age" id="form-age" name="dateOfBirth">
                      <span class="date">11/11/1997</span>
                      <p class="error-message" data-message="Please enter your date of birth"></p>
                    </div>
                </div>
            </div>
            <div class="form-registration__two">
            <fieldset name="shippingAddress"><legend>Billing address:</legend>
            <div class="input-box">
              <label class="details" for="form-country">Country</label>
              <div>
                <select  id="form-country" name="country">
                <option value="" disabled selected hidden>Select your country</option>
                ${this.buildContriesOptions(countries)}
                </select>
                <p class="error-message" data-message="Please enter your postal code"></p>
              </div>
            </div>
            <div class="input-box">
              <label class="details" for="form-street">Street</label>
              <div>
                <input type="text" data-pattern="street" id="form-street" name="streetName">
                <span>Independent</span>
                <p class="error-message" data-message="Please enter your street"></p>
              </div>
            </div>
            <div class="input-box">
              <label class="details" for="form-city">City</label>
              <div>
                <input type="text" data-pattern="city" id="form-city" name="city">
                <span>Kyiv</span>
                <p class="error-message" data-message="Please enter your city"></p>
              </div>
            </div>
            <div class="input-box disabled" >
              <label class="details" for="form-postalCode">Postal code</label>
              <div>
                <input type="text" disabled data-pattern="postalCode" id="form-postalCode" name="postalCode">
                <span>11111</span>
                <p class="error-message" data-message="Please enter your postal code"></p>
              </div>
            </div>
        </fieldset>

        <fieldset name="billingAddress" class="fieldset-two"><legend>Shipping address:</legend>
        <div class="input-box">
        <label class="details" for="form-country2">Country</label>
        <div>
          <select  id="form-country2" name="country">
          <option value="" disabled selected hidden>Select your country</option>
          ${this.buildContriesOptions(countries)}
          </select>
          <p class="error-message" data-message="Please enter your postal code"></p>
        </div>
      </div>
        <div class="input-box">
        <label class="details" for="form-street2">Street</label>
        <div>
          <input type="text" data-pattern="street" id="form-street2" name="streetName">
          <span>Independent</span>
          <p class="error-message" data-message="Please enter your street"></p>
        </div>
      </div>
      <div class="input-box">
        <label class="details" for="form-city2">City</label>
        <div>
          <input type="text" data-pattern="city" id="form-city2" name="city">
          <span>Kyiv</span>
          <p class="error-message" data-message="Please enter your city"></p>
        </div>
      </div>
      <div class="input-box">
        <label class="details" for="form-postalCode2">Postal code</label>
        <div>
          <input type="text" data-pattern="postalCode" disabled id="form-postalCode2" name="postalCode">
          <span>11111</span>
          <p class="error-message" data-message="Please enter your postal code"></p>
        </div>
      </div>
        </fieldset>
        <div class="input-box input-checkbox">
            <input type="checkbox" id="checkbox-address" disabled>
            <label for="checkbox-address">Set as address for billing and shipping</label>
            </div>
            </div>
            <div class="user-details form-registration__three">
              <div class="input-box">
              <label class="details" for="form-password">Password</label>
              <div>
                <input type="password" class="input-password" data-pattern="password" id="form-password" name="password" >
                <span>password</span>
                <img src="${eyeHidden}" class="img-password">
                <p class="error-message" data-message="Please enter your password."></p>
              </div>
            </div>
            <div class="input-box">
              <label class="details" for="confirm-password">Confirm password</label>
              <div>
                <input type="password" class="input-password" disabled data-pattern="confirmPassword" id="confirm-password" name="password">
                <span>Confirm your password</span>
                <img src="${eyeHidden}" class="img-password">
                <p class="error-message" data-message="Please enter your password."></p>
              </div>
            </div>    
          </div>
             
            <div class="input-box form-registration__four">
              <input class="submit-btn" type="submit" value="Register">
              <p id="error-message" style="opacity: 0; color: red; height:20px"></p>
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
