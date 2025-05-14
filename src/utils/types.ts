import type { z } from 'zod';

import type { registrationAddressSchema } from './validations';

import type { ROUTES } from '@/utils/constantes';

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
export type RegistrationAddressFormData = z.infer<
  typeof registrationAddressSchema
>;

export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
}
export interface RegistrationFormFourthProps {
  className?: string;
}
export type Props = {
  onNext: () => void;
};
