import type {
  CustomerUpdateAction,
  CustomerChangeAddressAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
} from '@commercetools/platform-sdk';

import { createAuthenticatedApiRoot } from './create-client';

import type { User, Address } from '@/utils/types';

export type ProfileUpdates = Partial<
  Pick<User, 'firstName' | 'lastName' | 'dateOfBirth'>
>;

export type AddressUpdates = {
  id: string;
} & Partial<Omit<Address, 'id'>>;

export async function fetchUserProfile(
  token: string
): Promise<{ user: User; addresses: Address[]; version: number }> {
  const apiRoot = createAuthenticatedApiRoot(token);
  const response = await apiRoot.me().get().execute();
  if (!response.body) {
    throw new Error(`Empty profile response (status ${response.statusCode})`);
  }
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

  return {
    user,
    addresses,
    version: customer.version,
  };
}

export async function updateUserProfile(
  token: string,
  customerId: string,
  currentVersion: number,
  updates: ProfileUpdates
): Promise<User & { version: number }> {
  const actions: CustomerUpdateAction[] = [];

  if (updates.firstName) {
    const act: CustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName: updates.firstName,
    };
    actions.push(act);
  }
  if (updates.lastName) {
    const act: CustomerSetLastNameAction = {
      action: 'setLastName',
      lastName: updates.lastName,
    };
    actions.push(act);
  }
  if (updates.dateOfBirth) {
    const dobAction: CustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth: updates.dateOfBirth,
    };
    actions.push(dobAction as CustomerUpdateAction);
  }

  const apiRoot = createAuthenticatedApiRoot(token);

  if (actions.length === 0) {
    const getResp = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .get()
      .execute();

    if (!getResp.body) {
      throw new Error(`Empty get response (${getResp.statusCode})`);
    }
    const c = getResp.body;

    return {
      id: c.id,
      firstName: c.firstName ?? '',
      lastName: c.lastName ?? '',
      dateOfBirth: c.dateOfBirth ?? '',
      version: c.version,
    };
  }

  const updResp = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({ body: { version: currentVersion, actions } })
    .execute();

  if (!updResp.body) {
    throw new Error(`Empty update response (${updResp.statusCode})`);
  }
  const updated = updResp.body;

  return {
    id: updated.id,
    firstName: updated.firstName ?? '',
    lastName: updated.lastName ?? '',
    dateOfBirth: updated.dateOfBirth ?? '',
    version: updated.version,
  };
}

export async function updateAddress(
  token: string,
  customerId: string,
  currentVersion: number,
  addressUpdates: AddressUpdates[]
): Promise<Address[]> {
  const apiRoot = createAuthenticatedApiRoot(token);

  const addressChangeActions: CustomerChangeAddressAction[] =
    addressUpdates.map((upd) => {
      const [streetName, streetNumber = ''] = (upd.street ?? '').split(' ');
      return {
        action: 'changeAddress',
        addressId: upd.id,
        address: {
          streetName,
          streetNumber,
          city: upd.city ?? '',
          region: upd.state ?? '',
          postalCode: upd.zip ?? '',
          country: upd.country ?? '',
        },
      } as CustomerChangeAddressAction;
    });

  const updateResponse = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: { version: currentVersion, actions: addressChangeActions },
    })
    .execute();
  if (!updateResponse.body) {
    throw new Error(
      `Empty address update (status ${updateResponse.statusCode})`
    );
  }
  const updatedCustomer = updateResponse.body;

  return (updatedCustomer.addresses ?? [])
    .filter(
      (addr): addr is Required<typeof addr> => typeof addr.id === 'string'
    )
    .map((addr) => ({
      id: addr.id,
      street: [addr.streetName, addr.streetNumber].filter(Boolean).join(' '),
      city: addr.city ?? '',
      state: addr.region ?? '',
      zip: addr.postalCode ?? '',
      country: addr.country ?? '',
      isDefaultBilling:
        updatedCustomer.billingAddressIds?.includes(addr.id) ?? false,
      isDefaultShipping:
        updatedCustomer.shippingAddressIds?.includes(addr.id) ?? false,
    }));
}
