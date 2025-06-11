import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
  type CustomerDraft,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import { loginCustomer } from './auth-service';
import { apiRoot } from './build-client';

import type { CustomerDataInterface } from '@/utils/interfaces';

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  throw new Error('VITE_API_URL не определён');
}

const projectKey = import.meta.env.VITE_PROJECT_KEY;
if (!projectKey) {
  throw new Error('VITE_PROJECT_KEY не определён');
}

export function createAuthenticatedApiRoot(
  token: string
): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withHttpMiddleware({ host: apiUrl, fetch })
    .withExistingTokenFlow(`Bearer ${token}`, { force: true })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export async function completeSignUp(
  data: CustomerDataInterface
): Promise<void> {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    asDefaultShipping,
    asDefaultBilling,
    shippingAddress,
    billingAddress,
    anonimId,
  } = data;

  if (!shippingAddress) {
    throw new Error('Нужен shippingAddress для регистрации');
  }

  const dob = dateOfBirth.toISOString().split('T')[0];
  const addresses: CustomerDraft['addresses'] = [shippingAddress];
  const shippingAddresses = [0] as number[];
  const billingAddresses: number[] = [];

  if (billingAddress) {
    addresses.push(billingAddress);
    billingAddresses.push(1);
  }

  await apiRoot
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dob,
        addresses,
        defaultShippingAddress: asDefaultShipping ? 0 : undefined,
        defaultBillingAddress:
          asDefaultBilling && billingAddress ? 1 : undefined,
        shippingAddresses,
        billingAddresses,
        anonymousId: anonimId ?? undefined,
      },
    })
    .execute();

  const { token } = await loginCustomer(email, password);

  const { useAuthStore } = await import('@/store/auth-store');
  const { setAccessToken, setIsAuth } = useAuthStore.getState();
  setAccessToken(token);
  setIsAuth(true);
}
