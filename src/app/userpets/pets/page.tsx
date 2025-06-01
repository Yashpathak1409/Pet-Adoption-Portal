'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Pet = {
   _id: string;
  petName: string;
  petType: string;
  breed: string;
  age: number;
  gender: string;
  availableForAdoption: boolean;
  photoUrl?: string;
};

export default function UserPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/petprofile') // API route to fetch all pets
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error('Failed to fetch pets:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 bg-[#f0faff] min-h-screen">
      {/* Navigation Link */}
      <div className="mb-6">
        <Link href="/homepage" className="text-blue-600 underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Available Pets for Adoption
      </h1>

      {loading ? (
        <p className="text-center">Loading pets...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pets.map((pet, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition"
            >
              {/* Updated Image Container */}
              {pet.photoUrl && (
               <div className="w-full h-36 mb-3 flex justify-center items-center overflow-hidden rounded-md bg-gray-100">
  <img
    src={pet.photoUrl}
    alt={pet.petName}
    className="h-full object-contain"
  />
</div>

              )}
              <h2 className="text-xl font-semibold text-gray-800">{pet.petName}</h2>
              <p className="text-gray-600">Breed: {pet.breed}</p>
              <p className="text-gray-600">Age: {pet.age}</p>
              <p className="text-gray-600">Gender: {pet.gender}</p>
              <p
                className={`font-semibold ${
                  pet.availableForAdoption ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {pet.availableForAdoption ? 'Available for Adoption' : 'Already Adopted'}
              </p>
              {pet.availableForAdoption && (
              <Link href={`/adminpanel/PetDetails/${pet._id}`}>
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
               Adopt
              </button>
              
              </Link>
               )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
