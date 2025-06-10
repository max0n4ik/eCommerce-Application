import type { BaseAddress } from '@commercetools/platform-sdk';
import React, { useState, useEffect, type FormEvent } from 'react';

import type { AddressUpdates } from '@/services/user';
import useUserStore from '@/store/user';
import type { Address } from '@/utils/types';

export function AddressCard({
  address,
}: {
  address: Address;
}): React.JSX.Element {
  const { editingAddressId, toggleAddressEdit, saveAddress } = useUserStore();
  const isEditing = editingAddressId === address.id;

  // Храним сразу BaseAddress поля
  const [form, setForm] = useState<
    Omit<BaseAddress, 'id' | 'key' | 'type' | 'fields'>
  >({
    streetName: '',
    streetNumber: '',
    additionalStreetInfo: undefined,
    postalCode: '',
    city: '',
    region: '',
    state: undefined,
    country: '',
    company: undefined,
    department: undefined,
    building: undefined,
    apartment: undefined,
    pOBox: undefined,
    phone: undefined,
    mobile: undefined,
    email: undefined,
    fax: undefined,
    additionalAddressInfo: undefined,
    externalId: undefined,
  });

  // При входе в режим редактирования заполняем form из вашего Address
  useEffect(() => {
    if (isEditing) {
      const [streetName, streetNumber = ''] = address.street.split(' ');
      setForm((f) => ({
        ...f,
        streetName,
        streetNumber,
        postalCode: address.zip,
        city: address.city,
        region: address.state,
        country: address.country,
      }));
    }
  }, [isEditing, address]);

  const cardBase =
    'rounded-xl border transition-transform hover:shadow-xl hover:-translate-y-1 ';
  // читаемый фон и бордер для дефолтных адресов
  const readOnlyBg =
    address.isDefaultBilling || address.isDefaultShipping
      ? 'bg-[rgba(129,129,129,0.12)] border-[#586F69]'
      : 'bg-white border-[#E5E7EB]';

  if (isEditing) {
    return (
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          saveAddress({ id: address.id, ...form } as AddressUpdates);
        }}
        className={`${cardBase}${readOnlyBg} p-6`}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            {
              id: 'streetName',
              label: 'Street Name',
              key: 'streetName',
              value: form.streetName,
            },
            {
              id: 'streetNumber',
              label: 'House Number',
              key: 'streetNumber',
              value: form.streetNumber,
            },
            { id: 'city', label: 'City', key: 'city', value: form.city },
            {
              id: 'region',
              label: 'Region',
              key: 'region',
              value: form.region,
            },
            {
              id: 'postalCode',
              label: 'Postal Code',
              key: 'postalCode',
              value: form.postalCode,
            },
            {
              id: 'country',
              label: 'Country',
              key: 'country',
              value: form.country,
            },
          ].map(({ id, label, key, value }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-[#586F69] font-medium mb-1"
              >
                {label}
              </label>
              <input
                id={id}
                value={value}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                className="w-full p-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586F69]"
              />
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
          <span className="bg-[#a7d4c8] text-[#586F69] px-2 py-1 rounded-full">
            Default Billing
          </span>
        )}
        {address.isDefaultShipping && (
          <span className="bg-[#a7d4c8] text-[#586F69] px-2 py-1 rounded-full">
            Default Shipping
          </span>
        )}
      </div>
    </div>
  );
}
