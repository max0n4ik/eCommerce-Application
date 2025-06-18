import React, { useState, useEffect, useRef, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { BirthdayCalendar } from '@/components/ui/calendar/birthday';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/store/user-store';
import type { User, FieldId, ProfileUpdates } from '@/utils/types';
import {
  validateProfileData,
  validateEmail,
  clearFieldError,
  type ProfileForm,
} from '@/utils/validations';

interface UserInfoProps {
  user: User & { version: number };
}

const FIELD_CONFIG: Array<{
  id: FieldId;
  label: string;
}> = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
];

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function UserInfo({ user }: UserInfoProps): React.JSX.Element {
  const { editingUser, toggleUserEdit, saveUser } = useUserStore();
  const [form, setForm] = useState<ProfileUpdates>({});
  const [errors, setErrors] = useState<
    Partial<Record<FieldId | 'email' | 'dateOfBirth', string>>
  >({});
  const emailDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (editingUser) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      });
      setErrors({});
    }
  }, [editingUser, user]);

  const handleFieldChange =
    (field: FieldId): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [field]: v }));
      setErrors((prev) => clearFieldError(prev, field));
    };

  const handleDateChange = (date: Date | null): void => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const iso = `${year}-${month}-${day}`;
      setForm((f) => ({ ...f, dateOfBirth: iso }));
      setErrors((prev) => clearFieldError(prev, 'dateOfBirth'));
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, email: v }));
    setErrors((prev) => clearFieldError(prev, 'email'));
    if (emailDebounce.current) clearTimeout(emailDebounce.current);
    emailDebounce.current = setTimeout(async () => {
      const { isValid, error } = await validateEmail(v, user.email);
      if (!isValid && error) {
        setErrors((prev) => ({ ...prev, email: error }));
      }
    }, 500);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const payload = form as ProfileForm;
    const { isValid, errors: valErrs } = validateProfileData(payload);
    if (!isValid) {
      setErrors(valErrs);
      return;
    }
    const { isValid: emailOk, error: emailErr } = await validateEmail(
      payload.email,
      user.email
    );
    if (!emailOk && emailErr) {
      setErrors({ ...valErrs, email: emailErr });
      return;
    }
    await saveUser(form);
  };

  const base =
    'rounded-2xl shadow-lg border border-[#E5E7EB] p-6 transition-transform hover:-translate-y-1 bg-gradient-to-br';

  if (editingUser) {
    return (
      <div className={`${base} from-[#9cc3b8] to-white mb-6`}>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Edit Profile
        </h2>
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          {FIELD_CONFIG.map(({ id, label }) => (
            <div key={id} className="relative">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                value={(form[id] as string) ?? ''}
                onChange={handleFieldChange(id)}
              />
              {errors[id] && (
                <div className="absolute left-0 top-full mt-1">
                  <Tooltip message={errors[id]} />
                </div>
              )}
            </div>
          ))}

          <div className="relative">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <BirthdayCalendar
              name="dateOfBirth"
              defaultValue={
                form.dateOfBirth ? parseLocalDate(form.dateOfBirth) : null
              }
              onChange={handleDateChange}
              required
            />
            {errors.dateOfBirth && (
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.dateOfBirth} />
              </div>
            )}
          </div>

          <div className="relative">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email ?? ''}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <div className="absolute left-0 top-full mt-1">
                <Tooltip message={errors.email} />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Save
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={toggleUserEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`${base} from-white to-green-50 mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">Profile</h2>
        <Button variant="link" onClick={toggleUserEdit}>
          Edit
        </Button>
      </div>
      <div className="space-y-2 text-primary">
        <p>
          <span className="font-medium">First Name:</span> {user.firstName}
        </p>
        <p>
          <span className="font-medium">Last Name:</span> {user.lastName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Date of Birth:</span> {user.dateOfBirth}
        </p>
      </div>
    </div>
  );
}
