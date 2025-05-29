'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message || 'Login successful!');
      setIsSuccess(true);
      setForm({ email: '', password: '' });

      // Redirect to homepage after a short delay
      setTimeout(() => {
        router.push('/homepage');
      }, 1500);
    } else {
      setMessage(data.error || 'Invalid credentials');
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-50 to-white p-6">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-10 relative">
        <h1 className="text-3xl font-semibold mb-6 text-center text-green-600">Login</h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              isSuccess ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 transition placeholder-gray-600"
            required
          />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-400 transition placeholder-gray-600"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 text-sm text-green-600 hover:text-green-800 select-none"
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
