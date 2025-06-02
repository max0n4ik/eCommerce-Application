import {
  createApiBuilderFromCtpClient,
  type ByProjectKeyRequestBuilder,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import { useAuthStore } from '@/store/login';
import type { User, Address } from '@/utils/types';

export function createCustomerApiRoot(): ByProjectKeyRequestBuilder {
  const token = useAuthStore.getState().accessToken;
  const apiUrl = import.meta.env.VITE_API_URL;
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  console.log('token:', token);
  console.log('VITE_API_URL:', apiUrl);
  console.log('VITE_PROJECT_KEY:', projectKey);

  if (!token || !apiUrl || !projectKey) {
    throw new Error('Missing API configuration or access token');
  }

  const client = new ClientBuilder()
    .withExistingTokenFlow(token)
    .withHttpMiddleware({ host: apiUrl, fetch })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}

export async function fetchUserProfile(): Promise<{
  user: User;
  addresses: Address[];
}> {
  try {
    const apiRoot = createCustomerApiRoot();
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
