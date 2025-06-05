import type {
  Attribute,
  BaseAddress,
  CategoryReference,
  LocalizedString,
  ProductSearchResult,
} from '@commercetools/platform-sdk';

export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
  asDefaultShippingAddress: boolean;
  asDefaultBillingAddress: boolean;
  billingAddressFlag: boolean;
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
  asDefaultShipping: boolean;
  asDefaultBilling?: boolean;
  shippingAddress?: BaseAddress;
  billingAddress?: BaseAddress;
}

export interface FilterI {
  filter: {
    price: { max: number; min: number };
    attributes?: Record<string, string[]>;
    category?: string | null;
  };
  filteredCatalog?: ProductSearchResult[];
}

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

