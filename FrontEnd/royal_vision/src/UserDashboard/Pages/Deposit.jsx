import React, { useState } from "react";
import { useForm } from "react-hook-form";

const plans = [
  { name: "Gold Trading", mininvest: "$100" },
  { name: "RetroDrops", mininvest: "$1000" },
  { name: "Amazon", mininvest: "$5000" },
  { name: "AirBnB", mininvest: "$2000" },
  { name: "Mineral Water", mininvest: "$5000" },
];

const paymentMethods = ["PayPal", "Crypto", "Bank Transfer"];

const Deposit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const onSubmit = (data) => {
    console.log("Deposit Data:", data);
    alert(`Deposit submitted for ${data.plan} with amount $${data.amount} using ${data.paymentMethod}`);
    reset();
  };

  const handlePlanChange = (e) => {
    const plan = plans.find((p) => p.name === e.target.value);
    setSelectedPlan(plan);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Deposit Funds
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Plan Selection */}
        <div>
          <label className="block text-white font-medium mb-2">
            Select Investment Plan
          </label>
          <select
            {...register("plan", { required: "Plan is required" })}
            onChange={handlePlanChange}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
             <option value="" className="text-black">Select plans</option>
            {plans.map((plan) => (
              <option key={plan.name} value={plan.name} className="text-black">
                {plan.name}
              </option>
            ))}
          </select>
          {errors.plan && (
            <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>
          )}
        </div>

        {/* Minimum Investment Display */}
        <div className="block text-white text-sm">
          Minimum Investment:{" "}
          <span className="font-semibold text-white ">
            {selectedPlan.mininvest}
          </span>
        </div>

        {/* Deposit Amount */}
        <div>
          <label className="block text-white font-medium mb-2">
            Deposit Amount ($)
          </label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: parseInt(selectedPlan.mininvest.replace("$", "")),
                message: `Minimum is ${selectedPlan.mininvest}`,
              },
            })}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500"
            placeholder={`Minimum ${selectedPlan.mininvest}`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-white font-medium mb-2">
            Payment Method
          </label>
          <select
            {...register("paymentMethod", { required: "Payment method is required" })}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-black">Select payment method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method} className="text-black">
                {method}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-300"
          >
            Submit Deposit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
