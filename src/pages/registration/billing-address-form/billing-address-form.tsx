import type { Address } from '@commercetools/platform-sdk';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { customerSignUp } from '@/services/auth-service';
import useRegistrationStore from '@/store/registration';
import {
  allowedCountriesArray,
  countryToAlpha2,
  defaultAddressForm,
} from '@/utils/constantes';
import type {
  RegistrationAddress,
  RegistrationBillingFormProps,
} from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

export default function BillingAddressForm({
  ...props
}: RegistrationBillingFormProps): React.JSX.Element {
  const [formData, setFormData] =
    useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registrationError, setRegistrationError] = React.useState<string>('');
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    asDefaultShipping,
    shippingAddress,
    setBillingAddress,
  } = useRegistrationStore();

  const handleFieldChange = (name: string, value: string | boolean): void => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    handleFieldChange(name, fieldValue);
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
  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setRegistrationError('');

    const address: Address = {
      streetName: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      country:
        countryToAlpha2[formData.country as keyof typeof countryToAlpha2],

      department: formData.house,
    };

    setBillingAddress(address, formData.asDefaultBillingAddress);

    try {
      await customerSignUp({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        asDefaultShipping,
        shippingAddress,
        asDefaultBilling: formData.asDefaultBillingAddress,
        billingAddress: address,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setRegistrationError(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Billing address
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 relative">
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleFieldChange('country', value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country"></SelectValue>
            </SelectTrigger>
            <SelectContent
              sideOffset={8}
              className="z-50 max-h-60 overflow-y-auto rounded-md border border-primary bg-popover shadow-xl text-title-color "
              position="popper"
            >
              {allowedCountriesArray.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="pl-8 pr-4 py-2 text-base font-medium hover:bg-zinc-600 focus:bg-accent transition-colors"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        <div className="flex gap-5">
          <Input
            id="asDefaultBillingAddress"
            type="checkbox"
            name="asDefaultBillingAddress"
            className="w-3 h-3"
            checked={formData.asDefaultBillingAddress}
            onChange={handleChange}
          />
          <Label htmlFor="useDefault">Use as default</Label>
        </div>
        {registrationError && (
          <p className="text-sm font-medium text-destructive">
            {registrationError}
          </p>
        )}
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  );
}
