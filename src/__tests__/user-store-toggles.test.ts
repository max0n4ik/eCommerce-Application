import { describe, it, expect, beforeEach } from 'vitest';

import useUserStore from '@/store/user';

describe('useUserStore toggles', () => {
  beforeEach(() => {
    useUserStore.setState({
      editingUser: false,
      editingAddressId: null,
    });
  });

  it('toggleUserEdit инвертирует флаг editingUser', () => {
    const { toggleUserEdit } = useUserStore.getState();

    expect(useUserStore.getState().editingUser).toBe(false);

    toggleUserEdit();
    expect(useUserStore.getState().editingUser).toBe(true);

    toggleUserEdit();
    expect(useUserStore.getState().editingUser).toBe(false);
  });

  it('toggleAddressEdit устанавливает и сбрасывает editingAddressId', () => {
    const { toggleAddressEdit } = useUserStore.getState();

    expect(useUserStore.getState().editingAddressId).toBeNull();

    toggleAddressEdit('addr-1');
    expect(useUserStore.getState().editingAddressId).toBe('addr-1');

    toggleAddressEdit('addr-1');
    expect(useUserStore.getState().editingAddressId).toBeNull();

    toggleAddressEdit('addr-2');
    expect(useUserStore.getState().editingAddressId).toBe('addr-2');
  });
});
