import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      setIsAuth: (value: boolean): void => set({ isAuth: value }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const authStore = useAuthStore.getState();
