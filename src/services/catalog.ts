import type {
  Category,
  ClientResponse,
  Product,
  ProductDiscount,
} from '@commercetools/platform-sdk';

import { apiRoot } from './create-client';

export function fetchCatalogProducts(): Promise<ClientResponse<Product[]>> {
  return apiRoot
    .products()
    .get()
    .execute()
    .then((response) => {
      return { body: response.body.results };
    });
}

export async function fetchCatalogProductsDiscount(): Promise<
  ClientResponse<ProductDiscount[]>
> {
  return apiRoot
    .productDiscounts()
    .get()
    .execute()
    .then((response) => {
      return { body: response.body.results };
    });
}

export async function fetchCatalogCategories(): Promise<
  ClientResponse<Category[]>
> {
  return apiRoot
    .categories()
    .get()
    .execute()
    .then((response) => {
      return { body: response.body.results };
    });
}
export async function fetchProductById(
  id: string
): Promise<ClientResponse<Product>> {
  return apiRoot
    .products()
    .withId({ ID: id })
    .get()
    .execute()
    .then((response) => {
      return { ...response.body };
    });
}
