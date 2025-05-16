import React from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { defaultAddressForm } from '@/utils/constantes';
import type {
  RegistrationAddress,
  RegistrationStepProps,
} from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

const formSchema = registrationAddressSchema;

export default function RegistrationFormThird({
  onNext,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> &
  RegistrationStepProps): React.JSX.Element {
  const [formData, setFormData] =
    React.useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [useDefault, setUseDefault] = React.useState(false);
  const [useAsBilling, setUseAsBilling] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      return Object.fromEntries(
        Object.entries(prevErrors).filter(([key]) => key !== name)
      );
    });
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
      onNext();
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
          Enter your Shipping address
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 relative">
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
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.country} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
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
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.city} />
            </div>
          )}
        </div>
        <div className="grid gap-2 relative">
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
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.street} />
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <div className="grid gap-2 relative">
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
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.house} />
              </div>
            )}
          </div>
          <div className="grid gap-2 relative">
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
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.postalCode} />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex gap-5">
            <Input
              id="useDefault"
              type="checkbox"
              className="w-3 h-3"
              checked={useDefault}
              onChange={handleUseDefaultChange}
            />
            <Label htmlFor="useDefault">Use as default</Label>
          </div>
          <div className="flex gap-5">
            <Input
              id="useAseBilling"
              type="checkbox"
              className="w-3 h-3"
              checked={useAsBilling}
              onChange={handleUseAsBillingChange}
            />
            <Label htmlFor="useAsBilling">Use this address as billing</Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
