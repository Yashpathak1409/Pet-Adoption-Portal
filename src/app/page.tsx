'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  const handleVisitClick = () => {
    router.push('/homepage'); // Replace with your actual route
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      {/* Header */}
      <header className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold text-pink-600">🐾 Pet Adoption Portal</h1>
        <button
          onClick={handleVisitClick}
          className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
        >
          See Pets
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-pink-600 mb-6">
            Adopt Your New Best Friend 🐶🐱
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Give a forever home to a pet in need. Explore lovable dogs, cats, rabbits, parrots and more!
          </p>
          <button
            onClick={handleVisitClick}
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            🐾 Find a Pet Now
          </button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/istockphoto-1417882544-612x612.jpg"
            alt="Adopted pets"
            width={500}
            height={350}
            className="rounded-3xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-pink-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-pink-700 mb-2">❤️ Loving Homes</h3>
            <p className="text-gray-800">
              Every pet deserves a safe, caring and loving family like yours.
            </p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">🐕 Variety of Pets</h3>
            <p className="text-gray-800">
              Choose from dogs, cats, rabbits, parrots and more based on your preference.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-2">📋 Easy Adoption</h3>
            <p className="text-gray-800">
              Simple and transparent adoption process. Apply and meet your pet easily.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 bg-white shadow-inner">
        © {new Date().getFullYear()} Pet Adoption Portal. All rights reserved.
      </footer>
    </main>
  );
}
