import type { BaseAddress } from '@commercetools/platform-sdk';
import { create } from 'zustand';

type RegistrationState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  addresses: BaseAddress[];
  setAccountInfo: (email: string, password: string) => void;
  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) => void;
  addAddress: (address: BaseAddress[]) => void;
  reset: () => void;
};

const useRegistrationStore = create<RegistrationState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  addresses: [],

  setAccountInfo: (email: string, password: string): void =>
    set({ email, password }),
  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ): void => set({ firstName, lastName, dateOfBirth }),
  addAddress: (address: BaseAddress[]): void =>
    set((state) => ({ addresses: [...state.addresses, ...address] })),
  reset: (): void =>
    set({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      addresses: [],
    }),
}));

export default useRegistrationStore;
