import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = import.meta.env.VITE_PROJECT_KEY;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey: import.meta.env.VITE_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },

  scopes: import.meta.env.VITE_SCOPES?.split(' '),
  fetch,
};

const { useAuthStore } = await import('@/store/auth-store');
const { accessTokenAnonymous, setAccessTokenAnonymous, userId, setUserId } =
  useAuthStore.getState();

const anonymousId = crypto.randomUUID();
if (!userId) {
  setUserId(anonymousId);
}

const authAnonymousMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey: import.meta.env.VITE_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    anonymousId: userId || anonymousId,
  },
  tokenCache: {
    get: () => ({
      token: '',
      expirationTime: 0,
    }),
    set: (cache) => {
      if (!accessTokenAnonymous) {
        setAccessTokenAnonymous(cache.token);
      }
    },
  },
  scopes: import.meta.env.VITE_SCOPES?.split(' '),
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
const ctpAnonimClient = new ClientBuilder()
  .withHttpMiddleware(httpMiddlewareOptions)
  .withAnonymousSessionFlow(authAnonymousMiddlewareOptions)
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

const ctpAnonimClientWithToken = new ClientBuilder()
  .withHttpMiddleware(httpMiddlewareOptions)
  .withExistingTokenFlow(`Bearer ${accessTokenAnonymous}`, { force: true })
  .build();

export const apiRootWithToken = createApiBuilderFromCtpClient(
  ctpAnonimClientWithToken
).withProjectKey({
  projectKey,
});
export const apiRootAnonim = createApiBuilderFromCtpClient(
  ctpAnonimClient
).withProjectKey({
  projectKey,
});
