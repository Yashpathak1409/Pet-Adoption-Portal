// app/policies/page.tsx or src/pages/policies.tsx (depending on your project structure)
import React from 'react';

const PoliciesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Our Policies</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">1. Privacy Policy</h2>
        <p>
          We respect your privacy. Personal data you provide (like name, contact info, preferences)
          is kept confidential and used solely for service-related purposes. We never sell or share
          your data without consent.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">2. Data Collection & Usage</h2>
        <ul className="list-disc pl-6">
          <li>Basic user info (name, email)</li>
          <li>Usage logs for performance improvement</li>
          <li>Cookies for personalization (with consent)</li>
        </ul>
        <p>You can request data deletion at any time.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">3. Security Policy</h2>
        <p>
          We use secure encryption and firewalls. Data access is restricted to authorized personnel,
          and we conduct regular security audits to meet industry standards.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">4. User Conduct Policy</h2>
        <ul className="list-disc pl-6">
          <li>Provide accurate information</li>
          <li>No abusive or inappropriate behavior</li>
          <li>Do not misuse platform features</li>
        </ul>
        <p>Violation may result in suspension or termination of access.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">5. Refund/Cancellation Policy</h2>
        <p>
          Refund or cancellation requests must be made within 7 working days of transaction.
          Refunds are processed through the original payment method within 10 business days.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">6. Pet Adoption Policy</h2>
        <ul className="list-disc pl-6">
          <li>All adoptions require eligibility verification</li>
          <li>Adopters must ensure safe, loving homes</li>
          <li>We may reject applications without explanation</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">7. Terms of Modification</h2>
        <p>
          We may revise policies anytime. All changes will be posted here and take immediate
          effect. Continued use implies acceptance.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          For questions or concerns, reach out to us at:
          <br />
          📧 <a href="mailto:pathakadoptpetsupport@gmail.com" className="text-blue-600 underline">yashpathakcs149@gmail.com</a>
          <br />
          📞 +91-9720271675
        </p>
      </section>
    </div>
  );
};

export default PoliciesPage;
