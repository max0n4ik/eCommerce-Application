export interface RegistrationAddress {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
}

export interface RegistrationStepProps {
  onNext: () => void;
  onComplete?: () => void;
}

export interface RegistrationFormFourthProps {
  className?: string;
  onComplete?: () => void;
}

export interface PropsWithChildren {
  children: React.ReactNode;
}
