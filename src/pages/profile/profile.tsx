import { useEffect } from 'react';

import { AddressList } from '@/components/profile/address-list';
import { UserInfo } from '@/components/profile/user-info';
import { authStore } from '@/store/login';
import useUserStore from '@/store/user';

export default function Profile(): React.JSX.Element {
  const { user, addresses, loading, error, fetchUser } = useUserStore();
  const accessToken = authStore.accessToken;
  console.log('Текущий токен в store:', accessToken);

  useEffect(() => {
    if (accessToken) {
      console.log('accessToken found, fetching user...');
      fetchUser();
    } else {
      console.log('No accessToken yet, waiting...');
    }
  }, [accessToken, fetchUser]);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error || !user) {
    return (
      <div className="text-center text-red-500">
        {error ?? 'User not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserInfo user={user} />
      <AddressList addresses={addresses} />
    </div>
  );
}
