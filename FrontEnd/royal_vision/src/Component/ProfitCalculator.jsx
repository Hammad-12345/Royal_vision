import React, { useState } from "react";

const ProfitCalculator = () => {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [profit, setProfit] = useState(0);

  const planRates = {
    Basic: { min: 6, max: 8 },
    Standard: { min: 8, max: 10 },
    Premium: { min: 10, max: 12 },
  };

  const calculateProfit = (amount, plan) => {
    if (!plan || !amount) return 0;
    const rateRange = planRates[plan];
    const rate = Math.random() * (rateRange.max - rateRange.min) + rateRange.min;
    const duration = 8; // assuming 8 months
    const monthlyProfit = (amount * rate) / 100;
    const totalProfit = monthlyProfit * duration;
    return parseFloat(totalProfit.toFixed(2));
  };

  const handleAmountChange = (value) => {
    const num = Number(value);
    setAmount(num);
    if (plan) {
      setProfit(calculateProfit(num, plan));
    }
  };

  const handlePlanChange = (value) => {
    setPlan(value);
    if (amount) {
      setProfit(calculateProfit(amount, value));
    }
  };

  return (
    <div className="py-12 px-4 flex flex-col items-center font-poppins relative" style={{
      backgroundImage: `url(/forexlight1.jpg)`,
      //  backgroundColor: "rgba(31, 41, 55, 0.75)",
      //  backgroundBlendMode: "multiply",
       backgroundAttachment:"fixed"
    }}>
      <h2 className="text-4xl font-bold text-center text-black">
        Profit <span className="text-blue-600 font-extrabold">Calculator</span>
      </h2>
      <p className="text-center w-2/4 mt-4 ">
        You must know the calculation before investing in any plan, so you never make mistakes.
        Check the calculation and you will get as our calculator says.
      </p>

      <div className="mt-10 border rounded-md p-6 w-3/5 shadow-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <label className="  mb-1 block">Choose Plan</label>
            <select
              value={plan}
              onChange={(e) => handlePlanChange(e.target.value)}
              className="w-full px-4 py-3 rounded border font-semibold focus:outline-none"
            >
              <option value="">Select the plan</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="mb-1 block">Invest Amount</label>
            <input
              type="number"
              placeholder="0.0 $"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full px-4 py-3 rounded border font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <label className=" mb-1 block">Profit Amount</label>
          <input
            type="text"
            value={`${profit.toFixed(1)} $`}
            disabled
            className="w-full px-4 py-3 rounded border font-bold focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
