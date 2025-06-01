import type {
  Attribute,
  BaseAddress,
  CategoryReference,
  LocalizedString,
} from '@commercetools/platform-sdk';

export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
  useAsDefaultShippingAddress: boolean;
  useAsDefaultBillingAddress: boolean;
  useAsBillingAddress: boolean;
}

export interface RegistrationStepProps {
  onNext: () => void;
}

export interface RegistrationBillingFormProps {
  className?: string;
}

export interface PropsWithChildren {
  children: React.ReactNode;
}

export interface ProductCardI {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  permyriad?: number;
  priceCurrency: string;
  imageUrl: string;
  imageAlt?: string;
  description?: LocalizedString;
  category?: CategoryReference[];
  attributes?: Attribute[];
}

export interface CategoryCard {
  id: string;
  name: string;
  description?: string;
  parent?: CategoryReference;
}

export interface DiscountPrice {
  id: string;
  name: string;
  description?: string;
  category: string;
  value: number;
}

export interface DetailedProductInterface {
  name: string;
  description?: string;
  images: { url: string; alt: string }[];
  permyriad?: number;
  price: number;
  priceCurrency: string;
  category?: CategoryReference[];
  attributes?: Attribute[];
}
export interface ProductCategoriesInterface {
  typeId: string;
  id: string;
}

export interface CustomerDataInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  useAsDefaultShipping: boolean;
  useAsDefaultBilling: boolean;
  shippingAddress?: BaseAddress;
  billingAddress?: BaseAddress;
}
