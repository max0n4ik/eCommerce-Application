import { apiwithExistingTokenFlow } from './build-client';

import type { User, Address } from '@/utils/types';

export async function fetchUserProfile(): Promise<{
  user: User;
  addresses: Address[];
}> {
  const apiRoot = apiwithExistingTokenFlow();
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
      isDefaultBilling: customer.billingAddressIds?.includes(addr.id) ?? false,
      isDefaultShipping:
        customer.shippingAddressIds?.includes(addr.id) ?? false,
    }));

  return { user, addresses };
}
