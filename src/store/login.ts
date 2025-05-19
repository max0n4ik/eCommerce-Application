import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const selectIsAuth = (state: AuthState): boolean => state.isAuth;
export const selectSetIsAuth = (state: AuthState): ((value: boolean) => void) =>
  state.setIsAuth;

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
