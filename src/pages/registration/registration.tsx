import { useState } from 'react';

import { RegistrationFormFirst } from './registration-form-first';
import { RegistrationFormFourth } from './registration-form-fourth';
import { RegistrationFormSecond } from './registration-form-second';
import { RegistrationFormThird } from './registration-form-third';

import gardenImage from '@/assets/images/garden.png';
import logo from '@/assets/images/logo.png';

export default function Registration(): React.JSX.Element {
  const [step, setStep] = useState(1);
  const handleNext = (): void => setStep((prev) => prev + 1);
  const renderStep = (): React.JSX.Element | null => {
    switch (step) {
      case 1: {
        return <RegistrationFormFirst onNext={handleNext} />;
      }
      case 2: {
        return <RegistrationFormSecond onNext={handleNext} />;
      }
      case 3: {
        return <RegistrationFormThird onNext={handleNext} />;
      }
      case 4: {
        return <RegistrationFormFourth />;
      }
      default: {
        return null;
      }
    }
  };
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
            <img src={logo} alt="logo" />
          </div>
          Petal & Pot.
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{renderStep()}</div>
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
