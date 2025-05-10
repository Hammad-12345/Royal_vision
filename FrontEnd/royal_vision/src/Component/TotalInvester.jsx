import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaDollarSign } from 'react-icons/fa';

const TotalInvester = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 5000); // Re-trigger animation every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-black via-blue-950 to-black py-16 text-white font-poppins">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          
          {/* Left Side: Title and Description */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold">Our <span className='text-blue-600 font-extrabold'>Achievements </span></h2>
            <p className="text-lg mt-4 text-gray-300">
              Trusted globally by investors and delivering measurable results with transparency and impact.
            </p>
          </div>

          {/* Right Side: Counters */}
          <div className="md:w-1/2  flex justify-end  gap-10">
            {/* Total Investors */}
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end items-center text-yellow-400 mb-2">
                <FaUsers size={40} />
              </div>
              <h3 className="text-4xl font-bold">
                <CountUp key={key} end={23874} duration={4} separator="," />+
              </h3>
              <p className="text-lg text-gray-300">Total Investors</p>
            </div>

            {/* Total Earnings */}
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end items-center text-green-400 mb-2">
                <FaDollarSign size={40} />
              </div>
              <h3 className="text-4xl font-bold">
                $<CountUp key={key + 1} end={1200000} duration={4} separator="," />+
              </h3>
              <p className="text-lg text-gray-300">Total Company Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalInvester;
