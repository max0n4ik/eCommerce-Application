import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY}`;
const scopes = [`${import.meta.env.VITE_SCOPES}`];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `${import.meta.env.VITE_AUTH_URL}`,
  projectKey: projectKey,
  credentials: {
    clientId: `${import.meta.env.VITE_CLIENT_ID}`,
    clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
  },
  scopes: scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${import.meta.env.VITE_API_URL}`,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
