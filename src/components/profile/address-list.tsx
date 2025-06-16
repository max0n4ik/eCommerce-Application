import React from 'react';

import { AddressCard } from './address-card';

import type { Address } from '@/utils/types';

export function AddressList({
  addresses,
}: {
  addresses: Address[];
}): React.JSX.Element {
  return (
    <div className="rounded-2xl shadow-lg border border-green-200 p-6 bg-gradient-to-tr from-white to-green-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#4f655f]">
          Saved Addresses
        </h2>
      </div>
      <div className="grid gap-5">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
}
