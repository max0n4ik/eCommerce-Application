import * as React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { BirthdayCalendar } from '@/components/ui/calendar/birthday';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Props } from '@/utils/types';
import {
  validateUserFormData,
  type RegistrationUser,
} from '@/utils/validations';

export default function RegistrationFormSecond({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
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
        <div className="grid gap-2">
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
            <p className="text-sm font-medium text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
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
            <p className="text-sm font-medium text-destructive">
              {errors.lastName}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dob">Birthday</Label>
          <BirthdayCalendar
            name="dob"
            defaultValue={formData.dob}
            onChange={(date: Date | null) =>
              setFormData((prevData) => ({ ...prevData, dob: date }))
            }
          />
          {errors.dob && (
            <p className="text-sm font-medium text-destructive">{errors.dob}</p>
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
    </form>
  );
}
