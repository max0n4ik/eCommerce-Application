import type { ROUTES } from '@/utils/constantes';

export type Routes = (typeof ROUTES)[keyof typeof ROUTES];
