import { z } from 'zod';

import { allowedCountries, postalCodePatterns } from './constantes';
import type { AddressForm } from './types';

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
    house: z.string().min(1, 'House № is required'),
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
  name: z
    .string()
    .min(1, 'Name must be at least 1 character')
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Name cannot start or end with spaces and contain number',
    }),
  lastName: z
    .string()
    .min(1, 'Last name must be at least 1 character')
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Last name cannot start or end with spaces and contain number',
    }),
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

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .refine((val) => !/\d/.test(val), {
      message: 'First Name cannot contain numbers',
    }),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .refine((val) => !/\d/.test(val), {
      message: 'Last Name cannot contain numbers',
    }),
  dateOfBirth: z
    .string()
    .min(1, 'Date of Birth is required')
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: 'Date of Birth must be in YYYY-MM-DD format',
    }),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export function validateProfileData(data: ProfileForm): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const result = profileSchema.safeParse(data);
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ProfileForm;
    errors[key] = issue.message;
  }
  return { isValid: false, errors };
}

export const addressFormSchema = z.object({
  streetName: z.string().min(1, 'Street Name is required'),
  streetNumber: z
    .string()
    .min(1, 'House Number is required')
    .regex(/^\d+$/, 'House Number must be numeric'),
  city: z
    .string()
    .min(1, 'City is required')
    .regex(/^[A-Za-z\s-]+$/, 'City must contain only letters'),
  region: z
    .string()
    .min(1, 'Region is required')
    .regex(/^[A-Za-z\s-]+$/, 'Region must contain only letters'),
  postalCode: z.string().min(1, 'Postal Code is required'),
  country: z.string().min(1, 'Country is required'),
});

export function validateAddressData(data: AddressForm): {
  isValid: boolean;
  errors: Partial<Record<keyof AddressForm, string>>;
} {
  const result = addressFormSchema.safeParse(data);
  if (result.success) {
    return { isValid: true, errors: {} };
  }
  const errors: Partial<Record<keyof AddressForm, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof AddressForm;
    errors[field] = issue.message;
  }
  return { isValid: false, errors };
}
