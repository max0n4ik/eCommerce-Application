import type {
  Customer,
  CustomerUpdate,
  CustomerUpdateAction,
  CustomerChangePassword,
} from '@commercetools/platform-sdk';

import { apiWithExistingTokenFlow } from './build-client';

export async function fetchCustomerRaw(): Promise<Customer> {
  const apiRoot = apiWithExistingTokenFlow();
  const resp = await apiRoot.me().get().execute();
  if (!resp.body) {
    throw new Error(`Empty profile response (status ${resp.statusCode})`);
  }
  return resp.body as Customer;
}

export async function patchCustomerRaw(
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

export async function countCustomersByEmail(email: string): Promise<number> {
  const apiRoot = apiWithExistingTokenFlow();
  const resp = await apiRoot
    .customers()
    .get({ queryArgs: { where: `email="${email}"` } })
    .execute();
  return resp.body.count ?? 0;
}

export async function changePasswordService(
  customerId: string,
  version: number,
  currentPassword: string,
  newPassword: string
): Promise<Customer> {
  const apiRoot = apiWithExistingTokenFlow();
  const body: CustomerChangePassword = {
    id: customerId,
    version,
    currentPassword,
    newPassword,
  };

  const resp = await apiRoot.customers().password().post({ body }).execute();

  if (!resp.body) {
    throw new Error(`Password change failed (status ${resp.statusCode})`);
  }
  return resp.body as Customer;
}
