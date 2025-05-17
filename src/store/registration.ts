import { create } from 'zustand';

import type { RegistrationAddress } from '@/utils/interfaces';

type RegistrationState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  addresses: RegistrationAddress[];
  setAccountInfo: (email: string, password: string) => void;
  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) => void;
  addAddress: (address: RegistrationAddress) => void;
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
  addAddress: (address: RegistrationAddress): void =>
    set((state) => ({ addresses: [...state.addresses, address] })),
  reset: (): void =>
    set({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      addresses: [],
    }),
}));

export default useRegistrationStore;
