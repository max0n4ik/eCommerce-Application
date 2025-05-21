import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export type LoginResult = {
  success: boolean;
  customer?: Customer;
  error?: string;
};

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    const response = await apiRoot
      .me()
      .login()
      .post({ body: { password, email } })
      .execute()
      .then((response) => response)
      .catch((error) => {
        if (error.body?.message) {
          throw new Error(error.body.message);
        }
        throw error;
      });
    return {
      success: true,
      customer: response.body.customer,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
