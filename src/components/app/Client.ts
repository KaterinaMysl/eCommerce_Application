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
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { alert } from '../controller/ToastifyControler';
import { FILTERS_ACTIVE } from '../constants';
import StorageController from '../controller/StorageController';
import { cartToDrawProducts } from '../controller/Utils';

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
  private storage: StorageController;

  constructor(storage: StorageController) {
    this.storage = storage;
  }

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
    const anonymousSession = this.storage.getAnonymousSessionId();
    if (anonymousSession) {
      const id = await this.loginWithAnonymousSession(email, password);
      if (id) {
        return id;
      } else {
        return false;
      }
    } else {
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
      this.storage.saveCart(cartLS);
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
      this.storage.saveCart({
        id: createCart.body.id,
        version: createCart.body.version,
      });
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
      this.storage.saveCart({
        id: customer.body.id,
        version: customer.body.version,
      });
      const id = (await customer.body.anonymousId) as string;
      this.storage.saveAnonymousSessionId(id);
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
      this.storage.saveCart({
        id: customer.body.id,
        version: customer.body.version,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getCartById(id: string) {
    return anonymusApi.carts().withId({ ID: id }).get().execute();
  }

  async getRefreshAnonymousToken() {
    anonymousApiRoot = createApiBuilderFromCtpClient(
      anonymousClient(),
    ).withProjectKey({
      projectKey: process.env.CTP_PROJECT_KEY2 ?? '',
    });
  }

  async updateProductsCart(
    actions: CartUpdateAction[],
    successMessage: string,
  ) {
    try {
      const cart = this.storage.getCart();
      if (cart) {
        const response = await anonymusApi
          .carts()
          .withId({ ID: cart.id })
          .post({
            body: {
              version: Number(cart.version),
              actions,
            },
          })
          .execute();
        cart.version = response.body.version;
        this.storage.saveCart(cart);
        this.storage.saveCartProducts(cartToDrawProducts(response.body));
        if (successMessage) {
          alert(successMessage, true);
        }
        return true;
      }
    } catch (error) {
      alert('Something went wrong. Please, try again later.', false);
      return false;
    }
  }

  async getCustomer() {
    const id = this.storage.getCustomerSessionId();
    if (id) {
      const response = await anonymusApi
        .customers()
        .withId({ ID: id })
        .get()
        .execute();
      this.storage.saveVersion(response.body.version);
      return response.body;
    }
  }

  async updateCustomer(action: CustomerUpdateAction) {
    const userVersion = this.storage.getVersion();
    const userToken = this.storage.getCustomerSessionId();
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
      this.storage.saveVersion(response.body.version);
      alert('Your data has been updated.', true);
    } catch (error) {
      if (action.action === 'changeEmail') {
        alert(
          'There is already an existing customer with the provided email.',
          false,
        );
      }
    }
  }

  async updateAddress(address: Address) {
    try {
      const userVersion = this.storage.getVersion();
      const userToken = this.storage.getCustomerSessionId();
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
      this.storage.saveVersion(response.body.version);
      alert('The new address has been successfully update', true);
    } catch (error) {
      console.log(error);
    }
  }

  async updateDefaultAddress(
    actionDefault:
      | CustomerSetDefaultShippingAddressAction
      | CustomerSetDefaultBillingAddressAction,
  ) {
    const userVersion = this.storage.getVersion();
    const userToken = this.storage.getCustomerSessionId();
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
    this.storage.saveVersion(response.body.version);
    return response.body;
  }

  async deleteAddress(id: string, element: HTMLElement) {
    try {
      const userVersion = this.storage.getVersion();
      const userToken = this.storage.getCustomerSessionId();
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
      this.storage.saveVersion(response.body.version);
      alert('Your address has been successfully deleted', true);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(currentP: string, newP: string) {
    try {
      const userVersion = this.storage.getVersion();
      const userToken = this.storage.getCustomerSessionId();
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
      this.storage.saveVersion(response.body.version);
      const email = response.body.email as string;
      this.login(email, newP);
      alert('Your password has been updated', true);
    } catch (error) {
      alert('The given current password does not match.', false);
    }
  }

  async updateTypeAddress(id: string, type: string) {
    const userVersion = this.storage.getVersion();
    const userToken = this.storage.getCustomerSessionId();
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
    this.storage.saveVersion(response.body.version);
    return response.body;
  }

  async createAddress(
    country: string,
    post: string,
    street: string,
    city: string,
  ) {
    try {
      const userVersion = this.storage.getVersion();
      const userToken = this.storage.getCustomerSessionId();
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
      this.storage.saveVersion(response.body.version);
      alert('The new address has been successfully added', true);
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
    this.storage.deleteCart();
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

  getProductCategoryByParentId(parentId: string) {
    return anonymusApi
      .categories()
      .get({
        queryArgs: {
          where: `parent(id="${parentId}")`,
        },
      })
      .execute();
  }

  getProductCategoryByName(categoryName: string) {
    return anonymusApi
      .categories()
      .get({
        queryArgs: { where: `name(en="${categoryName}")` },
      })
      .execute();
  }

  getProductProjections() {
    return anonymusApi.productProjections().get().execute();
  }

  getProductProjectionsBySearchQuery(searchQuery: string) {
    return anonymusApi
      .productProjections()
      .suggest()
      .get({
        queryArgs: {
          'searchKeywords.en': searchQuery,
          fuzzy: true,
          staged: true,
          fuzzyLevel: 0,
        },
      })
      .execute();
  }

  getProductProjectionsFilteredByCategory(category: string) {
    return anonymusApi
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [
            category,
            FILTERS_ACTIVE.days,
            FILTERS_ACTIVE.stars,
            FILTERS_ACTIVE.price,
            FILTERS_ACTIVE.rating,
          ],
          limit: 5,
          sort: [FILTERS_ACTIVE.sort],
          ['text.en']: FILTERS_ACTIVE.search,
        },
      })
      .execute();
  }
}

export default Client;
