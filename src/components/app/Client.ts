import { anonymousClient, ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  Customer,
  CustomerUpdateAction,
  ProductProjection,
  Address,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { someFunction } from '../controller/ToastifyControler';
import { CartLS } from '../type';

const userApis: Map<string, ByProjectKeyRequestBuilder> = new Map();
const anonymusApi = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
});

let anonymousApiRoot = createApiBuilderFromCtpClient(
  anonymousClient(),
).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY2 ?? '',
});

class Client {
  private customerData: Customer | undefined;

  async loginWithAnonymousSession(email: string, password: string) {
    console.log('login with anonymous');
    try {
      const customer = await anonymousApiRoot
        .me()
        .login()
        .post({
          body: {
            email: email,
            password: password,
            activeCartSignInMode: 'MergeWithExistingCustomerCart',
          },
        })
        .execute();
      const api = createApiBuilderFromCtpClient(
        ctpPasswordClient(email, password),
      ).withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY ?? '' });

      const response = await api.me().get().execute();
      if (response) {
        const customerSessionId = response.body.id;
        userApis.set(customerSessionId, api);
      }
      this.createMeCart(api);
      return customer.body.customer.id;
    } catch (error) {
      return false;
    }
  }
  async login(email: string, password: string) {
    const anonymousSession = localStorage.getItem('session-anonymous');
    if (anonymousSession) {
      console.log('login with anonymous');
      const id = await this.loginWithAnonymousSession(email, password);
      if (id) {
        return id;
      } else {
        return false;
      }
    } else {
      console.log('login non anonymous');
      const api = createApiBuilderFromCtpClient(
        ctpPasswordClient(email, password),
      ).withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY ?? '' });
      try {
        const login = await api
          .login()
          .post({ body: { email: email, password: password } })
          .execute();

        const customerSessionId = login.body.customer.id;
        userApis.set(customerSessionId, api);
        this.createMeCart(api);
        return customerSessionId;
      } catch (error) {
        console.error(error);
        return error;
      }
    }
  }
  async createMeCart(api: ByProjectKeyRequestBuilder) {
    try {
      const cart = await api.me().activeCart().get().execute();
      const cartLS = {
        id: cart.body.id,
        version: cart.body.version,
      };
      console.log('cart client', cart);
      localStorage.setItem('cart', JSON.stringify(cartLS));
    } catch (error) {
      const createCart = await api
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();
      localStorage.setItem(
        'cart',
        JSON.stringify({
          id: createCart.body.id,
          version: createCart.body.version,
        }),
      );
    }
  }
  async createCartAnonymous() {
    try {
      const customer = await anonymousApiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();
      localStorage.setItem(
        'cart',
        JSON.stringify({
          id: customer.body.id,
          version: customer.body.version,
        }),
      );
      const id = (await customer.body.anonymousId) as string;
      localStorage.setItem('session-anonymous', id);
      return customer;
    } catch (error) {
      console.error(error);
    }
  }
  async createCart() {
    try {
      const customer = await anonymusApi
        .carts()
        .post({
          body: {
            currency: 'EUR',
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();
      localStorage.setItem(
        'cart',
        JSON.stringify({
          id: customer.body.id,
          version: customer.body.version,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async getRefreshAnonymousToken() {
    anonymousApiRoot = createApiBuilderFromCtpClient(
      anonymousClient(),
    ).withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY2 ?? '',
    });
  }
  async addProductToCart(id: string) {
    console.log('add products');
    const cartLS = localStorage.getItem('cart');
    if (cartLS) {
      const cart: CartLS = JSON.parse(cartLS);
      const response = await anonymusApi
        .carts()
        .withId({ ID: cart.id })
        .post({
          body: {
            version: Number(cart.version),
            actions: [
              {
                action: 'addLineItem',
                productId: id,
              },
            ],
          },
        })
        .execute();
      cart.version = response.body.version;
      localStorage.setItem('cart', JSON.stringify(cart));
      return response;
    }
  }
  async removeProductWithCart(id: string) {
    try {
      const cartLS = localStorage.getItem('cart');
      if (cartLS) {
        const cart: CartLS = JSON.parse(cartLS);
        const response = await anonymusApi
          .carts()
          .withId({ ID: cart.id })
          .post({
            body: {
              version: Number(cart.version),
              actions: [
                {
                  action: 'removeLineItem',
                  lineItemId: id,
                },
              ],
            },
          })
          .execute();
        cart.version = response.body.version;
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
      }
    } catch (error) {
      return false;
      // console.error(error);
    }
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
      if (action.action === 'changeEmail') {
        someFunction(
          'There is already an existing customer with the provided email.',
          false,
        );
      }
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
    localStorage.removeItem('cart');
    this.getRefreshAnonymousToken();
  }

  getCustomerDetails(customerSessionId: string) {
    const api = userApis.get(customerSessionId);
    if (!api) {
      throw new Error('Session not found');
    }
    return api
      .customers()
      .withId({ ID: customerSessionId })
      .get()
      .execute()
      .then(response => {
        console.log('API response received:', response.body);
        return response;
      })
      .catch(error => {
        console.error('Error in getCustomerDetails:', error);
        throw error;
      });
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
  async getProductByKeyName(productKey: string): Promise<ProductProjection> {
    const response = await anonymusApi
      .productProjections()
      .withKey({ key: productKey })
      .get()
      .execute();
    console.log('product', response.body);
    return response.body;
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
}

export default Client;
