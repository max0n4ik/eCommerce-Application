import { z } from 'zod';

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

export function authenticate(
  _state: {
    message: string;
    errors?: { email?: string[]; password?: string[] };
  },
  formData: FormData
): {
  message: string;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
} {
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
    return { message: 'Login successful' };
  } catch {
    return { message: 'Invalid credentials' };
  }
}
