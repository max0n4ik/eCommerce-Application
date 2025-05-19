import type { BaseAddress } from '@commercetools/platform-sdk';
import { create } from 'zustand';

type RegistrationState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  addresses: BaseAddress[];
  isDefaultShipping: number | undefined;
  isDefaultBilling: number | undefined;
  setAccountInfo: (email: string, password: string) => void;
  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) => void;
  addAddress: (
    address: BaseAddress[],
    options?: { asShipping?: boolean; asBilling?: boolean }
  ) => void;
  reset: () => void;
};

const useRegistrationStore = create<RegistrationState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  addresses: [],
  isDefaultShipping: undefined,
  isDefaultBilling: undefined,

  setAccountInfo: (email: string, password: string): void =>
    set({ email, password }),

  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ): void => set({ firstName, lastName, dateOfBirth }),

  addAddress: (newAddresses: BaseAddress[], options): void =>
    set((state) => {
      const startIndex = state.addresses.length;
      const updatedAddresses = [...state.addresses, ...newAddresses];
      const updates: Partial<RegistrationState> = {
        addresses: updatedAddresses,
      };

      if (options?.asShipping) {
        updates.isDefaultShipping = startIndex;
      }

      if (options?.asBilling) {
        updates.isDefaultBilling = startIndex;
      }

      return updates;
    }),
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
