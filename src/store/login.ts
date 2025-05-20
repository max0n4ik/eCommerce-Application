import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const selectIsAuth = (state: UserState): boolean => state.isAuth;
export const selectSetIsAuth = (state: UserState): ((value: boolean) => void) =>
  state.setIsAuth;

export const useAuthStore = create<UserState>()(
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
