import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { BirthdayCalendar } from '@/components/ui/calendar/birthday';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constantes';
import type { RegistrationStepProps } from '@/utils/interfaces';
import {
  validateUserFormData,
  type RegistrationUser,
} from '@/utils/validations';

export default function RegistrationFormSecond({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> &
  RegistrationStepProps): React.JSX.Element {
  const [formData, setFormData] = useState<RegistrationUser>({
    name: '',
    lastName: '',
    dob: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      return Object.fromEntries(
        Object.entries(prevErrors).filter(([key]) => key !== name)
      );
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const { isValid, errors } = validateUserFormData(formData);
    setErrors(errors);
    if (!isValid) return;
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Credentials to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 relative">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.name} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.lastName} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
          <Label htmlFor="dob">Birthday</Label>
          <BirthdayCalendar
            name="dob"
            defaultValue={formData.dob}
            onChange={(date: Date | null) => {
              setFormData((prevData) => ({ ...prevData, dob: date }));
              setErrors((prevErrors) => {
                return Object.fromEntries(
                  Object.entries(prevErrors).filter(([key]) => key !== 'dob')
                );
              });
            }}
          />
          {errors.dob && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.dob} />
            </div>
          )}
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="text-accent hover:text-accent-foreground"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
