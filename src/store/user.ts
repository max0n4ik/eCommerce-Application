import { create } from 'zustand';

import { fetchUserProfile } from '@/services/user';
import { useAuthStore } from '@/store/login';
import type { User, Address } from '@/utils/types';

type UserStore = {
  user: User | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addresses: [],
  loading: false,
  error: null,

  fetchUser: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().accessToken;
      if (!token) throw new Error('Access token is missing');

      const data = await fetchUserProfile(token);

      set({ user: data.user, addresses: data.addresses, loading: false });
    } catch (error) {
      console.error('fetchUser error:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to load user',
        loading: false,
      });
    }
  },
}));

export default useUserStore;
