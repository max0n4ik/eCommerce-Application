import { Eye, EyeOff } from 'lucide-react';
import React, { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/store/user-store';
import type { PasswordForm } from '@/utils/types';
import {
  validatePasswordData,
  validateCurrentPassword,
} from '@/utils/validations';

interface ChangePasswordFormProps {
  onSuccess: () => void;
}

export function ChangePasswordForm({
  onSuccess,
}: ChangePasswordFormProps): React.JSX.Element {
  const changePassword = useUserStore((s) => s.changePassword);
  const loading = useUserStore((s) => s.loading);
  const storeError = useUserStore((s) => s.error);

  const [form, setForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<PasswordForm>>({});
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange =
    (field: keyof PasswordForm) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setForm((f) => ({ ...f, [field]: e.target.value }));

      setErrors((prev) =>
        Object.entries(prev).reduce<Partial<PasswordForm>>(
          (acc, [key, msg]) => {
            if (key !== field) acc[key as keyof PasswordForm] = msg;
            return acc;
          },
          {}
        )
      );
    };

  const customerId = useUserStore((s) => s.user?.id) ?? '';

  const handleCurrentBlur: React.FocusEventHandler<
    HTMLInputElement
  > = async () => {
    // ждем результат валидации
    const { isValid, error } = await validateCurrentPassword(
      customerId,
      form.currentPassword
    );
    if (!isValid && error) {
      setErrors((prev) => ({ ...prev, currentPassword: error }));
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validatePasswordData(form);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    try {
      await changePassword(form.currentPassword, form.newPassword);
      onSuccess();
    } catch {
      const msg = useUserStore.getState().error ?? '';

      if (msg.includes('Invalid current password')) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: 'Неверный текущий пароль',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          currentPassword: msg || 'Не удалось сменить пароль',
        }));
      }
    }

    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordSuccess(true);
    onSuccess();
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <>
      {passwordSuccess && (
        <div
          className="
           bg-green-50 border border-green-200 
           text-green-800 p-4 rounded-lg 
           transition-opacity duration-500
         "
        >
          Password changed successfully.
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="relative">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              name="currentPassword"
              type={showCurrent ? 'text' : 'password'}
              className="pr-10"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
              onBlur={handleCurrentBlur}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 my-auto flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setShowCurrent((s) => !s)}
              aria-label={showCurrent ? 'Hide password' : 'Show password'}
            >
              {showCurrent ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          {errors.currentPassword && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.currentPassword} />
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNew ? 'text' : 'password'}
              className="pr-10"
              value={form.newPassword}
              onChange={handleChange('newPassword')}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 my-auto flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setShowNew((s) => !s)}
              aria-label={showNew ? 'Hide password' : 'Show password'}
            >
              {showNew ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          {errors.newPassword && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.newPassword} />
            </div>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              className="pr-10"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 my-auto flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="absolute left-0 top-full mt-1">
              <Tooltip message={errors.confirmPassword} />
            </div>
          )}
        </div>

        {storeError && <p className="text-destructive text-sm">{storeError}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Saving...' : 'Save Password'}
          </Button>
        </div>
      </form>
    </>
  );
}
