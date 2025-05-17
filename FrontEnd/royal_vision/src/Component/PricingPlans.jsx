import React, { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gold Trading",
    mininvest: "$100",
    accountType: "Daily profit: 1.5% to 3.5%",
    withdrawal: "Every 15 days",
    limitedparthner:"Limited to 100 partners for every month",
    drawdown: "N/A",
    Withdrawfee: "2%",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80", // gold
  },
  {
    name: "RetroDrops",
    mininvest: "$1000",
    accountType: "Profit 35% to 50% in 180 Days",
    withdrawal: "After 6 months",
    limitedparthner:"Limited to 100 partners for 6 month",
    drawdown: "N/A",
    Withdrawfee: "2%",
    image: "https://images.unsplash.com/photo-1581090700227-1e8e4c03f8f3?auto=format&fit=crop&w=800&q=80", // futuristic
  },
  {
    name: "Amazon",
    mininvest: "$5000",
    accountType: "Monthly Profit 13% to 15% of earned profit",
    withdrawal: "Monthly",
    // limitedparthner:"Limited to 100 partners for every month",
    drawdown: "N/A",
    Withdrawfee: "0%",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92c30?auto=format&fit=crop&w=800&q=80", // business
  },
  {
    name: "AirBnB",
    mininvest: "$2000",
    accountType: "Monthly Profit 7.5% to 10% of earned profit",
    withdrawal: "Monthly",
    limitedparthner:"Limited to 100 partners for every month",
    drawdown: "N/A",
    Withdrawfee: "2%",
    image: "https://images.unsplash.com/photo-1560067174-8949f61b69a5?auto=format&fit=crop&w=800&q=80", // house
  },
  {
    name: "Mineral Water (Coming Soon)",
    mininvest: "$5000",
    accountType: "Monthly profit 8.5% to 12.5% of earned profit",
    withdrawal: "Monthly",
    limitedparthner:"Limited to 100 partners for every month",
    drawdown: "N/A",
    Withdrawfee: "2%",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80", // water bottle
  },
];


const PricingPlans = ({ showAll = false }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const visiblePlans = showAll ? plans : plans.slice(0, 3);

  return (
    <div className="p-6 font-poppins bg-gradient-to-r from-black via-blue-950 to-black">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Investment <span className="text-blue-600 font-extrabold">Plans Overview</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelectedPlan(plan)}
            className="bg-gradient-to-br relative from-[#0F1120] to-[#1E2140] text-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-lg font-bold text-blue-400 mb-3">
              Min Invest: {plan.mininvest}
            </p>
            <p className="flex flex-col space-y-2 text-sm font-medium mb-2">
              <span className="inline-block px-3 py-1 self-start bg-blue-900 rounded-full text-blue-300">
                {plan.accountType}
              </span>
              <span className="inline-block px-1 py-1 text-white">
                {plan.limitedparthner}
              </span>
            </p>
            <hr className="my-4 border-gray-600" />
            <div className="space-y-6 text-sm text-gray-300">
              <p>
                <span className="font-medium">Withdrawal Fee:</span> {plan.Withdrawfee}
              </p>
              <p>
                <span className="font-medium">Max Sim Drawdown:</span> {plan.drawdown}
              </p>
              <p>
                <span className="font-medium">Analyst Performance Fee:</span> {plan.fee}
              </p>
            </div>
            {/* <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition">
                Buy Preset
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="text-center mt-8 relative">
          <Link
            to="/plans"
            className="bg-blue-600 font-semibold rounded-full text-white px-6 py-2 hover:bg-blue-500 transition-colors duration-300 backdrop-blur-sm"
          >
            View All Plans
          </Link>
        </div>
      )}

      {/* Modal */}
      {/* {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl p-6 py-12 bg-gradient-to-br from-[#0F1120] to-[#1E2140] text-white rounded-3xl shadow-2xl">
            <button
              onClick={()=>setSelectedPlan(null)}
              className="absolute top-4 right-4 size-12  bg-blue-600 font-semibold rounded-full text-white flex justify-center  items-center  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
            
            >
              ✕
            </button>
            <img
              src={selectedPlan.image}
              alt={selectedPlan.name}
              className="w-full h-96 object-cover rounded-xl mb-4 mt-8"
            />
            <div className="space-y-4 absolute bottom-40 px-4">
            <h3 className="text-2xl font-bold">{selectedPlan.name}</h3>
            <p className="text-blue-400 font-semibold text-lg">
              Min Invest: {selectedPlan.mininvest}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p className="text-lg"><span className="font-semibold ">Account Type:</span> {selectedPlan.accountType}</p>
              <p className="text-lg"><span className="font-semibold">Withdrawal:</span> {selectedPlan.withdrawal}</p>
              <p className="text-lg"><span className="font-semibold">Drawdown:</span> {selectedPlan.drawdown}</p>
              <p className="text-lg"><span className="font-semibold">Fee:</span> {selectedPlan.fee}</p>
            </div>
            
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition">
              Buy Preset
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PricingPlans;
