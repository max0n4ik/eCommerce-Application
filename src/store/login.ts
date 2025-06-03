import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isAuth: boolean;
  accessToken: string | null;

  setIsAuth: (value: boolean) => void;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  logout: () => void;
}

export const selectIsAuth = (state: UserState): boolean => state.isAuth;
export const selectSetIsAuth = (state: UserState): ((value: boolean) => void) =>
  state.setIsAuth;

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      isAuth: false,
      accessToken: null,

      setIsAuth: (value: boolean): void => set({ isAuth: value }),
      setAccessToken: (token: string): void => set({ accessToken: token }),
      clearAccessToken: (): void => set({ accessToken: null }),

      logout: (): void => {
        set({ isAuth: false, accessToken: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state): Partial<UserState> => ({
        isAuth: state.isAuth,
        accessToken: state.accessToken,
      }),
    }
  )
);

export const authStore = useAuthStore.getState();
