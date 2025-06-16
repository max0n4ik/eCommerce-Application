import React, { useState, useEffect, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserStore from '@/store/user';
import type { AddressForm, Address, AddressUpdates } from '@/utils/types';
import { validateAddressData } from '@/utils/validations';

const EMPTY_ADDRESS: AddressForm = {
  streetName: '',
  streetNumber: '',
  postalCode: '',
  city: '',
  region: '',
  country: '',
};

const ADDRESS_FIELDS: Array<{ id: keyof AddressForm; label: string }> = [
  { id: 'streetName', label: 'Street Name' },
  { id: 'streetNumber', label: 'House Number' },
  { id: 'city', label: 'City' },
  { id: 'region', label: 'Region' },
  { id: 'postalCode', label: 'Postal Code' },
  { id: 'country', label: 'Country' },
];

export function AddressCard({
  address,
}: {
  address: Address;
}): React.JSX.Element {
  const { editingAddressId, toggleAddressEdit, saveAddress } = useUserStore();
  const isEditing = editingAddressId === address.id;

  const [form, setForm] = useState<AddressForm>(() => EMPTY_ADDRESS);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressForm, string>>
  >({});

  useEffect(() => {
    if (isEditing) {
      const [streetName, streetNumber = ''] = address.street.split(' ');
      setForm({
        ...EMPTY_ADDRESS,
        streetName,
        streetNumber,
        postalCode: address.zip,
        city: address.city,
        region: address.state,
        country: address.country,
      });
      setErrors({});
    }
  }, [isEditing, address]);

  const handleFieldChange =
    (field: keyof AddressForm) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => {
        const rest = Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== field)
        );
        return rest as typeof prev;
      });
    };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateAddressData(form);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    saveAddress({ id: address.id, ...form } as AddressUpdates);
  };

  const cardBase =
    'rounded-xl border transition-transform hover:shadow-xl hover:-translate-y-1 ';
  const readOnlyBg =
    address.isDefaultBilling || address.isDefaultShipping
      ? 'bg-[rgba(129,129,129,0.12)] border-primary'
      : 'bg-white border-[#E5E7EB]';

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className={`${cardBase}${readOnlyBg} p-6`}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {ADDRESS_FIELDS.map(({ id, label }) => (
            <div key={id} className="relative">
              <Label htmlFor={id} className="mb-1">
                {label}
              </Label>
              <Input
                id={id}
                value={form[id]}
                onChange={handleFieldChange(id)}
              />
              {errors[id] && (
                <div className="absolute left-0 top-full mt-1">
                  <Tooltip message={errors[id]} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            Save
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => toggleAddressEdit(address.id)}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className={`${cardBase}${readOnlyBg} p-5`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold text-primary">
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
          <p className="text-[#638179]">{address.country}</p>
        </div>
        <Button
          variant="link"
          size="sm"
          onClick={() => toggleAddressEdit(address.id)}
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {address.isDefaultBilling && (
          <span className="bg-[rgba(129,129,129,0.12)] text-primary px-2 py-1 rounded-full">
            Default Billing
          </span>
        )}
        {address.isDefaultShipping && (
          <span className="bg-[rgba(129,129,129,0.12)] text-primary px-2 py-1 rounded-full">
            Default Shipping
          </span>
        )}
      </div>
    </div>
  );
}
