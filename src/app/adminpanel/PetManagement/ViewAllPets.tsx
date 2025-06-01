'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Import Link
import './ViewAllPets.css';

type Pet = {
  _id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  image: string;
  status: 'Available' | 'Adopted';
};

// Interface for raw pet data as returned from your API
interface RawPet {
  _id: string;
  petName: string;
  petType?: string;
  breed: string;
  age: number;
  gender: string;
  photoUrl?: string;
  availableForAdoption: boolean;
  // ... you can add more fields if needed
}

interface ViewAllPetsProps {
  limit?: number;
}

const ViewAllPets: React.FC<ViewAllPetsProps> = ({ limit }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/auth/petprofile');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        // Explicitly type the fetched data as RawPet[]
        const data: RawPet[] = await response.json();

        const mappedPets: Pet[] = data.map((pet) => {
          const status: 'Available' | 'Adopted' = pet.availableForAdoption ? 'Available' : 'Adopted';
          return {
            _id: pet._id,
            name: pet.petName,
            age: `${pet.age} years`,
            breed: pet.breed,
            gender: pet.gender,
            image: pet.photoUrl || 'https://via.placeholder.com/400x300',
            status,
          };
        });

        const limitedPets = limit ? mappedPets.slice(0, limit) : mappedPets;
        setPets(limitedPets);
      } catch (err) {
        // Use unknown type and narrow it to Error safely
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch pets');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [limit]);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="view-all-pets-container">
      <h1>All Pets</h1>
      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        <div className="pet-grid">
          {pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img src={pet.image} alt={pet.name} className="pet-image" />
              <h2 className="pet-name">{pet.name}</h2>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Gender:</strong> {pet.gender}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={pet.status === 'Available' ? 'status-available' : 'status-adopted'}>
                  {pet.status}
                </span>
              </p>

              {/* ✅ More Info navigates to full pet details page */}
              <Link href={`/adminpanel/PetDetails/${pet._id}`}>
                <button className="more-info-button">More Info</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllPets;
