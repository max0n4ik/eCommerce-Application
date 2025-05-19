import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  setIsAuth: (value: boolean): void => set({ isAuth: value }),
}));

export const authStore = useAuthStore.getState();
