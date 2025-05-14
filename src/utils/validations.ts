import { z } from 'zod';

import { allowedCountries, postalCodePatterns } from './constantes';

export const registrationAddressSchema = z
  .object({
    country: z
      .string()
      .min(1, 'Name must be at least 1 character')
      .refine((value) => allowedCountries.has(value), {
        message: 'Country must be from the European Union',
      }),
    city: z
      .string()
      .min(1, 'City must contain at least one character ')
      .regex(/^[A-Za-z\s-]+$/, 'City must contain only letters'),
    street: z.string().min(1, 'Street must contain at least one character'),
    house: z.string().min(1, 'House is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  })
  .superRefine((data, ctx) => {
    const pattern = postalCodePatterns[data.country];
    if (pattern && !pattern.test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        message: 'Invalid postal code format for the selected country',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const registrationUserSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  dob: z
    .date()
    .nullable()
    .refine(
      (dob) => {
        if (dob) {
          const today = new Date();
          const thirteenYearsAgo = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
          );
          return dob <= thirteenYearsAgo;
        }
        return false;
      },
      {
        message: 'You must be at least 13 years old',
      }
    ),
});

export type RegistrationUser = z.infer<typeof registrationUserSchema>;

export function validateUserFormData(data: RegistrationUser): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const result = registrationUserSchema.safeParse(data);
  if (result.success) return { isValid: true, errors: {} };

  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    errors[err.path[0] as string] = err.message;
  });

  return { isValid: false, errors };
}

export const registrationFirstSchema = z
  .object({
    email: z.string().email('Invalid email address, (e.g., example@email.com)'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });

export type RegistrationCredentials = z.infer<typeof registrationFirstSchema>;

export function validateRegistrationCredentials(
  data: RegistrationCredentials
): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const result = registrationFirstSchema.safeParse(data);

  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as string;
    errors[key] = issue.message;
  }

  return { isValid: false, errors };
}
