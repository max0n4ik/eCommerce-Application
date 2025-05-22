import React from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { registration } from '@/services/create-client';
import { authStore } from '@/store/login';
import useRegistrationStore from '@/store/registration';
import { countryToAlpha2, defaultAddressForm } from '@/utils/constantes';
import type { RegistrationAddress } from '@/utils/interfaces';
import { registrationAddressSchema } from '@/utils/validations';

export default function CombinedRegistrationForm({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const [useShippingAsBilling, setUseShippingAsBilling] = React.useState(true);
  const [shippingData, setShippingData] = React.useState<RegistrationAddress>({
    ...defaultAddressForm,
    isDefault: true,
  });
  const [billingData, setBillingData] = React.useState<RegistrationAddress>({
    ...defaultAddressForm,
    isDefault: false,
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [registrationError, setRegistrationError] = React.useState('');

  const { email, password, firstName, lastName, dateOfBirth, addAddress } =
    useRegistrationStore();

  const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'shipping' | 'billing'
  ): void => {
    const { name, value, type: inputType, checked } = e.target;
    const updater = type === 'shipping' ? setShippingData : setBillingData;
    updater((prev) => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value,
    }));

    setErrors((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(
          ([key]) => !key.startsWith(`${type}.`) || key !== `${type}.${name}`
        )
      )
    );
  };

  const validate = (
    data: RegistrationAddress,
    prefix: 'shipping' | 'billing'
  ): boolean => {
    const result = registrationAddressSchema.safeParse(data);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[`${prefix}.${field}`] = err.message;
      });
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setRegistrationError('');

    const isShippingValid = validate(shippingData, 'shipping');
    const isBillingValid =
      useShippingAsBilling || validate(billingData, 'billing');
    if (!isShippingValid || !isBillingValid) return;

    const shippingAddress = {
      streetName: shippingData.street,
      postalCode: shippingData.postalCode,
      city: shippingData.city,
      country:
        countryToAlpha2[shippingData.country as keyof typeof countryToAlpha2],
      department: shippingData.house,
    };

    const billingAddress = useShippingAsBilling
      ? shippingAddress
      : {
          streetName: billingData.street,
          postalCode: billingData.postalCode,
          city: billingData.city,
          country:
            countryToAlpha2[
              billingData.country as keyof typeof countryToAlpha2
            ],
          department: billingData.house,
        };

    let addresses;
    let defaultShippingAddress: number | undefined;
    let defaultBillingAddress: number | undefined;

    if (useShippingAsBilling) {
      addresses = [shippingAddress];
      if (shippingData.isDefault) {
        defaultShippingAddress = 0;
        defaultBillingAddress = 0;
      }
    } else {
      addresses = [shippingAddress, billingAddress];
      if (shippingData.isDefault) {
        defaultShippingAddress = 0;
      }
      if (billingData.isDefault) {
        defaultBillingAddress = 1;
      }
    }

    try {
      addAddress(addresses, {
        asShipping: !!defaultShippingAddress,
        asBilling: !!defaultBillingAddress,
      });

      await registration({
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: formattedDateOfBirth,
        addresses,
        defaultShippingAddress,
        defaultBillingAddress,
      });

      authStore.setIsAuth(true);
    } catch (error: unknown) {
      setRegistrationError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  };

  const renderFormFields = (
    formType: 'shipping' | 'billing',
    formData: RegistrationAddress,
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  ): React.JSX.Element => (
    <div className="grid gap-6">
      {['country', 'city', 'street', 'house', 'postalCode'].map((field) => (
        <div key={field} className="grid gap-2 relative">
          <Label htmlFor={`${formType}-${field}`}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            id={`${formType}-${field}`}
            name={field}
            value={String(formData[field as keyof RegistrationAddress] || '')}
            onChange={handleInput}
            placeholder={field}
          />
          {errors[`${formType}.${field}`] && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors[`${formType}.${field}`]} />
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-2 items-center">
        <Input
          type="checkbox"
          id={`${formType}-default`}
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleInput}
          className="w-4 h-4"
        />
        <Label htmlFor={`${formType}-default`}>
          Use as default {formType} address
        </Label>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-6', className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold capitalize">Registration</h1>
        <p className="text-sm text-muted-foreground">
          Enter your address information
        </p>
      </div>

      <h2 className="text-xl font-semibold">Shipping Address</h2>
      {renderFormFields('shipping', shippingData, (e) =>
        handleInputChange(e, 'shipping')
      )}

      <div className="flex items-center gap-3">
        <Input
          type="checkbox"
          id="same-as-shipping"
          checked={useShippingAsBilling}
          onChange={() => setUseShippingAsBilling(!useShippingAsBilling)}
          className="w-4 h-4"
        />
        <Label htmlFor="same-as-shipping">
          Use shipping address as billing
        </Label>
      </div>

      {!useShippingAsBilling && (
        <>
          <h2 className="text-xl font-semibold">Billing Address</h2>
          {renderFormFields('billing', billingData, (e) =>
            handleInputChange(e, 'billing')
          )}
        </>
      )}

      {registrationError && (
        <p className="text-sm font-medium text-destructive">
          {registrationError}
        </p>
      )}

      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  );
}
