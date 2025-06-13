import type { Customer } from '@commercetools/platform-sdk';

import type { User, Address } from '@/utils/types';

export function mapCustomerToUser(customer: Customer): User {
  return {
    id: customer.id,
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    dateOfBirth: customer.dateOfBirth ?? '',
  };
}

export function mapCustomerAddresses(customer: Customer): Address[] {
  return (customer.addresses ?? [])
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
}
