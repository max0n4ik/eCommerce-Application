import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import type { User, Address } from '@/utils/types';

export function createCustomerApiRoot(
  token: string
): ByProjectKeyRequestBuilder {
  const apiUrl = import.meta.env.VITE_API_URL;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  if (!token || !apiUrl || !projectKey) {
    throw new Error('Missing API configuration or access token');
  }

  const authorizedFetch: typeof fetch = (input, init = {}) => {
    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(input, {
      ...init,
      headers,
    });
  };

  const client = new ClientBuilder()
    .withHttpMiddleware({
      host: apiUrl,
      fetch: authorizedFetch,
    })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export async function fetchUserProfile(token: string): Promise<{
  user: User;
  addresses: Address[];
}> {
  try {
    const apiRoot = createCustomerApiRoot(token);
    const response = await apiRoot.me().get().execute();
    const customer = response.body;

    const user: User = {
      id: customer.id,
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      dateOfBirth: customer.dateOfBirth ?? '',
    };

    const addresses: Address[] = (customer.addresses ?? [])
      .filter((addr): addr is Required<typeof addr> => !!addr.id)
      .map((addr) => ({
        id: addr.id,
        street: [addr.streetName, addr.streetNumber].filter(Boolean).join(' '),
        city: addr.city ?? '',
        state: addr.region ?? '',
        zip: addr.postalCode ?? '',
        country: addr.country ?? '',
        isDefaultBilling:
          customer.billingAddressIds?.includes(addr.id) ?? false,
        isDefaultShipping:
          customer.shippingAddressIds?.includes(addr.id) ?? false,
      }));

    return { user, addresses };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch profile'
    );
  }
}
