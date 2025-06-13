import { useAuthStore } from './auth-store';

export const selectIsAuth = (state: { isAuth: boolean }): boolean =>
  state.isAuth;
export const selectAccessToken = (state: {
  accessToken: string | null;
}): string | null => state.accessToken;

export const useIsAuth = (): boolean => useAuthStore(selectIsAuth);
