import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  createAuthForPasswordFlow,
  ClientBuilder,
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

type TokenInfo = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

type TokenProviderLike = {
  getTokenInfo: () => Promise<TokenInfo>;
};

export async function loginCustomer(
  email: string,
  password: string
): Promise<{ customer: unknown; token: string }> {
  const authMiddleware = createAuthForPasswordFlow({
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes: VITE_SCOPES.split(' '),
    fetch,
  });

  const client = new ClientBuilder()
    .withHttpMiddleware({ host: VITE_API_URL, fetch })
    .withAuthMiddleware(authMiddleware)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: VITE_PROJECT_KEY,
  });

  const response = await apiRoot.me().get().execute();

  const tokenProvider = (
    authMiddleware as unknown as { tokenProvider: TokenProviderLike }
  ).tokenProvider;
  const tokenInfo = await tokenProvider.getTokenInfo();
  const token = tokenInfo.access_token;

  const { setAccessToken, setIsAuth } = useAuthStore.getState();
  setAccessToken(token);
  setIsAuth(true);

  return {
    customer: response.body,
    token,
  };
}
