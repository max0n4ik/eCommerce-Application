import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export const testConnection = async (): Promise<Customer> => {
  try {
    const response = await apiRoot
      .customers()
      .post({
        body: {
          email: 'max2004.gorohov@yandex.ru',
          password: 'Expert1977@',
        },
      })
      .execute();
    console.log(response.body);
    return response.body.customer;
  } catch (error) {
    console.error('Ошибка подключения:', error);
    throw error;
  }
};
