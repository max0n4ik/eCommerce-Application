import type {
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
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
  } = data;

  if (!shippingAddress) {
    throw new Error('Нужен shippingAddress для регистрации');
  }

  const shippingAddressObj = {
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    country: `${shippingAddress.country}`,
    streetName: `${shippingAddress.streetName}`,
    postalCode: `${shippingAddress.postalCode}`,
    city: `${shippingAddress.city}`,
    email: `${email}`,
  };

  const billingAddressObj = billingAddress
    ? {
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        country: `${billingAddress.country}`,
        streetName: `${billingAddress.streetName}`,
        postalCode: `${billingAddress.postalCode}`,
        city: `${billingAddress.city}`,
        email: `${email}`,
      }
    : shippingAddress;

  const requestBody: MyCustomerDraft = {
    email: `${email}`,
    password: `${password}`,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    dateOfBirth: `${dateOfBirth.toISOString().split('T')[0]}`,
    addresses: [shippingAddressObj, billingAddressObj],
    defaultShippingAddress: asDefaultShipping ? 0 : undefined,
    defaultBillingAddress:
      asDefaultBilling || (asDefaultShipping && !billingAddress)
        ? 1
        : undefined,
  };

  const existingToken = localStorage.getItem('token');

  const newCustomer = existingToken
    ? apiWithExistingTokenFlow()
    : apiWithClientCredentialsFlow();

  const signUpCustomer = await newCustomer
    .me()
    .signup()
    .post({
      body: requestBody,
    })
    .execute();

  if (signUpCustomer.statusCode === 201) {
    await apiWithPasswordFlow(email, password).me().get().execute();
    if (localStorage.getItem('cartId')) await getActiveCart();
  }
  useAuthStore.getState().setIsAuth(true);
  return signUpCustomer;
};
