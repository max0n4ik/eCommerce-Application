import type {
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import {
  apiWithClientCredentialsFlow,
  apiWithExistingTokenFlow,
  apiWithPasswordFlow,
} from './build-client';
import { getActiveCart } from './cart-service';

import { useAuthStore } from '@/store/auth-store';
import type { CustomerDataInterface } from '@/utils/interfaces';

export const customerLogin = async (
  email: string,
  password: string
): Promise<ClientResponse<CustomerSignInResult>> => {
  const existingToken = localStorage.getItem('token');

  const newCustomer = existingToken
    ? apiWithExistingTokenFlow()
    : apiWithPasswordFlow(email, password);

  const response = await newCustomer
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();

  if (response.statusCode === 200) {
    await apiWithPasswordFlow(email, password).me().get().execute();
    if (localStorage.getItem('cartId')) await getActiveCart();
  }
  useAuthStore.getState().setIsAuth(true);
  return response;
};

export const customerSignUp = async (
  data: CustomerDataInterface
): Promise<ClientResponse<CustomerSignInResult>> => {
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
    anonimId,
  } = data;

  if (!shippingAddress) {
    throw new Error('Нужен shippingAddress для регистрации');
  }

  const dob = dateOfBirth.toISOString().split('T')[0];
  const addresses: CustomerDraft['addresses'] = [shippingAddress];
  const shippingAddresses = [0] as number[];
  const billingAddresses: number[] = [];

  if (billingAddress) {
    addresses.push(billingAddress);
    billingAddresses.push(1);
  }

  const existingToken = localStorage.getItem('token');

  const newCustomer = existingToken
    ? apiWithExistingTokenFlow()
    : apiWithClientCredentialsFlow();

  const signUpCustomer = await newCustomer
    .customers()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dob,
        addresses,
        defaultShippingAddress: asDefaultShipping ? 0 : undefined,
        defaultBillingAddress:
          asDefaultBilling && billingAddress ? 1 : undefined,
        shippingAddresses,
        billingAddresses,
        anonymousId: anonimId ?? undefined,
      },
    })
    .execute();

  if (signUpCustomer.statusCode === 201) {
    await apiWithPasswordFlow(email, password).me().get().execute();
    if (localStorage.getItem('cartId')) await getActiveCart();
  }
  useAuthStore.getState().setIsAuth(true);
  return signUpCustomer;
};
