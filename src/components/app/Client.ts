import { ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const userApis: Map<string, ByProjectKeyRequestBuilder> = new Map();
const anonymusApi = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
});

class Client {
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

  register(customer: CustomerDraft) {
    return anonymusApi.customers().post({ body: customer }).execute();
  }

  logout(customerSessionId: string) {
    userApis.delete(customerSessionId);
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

  /* private generateCustomerId(): string {
    return uuidv4();
  } */
}

export default Client;
