'use client';

import { useEffect, useState } from 'react';

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

  if (loading) return <p className="text-center text-lg">Loading users...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl font-sans border border-gray-400">
  <h1 className="text-3xl font-extrabold mb-6 text-center text-green-800 underline">Registered Users</h1>
  {users.length === 0 ? (
    <p className="text-center text-gray-600 text-lg">No users found.</p>
  ) : (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-green-600 text-white">
        <tr>
          <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Full Name</th>
          <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Email</th>
          <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Registered At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            className={index % 2 === 0 ? 'bg-green-50' : 'bg-white hover:bg-green-100'}
          >
            <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
              {user.fullName}
            </td>
            <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
              {user.email}
            </td>
            <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

  );
};

export default UserList;