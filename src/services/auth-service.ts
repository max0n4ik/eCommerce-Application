import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  createAuthForPasswordFlow,
  type PasswordAuthMiddlewareOptions,
  type TokenCache,
} from '@commercetools/sdk-client-v2';

import { useAuthStore } from '@/store/auth-store';

const {
  VITE_CLIENT_ID,
  VITE_CLIENT_SECRET,
  VITE_API_URL,
  VITE_AUTH_URL,
  VITE_PROJECT_KEY,
  VITE_SCOPES,
} = import.meta.env;

export async function loginCustomer(
  email: string,
  password: string
): Promise<{ token: string; customer: Customer }> {
  let capturedToken = '';

  const tokenCache: TokenCache = {
    get: () => ({ token: '', expirationTime: 0 }),
    set: (cache) => {
      capturedToken = cache.token;
    },
  };

  const passwordFlowOptions: PasswordAuthMiddlewareOptions = {
    host: VITE_AUTH_URL as string,
    projectKey: VITE_PROJECT_KEY as string,
    credentials: {
      clientId: VITE_CLIENT_ID as string,
      clientSecret: VITE_CLIENT_SECRET as string,
      user: {
        username: email,
        password,
      },
    },
    scopes: (VITE_SCOPES as string).split(' '),
    tokenCache,
    fetch,
  };

  const authMiddleware = createAuthForPasswordFlow(passwordFlowOptions);

  const client = new ClientBuilder()
    .withAuthMiddleware(authMiddleware)
    .withHttpMiddleware({ host: VITE_API_URL as string, fetch })
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: VITE_PROJECT_KEY as string,
  });

  const response = await apiRoot.me().get().execute();
  const customer: Customer = response.body;

  if (!capturedToken) {
    throw new Error('Failed to obtain access token via SDK');
  }

  useAuthStore.getState().setAccessToken(capturedToken);
  useAuthStore.getState().setIsAuth(true);

  return {
    token: capturedToken,
    customer,
  };
}
