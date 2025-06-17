import { describe, it, expect, beforeEach } from 'vitest';

import useUserStore from '@/store/user-store';
import type { User, Address } from '@/utils/types';

describe('useUserStore clearUser', () => {
  const fakeUser: User & { version: number } = {
    id: 'u1',
    firstName: 'Test',
    lastName: 'User',
    dateOfBirth: '2000-01-01',
    version: 42,
  };
  const fakeAddresses: Address[] = [
    {
      id: 'a1',
      street: 'Lenina 10',
      city: 'Moscow',
      state: 'Moscow Region',
      zip: '12345',
      country: 'RU',
      isDefaultBilling: true,
      isDefaultShipping: false,
    },
  ];

  beforeEach(() => {
    useUserStore.setState({
      user: fakeUser,
      addresses: fakeAddresses,
      editingUser: true,
      editingAddressId: 'a1',
      loading: true,
      error: 'some error',
    });
  });

  it('clearUser сбрасывает user, addresses, editingUser и editingAddressId в дефолт', () => {
    useUserStore.getState().clearUser();

    const state = useUserStore.getState();
    expect(state.user).toBeNull();
    expect(state.addresses).toEqual([]);
    expect(state.editingUser).toBe(false);
    expect(state.editingAddressId).toBeNull();
  });
});
