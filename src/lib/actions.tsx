import { z } from 'zod';

import { customerLogin } from '@/services/auth-service';

export const schema = z.object({
  email: z.string().email('Invalid email address'),
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
  errors?: { email?: string[]; password?: string[] };
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
    await customerLogin(
      validatedFields.data.email,
      validatedFields.data.password
    );
    return { message: 'Login successful' };
  } catch (error) {
    return { message: (error as Error).message || 'Error' };
  }
}
