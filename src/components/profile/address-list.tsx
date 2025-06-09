import React from 'react';

import { AddressCard } from './address-card';

import type { Address } from '@/utils/types';

export function AddressList({
  addresses,
}: {
  addresses: Address[];
}): React.JSX.Element {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4 flex justify-between">
        Saved Addresses
      </h2>
      <div className="grid gap-4">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
}
