import type { User } from '@/utils/types';

export function UserInfo({ user }: { user: User }): React.JSX.Element {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
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
