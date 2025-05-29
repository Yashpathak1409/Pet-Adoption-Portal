'use client';

import { useState } from 'react';
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

const pieData = [
  { name: 'Adopted', value: 60 },
  { name: 'Non-Adopted', value: 40 },
];

const COLORS = ['#00C49F', '#FF8042'];

export default function AdminPanel() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <p className="text-2xl font-semibold text-green-800">Welcome, Admin! 👑</p>

            {/* 4 Grid Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Our Users', count: 120 },
                { title: 'Adopted Pets', count: 80 },
                { title: 'Non-Adopted Pets', count: 40 },
                { title: 'Contact Actors', count: 10 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-green-100 border border-green-400 rounded-xl p-6 shadow-md text-center"
                >
                  <h3 className="text-lg font-semibold text-green-800">{item.title}</h3>
                  <p className="text-3xl font-bold my-2 text-green-700">{item.count}</p>
                  <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    Understand
                  </button>
                </div>
              ))}
            </div>

            {/* Data Visualization Area */}
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
              📄 View All Pets
            </button>
          </div>

          <div className="pt-4">
            <h3 className="font-semibold text-sm mb-1 uppercase text-gray-200">Categories</h3>
            {['dogs', 'cats', 'birds', 'rabbits'].map((category) => (
              <button
                key={category}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  selectedSection === category ? 'bg-white text-green-700 font-semibold' : 'hover:bg-green-600'
                }`}
                onClick={() => setSelectedSection(category)}
              >
                {category === 'dogs' && '🐶 Dogs'}
                {category === 'cats' && '🐱 Cats'}
                {category === 'birds' && '🐦 Birds'}
                {category === 'rabbits' && '🐰 Rabbits'}
              </button>
            ))}
          </div>
        </nav>

        <button
          onClick={() => router.push('/login')}
          className="mt-8 text-left px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-10 bg-white rounded-lg shadow-inner">
        {renderContent()}
      </main>
    </div>
  );
}
