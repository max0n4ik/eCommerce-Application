export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
}

export interface RegistrationStepProps {
  onNext: (useAsBilling?: boolean) => void;
}

export interface RegistrationFormFourthProps {
  className?: string;
}

export interface PropsWithChildren {
  children: React.ReactNode;
}
