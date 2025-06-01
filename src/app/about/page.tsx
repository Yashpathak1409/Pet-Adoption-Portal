import { PawPrint, Heart, Smile, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-indigo-700">About Us</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          We are dedicated to helping animals find loving homes and spreading awareness about the joy, comfort, and companionship pets bring to our lives.
        </p>
      </div>

      {/* Section: Why People Need Pets */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Why People Need Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <InfoCard
            icon={<Heart className="text-pink-600 w-8 h-8" />}
            title="Emotional Support"
            description="Pets offer unconditional love, helping reduce stress, anxiety, and loneliness."
          />
          <InfoCard
            icon={<Smile className="text-yellow-500 w-8 h-8" />}
            title="Happiness Booster"
            description="Their playful nature and affection bring immense joy to everyday life."
          />
          <InfoCard
            icon={<ShieldCheck className="text-green-600 w-8 h-8" />}
            title="Security & Companionship"
            description="Pets, especially dogs, offer a sense of safety and are loyal companions."
          />
        </div>
      </section>

      {/* Section: Benefits of Having a Pet */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Benefits of Having a Pet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <InfoCard
            icon={<Users className="text-purple-600 w-8 h-8" />}
            title="Builds Social Connections"
            description="Walking your pet or attending vet visits can help you connect with fellow pet lovers."
          />
          <InfoCard
            icon={<PawPrint className="text-blue-600 w-8 h-8" />}
            title="Routine & Responsibility"
            description="Caring for a pet builds discipline and gives purpose to your daily routine."
          />
          <InfoCard
            icon={<Smile className="text-orange-600 w-8 h-8" />}
            title="Great for Kids"
            description="Pets teach empathy, responsibility, and provide emotional comfort to children."
          />
        </div>
      </section>

      {/* Section: Why Prefer Buying or Adopting Pets */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-8">Why Adopt or Buy Pets?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-400">
            <h3 className="text-2xl font-bold mb-3 text-green-700">Adoption Saves Lives</h3>
            <p className="text-gray-600">
              By adopting a pet, you are not just gaining a friend—you’re saving a life. Many shelter animals await loving homes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-400">
            <h3 className="text-2xl font-bold mb-3 text-blue-700">Choose Your Companion</h3>
            <p className="text-gray-600">
              When you buy or adopt, you choose a companion that fits your lifestyle—playful, calm, small, or large.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
            <h3 className="text-2xl font-bold mb-3 text-yellow-700">Health Benefits</h3>
            <p className="text-gray-600">
              Studies show pets lower blood pressure, improve heart health, and encourage physical activity.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-400">
            <h3 className="text-2xl font-bold mb-3 text-red-700">Make a Difference</h3>
            <p className="text-gray-600">
              Every pet you bring home reduces the population in shelters and increases awareness in your community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
