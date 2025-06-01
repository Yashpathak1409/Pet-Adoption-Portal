'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt?: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/auth/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-lg mt-20">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="font-sans">
      {/* Top Navbar with Buttons */}
      <nav className="w-full bg-green-100 shadow-md py-3 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-800">User Directory</h1>
          <div className="hidden sm:flex gap-4">
            <button
              onClick={() => router.push('users/usersList')}
              className="text-gray-700 bg-white hover:bg-green-200 transition px-3 py-1 rounded-md text-sm font-medium"
            >
              Users-List
            </button>
            <button
              onClick={() => router.push('/users/email')}
              className="text-gray-700 bg-white hover:bg-green-200 transition px-3 py-1 rounded-md text-sm font-medium"
            >
              Email
            </button>
            <button
              onClick={() => router.push('/users/role')}
              className="text-gray-700 bg-white hover:bg-green-200 transition px-3 py-1 rounded-md text-sm font-medium"
            >
              Role
            </button>
            <button
              onClick={() => router.push('/users/registered')}
              className="text-gray-700 bg-white hover:bg-green-200 transition px-3 py-1 rounded-md text-sm font-medium"
            >
              Registered On
            </button>
          </div>
        </div>
      </nav>

      {/* Grid Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">Name</h2>
              <p className="text-gray-500 text-opacity-70">{user.fullName}</p>

              <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Email</h2>
              <p className="text-gray-500 text-opacity-70">{user.email}</p>

              <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Role</h2>
              <p className="text-gray-500 text-opacity-70">User</p>

              <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-1">Registered On</h2>
              <p className="text-gray-500 text-opacity-70">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
