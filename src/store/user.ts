import type { CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { create } from 'zustand';

import { useAuthStore } from './auth-store';

import {
  addProductToCart,
  createCart,
  fetchCart,
  fetchUserProfile,
} from '@/services/user';
import type { User, Address } from '@/utils/types';

type UserStore = {
  user: User | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
  cartID: string;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  fetchUserCartId: () => void;
  addProductToCart: (productId: string) => Promise<void>;
  fetchCart: () => Promise<CartPagedQueryResponse>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addresses: [],
  loading: false,
  error: null,
  cartID: '',

  fetchUser: async (): Promise<void> => {
    set({ loading: true, error: null });
    const token = useAuthStore.getState().accessToken;
    if (!token) return set({ error: 'No token', loading: false });

    try {
      const result = await fetchUserProfile(token);
      set({ user: result.user, addresses: result.addresses, loading: false });
    } catch {
      set({ error: 'Failed to load user', loading: false });
    }
  },

  fetchCart: async (): Promise<CartPagedQueryResponse> => {
    const response = await fetchCart();
    console.log(response);
    return response.body;
  },

  addProductToCart: async (productId: string): Promise<void> => {
    const { cartID } = useUserStore.getState();
    if (!cartID) return;

    const response = await addProductToCart(cartID, productId);
    console.log(response);
  },

  fetchUserCartId: async (): Promise<void> => {
    try {
      const response = await createCart();
      set({ cartID: response.body.id });
    } catch (error) {
      console.log(error);
    }
  },

  clearUser: (): void => set({ user: null, addresses: [] }),
}));

export default useUserStore;
