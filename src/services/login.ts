import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export async function login(
  email: string,
  password: string
): Promise<Customer> {
  try {
    const response = await apiRoot
      .me()
      .login()
      .post({ body: { password, email } })
      .execute();
    return response.body.customer;
  } catch (error) {
    console.error('Ошибка подключения:', error);
    throw error;
  }
}
