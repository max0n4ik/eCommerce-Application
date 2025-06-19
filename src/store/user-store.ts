import type {
  CustomerUpdateAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSetDateOfBirthAction,
  CustomerChangeEmailAction,
  CustomerChangeAddressAction,
} from '@commercetools/platform-sdk';
import { create } from 'zustand';

import { mapCustomerToUser, mapCustomerAddresses } from '@/mappers/user';
import {
  fetchCustomerRaw,
  patchCustomerRaw,
  countCustomersByEmail,
  changePasswordService,
} from '@/services/user-service';
import type {
  User,
  Address,
  ProfileUpdates,
  AddressUpdates,
} from '@/utils/types';

type UserWithVersion = User & { version: number };

interface UserStore {
  user: UserWithVersion | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;

  editingUser: boolean;
  toggleUserEdit: () => void;

  editingAddressId: string | null;
  toggleAddressEdit: (id: string) => void;

  fetchUser: () => Promise<void>;
  saveUser: (updates: ProfileUpdates) => Promise<void>;
  saveAddress: (updates: AddressUpdates) => Promise<void>;

  checkEmailExists: (email: string) => Promise<boolean>;

  changePassword: (current: string, next: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  addresses: [],
  loading: false,
  error: null,

  editingUser: false,
  toggleUserEdit(): void {
    set((s) => ({ editingUser: !s.editingUser }));
  },

  editingAddressId: null,
  toggleAddressEdit(id: string): void {
    set((s) => ({
      editingAddressId: s.editingAddressId === id ? null : id,
    }));
  },

  async fetchUser(): Promise<void> {
    set({ loading: true, error: null });
    try {
      const customer = await fetchCustomerRaw();
      set({
        user: {
          ...mapCustomerToUser(customer),
          version: customer.version,
        },
        addresses: mapCustomerAddresses(customer),
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      set({ error: message, loading: false });
    }
  },

  async saveUser(updates: ProfileUpdates): Promise<void> {
    set({ loading: true, error: null });
    const state = get();
    const current = state.user;
    if (!current) {
      set({ error: 'Нет пользователя', loading: false });
      return;
    }

    const actions: CustomerUpdateAction[] = [];

    if (updates.firstName !== undefined) {
      actions.push({
        action: 'setFirstName',
        firstName: updates.firstName,
      } as CustomerSetFirstNameAction);
    }
    if (updates.lastName !== undefined) {
      actions.push({
        action: 'setLastName',
        lastName: updates.lastName,
      } as CustomerSetLastNameAction);
    }
    if (updates.dateOfBirth !== undefined) {
      actions.push({
        action: 'setDateOfBirth',
        dateOfBirth: updates.dateOfBirth,
      } as CustomerSetDateOfBirthAction);
    }
    if (updates.email !== undefined) {
      actions.push({
        action: 'changeEmail',
        email: updates.email,
      } as CustomerChangeEmailAction);
    }

    if (actions.length === 0) {
      set({ loading: false });
      return;
    }

    try {
      const updated = await patchCustomerRaw(
        current.id,
        current.version,
        actions
      );
      set({
        user: {
          ...mapCustomerToUser(updated),
          version: updated.version,
        },
        addresses: mapCustomerAddresses(updated),
        editingUser: false,
        loading: false,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes('different version')) {
        set({
          error:
            'Ваш профиль устарел. Пожалуйста, обновите страницу и попробуйте снова.',
          loading: false,
        });
      } else {
        set({ error: msg, loading: false });
      }
    }
  },

  async saveAddress(updates: AddressUpdates): Promise<void> {
    set({ loading: true, error: null });
    const state = get();
    const current = state.user;
    if (!current) {
      set({ error: 'Нет пользователя', loading: false });
      return;
    }

    try {
      const customer = await fetchCustomerRaw();
      const original = customer.addresses?.find((a) => a.id === updates.id);
      if (!original) {
        throw new Error(`Address с id="${updates.id}" не найден`);
      }

      const merged = {
        ...original,
        streetName: updates.streetName ?? original.streetName,
        streetNumber: updates.streetNumber ?? original.streetNumber,
        city: updates.city ?? original.city,
        region: updates.region ?? original.region,
        postalCode: updates.postalCode ?? original.postalCode ?? '',
        country: updates.country ?? original.country ?? '',
      };

      const action: CustomerChangeAddressAction = {
        action: 'changeAddress',
        addressId: updates.id,
        address: merged,
      };

      const updated = await patchCustomerRaw(current.id, current.version, [
        action,
      ]);
      set({
        addresses: mapCustomerAddresses(updated),
        user: {
          ...mapCustomerToUser(updated),
          version: updated.version,
        },
        editingAddressId: null,
        loading: false,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      set({ error: msg, loading: false });
    }
  },

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const cnt = await countCustomersByEmail(email);
      return cnt > 0;
    } catch {
      return false;
    }
  },

  changePassword: async (currentPassword, newPassword): Promise<void> => {
    set({ loading: true, error: null });
    const state = get();
    if (!state.user) {
      set({ error: 'Нет пользователя', loading: false });
      return;
    }
    try {
      const updated = await changePasswordService(
        state.user.id,
        state.user.version,
        currentPassword,
        newPassword
      );
      // обновляем в сторе версию и user (можно не менять e-mail/name и т.п.)
      set({
        user: {
          ...mapCustomerToUser(updated),
          version: updated.version,
        },
        loading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      set({ error: message, loading: false });
    }
  },
}));
