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
    <div className="min-h-screen bg-brand-beige p-6 flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-extrabold text-[#586F69]">User Profile</h1>
      <div className="w-full max-w-3xl space-y-6">
        <UserInfo user={user} />
        <AddressList addresses={addresses} />
      </div>
    </div>
  );
}
