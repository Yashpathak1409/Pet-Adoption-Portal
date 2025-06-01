'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Pet = {
  petName: string;
  petType: string;
  breed: string;
  age: number;
  gender: string;
  color?: string;
  photoUrl?: string;
};

export default function AdoptForm() {
  const router = useRouter();
  const params = useParams();
  const petId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`/api/auth/petprofile/${petId}`);
        if (!res.ok) throw new Error('Pet not found');
        const data = await res.json();
        setPet(data);
      } catch (err) {
        console.error('Error fetching pet:', err);
      }
    };

    if (petId) {
      fetchPet();
    } else {
      console.warn('Pet ID is not available yet.');
    }
  }, [petId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const res = await fetch('/api/auth/adopt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, petId }),
  });

  setLoading(false);

  if (res.ok) {
    router.push(`/payment?petId=${petId}`);  // <-- Use backticks here
  } else {
    alert('Failed to submit. Please try again.');
  }
};

  if (!petId) {
    return (
      <div className="text-center mt-10 text-red-500">
        Pet ID is missing from the URL.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Adopt {pet?.petName}</h2>

      {pet && (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <img
              src={pet.photoUrl}
              alt={pet.petName}
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 text-gray-800 space-y-1">
            <p><strong>Name:</strong> {pet.petName}</p>
            <p><strong>Type:</strong> {pet.petType}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            {pet.color && <p><strong>Color:</strong> {pet.color}</p>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="fullName"
          onChange={handleChange}
          value={form.fullName}
          required
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
        />
        <input
          name="email"
          onChange={handleChange}
          value={form.email}
          required
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
        />
        <input
          name="phone"
          onChange={handleChange}
          value={form.phone}
          required
          placeholder="Phone"
          className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
        />
        <input
          name="address"
          onChange={handleChange}
          value={form.address}
          required
          placeholder="Address"
          className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
        />
        <textarea
          name="message"
          onChange={handleChange}
          value={form.message}
          placeholder="Why do you want to adopt this pet?"
          className="w-full border p-3 rounded-lg h-32 text-black placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
