import { create } from 'zustand';

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
  clearUser: () => void;

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
    try {
      const { user, addresses, version } = await fetchUserProfile();
      set({
        user: { ...user, version },
        addresses,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  clearUser: (): void => {
    set({
      user: null,
      addresses: [],
      editingUser: false,
      editingAddressId: null,
    });
  },

  toggleUserEdit: (): void => {
    set({ editingUser: !get().editingUser });
  },
  saveUser: async (updates): Promise<void> => {
    set({ loading: true, error: null });
    const current = get().user;
    if (!current) {
      set({ loading: false, error: 'Нет пользователя' });
      return;
    }
    try {
      const updated = await updateUserProfile(
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
  saveAddress: async (updates): Promise<void> => {
    set({ loading: true, error: null });
    const current = get().user;
    if (!current) {
      set({ loading: false, error: 'Нет пользователя' });
      return;
    }
    try {
      const { addresses: updatedList, version } = await updateAddress(
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
