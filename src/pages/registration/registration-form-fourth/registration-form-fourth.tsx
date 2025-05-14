import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { defaultAddressForm, ROUTES } from '@/utils/constantes';
import type {
  RegistrationAddress,
  RegistrationFormFourthProps,
} from '@/utils/types';
import { registrationAddressSchema } from '@/utils/validations';

export default function RegistrationFormFourth({
  className,
  ...props
}: RegistrationFormFourthProps): React.JSX.Element {
  const [formData, setFormData] =
    React.useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = (): boolean => {
    const result = registrationAddressSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
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
          Enter your Billing address
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
        <div className="flex gap-5">
          <Input id="use-default" type="checkbox" className="w-3 h-3" />
          <Label id="use-default">Use as default</Label>
        </div>
        <Button type="submit" className="w-full">
          Sign up
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
