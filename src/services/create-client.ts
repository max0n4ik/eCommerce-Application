import {
  createApiBuilderFromCtpClient,
  type CustomerDraft,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

import { authStore } from '@/store/login';
import type { CustomerDataInterface } from '@/utils/interfaces';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export async function signUpCustomer(
  data: CustomerDraft
): Promise<CustomerSignInResult> {
  const response = await apiRoot
    .customers()
    .post({
      body: data,
    })
    .execute();

  return response.body;
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
  let defaultBillingAddress = undefined;

  if (billingAddress) {
    addresses.push(billingAddress);
    billingAddresses[0] = 1;
    if (asDefaultBilling) {
      defaultBillingAddress = 1;
    }
  }

  await signUpCustomer({
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
  });
  authStore.setIsAuth(true);
}
