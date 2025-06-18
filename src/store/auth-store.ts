import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { myToken } from '@/services/build-client';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (value): void => set({ isAuth: value }),
      logout: (): void => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        localStorage.removeItem('cartId');
        localStorage.removeItem('cartVersion');
        myToken.clear();
        set({ isAuth: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuth: state.isAuth,
      }),
    }
  )
);
