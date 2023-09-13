import './ProfileForm.css';
import eyeHidden from '../../../assets/icons/icon-eye-hidden.png';
import pencil from '../../../assets/icons/pencil.png';
import { Customer } from '@commercetools/platform-sdk';
import { AddAddress } from '../../type';

class ProfileForm {
  async draw(customerData: Customer) {
    const bodyContainer = document.querySelector('.main') as HTMLElement;
    const content = `
    <div class="container-profile">
      <div class="container-form profile">
        <div class="title">Profile</div>
        <div class="content">
          <form id="profile-form" class="form-profile">
            <div class="form-profile__one">
              <div class="flex-box">
                <div class="input-box">
                  <label class="details" for="first-name">First name</label>
                    <div>
                      <input type="text" data-pattern="firstName" value="${customerData.firstName}" disabled id="first-name">
                      <span>First name</span>
                      <img src="${pencil}" class="img-input-icon">
                      <p class="error-message" data-message="Please enter your first name."></p>
                    </div>
                </div>
                <div class="input-box">
                  <label class="details" for="last-name">Last name</label>
                  <div>
                    <input type="text" data-pattern="lastName" value="${customerData.lastName}" disabled id="last-name">
                    <span>Last name</span>
                    <img src="${pencil}" class="img-input-icon">
                    <p class="error-message" data-message="Please enter your last name."></p>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <div class="input-box">
                  <label class="details" for="form-email">Email</label>
                  <div>
                    <input type="text" class="required" value="${customerData.email}" disabled data-pattern="email" id="form-email">
                    <span>user@example.com</span>
                    <img src="${pencil}" class="img-input-icon">
                    <p class="error-message" data-message="Please enter your email."></p>
                  </div>
                </div>
                <div class="input-box">
                  <label class="details" for="form-age">Date of birth</label>
                  <div>
                    <input type="date" class="required" value="${customerData.dateOfBirth}" disabled data-pattern="age" id="form-age">
                    <span class="date">11/11/1997</span>
                    <img src="${pencil}" class="img-input-icon">
                    <p class="error-message" data-message="Please enter your date of birth"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-profile__two">
              
             
             </div>
             <div>
             <div class="add-new_address">Add new address</div>
           </div>
             <div class="user-details form-profile__three">
                <div class="flex-box">
                  <div class="input-box">
                    <label class="details" for="form-password">Current Password</label>
                    <div>
                      <input type="password" class="input-password required" disabled data-pattern="password" id="form-password" name="password" >
                      <img src="${eyeHidden}" class="img-password">
                      <p class="error-message" data-message="Please enter your password."></p>
                    </div>
                  </div>
                  <div class="input-box">
                    <label class="details" for="new-password">New password</label>
                    <div>
                      <input type="password" class="input-password required" disabled data-pattern="password" id="new-password" name="password">
                      <img src="${eyeHidden}" class="img-password">
                      <p class="error-message" data-message="Please enter your password."></p>
                    </div>
                  </div> 
                </div>
                <div>
                  <div class="edit-password">Edit password</div>
                </div>
              </div>
              <div class="input-box form-profile__four button">
                <p id="error-message" class="error-message" data-message=" " style="color: red; height:40px"></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    bodyContainer.innerHTML = content;

    this.markInput();
    this.createAddress(customerData);
  }

  createAddress(customerData: Customer) {
    const addressContainer = document.querySelector(
      '.form-profile__two',
    ) as HTMLElement;
    addressContainer.innerHTML = '';
    customerData.addresses.forEach(address => {
      const addresse: AddAddress = {
        address: address,
        billing: false,
        shipping: false,
        default: false,
        new: false,
      };
      if (customerData.billingAddressIds?.includes(address.id as string)) {
        addresse.billing = true;
      }
      if (customerData.shippingAddressIds?.includes(address.id as string)) {
        addresse.shipping = true;
      }
      if (
        customerData.defaultBillingAddressId?.includes(address.id as string) ||
        customerData.defaultShippingAddressId?.includes(address.id as string)
      ) {
        addresse.default = true;
      }
      this.addAddress(addresse);
    });
  }
  addAddress(address: AddAddress) {
    const addressContainer = document.querySelector(
      '.form-profile__two',
    ) as HTMLElement;
    const content = `
    <fieldset  name="billingAddress"><legend>${
      address.billing ? 'Billing' : address.shipping ? 'Shipping' : 'New'
    } address:</legend>
    <div class="flex-box">
      <div class="input-box">
        <label class="details">Country</label>
        <div class = "icon-arrow">
          <select data-index="${address.address.id}" ${
      address.new ? '' : 'disabled'
    } class="required" name="countryBilling">
          <option value="">Select your country</option>
          <option value="US" ${
            address.address.country === 'US' ? 'selected' : ''
          }>US</option>
          </select>
          <p class="error-message" data-message="Please enter your country"></p>
        </div>
      </div>
      <div class="input-box disabled" >
        <label class="details">Postal code</label>
        <div>
          <input type="text" class="required" ${
            address.new ? '' : 'disabled'
          } value="${
      address.address.postalCode
    }"  data-pattern="postalCode"  name="postalCodeBilling">
          <p class="error-message" data-message="Please enter your postal code"></p>
        </div>
      </div>
    </div>
    <div class="flex-box">
      <div class="input-box">
        <label class="details">Street</label>
        <div>
          <input type="text" data-pattern="street" class="required" value="${
            address.address.streetName
          }" ${address.new ? '' : 'disabled'}  name="streetBilling">
          <p class="error-message" data-message="Please enter your street"></p>
        </div>
      </div>
      <div class="input-box">
        <label class="details" >City</label>
        <div>
          <input type="text" data-pattern="city" class="required" value="${
            address.address.city
          }" ${address.new ? '' : 'disabled'}  name="cityBilling">
          <p class="error-message" data-message="Please enter your city"></p>
        </div>
      </div>
    </div>
    <div>
    <div class="new-address_type" style="display: ${
      address.new ? 'flex' : 'none'
    }">
    <div>
      <input type="radio" class="input_address" name="type">
      <label class="details">use as shipping</label>
    </div>
    <div>
      <input type="radio" class="input_address" name="type">
      <label class="details">use as billing</label>
    </div>
    <div>
      <input type="checkbox">
      <label class="details">use as default</label>
    </div>
  </div>
  
      <div class="input-box input-checkbox" style="display: ${
        address.new ? 'none' : 'flex'
      }">
        <input type="checkbox" name="default-${
          address.billing ? 'billing' : ''
        }" ${address.default ? 'checked' : ''} ${address.new ? '' : 'disabled'}>
        <label class="details">use as default</label>
      </div>
      <div class="edit-address_container">
        <div class="delete_address" style="display: ${
          address.new ? 'none' : 'flex'
        }">Delete address</div>
        <div class="cancel-new_address" style="display: ${
          address.new ? 'flex' : 'none'
        }">Cancel</div>
        <div class="${address.new ? 'create' : 'edit'}_address">${
      address.new ? 'Create' : 'Edit'
    } address</div>
      </div>
    </div>
  </fieldset>`;
    const btnAddAddress = document.querySelector(
      '.add-new_address',
    ) as HTMLElement;

    if (address.new) {
      btnAddAddress.style.display = 'none';
    }
    addressContainer.insertAdjacentHTML('beforeend', content);
    const cancel = document.querySelector('.cancel-new_address') as HTMLElement;
    cancel.addEventListener('click', () => {
      const fieldset = cancel.closest('fieldset') as HTMLElement;
      fieldset.remove();
      btnAddAddress.style.display = 'flex';
    });
  }
  markInput() {
    const inputs = Array.from(
      document.querySelectorAll(
        '#profile-form input:not([type="password"]), select',
      ),
    ) as HTMLInputElement[];
    inputs.forEach(async input => {
      const span: HTMLElement | null = input.nextElementSibling as HTMLElement;
      if (span && span.tagName === 'SPAN') {
        span.style.display = 'none';
      }
    });
  }
}

export default ProfileForm;
