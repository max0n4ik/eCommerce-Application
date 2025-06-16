import type {
  Category,
  ClientResponse,
  Product,
  ProductDiscount,
  ProductPagedSearchResponse,
} from '@commercetools/platform-sdk';

import { apiWithClientCredentialsFlow } from './build-client';

import type {
  FetchCatalogProductsInterface,
  FilterI,
} from '@/utils/interfaces';

export async function fetchCatalogProducts(
  offset: number,
  limit: number
): Promise<FetchCatalogProductsInterface> {
  const visitor = apiWithClientCredentialsFlow();
  const response = await visitor
    .products()
    .get({ queryArgs: { limit: limit, offset: offset } })
    .execute();
  return { results: response.body.results, total: response.body.total };
}

export async function fetchCatalogProductsDiscount(): Promise<
  ProductDiscount[]
> {
  const visitor = apiWithClientCredentialsFlow();
  const response = await visitor.productDiscounts().get().execute();
  return response.body.results;
}

export async function fetchCatalogCategories(): Promise<Category[]> {
  const visitor = apiWithClientCredentialsFlow();
  const response = await visitor.categories().get().execute();
  return response.body.results;
}
export async function fetchProductById(
  id: string
): Promise<ClientResponse<Product>> {
  const visitor = apiWithClientCredentialsFlow();
  return visitor
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
  const visitor = apiWithClientCredentialsFlow();
  return visitor
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
  const visitor = apiWithClientCredentialsFlow();
  return visitor
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
            ...(filter.filter.search
              ? [
                  {
                    fullText: {
                      field: 'name',
                      language: 'en',
                      value: filter.filter.search,
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
