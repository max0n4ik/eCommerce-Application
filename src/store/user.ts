import { create } from 'zustand';

import { fetchUserProfile } from '@/services/user';
import type { User, Address } from '@/utils/types';

type UserStore = {
  user: User | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addresses: [],
  loading: false,
  error: null,

  fetchUser: async (): Promise<void> => {
    set({ loading: true, error: null });

    try {
      const result = await fetchUserProfile();
      set({ user: result.user, addresses: result.addresses, loading: false });
    } catch {
      set({ error: 'Failed to load user', loading: false });
    }
  },

  clearUser: (): void => set({ user: null, addresses: [] }),
}));

export default useUserStore;
