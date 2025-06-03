import type { Address } from '@/utils/types';

export function AddressCard({
  address,
}: {
  address: Address;
}): React.JSX.Element {
  return (
    <div
      className={`border rounded-xl p-4 ${
        address.isDefaultBilling || address.isDefaultShipping
          ? 'bg-green-50 border-green-500'
          : 'bg-gray-50'
      }`}
    >
      <p>
        {address.street}, {address.city}, {address.state} {address.zip}
      </p>
      <p>{address.country}</p>
      {address.isDefaultBilling && (
        <span className="text-sm text-blue-600">Default Billing</span>
      )}
      {address.isDefaultShipping && (
        <span className="text-sm text-purple-600 ml-2">Default Shipping</span>
      )}
    </div>
  );
}
