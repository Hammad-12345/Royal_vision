import React from "react";
import { useForm } from "react-hook-form";

const paymentMethods = ["PayPal", "Crypto", "Bank Transfer"];

const Withdraw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Withdraw Request:", data);
    alert(`Withdrawal request of $${data.amount} submitted via ${data.paymentMethod}`);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Withdraw Funds
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-white font-medium mb-2">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-white font-medium mb-2">Withdrawal Amount ($)</label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 10, message: "Minimum withdrawal is $10" },
            })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-white font-medium mb-2">Payment Method</label>
          <select
            {...register("paymentMethod", { required: "Please select a payment method" })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-black">Select method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method} className="text-black">
                {method}
              </option>
            ))}
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
          )}
        </div>

        {/* Wallet or Bank Info */}
        <div>
          <label className="block text-white font-medium mb-2">
            Wallet Address / Bank Details
          </label>
          <textarea
            {...register("accountDetails", { required: "Please enter your wallet or bank info" })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="e.g. USDT wallet address or Bank account number"
          />
          {errors.accountDetails && (
            <p className="text-red-500 text-sm mt-1">{errors.accountDetails.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-300"
        >
          Submit Withdrawal
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
