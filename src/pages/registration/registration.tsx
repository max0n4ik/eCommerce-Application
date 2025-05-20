import { useState } from 'react';
import { Link } from 'react-router-dom';

import { RegistrationFormFirst } from './registration-form-first';
import { RegistrationFormFourth } from './registration-form-fourth';
import { RegistrationFormSecond } from './registration-form-second';
import { RegistrationFormThird } from './registration-form-third';

import gardenImage from '@/assets/images/garden.png';
import { ROUTES } from '@/utils/constantes';

const handleComplete = (): void => {
  console.log('Successfully restarted');
};

export default function Registration(): React.JSX.Element {
  const [step, setStep] = useState(1);

  const [isBillingUsed, setIsBillingUsed] = useState<boolean | null>(null);

  const handleNext = (useAsBilling?: boolean): void => {
    if (step === 3) {
      if (useAsBilling) {
        console.log('Регистрация выполнена, пропускаем шаг 4');
      } else {
        setStep(4);
      }
      setIsBillingUsed(useAsBilling ?? null);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const renderStep = (): React.JSX.Element | null => {
    switch (step) {
      case 1: {
        return <RegistrationFormFirst onNext={() => handleNext()} />;
      }
      case 2: {
        return <RegistrationFormSecond onNext={() => handleNext()} />;
      }
      case 3: {
        return (
          <RegistrationFormThird
            onNext={handleNext}
            onComplete={handleComplete}
            isSignUpStep={isBillingUsed === true}
          />
        );
      }
      case 4: {
        return <RegistrationFormFourth onComplete={handleComplete} />;
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
