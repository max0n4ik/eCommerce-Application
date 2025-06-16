import type { Customer } from '@commercetools/platform-sdk';
import { describe, it, expect } from 'vitest';

import { mapCustomerToUser, mapCustomerAddresses } from '@/mappers/user';
import type { User, Address } from '@/utils/types';

describe('mapCustomerToUser', () => {
  it('должен правильно маппить поля id, firstName, lastName, dateOfBirth', () => {
    const customer = {
      id: 'cust-1',
      firstName: 'Alice',
      lastName: 'Ivanova',
      dateOfBirth: '1988-12-05',
    } as unknown as Customer;

    const expected: User = {
      id: 'cust-1',
      firstName: 'Alice',
      lastName: 'Ivanova',
      dateOfBirth: '1988-12-05',
    };
    expect(mapCustomerToUser(customer)).toEqual(expected);
  });

  it('должен подставлять пустые строки, если какие-то поля отсутствуют', () => {
    const customer = { id: 'cust-2' } as unknown as Customer;
    const user = mapCustomerToUser(customer);
    expect(user).toEqual({
      id: 'cust-2',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
    });
  });
});

describe('mapCustomerAddresses', () => {
  it('должен возвращать пустой массив, если у customer нет addresses', () => {
    const customer = {
      addresses: undefined,
      shippingAddressIds: undefined,
      billingAddressIds: undefined,
    } as unknown as Customer;

    expect(mapCustomerAddresses(customer)).toEqual([]);
  });

  it('должен маппить один адрес и флаг по умолчанию', () => {
    const addr = {
      id: 'addr-1',
      streetName: 'Lenina',
      streetNumber: '10',
      postalCode: '12345',
      city: 'Moscow',
      region: 'Moscow Region',
      country: 'RU',
    } as unknown as Customer['addresses'][number];

    const customer = {
      addresses: [addr],
      shippingAddressIds: ['addr-1'],
      billingAddressIds: [],
    } as unknown as Customer;

    const result: Address[] = mapCustomerAddresses(customer);
    expect(result).toEqual([
      {
        id: 'addr-1',
        street: 'Lenina 10',
        city: 'Moscow',
        state: 'Moscow Region',
        zip: '12345',
        country: 'RU',
        isDefaultShipping: true,
        isDefaultBilling: false,
      },
    ]);
  });

  it('должен маппить несколько адресов и оба флага', () => {
    const a1 = {
      id: 'a1',
      streetName: 'Main',
      streetNumber: '1',
      postalCode: '111',
      city: 'City1',
      region: 'Reg1',
      country: 'US',
    } as unknown as Customer['addresses'][number];
    const a2 = {
      id: 'a2',
      streetName: 'Second',
      streetNumber: '2',
      postalCode: '222',
      city: 'City2',
      region: 'Reg2',
      country: 'US',
    } as unknown as Customer['addresses'][number];

    const customer = {
      addresses: [a1, a2],
      shippingAddressIds: ['a2'],
      billingAddressIds: ['a1'],
    } as unknown as Customer;

    const result = mapCustomerAddresses(customer);
    expect(result).toEqual([
      {
        id: 'a1',
        street: 'Main 1',
        city: 'City1',
        state: 'Reg1',
        zip: '111',
        country: 'US',
        isDefaultShipping: false,
        isDefaultBilling: true,
      },
      {
        id: 'a2',
        street: 'Second 2',
        city: 'City2',
        state: 'Reg2',
        zip: '222',
        country: 'US',
        isDefaultShipping: true,
        isDefaultBilling: false,
      },
    ]);
  });
});
