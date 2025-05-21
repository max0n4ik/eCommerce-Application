import { describe, it, expect } from 'vitest';

import {
  registrationUserSchema,
  registrationAddressSchema,
  registrationFirstSchema,
} from '@/utils/validations';

describe('Registration User Schema', () => {
  it('должен валидировать корректные данные пользователя', () => {
    const validData = {
      name: 'John',
      lastName: 'Doe',
      dob: new Date('1990-01-01'),
    };

    const result = registrationUserSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('должен отклонять некорректное имя', () => {
    const invalidData = {
      name: 'John123',
      lastName: 'Doe',
      dob: new Date('1990-01-01'),
    };

    const result = registrationUserSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('должен отклонять пользователя младше 13 лет', () => {
    const invalidData = {
      name: 'John',
      lastName: 'Doe',
      dob: new Date(),
    };

    const result = registrationUserSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Registration Address Schema', () => {
  it('должен валидировать корректный адрес', () => {
    const validData = {
      country: 'Germany',
      city: 'Berlin',
      street: 'Hauptstrasse',
      house: '123',
      postalCode: '10115',
    };

    const result = registrationAddressSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('должен отклонять некорректный город', () => {
    const invalidData = {
      country: 'DE',
      city: 'Berlin123',
      street: 'Hauptstrasse',
      house: '123',
      postalCode: '10115',
    };

    const result = registrationAddressSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('Registration First Schema', () => {
  it('должен валидировать корректные учетные данные', () => {
    const validData = {
      email: 'test@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
    };

    const result = registrationFirstSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('должен отклонять несовпадающие пароли', () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'Password123',
      confirmPassword: 'Password456',
    };

    const result = registrationFirstSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('должен отклонять некорректный email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'Password123',
      confirmPassword: 'Password123',
    };

    const result = registrationFirstSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
