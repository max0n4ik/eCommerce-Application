import type { z } from 'zod';

import type { CategoryCard } from './interfaces';
import type { registrationAddressSchema } from './validations';

import type { ROUTES } from '@/utils/constantes';

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
export type RegistrationAddressFormData = z.infer<
  typeof registrationAddressSchema
>;
export type PropsWithChildren<P = unknown> = P & {
  children: React.JSX.Element;
};

export type PrivateRouteProps = PropsWithChildren & {
  reverse?: boolean;
};

export type NestedCategory = CategoryCard & {
  children: NestedCategory[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
};

export type UseMobileMenuResult = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
  openMenu: () => void;
  toggleMenu: () => void;
};

export type AuthSectionProps = {
  onItemClick?: () => void;
};

export type NavLinksProps = {
  onItemClick?: () => void;
};
