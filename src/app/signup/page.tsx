'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // default role
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      setIsSuccess(false);
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message || 'User registered successfully!');
      setIsSuccess(true);
      setForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setMessage(data.error || 'Something went wrong!');
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white p-6">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 relative">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-green-700 tracking-wide drop-shadow-md">
          Create Account
        </h1>

        {message && (
          <p
            className={`mb-6 text-center font-medium ${
              isSuccess ? 'text-green-700' : 'text-red-600'
            } bg-green-50 px-4 py-2 rounded-md shadow-sm`}
            role="alert"
          >
            {message}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-600 text-gray-700 font-medium placeholder-gray-400 transition"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-600 text-gray-700 font-medium placeholder-gray-400 transition"
            required
          />

          {/* Role Selector */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-600 text-gray-700 font-medium transition"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-600 text-gray-700 font-medium placeholder-gray-400 transition"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-3 text-green-600 hover:text-green-800 font-semibold transition"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="relative">
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 focus:border-green-600 text-gray-700 font-medium placeholder-gray-400 transition"
              required
            />
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              className="absolute right-4 top-3 text-green-600 hover:text-green-800 font-semibold transition"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-green-300/50 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
