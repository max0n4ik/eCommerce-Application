import React, { useState, useEffect, type FormEvent } from 'react';

import { Tooltip } from '@/components/ui/error-message/error-message';
import type { ProfileUpdates } from '@/services/user';
import useUserStore from '@/store/user';
import type { User } from '@/utils/types';

interface UserInfoProps {
  user: User & { version: number };
}

type FieldId = 'firstName' | 'lastName' | 'dateOfBirth';

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

  const validate = (): boolean => {
    const newErrors: Partial<Record<FieldId, string>> = {};
    FIELD_CONFIG.forEach(({ id, label }) => {
      const val = form[id as keyof ProfileUpdates] as string | undefined;
      if (!val || val.trim() === '') {
        newErrors[id] = `${label} is required`;
      } else if ((id === 'firstName' || id === 'lastName') && /\d/.test(val)) {
        newErrors[id] = `${label} cannot contain numbers`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const baseCardClasses =
    'rounded-2xl shadow-lg border border-[#E5E7EB] p-6 transition-transform hover:-translate-y-1 bg-gradient-to-br ';

  if (editingUser) {
    return (
      <div className={baseCardClasses + 'from-[#9cc3b8] to-white mb-6'}>
        <h2 className="text-2xl font-semibold text-[#586F69] mb-4">
          Edit Profile
        </h2>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (!validate()) return;
            saveUser(form);
          }}
          className="space-y-4"
        >
          {FIELD_CONFIG.map(({ id, label, type }) => {
            const value = (form[id] || '') as string;
            return (
              <div key={id} className="relative">
                <label
                  htmlFor={id}
                  className="block text-[#586F69] font-medium mb-1"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type ?? 'text'}
                  value={value}
                  onChange={(e) => {
                    const v = e.target.value;
                    setForm((f) => ({ ...f, [id]: v }));
                    setErrors((prev) => {
                      const filtered = Object.entries(prev)
                        .filter(([key]) => key !== id)
                        .reduce(
                          (obj, [key, msg]) => {
                            obj[key as FieldId] = msg;
                            return obj;
                          },
                          {} as Record<FieldId, string>
                        );
                      return filtered;
                    });
                  }}
                  className="w-full rounded-lg border border-[#586F69] bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#586F69]"
                />
                {errors[id] && (
                  <div className="absolute left-0 top-full mt-1">
                    <Tooltip message={errors[id] ?? ''} />
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#586F69] hover:bg-[#a3c1ba] text-white font-semibold px-4 py-2 rounded-lg shadow"
            >
              Save
            </button>
            <button
              type="button"
              onClick={toggleUserEdit}
              className="flex-1 bg-white border border-[#586F69] text-[#586F69] font-semibold px-4 py-2 rounded-lg hover:bg-[#e5e7e6] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={baseCardClasses + 'from-white to-green-50 mb-6'}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#586F69]">Profile</h2>
        <button
          onClick={toggleUserEdit}
          className="text-[#586F69] hover:text-[#586F69] font-medium"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2 text-[#586F69]">
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
