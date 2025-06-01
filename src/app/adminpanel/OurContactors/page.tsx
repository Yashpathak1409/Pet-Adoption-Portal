'use client';

import { useEffect, useState } from 'react';

type ContactUser = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
};

const ContactUserList = () => {
  const [contacts, setContacts] = useState<ContactUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/auth/contact'); // your actual endpoint
        if (!res.ok) throw new Error('Failed to fetch contact users');
        const data = await res.json();
        setContacts(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading contact users...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl font-sans border border-gray-400">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-800 underline">Contact Submissions</h1>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No contact submissions found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Name</th>
              <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Email</th>
              <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Message</th>
              <th className="px-6 py-3 border border-gray-700 font-semibold text-lg">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white hover:bg-blue-100'}
              >
                <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
                  {contact.name}
                </td>
                <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
                  {contact.email}
                </td>
                <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800 whitespace-pre-line">
                  {contact.message}
                </td>
                <td className="px-6 py-3 border border-gray-400 font-medium text-gray-800">
                  {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactUserList;
