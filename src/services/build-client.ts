import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type {
  AnonymousAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  TokenCache,
  TokenStore,
} from '@commercetools/sdk-client-v2';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = `${import.meta.env.VITE_PROJECT_KEY}`;
const scopes = [`${import.meta.env.VITE_SCOPES}`];
const hostAPI = `${import.meta.env.VITE_API_URL}`;
const hostAUTH = `${import.meta.env.VITE_AUTH_URL}`;
const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
const clientSecret = `${import.meta.env.VITE_CLIENT_SECRET}`;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: hostAPI,
  fetch,
};
class MyTokenCache implements TokenCache {
  private myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public set(newCache: TokenStore): void {
    this.clear();
    this.myCache = newCache;
    localStorage.setItem('token', this.myCache.token);
  }

  public get(): TokenStore {
    return this.myCache;
  }

  public clear(): void {
    this.myCache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
    localStorage.removeItem('token');
  }
}

export const myToken = new MyTokenCache();

export function apiwithExistingTokenFlow(): ByProjectKeyRequestBuilder {
  type ExistingTokenMiddlewareOptions = {
    force?: boolean;
  };

  const token = localStorage.getItem('token');

  const authorization = `Bearer ${token}`;
  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const client = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withExistingTokenFlow(authorization, options)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey,
  });
  return apiRoot;
}

export function apiWithPasswordFlow(
  email: string,
  password: string
): ByProjectKeyRequestBuilder {
  myToken.clear();

  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    tokenCache: myToken,
    scopes,
    fetch,
  };

  const ctpClientPassword = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    ctpClientPassword
  ).withProjectKey({ projectKey });

  return apiRoot;
}

export function apiWithClientCredentialsFlow(): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    fetch,
  };

  const ctpClientCredentialsFlow = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    ctpClientCredentialsFlow
  ).withProjectKey({ projectKey });

  return apiRoot;
}

export function apiwithAnonymousSessionFlow(): ByProjectKeyRequestBuilder {
  myToken.clear();

  const anonymousMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: hostAUTH,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    tokenCache: myToken,
    scopes,
    fetch,
  };

  const ctpAnonymousMiddlewareOptions = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAnonymousSessionFlow(anonymousMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    ctpAnonymousMiddlewareOptions
  ).withProjectKey({ projectKey });

  return apiRoot;
}
