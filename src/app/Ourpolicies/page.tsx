// app/policies/page.tsx or src/pages/policies.tsx
import React from 'react';

const policySections = [
  {
    title: '1. Privacy Policy',
    content: 'We respect your privacy. Personal data you provide (like name, contact info, preferences) is kept confidential and used solely for service-related purposes. We never sell or share your data without consent.'
  },
  {
    title: '2. Data Collection & Usage',
    content: (
      <>
        <ul className="list-disc pl-5 mb-2">
          <li>Basic user info (name, email)</li>
          <li>Usage logs for performance improvement</li>
          <li>Cookies for personalization (with consent)</li>
        </ul>
        <p>You can request data deletion at any time.</p>
      </>
    )
  },
  {
    title: '3. Security Policy',
    content: 'We use secure encryption and firewalls. Data access is restricted to authorized personnel, and we conduct regular security audits to meet industry standards.'
  },
  {
    title: '4. User Conduct Policy',
    content: (
      <>
        <ul className="list-disc pl-5 mb-2">
          <li>Provide accurate information</li>
          <li>No abusive or inappropriate behavior</li>
          <li>Do not misuse platform features</li>
        </ul>
        <p>Violation may result in suspension or termination of access.</p>
      </>
    )
  },
  {
    title: '5. Refund/Cancellation Policy',
    content: 'Refund or cancellation requests must be made within 7 working days of transaction. Refunds are processed through the original payment method within 10 business days.'
  },
  {
    title: '6. Pet Adoption Policy',
    content: (
      <ul className="list-disc pl-5">
        <li>All adoptions require eligibility verification</li>
        <li>Adopters must ensure safe, loving homes</li>
        <li>We may reject applications without explanation</li>
      </ul>
    )
  },
  {
    title: '7. Terms of Modification',
    content: 'We may revise policies anytime. All changes will be posted here and take immediate effect. Continued use implies acceptance.'
  },
  {
    title: '8. Contact Us',
    content: (
      <p>
        For questions or concerns, reach out to us at:
        <br />
        📧 <a href="mailto:yashpathakcs149@gmail.com" className="text-blue-600 underline">yashpathakcs149@gmail.com</a><br />
        📞 +91-9720271675
      </p>
    )
  }
];

const PoliciesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-blue-800 drop-shadow-md">
        Our Policies
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {policySections.map((section, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-xl font-bold mb-3 text-blue-700">{section.title}</h2>
            <div className="text-gray-700 text-sm leading-relaxed">{section.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesPage;
