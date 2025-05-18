import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export async function registration(data: CustomerDraft): Promise<Customer> {
  try {
    const response = await apiRoot
      .customers()
      .post({
        body: data,
      })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.error('Ошибка подключения:', error);
    throw error;
  }
}
