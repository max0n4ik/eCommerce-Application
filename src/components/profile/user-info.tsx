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

  if (editingUser) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser(form);
          }}
          className="space-y-3"
        >
          <div>
            <label htmlFor="firstName" className="block text-sm">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={form.firstName || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, firstName: e.target.value }))
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={form.lastName || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, lastName: e.target.value }))
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={form.dateOfBirth || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, dateOfBirth: e.target.value }))
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={toggleUserEdit}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button onClick={toggleUserEdit} className="text-sm text-blue-600">
          Edit
        </button>
      </div>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Date of Birth:</strong> {user.dateOfBirth}
      </p>
    </div>
  );
}
