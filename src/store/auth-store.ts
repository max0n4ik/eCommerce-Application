import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  accessToken: string | null;
  accessTokenAnonymous?: string;
  setIsAuth: (value: boolean) => void;
  setAccessToken: (token: string) => void;
  setAccessTokenAnonymous: (token: string) => void;
  clearAccessToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      accessToken: null,
      setIsAuth: (value): void => set({ isAuth: value }),
      setAccessToken: (token): void => set({ accessToken: token }),
      setAccessTokenAnonymous: (token): void =>
        set({ accessTokenAnonymous: token }),
      clearAccessToken: (): void => set({ accessToken: null }),
      logout: (): void => set({ isAuth: false, accessToken: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuth: state.isAuth,
        accessToken: state.accessToken,
        accessTokenAnonymous: state.accessTokenAnonymous,
      }),
    }
  )
);
