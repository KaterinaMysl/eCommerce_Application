import { ctpClient, ctpPasswordClient } from './BuildClient';
import {
  createApiBuilderFromCtpClient,
  CustomerDraft,
  Customer,
  ClientResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { v4 as uuidv4 } from 'uuid';

const userApis: Map<string, ByProjectKeyRequestBuilder> = new Map();
const anonymusApi = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.CTP_PROJECT_KEY ?? '',
});

class Client {
  private customerData: Customer | undefined;

  setCustomerData(data: Customer) {
    this.customerData = data;
  }

  getCustomerData() {
    return this.customerData;
  }

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
          console.log(customerSessionId);
          userApis.set(customerSessionId, api);
          resolve(customerSessionId);
        })
        .catch((e: Error) => reject(e));
    });
  }

  async getCustomerDetails(customerSessionId: string): Promise<Customer> {
    const api = userApis.get(customerSessionId);
    console.log('1111');
    console.log(userApis);
    console.log(api);
    console.log(customerSessionId);
    if (!api) {
      throw new Error('Session not found');
    }
    const response: ClientResponse<Customer> = await api
      .customers()
      .withId({ ID: customerSessionId })
      .get()
      .execute();
    const customerData: Customer = response.body;
    console.log('Customer Data:', customerData);
    return customerData;
  }

  register(customer: CustomerDraft) {
    return anonymusApi.customers().post({ body: customer }).execute();
  }

  // updateCustomer(customerData: Customer): Promise<ClientResponse<Customer>> {
  //   // const api = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  //   //   projectKey: process.env.CTP_PROJECT_KEY ?? '',
  //   // });
  //   // if (!customerData.version) {
  //   //   throw new Error('Invalid customer data for update.');
  //   // }

  //   // return api
  //   //   .customers()
  //   //   .withId({ ID: id })
  //   //   .update({
  //   //     ID: customerData.id,
  //   //     version: customerData.version,
  //   //   })
  //   //   .execute();
  // }

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
  getuserApis() {
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
