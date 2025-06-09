import { useEffect } from 'react';

import { AddressList } from '@/components/profile/address-list';
import { UserInfo } from '@/components/profile/user-info';
import useUserStore from '@/store/user';

export default function Profile(): React.JSX.Element {
  const { user, addresses, loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error || !user)
    return (
      <div className="text-center text-red-500">
        {error ?? 'User not found'}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <UserInfo user={user} />
      <AddressList addresses={addresses} />
    </div>
  );
}
