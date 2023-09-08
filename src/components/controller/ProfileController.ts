import Client from '../app/Client';
import {
  Customer,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import ProfileForm from '../view/profileForm/ProfileForm';
import StorageController from './StorageController';
import editOk from '../../assets/icons/ok-edit.png';
import pencil from '../../assets/icons/pencil.png';
import { someFunction } from './ToastifyControler';

class ProfileController {
  private client: Client;
  private storage: StorageController;
  private profileForm: ProfileForm;
  private customerData: Customer | undefined;

  constructor(
    client: Client,
    storage: StorageController,
    customerData?: Customer,
  ) {
    this.client = client;
    this.storage = storage;
    this.profileForm = new ProfileForm();
    this.customerData = customerData;
  }

  async draw(customer: Customer) {
    await this.profileForm.draw(customer);
    await this.profileForm.markInput();
  }
  updateData(input: HTMLInputElement) {
    const actionType = input.dataset.pattern as string;
    if (input.classList.contains('invalid')) {
      return;
    }
    if (actionType === 'firstName') {
      const action: CustomerUpdateAction = {
        action: 'setFirstName',
        [actionType]: input.value,
      };
      this.client.updateCustomer(action);
    }
    if (actionType === 'lastName') {
      const action: CustomerUpdateAction = {
        action: 'setLastName',
        [actionType]: input.value,
      };
      this.client.updateCustomer(action);
    }
    if (actionType === 'age') {
      const action: CustomerUpdateAction = {
        action: 'setDateOfBirth',
        dateOfBirth: input.value,
      };
      this.client.updateCustomer(action);
    }
    if (actionType === 'email') {
      const action: CustomerUpdateAction = {
        action: 'changeEmail',
        [actionType]: input.value,
      };
      this.client.updateCustomer(action);
    }
  }
  updatePassword(inputs: HTMLInputElement[]) {
    const currentPassword = inputs[0].value as string;
    const newPassword = inputs[1].value as string;
    this.client.updatePassword(currentPassword, newPassword);
  }
  async updateAddress(elements: HTMLInputElement[]) {
    const address = {
      country: elements[0].value,
      postalCode: elements[1].value,
      streetName: elements[2].value,
      city: elements[3].value,
      id: String(elements[0].dataset.index),
    };
    this.client.updateAddress(address);
    const defaultChecked = elements[7].checked ? address.id : undefined;
    const addressType =
      elements[7].name === 'default-billing'
        ? this.setDefaultBillingAddress(defaultChecked)
        : this.setDefaultShippingAddress(defaultChecked);
    const customer = await this.client.updateDefaultAddress(addressType);
    await this.profileForm.createAddress(customer);
  }

  setDefaultShippingAddress(id: string | undefined) {
    const actionDefault: CustomerSetDefaultShippingAddressAction = {
      action: 'setDefaultShippingAddress',
      addressId: id,
    };
    return actionDefault;
  }
  setDefaultBillingAddress(id: string | undefined) {
    const actionDefault: CustomerSetDefaultBillingAddressAction = {
      action: 'setDefaultBillingAddress',
      addressId: id,
    };
    return actionDefault;
  }
  deleteAddress(event: Event) {
    const fieldset = (event.target as HTMLElement).closest(
      'fieldset',
    ) as HTMLElement;
    const select = fieldset.querySelector('select') as HTMLElement;
    const id = select.dataset.index as string;
    this.client.deleteAddress(id, fieldset);
  }
  async createNewAddress(fieldset: HTMLElement) {
    const inputs = Array.from(
      fieldset.querySelectorAll('input, select'),
    ) as HTMLInputElement[];
    const newAddress = {
      country: inputs[0].value,
      post: inputs[1].value,
      street: inputs[2].value,
      city: inputs[3].value,
      shipping: inputs[4].checked,
      billing: inputs[5].checked,
      defaultAddress: inputs[6].checked,
    };
    let customer = await this.client.createAddress(
      newAddress.country,
      newAddress.post,
      newAddress.street,
      newAddress.city,
    );
    if (customer) {
      const id = customer.addresses[customer.addresses.length - 1].id as string;
      if (newAddress.billing && id) {
        customer = await this.client.updateTypeAddress(id, 'bill');
      }
      if (newAddress.shipping && id) {
        customer = await this.client.updateTypeAddress(id, 'ship');
      }
      if (newAddress.defaultAddress && id) {
        const type = (await newAddress.billing)
          ? this.setDefaultBillingAddress(id)
          : this.setDefaultShippingAddress(id);
        customer = await this.client.updateDefaultAddress(type);
      }
      await this.profileForm.createAddress(customer);
    }
  }

  editElements(img: HTMLImageElement) {
    const parent = img.parentElement as HTMLElement;
    const span = parent.querySelector('span') as HTMLElement;
    const input = parent.querySelector('input') as HTMLInputElement;
    if (img.classList.contains('save-edit')) {
      if (input.value.length === 0 || input.classList.contains('invalid')) {
        someFunction('Please correct fill in this field', false);
        return;
      }
      img.src = pencil;
      img.classList.remove('save-edit');
      input.disabled = true;
      span.style.display = 'none';
      this.updateData(input);
    } else {
      input.disabled = false;
      input.dataset.current = input.value;
      img.src = editOk;
      img.classList.add('save-edit');
      input.focus();
      input.classList.add('valid');
      span.style.display = 'block';
    }
  }
  async editPasswords(event: Event) {
    const btn = event.target as HTMLElement;
    const passwords = (await Array.from(
      document.querySelectorAll('input[name="password"]'),
    )) as HTMLInputElement[];
    if (btn.classList.contains('save')) {
      if (passwords.every(password => password.classList.contains('valid'))) {
        await this.updatePassword(passwords);
        btn.classList.remove('save');
        btn.textContent = 'Edit password';
        await passwords.forEach(password => {
          password.value = '';
          password.disabled = true;
          password.classList.remove('valid');
        });
      } else {
        someFunction('Please enter your current and new password', false);
      }
    } else {
      btn.classList.add('save');
      btn.textContent = 'Save password';
      passwords.forEach(password => {
        password.disabled = false;
      });
    }
  }
  async addNewAddress() {
    const newAddress = {
      address: {
        id: '',
        country: '',
        postalCode: '',
        streetName: '',
        city: '',
      },
      billing: false,
      shipping: false,
      default: false,
      new: true,
    };

    await this.profileForm.addAddress(newAddress);
  }
  async editAddress(event: Event) {
    const btn = event.target as HTMLElement;

    if (btn.classList.contains('save')) {
      const fieldset = btn.closest('fieldset') as HTMLElement;
      const elements = Array.from(
        fieldset.querySelectorAll('input, select'),
      ) as HTMLInputElement[];
      if (!elements.some(element => element.classList.contains('invalid'))) {
        elements.forEach(element => (element.disabled = true));
        btn.classList.remove('save');
        await this.updateAddress(elements);
        btn.textContent = 'Edit address';
      } else {
        someFunction('Please fill correct in all the fields', false);
      }
    } else {
      btn.textContent = 'Save address';
      btn.classList.add('save');
      const fieldset = btn.closest('fieldset');
      if (fieldset) {
        const elements = Array.from(
          fieldset.querySelectorAll('input, select'),
        ) as HTMLInputElement[];
        elements.forEach(element => (element.disabled = false));
      }
    }
    return true;
  }
  async addCreateNewAddress(event: Event) {
    const fieldset = (event.target as HTMLElement).closest('fieldset');
    if (fieldset) {
      const inputs = Array.from(
        fieldset.querySelectorAll('.input_address'),
      ) as HTMLInputElement[];
      const inputsRequired = Array.from(
        fieldset.querySelectorAll('.required'),
      ) as HTMLInputElement[];
      const typeAddress = inputs[0].checked || inputs[1].checked;
      const required = inputsRequired.every(input =>
        input.classList.contains('valid'),
      );

      if (typeAddress && required) {
        await this.createNewAddress(fieldset);
        fieldset.remove();
        const btnAddAddress = document.querySelector(
          '.add-new_address',
        ) as HTMLElement;
        btnAddAddress.style.display = 'flex';
      } else {
        someFunction('Please fill in all the fields', false);
      }
    }
  }
}

export default ProfileController;
