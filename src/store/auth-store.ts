import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        localStorage.setItem('token', '');
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
