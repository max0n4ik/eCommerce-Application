import type { Customer } from '@commercetools/platform-sdk';

import { fetchCustomerAccessToken } from './auth-token';
import { apiRoot } from './create-client';

export type LoginResult = {
  success: boolean;
  customer?: Customer;
  accessToken?: string;
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

    let accessToken: string | undefined;
    try {
      accessToken = await fetchCustomerAccessToken(email, password);
      console.log('accessToken:', accessToken);
    } catch (tokenError) {
      console.error('Failed to fetch access token after login:', tokenError);
    }

    return {
      success: true,
      customer: response.body.customer,
      accessToken,
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
