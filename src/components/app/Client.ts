import { ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { v4 as uuidv4 } from 'uuid';

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
        .then(() => {
          const customerSessionId = this.generateCustomerId();
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
