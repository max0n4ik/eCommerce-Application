import type { CustomerDraft } from '@commercetools/platform-sdk';
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
  RegistrationFormProps,
} from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

const formSchema = registrationAddressSchema;

export default function RegistrationFormThird({
  onNext,
  isDefaultBilling,
  onSignUp,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'> &
  RegistrationFormProps): React.JSX.Element {
  const [formData, setFormData] =
    React.useState<RegistrationAddress>(defaultAddressForm);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const [useDefault, setUseDefault] = React.useState(false);
  const [useAsBilling, setUseAsBilling] = React.useState(false);

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

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    const addressToSave = {
      street: formData.street,
      postalCode: formData.postalCode,
      city: formData.city,
      country:
        countryToAlpha2[formData.country as keyof typeof countryToAlpha2],
      house: formData.house,
    };

    addAddress([addressToSave], {
      asShipping: useDefault,
      asBilling: useAsBilling,
    });

    const updatedAddresses = [...addresses, addressToSave];

    if (useAsBilling) {
      const userData: CustomerDraft = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        addresses: updatedAddresses,
        defaultShippingAddress: useDefault
          ? updatedAddresses.length - 1
          : undefined,
        defaultBillingAddress: updatedAddresses.length - 1,
      };

      await registration(userData);
    } else {
      if (onNext) {
        onNext();
      }
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
          <Label htmlFor="city">City</Label>
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
          <Label htmlFor="street">Street</Label>
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
            <Label htmlFor="house">House</Label>
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
            <Label htmlFor="postalCode">Post code</Label>
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
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Input
              id="useDefault"
              type="checkbox"
              className="w-3 h-3"
              checked={useDefault}
              onChange={handleUseDefaultChange}
            />
            <Label htmlFor="useDefault">Use as default shipping</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Input
              id="useAsBilling"
              type="checkbox"
              className="w-3 h-3"
              checked={useAsBilling}
              onChange={handleUseAsBillingChange}
            />
            <Label htmlFor="useAsBilling">Use this address as billing</Label>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={isDefaultBilling ? onSignUp : onNext}
        >
          {useAsBilling ? 'Sign Up' : 'Next'}
        </Button>
      </div>
    </form>
  );
}
