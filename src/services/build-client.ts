import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY}`;
const scopes = [`${import.meta.env.VITE_SCOPES}`];

// Configure authMiddlewareOptions
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

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `${import.meta.env.VITE_API_URL}`,
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions) // Include middleware for logging
  .build();
