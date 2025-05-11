import React from "react";

const Aboutus = () => {
  return (
    <>
      <div className="space-y-8 font-poppins px-8 py-4 bg-gradient-to-r from-black via-blue-950 to-black text-gray-300">
        <h1 className="text-4xl text-blue-600 font-extrabold text-center">About Us</h1>

        {/* Company Overview */}
        <section className="space-y-2 relative">
          <h2 className="text-2xl text-white font-semibold">Company Overview</h2>
          <p>
            Overland Solutions is a premier trading firm dedicated to empowering individuals and institutions with the tools, technology, and insight needed to navigate global financial markets confidently and successfully. Built on a foundation of trust, transparency, and innovation, we strive to set a new benchmark in modern trading.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">Mission Statement</h2>
          <p>
            Our mission is to deliver cutting-edge solutions that combine advanced analytics, real-time data, and personalized strategies to help our clients achieve their financial goals in the most efficient and transparent manner.
          </p>
        </section>

        {/* Vision Statement */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">Vision Statement</h2>
          <p>
            We envision a world where smart investing is accessible to everyone — whether you're a beginner stepping into the forex arena or an experienced trader managing complex portfolios. Our vision is to build a sustainable and inclusive financial ecosystem for all.
          </p>
        </section>

        {/* Our Specialization */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">What We Specialize In</h2>
          <ul className="list-disc px-5">
            <li>Forex and Commodities Trading</li>
            <li>PAMM Account Management</li>
            <li>Automated Profit Distribution Systems</li>
            <li>Secure, Crypto-Integrated Transactions</li>
            <li>Real-Time Portfolio Tracking and Risk Management</li>
          </ul>
        </section>

        {/* Team Introduction */}
        <section className="space-y-2">
          <h2 className="text-2xl text-white font-semibold">Our Team</h2>
          <p>
            Our leadership and team members are composed of financial experts, trading technologists, and strategic advisors with years of experience in the global markets. At Overland Solutions, every team member is committed to your financial growth and success.
          </p>
        </section>

        {/* Closing Paragraph */}
        <section className="space-y-2">
          <p>
            What sets us apart is not just our technology, but our vision. A vision where success is mutual, growth is consistent, and partnerships are global. Every service we offer is designed with one goal in mind — to turn opportunity into prosperity.
          </p>
          <p>
            Join Overland Solutions today and be part of a trading ecosystem where your success is our priority.
          </p>
        </section>
      </div>
    </>
  );
};

export default Aboutus;
