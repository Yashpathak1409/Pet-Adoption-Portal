'use client';

import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPopup(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-5xl font-bold text-green-700 mb-6 animate-bounce">Thank You!</h1>
      <p className="text-lg text-gray-800 text-center max-w-md">
       <h1> We appreciate your interest in adopting a pet. We will get in touch with you soon. 💚 </h1>
      </p>

      {showPopup && (
        <div className="absolute inset-0 pointer-events-none animate-fade-in">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="balloon"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: randomColor(),
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .balloon {
          position: absolute;
          bottom: -100px;
          width: 30px;
          height: 40px;
          border-radius: 50% 50% 50% 50%;
          opacity: 0.8;
          animation: floatUp 6s ease-in-out infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function randomColor() {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8E00', '#C084FC'];
  return colors[Math.floor(Math.random() * colors.length)];
}
