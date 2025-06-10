import React, { useState, useEffect } from 'react';

import type { ProfileUpdates } from '@/services/user';
import useUserStore from '@/store/user';
import type { User } from '@/utils/types';

interface UserInfoProps {
  user: User & { version: number };
}

export function UserInfo({ user }: UserInfoProps): React.JSX.Element {
  const { editingUser, toggleUserEdit, saveUser } = useUserStore();
  const [form, setForm] = useState<ProfileUpdates>({});

  useEffect(() => {
    if (editingUser) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [editingUser, user]);

  const baseCardClasses =
    'rounded-2xl shadow-lg border border-green-200 p-6 transition-transform hover:-translate-y-1 bg-gradient-to-br ';

  if (editingUser) {
    return (
      <div className={baseCardClasses + 'from-[#9cc3b8] to-white mb-6'}>
        <h2 className="text-2xl font-semibold text-[#586F69] mb-4">
          Edit Profile
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser(form);
          }}
          className="space-y-4"
        >
          {[
            {
              id: 'firstName',
              label: 'First Name',
              value: form.firstName || '',
              onChange: (v: string) => setForm((f) => ({ ...f, firstName: v })),
            },
            {
              id: 'lastName',
              label: 'Last Name',
              value: form.lastName || '',
              onChange: (v: string) => setForm((f) => ({ ...f, lastName: v })),
            },
            {
              id: 'dateOfBirth',
              label: 'Date of Birth',
              value: form.dateOfBirth || '',
              type: 'date',
              onChange: (v: string) =>
                setForm((f) => ({ ...f, dateOfBirth: v })),
            },
          ].map(({ id, label, value, onChange, type }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-[#586F69] font-medium mb-1"
              >
                {label}
              </label>
              <input
                id={id}
                type={type || 'text'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-[#586F69] bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          ))}
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
