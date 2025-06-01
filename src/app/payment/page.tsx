'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const petId = params.get('petId');
  const email = params.get('email');

  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState<any>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`/api/auth/petprofile/${petId}`);
        const data = await res.json();
        setPet(data);
      } catch (err) {
        console.error('Failed to fetch pet', err);
      }
    };

    if (petId) fetchPet();
  }, [petId]);

  const handlePayment = async () => {
    setLoading(true);

    // Step 1: Simulate payment (can integrate Razorpay/Stripe here)
    setTimeout(async () => {
      try {
        // Step 2: Update pet status in DB
        const res = await fetch(`/api/auth/payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ petId, email }),
        });

        const result = await res.json();

        if (res.ok) {
          router.push('/thankyou');
        } else {
          alert(result.error || 'Payment failed.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }, 2000); // Simulated 2s delay
  };

  if (!petId || !email) {
    return <div className="text-center text-red-600 mt-10">Invalid access: missing pet ID or email.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Confirm Payment</h2>

      {pet && (
        <div className="mb-6">
          <img src={pet.photoUrl} alt={pet.petName} className="w-full h-64 object-cover rounded-xl mb-4" />
          <p><strong>Pet Name:</strong> {pet.petName}</p>
          <p><strong>Type:</strong> {pet.petType}</p>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Adoption Fee:</strong> ₹500 (one-time)</p>
        </div>
      )}

      <div className="mb-4">
        <p><strong>Email:</strong> {email}</p>
        <p className="text-sm text-gray-500">This will be used for confirmation.</p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition"
      >
        {loading ? 'Processing Payment...' : 'Pay ₹500 & Confirm Adoption'}
      </button>
    </div>
  );
}
