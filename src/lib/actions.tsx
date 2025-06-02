import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { z } from 'zod';

import { login } from '@/services/login';
import { authStore } from '@/store/login';

export const schema = z.object({
  email: z.string().email('Invalid email address, (e.g., example@email.com)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
    ),
});

export async function authenticate(
  _state: {
    message: string;
    errors?: { email?: string[]; password?: string[] };
  },
  formData: FormData
): Promise<{
  message: string;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
}> {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    };
  }

  try {
    const result = await login(
      validatedFields.data.email,
      validatedFields.data.password
    );

    if (!result.success) {
      return { message: result.error || 'Error' };
    }

    authStore.setIsAuth(true);
    if (result.accessToken) {
      authStore.setAccessToken(result.accessToken);

      const client = new ClientBuilder()
        .withExistingTokenFlow(result.accessToken)
        .withHttpMiddleware({ host: import.meta.env.VITE_API_URL, fetch })
        .build();

      const api = createApiBuilderFromCtpClient(client).withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
      });

      try {
        await api.me().get().execute();
      } catch (extraError) {
        console.warn('Ошибка при дополнительном запросе:', extraError);
      }
    } else {
      console.warn('No token received from login result');
    }

    return { message: 'Login successful' };
  } catch {
    return { message: 'Error' };
  }
}
