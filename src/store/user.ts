import { create } from 'zustand';

import {
  saveUserProfile,
  saveUserAddresses,
  fetchUserProfile,
} from '@/services/user';
import type {
  User,
  Address,
  ProfileUpdates,
  AddressUpdates,
} from '@/utils/types';
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
    try {
      const updated = await saveUserProfile(updates);
      set({ user: updated, editingUser: false, loading: false });
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
    try {
      const { addresses, version } = await saveUserAddresses([updates]);
      const current = get().user;
      set({
        addresses,
        editingAddressId: null,
        user: current ? { ...current, version } : null,
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useUserStore;
