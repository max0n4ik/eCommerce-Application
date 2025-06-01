import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { completeSignUp } from '@/services/create-client';
import useRegistrationStore from '@/store/registration';
import { countryToAlpha2, defaultAddressForm } from '@/utils/constantes';
import type {
  RegistrationAddress,
  RegistrationStepProps,
} from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

export default function ShippingAddressForm({
  onNext,
}: RegistrationStepProps): React.JSX.Element {
  const [formData, setFormData] =
    React.useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registrationError, setRegistrationError] = useState<string>('');
  const [useAsBillingAddrState, setUseAsBillingAddrState] = useState<boolean>(
    defaultAddressForm.billingAddressFlag
  );
  const billingCheckboxName = 'useAsBillingAddress';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, type, value, checked } = e.target;
    if (name == billingCheckboxName) {
      setUseAsBillingAddrState(checked);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prevErrors) => {
      return Object.fromEntries(
        Object.entries(prevErrors).filter(([key]) => key !== name)
      );
    });
  };

  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    setShippingAddress,
    setBillingAddress,
  } = useRegistrationStore();

  const validateForm = (): boolean => {
    const result = registrationAddressSchema.safeParse(formData);
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

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setRegistrationError('');

    const address = {
      streetName: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      country:
        countryToAlpha2[formData.country as keyof typeof countryToAlpha2],
      department: formData.house,
    };

    setShippingAddress(address, formData.useAsDefaultShippingAddress);

    if (formData.billingAddressFlag) {
      setBillingAddress(address, formData.billingAddressFlag);
      try {
        await completeSignUp({
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          useAsDefaultShipping: formData.useAsDefaultShippingAddress,
          shippingAddress: address,
        });
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        setRegistrationError(errorMessage);
      }
    } else {
      onNext();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
              name="useAsDefaultShippingAddress"
              type="checkbox"
              className="w-3 h-3"
              checked={formData.useAsDefaultShippingAddress}
              onChange={handleChange}
            />
            <Label htmlFor="useDefault">Use as default shipping address</Label>
          </div>
          <div className="flex gap-5">
            <Input
              id="useAsBilling"
              name={billingCheckboxName}
              type="checkbox"
              className="w-3 h-3"
              checked={formData.billingAddressFlag}
              onChange={handleChange}
            />
            <Label htmlFor="useAsBilling">Use as billing address</Label>
          </div>
        </div>
        <Button type="submit" className="w-full">
          {useAsBillingAddrState ? 'Sign Up' : 'Next'}
        </Button>
        {registrationError && (
          <p className="text-sm font-medium text-destructive">
            {registrationError}
          </p>
        )}
      </div>
    </form>
  );
}
