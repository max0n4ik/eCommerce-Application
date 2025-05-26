import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { ProductProjection, Category } from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

export async function fetchCatalogProducts(): Promise<ProductProjection[]> {
  const response = await apiRoot.productProjections().search().get().execute();

  return response.body.results;
}

export async function fetchCatalogCategories(): Promise<Category[]> {
  const response = await apiRoot.categories().get().execute();
  return response.body.results;
}
