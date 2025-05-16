import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const TypingEffect = () => {
  return (
    <div className="absolute w-full top-1/3 text-white text-3xl sm:text-5xl font-semibold py-6 font-poppins md:w-3/4 px-4">
      <Typewriter
        words={['Start Trading Online – Build Wealth with Smart, Global Investments']}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={60}
        deleteSpeed={40}
        delaySpeed={3000}
      />
      
      {/* Button */}
      <div className="mt-6">
        <Link to={"/signin"} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default TypingEffect;
