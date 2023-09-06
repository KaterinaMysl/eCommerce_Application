import { ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  Customer,
  CustomerUpdateAction,
  Address,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { v4 as uuidv4 } from 'uuid';
import { someFunction } from '../controller/ToastifyControler';

const userApis: Map<string, ByProjectKeyRequestBuilder> = new Map();
const anonymusApi = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
});

class Client {
  private customerData: Customer | undefined;

  login(email: string, password: string) {
    const api = createApiBuilderFromCtpClient(
      ctpPasswordClient(email, password),
    ).withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY ?? '' });
    return new Promise<string>((resolve, reject) => {
      api
        .login()
        .post({ body: { email: email, password: password } })
        .execute()
        .then(({ body }) => {
          const customerSessionId = body.customer.id;
          localStorage.setItem('version', `${body.customer.version}`);
          userApis.set(customerSessionId, api);
          resolve(customerSessionId);
        })
        .catch((e: Error) => reject(e));
    });
  }

  async getCustomer() {
    const id = localStorage.getItem('session-id');
    if (id) {
      const response = await anonymusApi
        .customers()
        .withId({ ID: id })
        .get()
        .execute();
      localStorage.setItem('version', `${response.body.version}`);
      return response.body;
    }
  }
  async updateCustomer(action: CustomerUpdateAction) {
    const userVersion = Number(localStorage.getItem('version')) as number;
    const userToken = localStorage.getItem('session-id') as string;
    try {
      const response = await anonymusApi
        .customers()
        .withId({ ID: userToken })
        .post({
          body: {
            version: userVersion,
            actions: [action],
          },
        })
        .execute();
      localStorage.setItem('version', `${response.body.version}`);
      someFunction('Your data has been updated.', true);
    } catch (error) {
      // someFunction('', true);
    }
  }
  async updateAddress(address: Address) {
    try {
      const userVersion = Number(localStorage.getItem('version')) as number;
      const userToken = localStorage.getItem('session-id') as string;
      const response = await anonymusApi
        .customers()
        .withId({ ID: userToken })
        .post({
          body: {
            actions: [
              {
                action: 'changeAddress',
                addressId: address.id,
                address: {
                  country: address.country,
                  city: address.city,
                  streetName: address.streetName,
                  postalCode: address.postalCode,
                },
              },
            ],
            version: userVersion,
          },
        })
        .execute();
      localStorage.setItem('version', `${response.body.version}`);
      someFunction('The new address has been successfully update', true);
    } catch (error) {
      console.log(error);
    }
  }
  async updateDefaultAddress(
    actionDefault:
      | CustomerSetDefaultShippingAddressAction
      | CustomerSetDefaultBillingAddressAction,
  ) {
    const userVersion = Number(localStorage.getItem('version')) as number;
    const userToken = localStorage.getItem('session-id') as string;
    const response = await anonymusApi
      .customers()
      .withId({ ID: userToken })
      .post({
        body: {
          actions: [actionDefault],
          version: userVersion,
        },
      })
      .execute();
    localStorage.setItem('version', `${response.body.version}`);
    return response.body;
  }
  async deleteAddress(id: string, element: HTMLElement) {
    try {
      const userVersion = Number(localStorage.getItem('version')) as number;
      const userToken = localStorage.getItem('session-id') as string;
      const response = await anonymusApi
        .customers()
        .withId({ ID: userToken })
        .post({
          body: {
            actions: [
              {
                action: 'removeAddress',
                addressId: id,
              },
            ],
            version: userVersion,
          },
        })
        .execute();
      element.remove();
      localStorage.setItem('version', `${response.body.version}`);
      someFunction('Your address has been successfully deleted', true);
    } catch (error) {
      console.log(error);
    }
  }
  async updatePassword(currentP: string, newP: string) {
    try {
      const userVersion = Number(localStorage.getItem('version')) as number;
      const userToken = localStorage.getItem('session-id') as string;
      const response = await anonymusApi
        .customers()
        .password()
        .post({
          body: {
            id: userToken,
            version: userVersion,
            currentPassword: currentP,
            newPassword: newP,
          },
        })
        .execute();
      await localStorage.setItem('version', `${response.body.version}`);
      const email = response.body.email as string;
      this.login(email, newP);
      someFunction('Your password has been updated', true);
    } catch (error) {
      someFunction('The given current password does not match.', false);
    }
  }
  async updateTypeAddress(id: string, type: string) {
    const userVersion = Number(localStorage.getItem('version')) as number;
    const userToken = localStorage.getItem('session-id') as string;
    const response = await anonymusApi
      .customers()
      .withId({ ID: userToken })
      .post({
        body: {
          actions: [
            {
              action: `${
                type === 'ship' ? 'addShippingAddressId' : 'addBillingAddressId'
              }`,
              addressId: id,
            },
          ],
          version: userVersion,
        },
      })
      .execute();
    localStorage.setItem('version', `${response.body.version}`);
    return response.body;
  }
  async createAddress(
    country: string,
    post: string,
    street: string,
    city: string,
  ) {
    try {
      const userVersion = Number(localStorage.getItem('version')) as number;
      const userToken = localStorage.getItem('session-id') as string;
      const response = await anonymusApi
        .customers()
        .withId({ ID: userToken })
        .post({
          body: {
            actions: [
              {
                action: 'addAddress',
                address: {
                  country: country,
                  city: city,
                  streetName: street,
                  postalCode: post,
                },
              },
            ],
            version: userVersion,
          },
        })
        .execute();
      localStorage.setItem('version', `${response.body.version}`);
      someFunction('The new address has been successfully added', true);
      return await response.body;
    } catch (error) {
      console.log(error);
    }
  }
  register(customer: CustomerDraft) {
    return anonymusApi.customers().post({ body: customer }).execute();
  }

  logout(customerSessionId: string) {
    userApis.delete(customerSessionId);
  }

  getOrders(email: string) {
    const api = userApis.get(email);
    if (api) {
      return api.orders().get().execute();
    }
    throw new Error(`401 Unauthorized.`);
  }
  getAnonymsApi() {
    return anonymusApi;
  }
  getUserApis() {
    return userApis;
  }
  getProducts() {
    return anonymusApi.products().get().execute();
  }

  getCountries() {
    return new Promise<string[]>((resolve, reject) => {
      anonymusApi
        .get()
        .execute()
        .then(p => resolve(p.body.countries))
        .catch(e => reject(e));
    });
  }

  private generateCustomerId(): string {
    return uuidv4();
  }
}

export default Client;
