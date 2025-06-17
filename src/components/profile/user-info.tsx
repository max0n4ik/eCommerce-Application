import React, { useState, useEffect, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { BirthdayCalendar } from '@/components/ui/calendar/birthday';
import { Tooltip } from '@/components/ui/error-message/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserStore from '@/store/user';
import type { User, FieldId, ProfileUpdates } from '@/utils/types';
import { validateProfileData, type ProfileForm } from '@/utils/validations';

interface UserInfoProps {
  user: User & { version: number };
}

const FIELD_CONFIG: Array<{
  id: FieldId;
  label: string;
  type?: 'text' | 'date';
}> = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
];

export function UserInfo({ user }: UserInfoProps): React.JSX.Element {
  const { editingUser, toggleUserEdit, saveUser } = useUserStore();
  const [form, setForm] = useState<ProfileUpdates>({});
  const [errors, setErrors] = useState<Partial<Record<FieldId, string>>>({});

  useEffect(() => {
    if (editingUser) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
      });
      setErrors({});
    }
  }, [editingUser, user]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    const payload = form as ProfileForm;
    const { isValid, errors: newErrors } = validateProfileData(payload);

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    saveUser(form);
  };

  const handleFieldChange =
    (field: FieldId) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const v = e.target.value;
      setForm((f) => ({ ...f, [field]: v }));
      // clear any previous error on this field
      setErrors((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== field)
        )
      );
    };

  const handleDateChange = (date: Date | null): void => {
    const iso = date ? date.toISOString().split('T')[0] : '';
    setForm((f) => ({ ...f, dateOfBirth: iso }));
    setErrors((prev) =>
      Object.fromEntries(
        Object.entries(prev).filter(([key]) => key !== 'dateOfBirth')
      )
    );
  };

  const baseCardClasses =
    'rounded-2xl shadow-lg border border-[#E5E7EB] p-6 transition-transform hover:-translate-y-1 bg-gradient-to-br ';

  if (editingUser) {
    return (
      <div className={`${baseCardClasses} from-[#9cc3b8] to-white`}>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {FIELD_CONFIG.map(({ id, label, type }) => {
            // for the DOB field we render <BirthdayCalendar>
            if (id === 'dateOfBirth') {
              return (
                <div key={id} className="relative">
                  <Label htmlFor={id}>{label}</Label>
                  <BirthdayCalendar
                    name={id}
                    defaultValue={
                      form.dateOfBirth ? new Date(form.dateOfBirth) : null
                    }
                    onChange={handleDateChange}
                    required
                  />
                  {errors[id] && (
                    <div className="absolute left-0 top-full mt-1">
                      <Tooltip message={errors[id]} />
                    </div>
                  )}
                </div>
              );
            }

            // otherwise a normal text input
            return (
              <div key={id} className="relative">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type ?? 'text'}
                  value={(form[id] as string) ?? ''}
                  onChange={handleFieldChange(id)}
                />
                {errors[id] && (
                  <div className="absolute left-0 top-full mt-1">
                    <Tooltip message={errors[id]} />
                  </div>
                )}
              </div>
            );
          })}

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
    <div className={`${baseCardClasses} from-white to-green-50`}>
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
          <span className="font-medium">Date of Birth:</span> {user.dateOfBirth}
        </p>
      </div>
    </div>
  );
}
