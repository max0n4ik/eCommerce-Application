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
