'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Pet = {
  petName: string;
  petType: string;
  breed: string;
  age: number;
  gender: string;
  color?: string;
  size?: string;
  weight?: number;
  vaccinated: boolean;
  vaccinationDate?: string;
  healthInfo?: string;
  foodPreference?: string;
  temperament?: string;
  availableForAdoption: boolean;
  photoUrl?: string;
};

const ViewPetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchPet = async () => {
    try {
      const res = await fetch(`/api/auth/petprofile/${id}`);
      if (!res.ok) {
        throw new Error('Pet not found');
      }
      const data = await res.json();
      setPet(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchPet();
}, [id]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pet) return <p>No pet data found.</p>;

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f0fdf4',
        borderRadius: '1.5rem',
        maxWidth: '700px',
        margin: '2rem auto',
        boxShadow: '0 8px 24px rgba(5, 150, 105, 0.25)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.25rem',
          color: '#047857',
          fontWeight: '800',
          marginBottom: '1.25rem',
          textShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {pet.petName}
      </h1>

      <div
        style={{
          fontSize: '1.125rem',
          color: '#065f46',
          lineHeight: '1.8',
          fontWeight: '600',
          marginBottom: '1.5rem',
          paddingLeft: '1rem',
        }}
      >
        <p><strong>Type:</strong> {pet.petType}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.age} years</p>
        <p><strong>Gender:</strong> {pet.gender}</p>
        {pet.color && <p><strong>Color:</strong> {pet.color}</p>}
        {pet.size && <p><strong>Size:</strong> {pet.size}</p>}
        {pet.weight && <p><strong>Weight:</strong> {pet.weight} kg</p>}
        <p><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</p>
        {pet.vaccinationDate && <p><strong>Vaccination Date:</strong> {pet.vaccinationDate}</p>}
        {pet.healthInfo && <p><strong>Health Info:</strong> {pet.healthInfo}</p>}
        {pet.foodPreference && <p><strong>Food Preference:</strong> {pet.foodPreference}</p>}
        {pet.temperament && <p><strong>Temperament:</strong> {pet.temperament}</p>}
        <p><strong>Status:</strong> {pet.availableForAdoption ? 'Available' : 'Adopted'}</p>
      </div>

      {pet.photoUrl && (
        <img
          src={pet.photoUrl}
          alt={pet.petName}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            margin: '1.5rem auto',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)',
          }}
        />
      )}

      <Link
        href={`/adminpanel/PetDetails/${id}/adopt`}
        style={{
          display: 'block',
          marginTop: '1.5rem',
          padding: '1rem',
          textAlign: 'center',
          backgroundColor: pet.availableForAdoption ? '#16a34a' : '#bbf7d0',
          color: pet.availableForAdoption ? '#ffffff' : '#065f46',
          fontWeight: '900',
          fontSize: '1.25rem',
          borderRadius: '1.25rem',
          textDecoration: 'none',
          pointerEvents: pet.availableForAdoption ? 'auto' : 'none',
          opacity: pet.availableForAdoption ? 1 : 0.6,
          boxShadow: pet.availableForAdoption
            ? '0 10px 20px rgba(22, 163, 74, 0.5)'
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {pet.availableForAdoption ? 'Click Here to Adopt' : 'Already Adopted'}
      </Link>
    </div>
  );
};

export default ViewPetDetails;
