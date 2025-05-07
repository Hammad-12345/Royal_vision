import React from "react";

const Aboutus = () => {
  return (
    <>
      <div className="space-y-4 font-poppins px-8 py-4 bg-blue-950">
        <h1 className="text-4xl text-black font-bold">About us</h1>
        <div className="space-y-4 text-lg text-gray-300">
          <p>
            Royal Vision Global Partner is a premier trading firm dedicated to
            empowering individuals and institutions with the tools, technology,
            and insight needed to navigate global financial markets confidently
            and successfully. Built on a foundation of trust, transparency, and
            innovation, we strive to set a new benchmark in modern trading.
          </p>
          <p>
            At Royal Vision Global Partner, we envision a world where smart
            investing is accessible to everyone — whether you're a beginner
            stepping into the forex arena or an experienced trader managing
            complex portfolios. Our mission is to deliver cutting-edge solutions
            that combine advanced analytics, real-time data, and personalized
            strategies to help our clients achieve their financial goals.
          </p>

          <span>
            With a global presence and a deep understanding of market dynamics,
            we specialize in:
          </span>

          <ul className="list-disc px-5">
            <li>Forex and Commodities Trading</li>
            <li>PAMM Account Management</li>
            <li>Automated Profit Distribution Systems</li>
            <li>Secure, Crypto-Integrated Transactions</li>
            <li>Real-Time Portfolio Tracking and Risk Management</li>
          </ul>

          <p>
            What sets us apart is not just our technology, but our vision. A
            vision where success is mutual, growth is consistent, and
            partnerships are global. Every service we offer is designed with one
            goal in mind — to turn opportunity into prosperity. Join Royal
            Vision Global Partner today and be part of a trading ecosystem where
            your success is our priority.
          </p>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
