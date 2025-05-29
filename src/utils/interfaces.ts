import type {
  Attribute,
  CategoryReference,
  LocalizedString,
} from '@commercetools/platform-sdk';

export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
  isDefault: boolean;
  isBilling?: boolean;
}

export interface RegistrationStepProps {
  onNext: () => void;
}

export interface RegistrationFormFourthProps {
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
