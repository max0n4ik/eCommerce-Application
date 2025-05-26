import type { Attribute } from '@commercetools/platform-sdk';

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

export interface ProductCard {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  imageAlt?: string;
  description?: string;
  category?: string;
  attributes?: Attribute[];
}
