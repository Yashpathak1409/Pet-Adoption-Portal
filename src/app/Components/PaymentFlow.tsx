'use client';

import { useState } from 'react';

type BookingData = {
  fullName: string;
  email: string;
  phone: string;
  // ... other booking form fields
};

type Pet = {
  id: string;
  name: string;
  imageUrl: string;
  // ... other pet details
};

type PaymentFlowProps = {
  pet: Pet;
  onAdoptionSuccess: () => void; // callback when adoption is successful
};

export default function PaymentFlow({ pet, onAdoptionSuccess }: PaymentFlowProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulated form component (replace with your actual form)
  function BookingForm({ onSubmit }: { onSubmit: (data: BookingData) => void }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!fullName || !email || !phone) {
        alert('Please fill all fields');
        return;
      }
      onSubmit({ fullName, email, phone });
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Book {pet.name}</h2>
        <img src={pet.imageUrl} alt={pet.name} className="mb-4 w-full rounded" />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </form>
    );
  }

  // Simulated payment UI
  function PaymentUI({ onSuccess }: { onSuccess: () => void }) {
    const [processing, setProcessing] = useState(false);

    async function handlePay() {
      setProcessing(true);
      try {
        // Simulate payment delay
        await new Promise((r) => setTimeout(r, 1500));
        onSuccess();
      } catch {
        setProcessing(false);
        setError('Payment failed. Please try again.');
      }
    }

    return (
      <div className="max-w-md mx-auto p-4 border rounded text-center">
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <p>Pay the adoption fee to confirm your booking.</p>
        <button
          onClick={handlePay}
          disabled={processing}
          className={`mt-4 px-4 py-2 rounded text-white ${
            processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    );
  }

  async function handlePaymentSuccess() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/adopt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petId: pet.id,
          bookingData,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to complete adoption');
      }

      setStep('success');
      onAdoptionSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      {step === 'form' && <BookingForm onSubmit={(data) => { setBookingData(data); setStep('payment'); }} />}

      {step === 'payment' && (
        <>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <PaymentUI onSuccess={handlePaymentSuccess} />
          {loading && <p className="text-center mt-2">Completing adoption...</p>}
        </>
      )}

      {step === 'success' && (
        <div className="max-w-md mx-auto p-4 border rounded text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Adoption Successful!</h2>
          <p>Thank you for adopting {pet.name}. We will contact you soon!</p>
        </div>
      )}
    </div>
  );
}
