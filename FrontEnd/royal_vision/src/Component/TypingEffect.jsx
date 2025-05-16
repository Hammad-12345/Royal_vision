import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypingEffect = () => {
  const titles = [
    'Start Amazon Trading – Earn Daily Profits',
    'Trade Forex Globally – Profit Smarter & Faster',
    'Mineral Water Trading – Pure Profits',
    'Gold Trading – Smart & Secure Opportunities',
    'Invest in Airbnb – Earn Passive Income'
  ];

  return (
    <div className="text-white text-5xl font-semibold py-6 font-poppins w-3/4">
      <Typewriter
        words={titles}
        loop={0} // Infinite loop
        cursor
        cursorStyle="|"
        typeSpeed={60}
        deleteSpeed={40}
        delaySpeed={2000}
      />
    </div>
  );
};

export default TypingEffect;
