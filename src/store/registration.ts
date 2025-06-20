import type { BaseAddress } from '@commercetools/platform-sdk';
import { create } from 'zustand';

type RegistrationState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  asDefaultShipping: boolean;
  asDefaultBilling: boolean;
  shippingAddress?: BaseAddress;
  billingAddress?: BaseAddress;
  setAccountInfo: (email: string, password: string) => void;
  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ) => void;
  setShippingAddress: (address: BaseAddress, useAsDefault: boolean) => void;
  setBillingAddress: (address: BaseAddress, useAsDefault: boolean) => void;
  reset: () => void;
};

const useRegistrationStore = create<RegistrationState>((set) => ({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  asDefaultShipping: true,
  asDefaultBilling: true,
  shippingAddress: undefined,
  billingAddress: undefined,
  setAccountInfo: (email: string, password: string): void =>
    set({ email, password }),

  setPersonalInfo: (
    firstName: string,
    lastName: string,
    dateOfBirth: Date
  ): void => set({ firstName, lastName, dateOfBirth }),

  setShippingAddress: (
    address: BaseAddress,
    useAsDefault: boolean = true
  ): void => {
    set({ shippingAddress: address, asDefaultShipping: useAsDefault });
  },
  setBillingAddress: (
    address: BaseAddress,
    useAsDefault: boolean = true
  ): void => {
    set({ billingAddress: address, asDefaultBilling: useAsDefault });
  },
  reset: (): void =>
    set({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
    }),
}));

export default useRegistrationStore;
