import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import { loginCustomer } from './auth-service';
import { ctpClient } from './build-client';

import type { CustomerDataInterface } from '@/utils/interfaces';

const apiUrl = import.meta.env.VITE_API_URL;
const projectKey = import.meta.env.VITE_PROJECT_KEY;

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

export function createAuthenticatedApiRoot(
  token: string
): ByProjectKeyRequestBuilder {
  const authorizedFetch: typeof fetch = (input, init = {}) => {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  };

  const client = new ClientBuilder()
    .withHttpMiddleware({ host: apiUrl, fetch: authorizedFetch })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export async function completeSignUp(
  customerData: CustomerDataInterface
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
  } = customerData;

  const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];

  if (!shippingAddress) {
    throw new Error("Can't process sign up without Shipping Address");
  }

  const addresses = [shippingAddress];
  const shippingAddresses = [0];
  const billingAddresses = [0];

  const defaultShippingAddress = asDefaultShipping ? 0 : undefined;
  let defaultBillingAddress: number | undefined = undefined;

  if (billingAddress) {
    addresses.push(billingAddress);
    billingAddresses[0] = 1;
    if (asDefaultBilling) {
      defaultBillingAddress = 1;
    }
  }

  await apiRoot
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        addresses,
        defaultShippingAddress,
        defaultBillingAddress,
        shippingAddresses,
        billingAddresses,
      },
    })
    .execute();

  await loginCustomer(email, password);
}
