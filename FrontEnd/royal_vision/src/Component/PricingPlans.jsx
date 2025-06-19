import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const plans = [
  {
    name: "Gold Trading",
    text: "Gold trading is the buying and selling of gold for profit through physical assets or financial instruments like ETFs, futures, and CFDs. Valued for its stability and diversification, it attracts traders aiming to benefit from market price fluctuations.",
    mininvest: "$100",
    accountType: "Daily profit: 1.5% to 3.5%",
    withdrawal: "Every 15 days",
    limitedparthner: "Limited to 100 partners for every month",
    Withdrawfee: "2%",
    image: "https://d3hwx9f38knfi9.cloudfront.net/Banner4.jpg", // gold
  },
  {
    name: "RetroDrops",
    text: "Retro Drops Trading refers to limited-time investment opportunities, often featuring reintroduced or nostalgic assets like tokens, NFTs, or bonus reward plans. It targets traders with exclusive offers tied to past trends or previous successes.",
    mininvest: "$1000",
    accountType: "Profit 35% to 50% in 180 Days",
    withdrawal: "After 6 months",
    limitedparthner: "Limited to 100 partners for 6 month",
    Withdrawfee: "2%",
    image:
      "https://d3hwx9f38knfi9.cloudfront.net/Retrodrop.jpg", // futuristic
  },
  {
    name: "Amazon",
    text: "Amazon shares investment means buying Amazon stock to benefit from its growth. Investors gain through rising share prices, making it a popular long-term investment due to Amazon's strong global presence.",
    mininvest: "$5000",
    accountType: "Monthly Profit 25% to 30% of earned profit",
    withdrawal: "Monthly",
    // limitedparthner:"Limited to 100 partners for every month",
    Withdrawfee: "0%",
    image:
      "https://d3hwx9f38knfi9.cloudfront.net/Amazon.jpg", // business
  },
  {
    name: "AirBnB",
    text: "Airbnb is an online platform where people can rent out their homes or rooms to travelers for short-term stays, offering unique and often more affordable alternatives to hotel",
    mininvest: "$5000",
    accountType: "Monthly Profit 50% of earned profit",
    withdrawal: "Monthly",
    limitedparthner: "Limited to 100 partners for every month",
    Withdrawfee: "2%",
    image:
      "https://d3hwx9f38knfi9.cloudfront.net/Airbnb.jpg", // house
  },
  {
    name: "Mineral Water",
    text: "Mineral water trading investment involves buying shares in companies that produce or sell mineral water, aiming to profit from their growth andmarket demand.",
    mininvest: "$5000",
    accountType: "Monthly profit 8.5% to 12.5% of earned profit",
    withdrawal: "Monthly",
    limitedparthner: "Limited to 100 partners for every month",
    Withdrawfee: "2%",
    image:
      "https://d3hwx9f38knfi9.cloudfront.net/Mineralwater.jpg", // water bottle
  },
];

const PricingPlans = ({ showAll = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"
  const token = useSelector((state) => state.Token.DashboardRoutes);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const visiblePlans = showAll ? plans : plans.slice(0, 3);

  return (
    <div className={` font-poppins bg-gradient-to-r ${isHomePage && "p-6"} from-black via-blue-950 to-black`}>
      
         <h2 className="text-4xl font-bold text-center text-white mb-10">
        Investment <span className="text-blue-600 font-extrabold">Plans</span>
      </h2>
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelectedPlan(plan)}
            className="cursor-pointer bg-gradient-to-br relative from-[#0F1120] to-[#1E2140] text-white rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
              <p className="min-h-32">{plan.text}</p>
            </div>
            <hr className="my-4 border-gray-600" />
            <div className="space-y-2">
              <p className="text-lg font-bold text-blue-400">
                Min Invest: {plan.mininvest}
              </p>
              <div className="flex flex-col space-y-6">
                <span className="inline-block sm:px-3 px-5 py-1 self-start bg-blue-900 rounded-full text-blue-300">
                  {plan.accountType}
                </span>
                <button className="self-start bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold transition">
                  view more
                </button>
              </div>
            </div>

            {/* <p className="text-lg font-bold text-blue-400 mb-3">
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
                <span className="font-medium">Withdrawal Fee:</span>{" "}
                {plan.Withdrawfee}
              </p>
              <p>
                <span className="font-medium">Max Sim Drawdown:</span>{" "}
                {plan.drawdown}
              </p>
              <p>
                <span className="font-medium">Analyst Performance Fee:</span>{" "}
                {plan.fee}
              </p>
            </div> */}
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
      
      {selectedPlan && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 sm:px-6 flex items-center justify-center sm:items-center sm:justify-center bg-opacity-60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-full sm:max-w-3xl sm:mx-auto sm:my-12 p-6 py-12 bg-cover bg-center bg-no-repeat text-white sm:bg-blend-overlay sm:bg-opacity-90  rounded-t-3xl sm:rounded-3xl"
        style={{
          backgroundImage: `url(${selectedPlan.image})`,
          backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedPlan(null)}
          className="absolute top-10 sm:top-4 right-4 size-12 bg-blue-600 font-semibold rounded-full text-white flex justify-center items-center hover:bg-blue-500 transition-colors duration-300 font-poppins"
        >
          ✕
        </button>

        {/* Content */}
        <div className="rounded-2xl p-2 pt-12">
          <h3 className="text-3xl font-bold mb-2">{selectedPlan.name}</h3>
          <p className="text-blue-400 font-semibold text-lg mb-4">
            Min Invest: {selectedPlan.mininvest}
          </p>

          {selectedPlan.text && (
            <p className="text-lg text-gray-300 mb-6">
              {selectedPlan.text}
            </p>
          )}

          <div className="space-y-3 text-base text-gray-300">
            <p>
              <span className="font-semibold text-white">Account Type:</span>{" "}
              {selectedPlan.accountType}
            </p>
            <p>
              <span className="font-semibold text-white">Withdrawal:</span>{" "}
              {selectedPlan.withdrawal}
            </p>
            {selectedPlan.limitedparthner && (
              <p>
                <span className="font-semibold text-white">Limited Partners:</span>{" "}
                {selectedPlan.limitedparthner}
              </p>
            )}
            {selectedPlan.Withdrawfee && (
              <p>
                <span className="font-semibold text-white">Withdraw Fee:</span>{" "}
                {selectedPlan.Withdrawfee}
              </p>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link to={token ? `/Deposit/${selectedPlan.name}` : "/signin"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-lg transition">
              Deposit Now
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}


    </div>
  );
};

export default PricingPlans;
