import React from 'react';
import { FaUser, FaSyncAlt, FaWallet } from 'react-icons/fa';

const HowitsWorks = () => {
  return (
    <div className="bg-gradient-to-r from-black via-blue-950 to-black py-16 px-4 text-white text-center font-poppins ">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        How <span className='text-blue-600 font-extrabold'>Overland Solutions </span> Works
      </h2>
      <p className="max-w-2xl mx-auto text-gray-300 mb-12">
        Get involved in our tremendous platform and invest. We will utilize your money and give you profit in your wallet automatically.
      </p>

     
        {/* Steps */}
        <div className="grid grid-cols-3 justify-center items-center gap-12 relative z-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative">
            <div className="relative z-10 bg-blue-950 flex justify-center flex-col items-center rounded-full p-6 border-2 border-blue-900 w-32 h-32 shadow-lg">
              <FaUser className="text-4xl text-blue-600" />
              <div className="absolute -top-3 -right-3 bg-blue-950 text-white text-xs font-bold rounded-full px-2 py-1">01</div>
            </div>
            <p className="mt-4 text-2xl font-medium text-white">Create Account</p>
            <div className='border border-dotted absolute w-5/12 top-1/3 right-[-24px]'></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center relative ">
            <div className="relative z-10 bg-blue-950 flex justify-center flex-col items-center rounded-full p-6 border-2 border-blue-900 w-32 h-32 shadow-lg">
              <FaSyncAlt className="text-4xl text-blue-600" />
              <div className="absolute -top-3 -right-3 bg-blue-950 text-white text-xs font-bold rounded-full px-2 py-1">02</div>
            </div>
            <p className="mt-4 text-2xl font-medium text-white">Invest in plan</p>
            <div className='border border-dotted absolute w-5/12 top-1/3 left-[-24px] z-0'></div>
            <div className='border border-dotted absolute w-5/12 top-1/3 right-[-24px] z-0'></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center relative">
            <div className="relative z-10 bg-blue-950 flex justify-center flex-col items-center rounded-full p-6 border-2 border-blue-900 w-32 h-32 shadow-lg">
              <FaWallet className="text-4xl text-blue-600" />
              <div className="absolute -top-3 -right-3 bg-blue-950 text-white text-xs font-bold rounded-full px-2 py-1">03</div>
            </div>
            <p className="mt-4 text-2xl font-medium text-white">Get Profit</p>
            <div className='border border-dotted absolute w-5/12 top-1/3 left-[-24px] z-0'></div>
          
          </div>
        </div>
    </div>
  );
};

export default HowitsWorks;
