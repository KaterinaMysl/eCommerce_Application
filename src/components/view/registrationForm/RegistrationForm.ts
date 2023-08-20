import './RegistrationForm.css';
import eyeHidden from '../../../assets/icons/icon-eye-hidden.png';

class RegistrationForm {
  draw(countries: string[]) {
    const bodyContainer = document.querySelector(
      '.body-container',
    ) as HTMLElement;
    const content = `
    <div class="container-registration">
      <div class="container-form">
        <div class="title">Sign Up</div>
        <div class="content">
          <form id="register-form" class="form-registration">
            <div class="form-registration__one">
              <div class="flex-box">
                <div class="input-box">
                  <label class="details" for="first-name">First name</label>
                    <div>
                      <input type="text" data-pattern="firstName" id="first-name" name="firstName">
                      <span>First name</span>
                      <p class="error-message" data-message="Please enter your first name."></p>
                    </div>
                </div>
                <div class="input-box">
                  <label class="details" for="last-name">Last name</label>
                  <div>
                    <input type="text" data-pattern="lastName" id="last-name" name="lastName">
                    <span>Last name</span>
                    <p class="error-message" data-message="Please enter your last name."></p>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <div class="input-box">
                  <label class="details" for="last-name">Email</label>
                  <div>
                    <input type="text" class="required" data-pattern="email" id="form-email" name="email">
                    <span>user@example.com</span>
                    <p class="error-message" data-message="Please enter your email."></p>
                  </div>
                </div>
                <div class="input-box">
                  <label class="details" for="form-age">Date of birth</label>
                  <div>
                    <input type="date" class="required" data-pattern="age" id="form-age" name="dateOfBirth">
                    <span class="date">11/11/1997</span>
                    <p class="error-message" data-message="Please enter your date of birth"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-registration__two">
              <fieldset  name="billingAddress"><legend>Billing address:</legend>
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-country">Country</label>
                    <div>
                      <select id="form-country" class="required" name="countryBilling">
                        <option value="" disabled selected hidden>Select your country</option>
                          ${this.buildContriesOptions(countries)}
                      </select>
                      <p class="error-message" data-message="Please enter your country"></p>
                    </div>
                  </div>
                  <div class="input-box disabled" >
                    <label class="details" for="form-postalCode">Postal code</label>
                    <div>
                      <input type="text" class="required" disabled data-pattern="postalCode" id="form-postalCode" name="postalCodeBilling">
                      <span>42351</span>
                      <p class="error-message" data-message="Please enter your postal code"></p>
                    </div>
                  </div>
                </div>
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-street">Street</label>
                    <div>
                      <input type="text" data-pattern="street" id="form-street" name="streetBilling">
                      <span>Street</span>
                      <p class="error-message" data-message="Please enter your street"></p>
                    </div>
                  </div>
                  <div class="input-box">
                    <label class="details" for="form-city">City</label>
                    <div>
                      <input type="text" data-pattern="city" id="form-city" name="cityBilling">
                      <span>City</span>
                      <p class="error-message" data-message="Please enter your city"></p>
                    </div>
                  </div>
                </div>
                <div class="input-box input-checkbox">
                  <input type="checkbox" name="default-billing" id="billing-as-default">
                  <label class="details" for="billing-as-default">use as default</label>
                </div>
              </fieldset>
              <div class="input-box input-checkbox">
                <input type="checkbox" class="use-for" name="billing-shipping" id="set-billing-and-shipping">
                <label class="details" for="set-billing-and-shipping">Set as address for billing and shipping</label>
              </div>
              <fieldset name="shippingAddress" class="fieldset-two"><legend>Shipping address:</legend>
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-country2">Country</label>
                    <div>
                      <select  id="form-country2" class="required" name="countryShipping">
                        <option value="" disabled selected hidden>Select your country</option>
                          ${this.buildContriesOptions(countries)}
                      </select>
                      <p class="error-message" data-message="Please enter your country"></p>
                    </div>
                  </div>
                  <div class="input-box">
                    <label class="details" for="form-postalCode2">Postal code</label>
                    <div>
                      <input type="text" class="required" data-pattern="postalCode" disabled id="form-postalCode2" name="postalCodeShipping">
                      <span>42351</span>
                      <p class="error-message" data-message="Please enter your postal code"></p>
                    </div>
                  </div>
                </div>
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-street2">Street</label>
                    <div>
                      <input type="text" data-pattern="street" id="form-street2" name="streetShipping">
                      <span>Street</span>
                      <p class="error-message" data-message="Please enter your street"></p>
                    </div>
                  </div>
                  <div class="input-box">
                    <label class="details" for="form-city2">City</label>
                    <div>
                      <input type="text" data-pattern="city" id="form-city2" name="cityShipping">
                      <span>City</span>
                      <p class="error-message" data-message="Please enter your city"></p>
                    </div>
                  </div>
                </div>
                <div class="input-box input-checkbox">
                  <input type="checkbox" name="default-shipping" id="shipping-as-default">
                  <label class="details" for="shipping-as-default">use as default</label>
                </div>
              </fieldset>
             </div>
              <div class="user-details form-registration__three">
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-password">Password</label>
                    <div>
                      <input type="password" class="input-password required" data-pattern="password" id="form-password" name="password" >
                      <span>password</span>
                      <img src="${eyeHidden}" class="img-password">
                      <p class="error-message" data-message="Please enter your password."></p>
                    </div>
                  </div>
                  <div class="input-box">
                    <label class="details" for="confirm-password">Confirm password</label>
                    <div>
                      <input type="password" class="input-password required" disabled data-pattern="confirmPassword" id="confirm-password" name="password">
                      <span>Confirm your password</span>
                      <img src="${eyeHidden}" class="img-password">
                      <p class="error-message" data-message="Please enter your password."></p>
                    </div>
                  </div>   
                </div> 
              </div>
              <div class="input-box form-registration__four button">
                <input class="submit-btn" type="submit" value="Register">
                <p id="error-message" class="error-message" data-message=" " style="color: red; height:40px"></p>
              </div>
            </form>
            <p class="login-accountP">Already have an account? <a class="login-account" href="#">Sign in</a></p>
          </div>
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
