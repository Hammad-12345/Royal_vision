import React from 'react';
import {
  FaBuilding,
  FaMoneyBillWave,
  FaLock,
  FaUserSecret,
  FaUsers,
  FaHeadset,
  FaServer,
  FaShieldAlt
} from 'react-icons/fa';

const benefits = [
  {
    icon: FaBuilding,
    title: 'Legal Company',
    description:
      'We are legally registered and certified to operate investment businesses safely and transparently.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Quick Withdrawal',
    description:
      'All withdrawal requests are processed instantly with a low minimum threshold.',
  },
  {
    icon: FaLock,
    title: 'High Reliability',
    description:
      'Built with top-tier security and trusted by a global user base.',
  },
  {
    icon: FaUserSecret,
    title: 'Anonymity',
    description:
      'We respect your privacy. Crypto transactions ensure your identity stays protected.',
  },
  {
    icon: FaUsers,
    title: 'Referral Program',
    description:
      'Invite and earn. Our referral system boosts your earnings effortlessly.',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description:
      'Our expert support team is available round the clock via email and Telegram.',
  },
  {
    icon: FaServer,
    title: 'Dedicated Server',
    description:
      'Optimized for speed and reliability, running on secure dedicated infrastructure.',
  },
  {
    icon: FaLock,
    title: 'SSL Secured',
    description:
      'Your data is safe with us through top-grade SSL encryption.',
  },
  {
    icon: FaShieldAlt,
    title: 'DDoS Protection',
    description:
      'We use enterprise-grade DDoS mitigation for uninterrupted service.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-black py-16 px-3 text-white font-poppins">
      <div className="px-4">
        <h2 className="text-3xl sm:text-4xl text-center mb-12">
          Why Choose <span className="text-[#1c418b] ">Royal Vision Global Partner</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:shadow-lg transition"
            >
              <div className="mb-4 text-[#1c418b]">
                <Icon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
