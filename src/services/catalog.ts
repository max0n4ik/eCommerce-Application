import type {
  Category,
  ClientResponse,
  Product,
  ProductDiscount,
  ProductPagedSearchResponse,
} from '@commercetools/platform-sdk';

import { apiRoot } from './create-client';

import type { FilterI } from '@/utils/interfaces';

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
      return response;
    });
}
export async function fetchProductDiscount(
  id: string
): Promise<ClientResponse<ProductDiscount>> {
  return apiRoot
    .productDiscounts()
    .withId({ ID: id })
    .get()
    .execute()
    .then((response) => {
      return response;
    });
}

export async function fetchCatalogFilteredProducts(
  filter: FilterI
): Promise<ClientResponse<ProductPagedSearchResponse>> {
  return apiRoot
    .products()
    .search()
    .post({
      body: {
        query: {
          filter: [
            ...(filter.filter.category
              ? [
                  {
                    exact: {
                      field: 'categories',
                      value: filter.filter.category,
                    },
                  },
                ]
              : []),
            {
              range: {
                field: 'variants.prices.centAmount',
                fieldType: 'long',
                gte: filter.filter.price.min,
                lte: filter.filter.price.max,
              },
            },
          ],
        },
        sort: [
          {
            field: filter.filter.sort.field,
            language: 'en',
            order: filter.filter.sort.order,
          },
        ],
        limit: 40,
        offset: 0,
      },
    })
    .execute()
    .then((response) => {
      return response;
    });
}
