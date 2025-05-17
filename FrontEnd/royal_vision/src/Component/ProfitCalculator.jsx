import React, { useState } from "react";

const ProfitCalculator = () => {
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [profit, setProfit] = useState("");

  const planRates = {
    "Gold Trading": { min: 1.5, max: 3.5, type: "daily", duration: 30 },
    RetroDrops: { min: 0, max: 0, type: "none", duration: 0 },
    // "Amazon": { min: 13, max: 15, type: "monthly", duration: 1 },
    // "AirBnB": { min: 7.5, max: 10, type: "monthly", duration: 1 },
    // "Mineral Water": { min: 12.5, max: 20, type: "monthly", duration: 1 },
  };

  // const calculateProfit = (amount, plan) => {
  //   if (!plan || !amount) return 0;
  //   const rateRange = planRates[plan];
  //   if (rateRange.type === "none") return 0;

  //   const rate =
  //     Math.random() * (rateRange.max - rateRange.min) + rateRange.min;
  //   const profit = ((amount * rate) / 100) * rateRange.duration;
  //   return parseFloat(profit.toFixed(2));
  // };

  const handleAmountChange = (value) => {
    const num = Number(value);
    setAmount(num);

    if (!plan || !num) {
      setProfit("");
      return;
    }

    if (plan === "Gold Trading") {
      const minProfit = (num * 1.5) / 100;
      const maxProfit = (num * 3.5) / 100;
      setProfit(`${minProfit} to ${maxProfit}`);
    } else if (plan === "RetroDrops") {
      const minProfit = (num * 35) / 100;
      const maxProfit = (num * 50) / 100;
      setProfit(`${minProfit} to ${maxProfit}`);
    } else {
      setProfit("");
    }
  };

  const handlePlanChange = (value) => {
    setPlan(value);
    setProfit("");
    setAmount("");
  };

  return (
    <div
      className="py-12 px-4 flex flex-col items-center font-poppins relative"
      style={{
        backgroundImage: `url(https://overlandresources.s3.eu-north-1.amazonaws.com/forexlight1.jpg)`,
        backgroundAttachment: "fixed",
      }}
    >
      <h2 className="text-4xl font-bold text-center text-black">
        Profit <span className="text-blue-600 font-extrabold">Calculator</span>
      </h2>
      <p className="text-center lg:w-2/4 md:w-4/5 mt-4">
        You must know the calculation before investing in any plan, so you never
        make mistakes. Check the calculation and you will get as our calculator
        says.
      </p>

      <div className="mt-10 border rounded-2xl p-6 lg:w-3/5 w-full shadow-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <label className="mb-1 block">Choose Plan</label>
            <select
              value={plan}
              onChange={(e) => handlePlanChange(e.target.value)}
              className="w-full px-4 py-3 rounded border font-semibold focus:outline-none"
            >
              <option value="">Select the plan</option>
              {Object.keys(planRates).map((planName) => (
                <option key={planName} value={planName}>
                  {planName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4 relative">
            <label className="mb-1 block">Invest Amount</label>
            <input
              type="number"
              placeholder="0"
              value={amount}
              disabled={plan === ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded border font-semibold focus:outline-none"
            />
            <span className="absolute inset-y-0 right-3 top-7  flex items-center text-gray-500 font-bold">
              $
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-4 relative">
          <label className="mb-1 block">Profit Amount</label>
          <input
            type="text"
            placeholder="0"
            value={profit}
            disabled
            className="w-full px-4 py-3 rounded border font-bold focus:outline-none"
          />
           <span className="absolute inset-y-0 right-3 top-7  flex items-center text-gray-500 font-bold">
              $
            </span>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;
