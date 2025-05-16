import type { z } from 'zod';

import type { registrationAddressSchema } from './validations';

import type { ROUTES } from '@/utils/constantes';

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
export type RegistrationAddressFormData = z.infer<
  typeof registrationAddressSchema
>;
