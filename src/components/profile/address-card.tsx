import type { BaseAddress } from '@commercetools/platform-sdk';
import React, { useState, useEffect, type FormEvent } from 'react';

import { Tooltip } from '@/components/ui/error-message/error-message';
import type { AddressUpdates } from '@/services/user';
import useUserStore from '@/store/user';
import type { Address } from '@/utils/types';

type AddressForm = {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
} & Partial<
  Pick<
    BaseAddress,
    | 'additionalStreetInfo'
    | 'state'
    | 'company'
    | 'department'
    | 'building'
    | 'apartment'
    | 'pOBox'
    | 'phone'
    | 'mobile'
    | 'email'
    | 'fax'
    | 'additionalAddressInfo'
    | 'externalId'
  >
>;

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    ADDRESS_FIELDS.forEach(({ id, label }) => {
      const value = form[id];
      if (typeof value === 'string' && value.trim() === '') {
        newErrors[id] = `${label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cardBase =
    'rounded-xl border transition-transform hover:shadow-xl hover:-translate-y-1 ';
  const readOnlyBg =
    address.isDefaultBilling || address.isDefaultShipping
      ? 'bg-[rgba(129,129,129,0.12)] border-[#586F69]'
      : 'bg-white border-[#E5E7EB]';

  if (isEditing) {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (!validate()) return;
          saveAddress({ id: address.id, ...form } as AddressUpdates);
        }}
        className={`${cardBase}${readOnlyBg} p-6`}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          {ADDRESS_FIELDS.map(({ id, label }) => (
            <div key={id} className="relative">
              <label
                htmlFor={id}
                className="block text-[#586F69] font-medium mb-1"
              >
                {label}
              </label>
              <input
                id={id}
                value={form[id] as string}
                onChange={(e) => {
                  setForm((f) => ({ ...f, [id]: e.target.value }));
                  setErrors((prev) => {
                    const restEntries = Object.entries(prev).filter(
                      ([key]) => key !== id
                    );
                    const rest = Object.fromEntries(restEntries) as Record<
                      string,
                      string
                    >;
                    return rest;
                  });
                }}
                className="w-full p-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586F69]"
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
          <button
            type="submit"
            className="flex-1 bg-[#586F69] hover:opacity-90 text-white font-semibold py-2 rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => toggleAddressEdit(address.id)}
            className="flex-1 border border-[#586F69] text-[#586F69] hover:bg-[rgba(129,129,129,0.12)] py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`${cardBase}${readOnlyBg} p-5`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[#586F69] font-semibold">
            {address.street}, {address.city}, {address.state} {address.zip}
          </p>
          <p className="text-[#638179]">{address.country}</p>
        </div>
        <button
          onClick={() => toggleAddressEdit(address.id)}
          className="text-[#586F69] hover:opacity-90 text-sm font-medium"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {address.isDefaultBilling && (
          <span className="bg-[rgba(129,129,129,0.12)] text-[#586F69] px-2 py-1 rounded-full">
            Default Billing
          </span>
        )}
        {address.isDefaultShipping && (
          <span className="bg-[rgba(129,129,129,0.12)] text-[#586F69] px-2 py-1 rounded-full">
            Default Shipping
          </span>
        )}
      </div>
    </div>
  );
}
