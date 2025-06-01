'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddPetForm from './AddPet';
import ViewAllPets from '../PetManagement/ViewAllPets';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const dummyData = [
  { name: 'Jan', pets: 30, users: 20 },
  { name: 'Feb', pets: 40, users: 35 },
  { name: 'Mar', pets: 20, users: 25 },
  { name: 'Apr', pets: 50, users: 45 },
];

const COLORS = ['#00C49F', '#FF8042'];

interface Pet {
  id: string;
  name: string;
  adopted: boolean;
  createdAt?: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('dashboard');

  // User state
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loadingUserCount, setLoadingUserCount] = useState(true);
  const [errorUserCount, setErrorUserCount] = useState<string | null>(null);

  // Adoption states
  const [totalPetsCount, setTotalPetsCount] = useState<number | null>(null);
  const [adoptionCount, setAdoptionCount] = useState<number | null>(null);
  const [loadingAdoptionCounts, setLoadingAdoptionCounts] = useState(true);
  const [errorAdoptionCounts, setErrorAdoptionCounts] = useState<string | null>(null);

  // Contractor states
  const [contractorCount, setContractorCount] = useState<number | null>(null);
  const [loadingContractors, setLoadingContractors] = useState(true);
  const [errorContractors, setErrorContractors] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await fetch('/api/auth/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const users = await res.json();
        setUserCount(Array.isArray(users) ? users.length : 0);
      } catch (err: unknown) {
        setErrorUserCount(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoadingUserCount(false);
      }
    }

    async function fetchAdoptionData() {
      try {
        const res = await fetch('/api/auth/petprofile');
        if (!res.ok) throw new Error('Failed to fetch pets data');
        const pets: Pet[] = await res.json();
        setAdoptionCount(pets.filter(p => p.adopted).length);
        setTotalPetsCount(pets.length);
      } catch (err: unknown) {
        setErrorAdoptionCounts(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoadingAdoptionCounts(false);
      }
    }
async function fetchContractorCount() {
  try {
    const res = await fetch('/api/auth/contact');
    if (!res.ok) throw new Error('Failed to fetch contactors');
    const contractors = await res.json();
    setContractorCount(Array.isArray(contractors) ? contractors.length : 0);
  } catch (err: unknown) {
    setErrorContractors(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoadingContractors(false);
  }
}


    fetchUserCount();
    fetchAdoptionData();
    fetchContractorCount();
  }, []);

  const nonAdoptedCount = totalPetsCount !== null && adoptionCount !== null
    ? totalPetsCount - adoptionCount
    : null;

  const pieData = [
    { name: 'Adopted', value: adoptionCount ?? 0 },
    { name: 'Non-Adopted', value: nonAdoptedCount ?? 0 },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <p className="text-2xl font-semibold text-green-800">Welcome, Admin! 👑</p>

            {/* Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      {
        title: 'Our Users',
        count: loadingUserCount ? 'Loading...' : errorUserCount ? 'Error' : userCount,
        link: '/adminpanel/users',
      },
      {
        title: 'Adopted Pets',
        count: loadingAdoptionCounts ? 'Loading...' : errorAdoptionCounts ? 'Error' : adoptionCount,
        link: '/adminpanel/adopted-pets',
      },
      {
        title: 'Non-Adopted Pets',
        count: loadingAdoptionCounts ? 'Loading...' : errorAdoptionCounts ? 'Error' : nonAdoptedCount,
        link: '/adminpanel/non-adopted-pets',
      },
      {
        title: 'Contact Actors',
        count: loadingContractors ? 'Loading...' : errorContractors ? 'Error' : contractorCount,
        link: '/adminpanel/OurContactors',
      },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-green-100 border border-green-400 rounded-xl p-6 shadow-md text-center"
                >
                  <h3 className="text-lg font-semibold text-green-800">{item.title}</h3>
                  <p className="text-3xl font-bold my-2 text-green-700">{item.count}</p>
                  <button
                      onClick={() => router.push(item.link)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                       View Details
                  </button>


                  

                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <h4 className="text-xl font-bold text-green-800 mb-4">Monthly Pet & User Stats</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dummyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pets" stroke="#8884d8" />
                    <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <h4 className="text-xl font-bold text-green-800 mb-4">Adoption Ratio</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border mt-10">
              <h4 className="text-xl font-bold text-green-800 mb-4">Pets Overview</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pets" fill="#00C49F" />
                  <Bar dataKey="users" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'add-pet':
        return <AddPetForm />;

      case 'view-pets':
        return <ViewAllPets />;

      case 'dogs':
        return <p className="text-xl font-semibold text-green-800">Manage Dogs</p>;

      case 'cats':
        return <p className="text-xl font-semibold text-green-800">Manage Cats</p>;

      case 'birds':
        return <p className="text-xl font-semibold text-green-800">Manage Birds</p>;

      case 'rabbits':
        return <p className="text-xl font-semibold text-green-800">Manage Rabbits</p>;

      default:
        return <p className="text-xl">Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-100 via-white to-green-200 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white p-6 shadow-lg flex flex-col">
        <h2 className="text-3xl font-bold mb-8 border-b pb-4">🐾 Admin Panel</h2>

        <nav className="flex-1 space-y-3">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              selectedSection === 'dashboard' ? 'bg-white text-green-700 font-semibold' : 'hover:bg-green-600'
            }`}
            onClick={() => setSelectedSection('dashboard')}
          >
            📊 Dashboard
          </button>

          <div className="pt-4">
            <h3 className="font-semibold text-sm mb-1 uppercase text-gray-200">Pet Management</h3>
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedSection === 'add-pet' ? 'bg-white text-green-700 font-semibold' : 'hover:bg-green-600'
              }`}
              onClick={() => setSelectedSection('add-pet')}
            >
              ➕ Add New Pet
            </button>

            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedSection === 'view-pets' ? 'bg-white text-green-700 font-semibold' : 'hover:bg-green-600'
              }`}
              onClick={() => setSelectedSection('view-pets')}
            >
              🐕 View All Pets
            </button>

            {['dogs', 'cats', 'birds', 'rabbits'].map((animal) => (
              <button
                key={animal}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedSection === animal ? 'bg-white text-green-700 font-semibold' : 'hover:bg-green-600'
                }`}
                onClick={() => setSelectedSection(animal)}
              >
                {animal.charAt(0).toUpperCase() + animal.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-green-50 overflow-auto">{renderContent()}</main>
    </div>
  );
}
