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
import type { ProfileUpdates } from '@/utils/types';
import type { User, Address, AddressUpdates } from '@/utils/types';

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

async function patchCustomer(
  customerId: string,
  version: number,
  actions: CustomerUpdateAction[]
): Promise<Customer> {
  const apiRoot = apiWithExistingTokenFlow();
  const upd = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({ body: { version, actions } as CustomerUpdate })
    .execute();
  if (!upd.body) {
    throw new Error(`Empty update response (status ${upd.statusCode})`);
  }
  return upd.body as Customer;
}

export async function saveUserProfile(
  updates: ProfileUpdates
): Promise<User & { version: number }> {
  const { user, version: currentVersion } = await fetchUserProfile();

  const actions: CustomerUpdateAction[] = [];
  if (updates.firstName != null) {
    actions.push({
      action: 'setFirstName',
      firstName: updates.firstName,
    } as CustomerSetFirstNameAction);
  }
  if (updates.lastName != null) {
    actions.push({
      action: 'setLastName',
      lastName: updates.lastName,
    } as CustomerSetLastNameAction);
  }
  if (updates.dateOfBirth != null) {
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: updates.dateOfBirth,
    } as CustomerSetDateOfBirthAction);
  }

  if (actions.length === 0) {
    return { ...user, version: currentVersion };
  }

  const updatedCustomer = await patchCustomer(user.id, currentVersion, actions);
  return {
    ...mapCustomerToUser(updatedCustomer),
    version: updatedCustomer.version,
  };
}

export async function saveUserAddresses(
  addressUpdates: AddressUpdates[]
): Promise<{ addresses: Address[]; version: number }> {
  const { user, version: currentVersion } = await fetchUserProfile();
  const apiRoot = apiWithExistingTokenFlow();
  const getResp = await apiRoot
    .customers()
    .withId({ ID: user.id })
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

  const updatedCustomer = await patchCustomer(user.id, currentVersion, actions);
  return {
    addresses: mapCustomerAddresses(updatedCustomer),
    version: updatedCustomer.version,
  };
}
