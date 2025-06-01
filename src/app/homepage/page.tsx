'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ViewAllPets from '../adminpanel/PetManagement/ViewAllPets';
import './home.css';

const featuredUsers = [
  {
    id: 1,
    name: 'Akshay & Family',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    adoptedPet: 'Bella (Dog)',
  },
  {
    id: 2,
    name: 'Keerti',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    adoptedPet: 'Coco (Parrot)',
  },
  {
    id: 3,
    name: 'Rohit Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    adoptedPet: 'Whiskers (Cat)',
  },
  {
    id: 4,
    name: 'Priya Singh',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    adoptedPet: 'Snowball (Rabbit)',
  },
];

const feedbacks = [
  {
    id: 1,
    user: 'Anjali Sharma',
    text: 'PetYash made adopting my new furry friend so easy and joyful!',
  },
  {
    id: 2,
    user: 'Vikram Singh',
    text: 'Great support and amazing pets. Highly recommend this portal.',
  },
  {
    id: 3,
    user: 'Neha Patel',
    text: 'I love how PetYash cares about both pets and adopters equally.',
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/homepage'); // or '/dashboard'
  };

  const handleViewAllPets = () => {
    router.push('/userpets/pets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100 flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to the PetYash Adoption Portal
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl">
          Find your perfect furry (or feathery) friend and give them a loving home. 🐶🐱🐦🐰
        </p>
        <button
          onClick={handleGoToDashboard}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition mb-8"
        >
          Go to Dashboard
        </button>
      </main>

      {/* Stats Section */}
      <section className="bg-white py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-3xl font-bold text-green-700">450+</h3>
            <p className="text-gray-600">Pets Adopted</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">90+</h3>
            <p className="text-gray-600">Breeds Available</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-green-700">30+</h3>
            <p className="text-gray-600">Partner Shelters</p>
          </div>
        </div>
      </section>

      {/* Featured Pets Preview */}
      <section className="px-4 py-12 bg-green-50">
        <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Meet Our Lovely Pets
        </h3>
        <div className="max-w-7xl mx-auto">
          <ViewAllPets limit={6} />
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllPets}
            className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white px-6 py-2 rounded transition"
          >
            View All Pets
          </button>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-white py-12 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">About Us</h3>
        <p className="text-center max-w-3xl mx-auto text-gray-700 text-lg mb-8">
          At PetYash, we believe every pet deserves a loving home. Our mission is to connect
          animals in need with caring adopters who will provide them with the love and care they
          deserve. Pets are more than companions—they bring joy, comfort, and unconditional love,
          making our lives richer and happier.
        </p>
        <p className="text-center max-w-3xl mx-auto text-gray-600 italic">
          “Pets are not just animals, they are family.”
        </p>
      </section>

      {/* Featured Users Section */}
      <section className="bg-green-50 py-12 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-10">Our Happy Adopters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredUsers.map(({ id, name, avatar, adoptedPet }) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-green-700">{name}</h4>
              <p className="text-gray-600 mt-1 text-sm">{adoptedPet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Feedbacks */}
      <section className="bg-white py-12 px-6 max-w-5xl mx-auto">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-10">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map(({ id, user, text }) => (
            <div key={id} className="bg-green-100 p-6 rounded-lg shadow">
              <p className="italic text-gray-700">"{text}"</p>
              <p className="mt-4 font-semibold text-green-700 text-right">– {user}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12 px-4 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8">Happy Adopters</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-100 p-6 rounded shadow">
            <p className="italic">"Adopting Bella was the best decision ever! She's a joy to our family."</p>
            <p className="mt-4 font-semibold text-green-700">– Akshay & Family</p>
          </div>
          <div className="bg-green-100 p-6 rounded shadow">
            <p className="italic">"Thanks to PetYash, I found my perfect buddy, a parrot named Coco!"</p>
            <p className="mt-4 font-semibold text-green-700">– Keerti</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 p-4 border-t mt-4">
        &copy; {new Date().getFullYear()} PetYash Portal. All rights reserved.
      </footer>
    </div>
  );
}
