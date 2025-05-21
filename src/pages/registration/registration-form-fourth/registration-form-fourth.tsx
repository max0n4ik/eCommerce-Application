import type { Address, MyCustomerDraft } from '@commercetools/platform-sdk';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { registration } from '@/services/create-client';
import useRegistrationStore from '@/store/registration';
import { countryToAlpha2, defaultAddressForm } from '@/utils/constantes';
import type {
  RegistrationAddress,
  RegistrationFormFourthProps,
} from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

export default function RegistrationFormFourth({
  className,
  ...props
}: RegistrationFormFourthProps): React.JSX.Element {
  const [formData, setFormData] =
    React.useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
    addAddress,
  } = useRegistrationStore();

  const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (type === 'text') {
      setErrors((prevErrors) => {
        return Object.fromEntries(
          Object.entries(prevErrors).filter(([key]) => key !== name)
        );
      });
    }
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

    const addressToSave: Address = {
      streetName: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      country:
        countryToAlpha2[formData.country as keyof typeof countryToAlpha2],

      department: formData.house,
    };

    addAddress([addressToSave], {
      asShipping: false,
      asBilling: true,
    });

    const updatedAddresses = [...addresses, addressToSave];

    const userData: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth: formattedDateOfBirth,
      addresses: updatedAddresses,
      defaultShippingAddress: undefined,
      defaultBillingAddress: formData.isDefault
        ? updatedAddresses.length - 1
        : undefined,
    };
    try {
      await registration(userData);
    } catch (error) {
      console.error('Registration error:', error);
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
        <div className="flex gap-5">
          <Input
            id="useDefault"
            type="checkbox"
            name="isDefault"
            className="w-3 h-3"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          <Label htmlFor="useDefault">Use as default</Label>
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  );
}
