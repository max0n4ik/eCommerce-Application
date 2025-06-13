import type {
  BaseAddress,
  Customer,
  CustomerUpdate,
  CustomerUpdateAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
  CustomerChangeAddressAction,
} from '@commercetools/platform-sdk';

import { apiWithExistingTokenFlow } from './build-client';

import { mapCustomerToUser, mapCustomerAddresses } from '@/mappers/user';
import type { User, Address } from '@/utils/types';

export type ProfileUpdates = Partial<
  Pick<User, 'firstName' | 'lastName' | 'dateOfBirth'>
>;
export type AddressUpdates = {
  id: string;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
};

export async function fetchUserProfile(): Promise<{
  user: User;
  addresses: Address[];
  version: number;
}> {
  const apiRoot = apiWithExistingTokenFlow();
  const resp = await apiRoot.me().get().execute();
  if (!resp.body) {
    throw new Error(`Empty profile response (status ${resp.statusCode})`);
  }
  const customer = resp.body as Customer;
  return {
    user: mapCustomerToUser(customer),
    addresses: mapCustomerAddresses(customer),
    version: customer.version,
  };
}

export async function updateUserProfile(
  customerId: string,
  currentVersion: number,
  updates: ProfileUpdates
): Promise<User & { version: number }> {
  const apiRoot = apiWithExistingTokenFlow();
  const actions: CustomerUpdateAction[] = [];

  if (updates.firstName) {
    actions.push({
      action: 'setFirstName',
      firstName: updates.firstName,
    } as CustomerSetFirstNameAction);
  }
  if (updates.lastName) {
    actions.push({
      action: 'setLastName',
      lastName: updates.lastName,
    } as CustomerSetLastNameAction);
  }
  if (updates.dateOfBirth) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: updates.dateOfBirth,
    } as CustomerSetDateOfBirthAction);
  }

  if (actions.length === 0) {
    const getResp = await apiRoot
      .customers()
      .withId({ ID: customerId })
      .get()
      .execute();
    const fresh = getResp.body as Customer;
    return { ...mapCustomerToUser(fresh), version: fresh.version };
  }

  const updResp = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({ body: { version: currentVersion, actions } as CustomerUpdate })
    .execute();

  const updated = updResp.body as Customer;
  return { ...mapCustomerToUser(updated), version: updated.version };
}

export async function updateAddress(
  customerId: string,
  currentVersion: number,
  addressUpdates: AddressUpdates[]
): Promise<{ addresses: Address[]; version: number }> {
  const apiRoot = apiWithExistingTokenFlow();

  const getResp = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute();
  if (!getResp.body) {
    throw new Error(`Empty get response (status ${getResp.statusCode})`);
  }
  const customer = getResp.body as Customer;

  const actions: CustomerChangeAddressAction[] = addressUpdates.map((upd) => {
    const original = customer.addresses?.find((a) => a.id === upd.id);
    if (!original) {
      throw new Error(`Address with id="${upd.id}" not found`);
    }

    const merged: BaseAddress = {
      streetName: upd.streetName ?? original.streetName,
      streetNumber: upd.streetNumber ?? original.streetNumber,

      postalCode: upd.postalCode ?? original.postalCode ?? '',
      city: upd.city ?? original.city ?? '',
      region: upd.region ?? original.region,
      country: upd.country ?? original.country ?? '',

      additionalStreetInfo: original.additionalStreetInfo,
      state: original.state,
      company: original.company,
      department: original.department,
      building: original.building,
      apartment: original.apartment,
      pOBox: original.pOBox,
      phone: original.phone,
      mobile: original.mobile,
      email: original.email,
      fax: original.fax,
      additionalAddressInfo: original.additionalAddressInfo,
      externalId: original.externalId,
    };

    return {
      action: 'changeAddress',
      addressId: upd.id,
      address: merged,
    };
  });

  const updResp = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({ body: { version: currentVersion, actions } as CustomerUpdate })
    .execute();
  if (!updResp.body) {
    throw new Error(`Empty update response (status ${updResp.statusCode})`);
  }
  const updatedCustomer = updResp.body as Customer;

  return {
    addresses: mapCustomerAddresses(updatedCustomer),
    version: updatedCustomer.version,
  };
}
