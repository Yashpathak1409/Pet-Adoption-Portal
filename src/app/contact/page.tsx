'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-100 py-16 px-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
          Got a question or feedback? We’re here to help. Reach out and we’ll get back to you shortly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700 mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-3 rounded-md shadow-md transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {/* Response messages */}
            {responseMsg && <p className="text-green-600 mt-2">{responseMsg}</p>}
            {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
          </form>

          {/* Contact Details */}
          <div className="space-y-8 text-gray-800 text-lg">
            <div className="flex items-start gap-4">
              <MapPin className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h2 className="font-semibold text-xl">Address</h2>
                <p>GLA University<br />Mathura, UP, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h2 className="font-semibold text-xl">Email</h2>
                <p>support@petadoption.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h2 className="font-semibold text-xl">Phone</h2>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="border-t pt-6">
              <h2 className="font-semibold text-xl">Working Hours</h2>
              <p>Mon–Fri: 9 AM – 6 PM</p>
              <p>Sat–Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
