import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { BirthdayCalendar } from '@/components/ui/calendar/birthday';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constantes';
type Props = {
  onNext: () => void;
};

const FormSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character'),
  lastName: z.string().min(1, 'Last name must be at least 1 character'),
  dob: z
    .date()
    .nullable()
    .refine(
      (dob) => {
        if (dob) {
          const today = new Date();
          const thirteenYearsAgo = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
          );
          return dob <= thirteenYearsAgo;
        }
        return false;
      },
      {
        message: 'You must be at least 13 years old',
      }
    ),
});
type FormData = z.infer<typeof FormSchema>;

export function RegistrationFormSecond({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [formData, setFormData] = useState<FormData>({
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

    const validation = FormSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    console.log('form data submitted', formData);
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
            required
          />
          {errors.name && (
            <p className="text-sm font-medium text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="last-name">Last name</Label>
          </div>
          <Input
            id="last-name"
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <p className="text-sm font-medium text-destructive">
              {errors.lastName}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Birthday</Label>
          <BirthdayCalendar
            name="dob"
            defaultValue={formData.dob}
            onChange={(date: Date | null) =>
              setFormData((prevData) => ({ ...prevData, dob: date }))
            }
          />
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
          {' '}
          Sign in
        </Link>
      </div>
    </form>
  );
}
