import type {
  Customer,
  CustomerUpdate,
  CustomerUpdateAction,
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
