import React, { useState } from 'react';

import type { AddressUpdates } from '@/services/user';
import useUserStore from '@/store/user';
import type { Address } from '@/utils/types';

export function AddressCard({
  address,
}: {
  address: Address;
}): React.JSX.Element {
  const { editingAddressId, toggleAddressEdit, saveAddress } = useUserStore();
  const [form, setForm] = useState<
    Partial<Omit<Address, 'id' | 'isDefaultBilling' | 'isDefaultShipping'>>
  >({});
  const isEditing = editingAddressId === address.id;

  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveAddress({ id: address.id, ...form } as AddressUpdates);
        }}
        className="border rounded-xl p-4 bg-blue-50"
      >
        <div className="grid gap-2 mb-2">
          <input
            defaultValue={address.street}
            onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            defaultValue={address.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            defaultValue={address.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            defaultValue={address.zip}
            onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            defaultValue={address.country}
            onChange={(e) =>
              setForm((f) => ({ ...f, country: e.target.value }))
            }
            className="border p-2 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary text-sm">
            Save
          </button>
          <button
            type="button"
            onClick={() => toggleAddressEdit(address.id)}
            className="btn btn-secondary text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className={`border rounded-xl p-4 ${address.isDefaultBilling || address.isDefaultShipping ? 'bg-green-50 border-green-500' : 'bg-gray-50'}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span>
          {address.street}, {address.city}, {address.state} {address.zip}
        </span>
        <button
          onClick={() => toggleAddressEdit(address.id)}
          className="text-xs text-blue-600"
        >
          Edit
        </button>
      </div>
      <p>{address.country}</p>
      <div className="mt-2 text-sm space-x-2">
        {address.isDefaultBilling && (
          <span className="text-blue-600">Default Billing</span>
        )}
        {address.isDefaultShipping && (
          <span className="text-purple-600">Default Shipping</span>
        )}
      </div>
    </div>
  );
}
