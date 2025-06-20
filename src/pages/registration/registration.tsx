import { useState } from 'react';
import { Link } from 'react-router-dom';

import BillingAddressForm from './billing-address-form/billing-address-form';
import { RegistrationFormFirst } from './registration-form-first';
import { RegistrationFormSecond } from './registration-form-second';
import { ShippingAddressForm } from './shipping-address-form';

import gardenImage from '@/assets/images/garden.png';
import { ROUTES } from '@/utils/constantes';

export default function Registration(): React.JSX.Element {
  const [step, setStep] = useState(1);
  const handleNext = (): void => {
    setStep(step + 1);
  };

  const renderStep = (): React.JSX.Element | null => {
    switch (step) {
      case 1: {
        return <RegistrationFormFirst onNext={handleNext} />;
      }
      case 2: {
        return <RegistrationFormSecond onNext={handleNext} />;
      }
      case 3: {
        return <ShippingAddressForm onNext={handleNext} />;
      }
      case 4: {
        return <BillingAddressForm />;
      }
      default: {
        return null;
      }
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{renderStep()}</div>
          <div className="flex items-center text-sm text-gray-500 mt-6">
            <div className="h-px bg-gray-300 w-[140px]" />
            <span className="px-3">or</span>
            <div className="h-px bg-gray-300 w-[140px]" />
          </div>
          <div className="text-center text-sm">
            Have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-primary hover:text-accent">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={gardenImage}
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
