'use client';

import { useState } from 'react';

export default function AddPetForm() {
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    gender: '',
    color: '',
    size: '',
    weight: '',
    vaccinated: false,
    vaccinationDate: '',
    healthInfo: '',
    foodPreference: '',
    temperament: '',
    photoUrl: '',
    availableForAdoption: false,
    dateOfEntry: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    let val: string | boolean = value;

    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/petprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Pet added successfully!');
        setFormData({
          petName: '',
          petType: '',
          breed: '',
          age: '',
          gender: '',
          color: '',
          size: '',
          weight: '',
          vaccinated: false,
          vaccinationDate: '',
          healthInfo: '',
          foodPreference: '',
          temperament: '',
          photoUrl: '',
          availableForAdoption: false,
          dateOfEntry: new Date().toISOString().split('T')[0],
        });
      } else {
        const errorData = await response.json();
        alert('Failed to add pet: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      alert('An unexpected error occurred.');
    }
  };

  const inputClasses =
    'w-full p-3 rounded-lg border border-gray-400 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500';

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🐾 Add New Pet</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="petName"
          onChange={handleChange}
          value={formData.petName}
          placeholder="Pet Name"
          className={inputClasses}
          required
        />
        <select
          name="petType"
          onChange={handleChange}
          value={formData.petType}
          className={inputClasses}
          required
        >
          <option value="">Select Pet Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
        </select>
        <input
          name="breed"
          onChange={handleChange}
          value={formData.breed}
          placeholder="Breed"
          className={inputClasses}
          required
        />
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={formData.age}
          placeholder="Age (in years)"
          className={inputClasses}
          required
        />
        <select
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          className={inputClasses}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          name="color"
          onChange={handleChange}
          value={formData.color}
          placeholder="Color"
          className={inputClasses}
        />
        <select
          name="size"
          onChange={handleChange}
          value={formData.size}
          className={inputClasses}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={formData.weight}
          placeholder="Weight (kg)"
          className={inputClasses}
        />
        <input
          type="date"
          name="vaccinationDate"
          onChange={handleChange}
          value={formData.vaccinationDate}
          className={inputClasses}
        />
        <input
          name="photoUrl"
          onChange={handleChange}
          value={formData.photoUrl}
          placeholder="Photo URL"
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <textarea
          name="healthInfo"
          onChange={handleChange}
          value={formData.healthInfo}
          placeholder="Health Information"
          className={inputClasses}
        />
        <textarea
          name="foodPreference"
          onChange={handleChange}
          value={formData.foodPreference}
          placeholder="Food Preferences"
          className={inputClasses}
        />
        <textarea
          name="temperament"
          onChange={handleChange}
          value={formData.temperament}
          placeholder="Temperament"
          className={inputClasses}
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center space-x-2 text-black font-medium">
          <input
            type="checkbox"
            name="vaccinated"
            onChange={handleChange}
            checked={formData.vaccinated}
          />
          <span>Vaccinated</span>
        </label>
        <label className="flex items-center space-x-2 text-black font-medium">
          <input
            type="checkbox"
            name="availableForAdoption"
            onChange={handleChange}
            checked={formData.availableForAdoption}
          />
          <span>Available for Adoption</span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        ➕ Add Pet
      </button>
    </form>
  );
}
