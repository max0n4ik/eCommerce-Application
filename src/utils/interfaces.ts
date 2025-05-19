export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
}

export interface RegistrationFormProps {
  className?: string;
  onNext?: () => void;
  isDefaultBilling?: boolean | null;
  setIsDefaultBilling?: (value: boolean) => void;
  onSignUp?: () => void;
}

export interface RegistrationFormFourthProps {
  className?: string;
}

export interface PropsWithChildren {
  children: React.ReactNode;
}
