import { useState } from 'react';

import { RegistrationFormFirst } from './registration-form-first';
import { RegistrationFormFourth } from './registration-form-fourth';
import { RegistrationFormSecond } from './registration-form-second';
import { RegistrationFormThird } from './registration-form-third';

export default function RegistrationPage(): React.JSX.Element {
  const [step, setStep] = useState(1);
  const handleText = () => setStep((prev) => prev + 1);
  const renderStep = () => {
    switch (step) {
      case 1: {
        return <RegistrationFormFirst onNext={handleText} />;
      }
      case 2: {
        return <RegistrationFormSecond onNext={handleText} />;
      }
      case 3: {
        return <RegistrationFormThird onNext={handleText} />;
      }
      case 4: {
        return <RegistrationFormFourth onNext={handleText} />;
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
          <a
            href="e"
            className="flex items-center gap-1 font-['Noto_Serif'] font-medium text-lg "
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              <img src="src/assets/images/logo.png" alt="logo" />
            </div>
            Petal & Pot.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{renderStep()}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="src/assets/images/garden.png"
          alt="export"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
