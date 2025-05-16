import React from "react";
import {
  FaBuilding,
  FaMoneyBillWave,
  FaLock,
  FaUserSecret,
  FaUsers,
  FaHeadset,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaBuilding,
    title: "Legal Company",
    description:
      "We are legally registered and certified to operate investment businesses safely and transparently.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Quick Withdrawal",
    description:
      "All withdrawal requests are processed instantly with a low minimum threshold.",
  },
  {
    icon: FaLock,
    title: "High Reliability",
    description:
      "Built with top-tier security and trusted by a global user base.",
  },
  {
    icon: FaUserSecret,
    title: "Anonymity",
    description:
      "We respect your privacy. Crypto transactions ensure your identity stays protected.",
  },
  {
    icon: FaUsers,
    title: "Referral Program",
    description:
      "Invite and earn. Our referral system boosts your earnings effortlessly.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description:
      "Our expert support team is available round the clock via email and Telegram.",
  },
  {
    icon: FaServer,
    title: "Dedicated Server",
    description:
      "Optimized for speed and reliability, running on secure dedicated infrastructure.",
  },
  {
    icon: FaLock,
    title: "SSL Secured",
    description: "Your data is safe with us through top-grade SSL encryption.",
  },
  {
    icon: FaShieldAlt,
    title: "DDoS Protection",
    description:
      "We use enterprise-grade DDoS mitigation for uninterrupted service.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="bg-cover bg-no-repeat py-16 px-3 text-blue-600 font-poppins"
      style={{
        backgroundImage: `url(/Royaltrading1.jpg)`,
        backgroundColor: "rgba(31, 41, 55, 0.75)",
        backgroundBlendMode: "multiply",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="px-3 space-y-8">
        <div className="space-y-4 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center text-white">
          Why Choose <span className="text-blue-600 font-extrabold">Overland Solutions</span>
        </h2>
        <p className="lg:w-2/4 md:w-4/5 text-center text-white">
          Our goal is to provide our investors with a reliable source of high
          income, while minimizing any possible risks and offering a
          high-quality service.
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {benefits.map(({ icon: Icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br relative from-[#0F1120] to-[#1E2140] rounded-2xl border border-gray-800 p-6 hover:shadow-lg transition"
            >
              <div className="mb-4 text-blue-600">
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
