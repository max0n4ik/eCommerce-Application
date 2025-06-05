import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

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
  const tokenUrl = `${VITE_AUTH_URL}/oauth/${VITE_PROJECT_KEY}/customers/token`;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${VITE_CLIENT_ID}:${VITE_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password,
      scope: VITE_SCOPES,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    console.error('Ошибка получения токена:', json);
    throw new Error(json.error_description || 'Login failed');
  }

  const token = json.access_token;

  const client = new ClientBuilder()
    .withHttpMiddleware({ host: VITE_API_URL, fetch })
    .withExistingTokenFlow(token)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: VITE_PROJECT_KEY,
  });

  const customer = await apiRoot.me().get().execute();

  useAuthStore.getState().setAccessToken(token);
  useAuthStore.getState().setIsAuth(true);

  return { token, customer: customer.body };
}
