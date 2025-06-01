'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Pet Adoption</div>
        <div className="space-x-4">
          <Link href="/Ourpolicies" className="hover:underline">Our policies</Link>
          <Link href="/homepage" className="hover:underline">Home</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/signup" className="hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
}
