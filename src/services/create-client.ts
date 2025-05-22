import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type {
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';

import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export async function registration(
  data: MyCustomerDraft
): Promise<CustomerSignInResult> {
  const response = await apiRoot
    .me()
    .signup()
    .post({
      body: data,
    })
    .execute();

  return response.body;
}
