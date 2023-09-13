import {
  ClientBuilder,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  Middleware,
  Client,
  createAuthForPasswordFlow,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = process.env.CTP_PROJECT_KEY ?? '';
const scopes = process.env.CTP_SCOPES?.split(',') ?? [];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL ?? '',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID ?? '',
    clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
  },
  scopes,
  fetch,
};

function authMiddlewarePasswordOptions(
  username: string,
  password: string,
): Middleware {
  return createAuthForPasswordFlow({
    host: process.env.CTP_AUTH_URL ?? '',
    projectKey: projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID ?? '',
      clientSecret: process.env.CTP_CLIENT_SECRET ?? '',
      user: {
        username: username,
        password: password,
      },
    },
    scopes,
    fetch,
  });
}

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL ?? '',
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export function ctpPasswordClient(username: string, password: string): Client {
  return new ClientBuilder()
    .withMiddleware(authMiddlewarePasswordOptions(username, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
}

const options: AnonymousAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: process.env.CTP_PROJECT_KEY2 ?? '',
  credentials: {
    clientId: process.env.CTP_CLIENT_ID2 || '',
    clientSecret: process.env.CTP_CLIENT_SECRET2 || '',
  },
};
const httpMiddlewareOptions2: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL2 ?? '',
  fetch,
};
export const anonymousClient = () => {
  return new ClientBuilder()
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions2)
    .withLoggerMiddleware()
    .build();
};
