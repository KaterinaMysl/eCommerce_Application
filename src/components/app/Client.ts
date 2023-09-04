import { ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  Customer,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { v4 as uuidv4 } from 'uuid';

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
  async updateCustomer(
    newFirstName: string,
    newLastName: string,
    newDateOfBirth: string,
    newEmail: string,
  ) {
    const userVersion = Number(localStorage.getItem('version')) as number;
    const userToken = localStorage.getItem('session-id') as string;
    try {
      const response = anonymusApi
        .customers()
        .withId({ ID: userToken })
        .post({
          body: {
            version: userVersion,
            actions: [
              {
                action: 'setFirstName',
                firstName: newFirstName,
              },
              {
                action: 'setLastName',
                lastName: newLastName,
              },
              {
                action: 'setDateOfBirth',
                dateOfBirth: newDateOfBirth,
              },
              {
                action: 'changeEmail',
                email: newEmail,
              },
            ],
          },
        })
        .execute();
      console.log(response);
    } catch {
      (error: Error) => console.log(error);
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
