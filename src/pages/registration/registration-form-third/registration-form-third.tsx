import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  allowedCountries,
  postalCodePatterns,
  ROUTES,
} from '@/utils/constantes';

type Props = {
  onNext: () => void;
};

const formSchema = z
  .object({
    country: z
      .string()
      .min(1, 'Name must be at least 1 character')
      .refine((value) => allowedCountries.has(value), {
        message: 'Country must be from the European Union',
      }),
    city: z
      .string()
      .min(1, 'City must contain at least one character ')
      .regex(/^[A-Za-z\s-]+$/, 'City must contain only letters'),
    street: z.string().min(1, 'Street must contain at least one character'),
    house: z.string().min(1, 'House is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  })
  .superRefine((data, ctx) => {
    const pattern = postalCodePatterns[data.country];
    if (pattern && !pattern.test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        message: 'Invalid postal code format for the selected country',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default function RegistrationFormThird({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & Props): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    country: '',
    city: '',
    street: '',
    house: '',
    postalCode: '',
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [useDefault, setUseDefault] = React.useState(false);
  const [useAsBilling, setUseAsBilling] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUseDefaultChange = (): void => {
    setUseDefault((prev) => {
      if (!prev) setUseAsBilling(false);
      return !prev;
    });
  };
  const handleUseAsBillingChange = (): void => {
    const newValue = !useAsBilling;
    setUseAsBilling(newValue);
    if (newValue) setUseDefault(false);
  };
  const validateForm = (): boolean => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitted billing address:', formData);
    }
    onNext();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Shipping address
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && (
            <p className="text-sm font-medium text-destructive">
              {errors.country}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="city">City</Label>
          </div>
          <Input
            id="city"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && (
            <p className="text-sm font-medium text-destructive">
              {errors.city}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="street">Street</Label>
          </div>
          <Input
            id="street"
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && (
            <p className="text-sm font-medium text-destructive">
              {errors.street}
            </p>
          )}
        </div>
        <div className="flex gap-5">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="house">House</Label>
            </div>
            <Input
              id="house"
              type="text"
              name="house"
              placeholder="House"
              value={formData.house}
              onChange={handleChange}
            />
            {errors.house && (
              <p className="text-sm font-medium text-destructive">
                {errors.house}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="postalCode">Post code</Label>
            </div>
            <Input
              id="postalCode"
              type="text"
              name="postalCode"
              placeholder="Post code"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && (
              <p className="text-sm font-medium text-destructive">
                {errors.postalCode}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useDefault}
              onChange={handleUseDefaultChange}
            />
            <Label id="use-default">Use as default</Label>
          </div>
          <div className="flex gap-5">
            <Input
              id="use-default"
              type="checkbox"
              className="w-3 h-3"
              checked={useAsBilling}
              onChange={handleUseAsBillingChange}
            />
            <Label id="use-as-billing">Use this address as billing</Label>
          </div>
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
