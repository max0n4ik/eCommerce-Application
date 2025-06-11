import type {
  ApiRequest,
  Cart,
  CartPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk';

import { apiRootAnonim, apiRootWithToken } from './build-client';
import { createAuthenticatedApiRoot } from './create-client';

import type { User, Address } from '@/utils/types';

export async function fetchUserProfile(token: string): Promise<{
  user: User;
  addresses: Address[];
}> {
  const apiRoot = createAuthenticatedApiRoot(token);
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

export async function createCart(): Promise<ClientResponse<Cart>> {
  return apiRootWithToken
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute()
    .then((response) => {
      return response;
    });
}

export async function fetchCart(): Promise<
  ClientResponse<CartPagedQueryResponse>
> {
  return apiRootWithToken
    .me()
    .carts()
    .get()
    .execute()
    .then((response) => {
      return response;
    });
}
export function createAnonymousUser(): void {
  apiRootAnonim
    .me()
    .get()
    .execute()
    .catch((error) => {
      if (error.statusCode !== 403) {
        throw error;
      }
    });
}
export async function addProductToCart(
  cartID: string,
  productId: string
): Promise<ApiRequest<Cart>> {
  return apiRootWithToken
    .me()
    .carts()
    .withId({ ID: cartID })
    .post({
      body: {
        version: 1,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    });
}
