import type { ProductVariant, Image } from '@commercetools/platform-sdk';
import type { BaseAddress } from '@commercetools/platform-sdk';
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

export type ProductType = {
  lineItemId: string;
  productId: string;
  productKey: string;
  slug: string;
  productName: string;
  description: string;
  price: number;
  priceDiscount?: number;
  currency: string;
  images: Image[];
  isDiscount: boolean;
  variants: ProductVariant[];
  productSku?: string;
  totalPrice?: number;
  quantity?: number;
  promoPrice?: number;
  isPromo?: boolean;
};

export type CartItem = {
  lineItemId: string;
  productName: string;
  price: number;
  priceDiscount?: number;
  currency?: string;
  variant?: ProductVariant;
  images: Image[];
  isDiscount?: boolean;
  className?: string;
  totalPrice?: number;
  quantity: number;
  isPromo?: boolean;
  promoPrice?: number;
  onDelete: (lineItemId: string) => void;
  onChangeQuantity: (lineItemId: string, quantity: number) => void;
};

export type DiscountCodeType = {
  discountCodeName: string;
  discountCodeId: string;
};

export type AddressForm = {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
} & Partial<
  Pick<
    BaseAddress,
    | 'additionalStreetInfo'
    | 'state'
    | 'company'
    | 'department'
    | 'building'
    | 'apartment'
    | 'pOBox'
    | 'phone'
    | 'mobile'
    | 'email'
    | 'fax'
    | 'additionalAddressInfo'
    | 'externalId'
  >
>;

export type AddressUpdates = {
  id: string;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
};

export type FieldId = 'firstName' | 'lastName' | 'dateOfBirth';

export type ProfileUpdates = Partial<
  Pick<User, 'firstName' | 'lastName' | 'dateOfBirth'>
>;
