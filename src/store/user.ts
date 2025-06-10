import { create } from 'zustand';

import { useAuthStore } from './auth-store';

import {
  fetchUserProfile,
  updateUserProfile,
  updateAddress,
  type ProfileUpdates,
  type AddressUpdates,
} from '@/services/user';
import type { User, Address } from '@/utils/types';

type UserWithVersion = User & { version: number };

type UserStore = {
  user: UserWithVersion | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
  editingUser: boolean;
  editingAddressId: string | null;

  fetchUser: () => Promise<void>;
  toggleUserEdit: () => void;
  saveUser: (updates: ProfileUpdates) => Promise<void>;
  toggleAddressEdit: (id: string) => void;
  saveAddress: (updates: AddressUpdates) => Promise<void>;
};

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  addresses: [],
  loading: false,
  error: null,
  editingUser: false,
  editingAddressId: null,

  fetchUser: async (): Promise<void> => {
    set({ loading: true, error: null });
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      set({ loading: false, error: 'Нет токена' });
      return;
    }
    try {
      const { user, addresses, version } = await fetchUserProfile(token);
      set({
        user: { ...user, version },
        addresses,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  toggleUserEdit: (): void => {
    set({ editingUser: !get().editingUser });
  },

  saveUser: async (updates: ProfileUpdates): Promise<void> => {
    set({ loading: true, error: null });
    const token = useAuthStore.getState().accessToken;
    const current = get().user;
    if (!token || !current) {
      set({ loading: false, error: 'Нет пользователя или токена' });
      return;
    }
    try {
      const updated = await updateUserProfile(
        token,
        current.id,
        current.version,
        updates
      );
      set({
        user: updated,
        editingUser: false,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  toggleAddressEdit: (id: string): void => {
    set({
      editingAddressId: get().editingAddressId === id ? null : id,
    });
  },

  saveAddress: async (updates: AddressUpdates): Promise<void> => {
    set({ loading: true, error: null });
    const token = useAuthStore.getState().accessToken;
    const current = get().user;
    if (!token || !current) {
      set({ loading: false, error: 'Нет пользователя или токена' });
      return;
    }
    try {
      const { addresses: updatedList, version } = await updateAddress(
        token,
        current.id,
        current.version,
        [updates]
      );
      set({
        addresses: updatedList,
        editingAddressId: null,
        loading: false,
        user: { ...current, version },
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useUserStore;
