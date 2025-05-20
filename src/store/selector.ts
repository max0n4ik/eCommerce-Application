import { selectIsAuth, useAuthStore } from './login';

export const useIsAuth = (): boolean => useAuthStore(selectIsAuth);
