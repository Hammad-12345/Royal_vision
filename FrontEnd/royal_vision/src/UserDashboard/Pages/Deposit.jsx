import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
const plans = [
  { name: "Gold Trading", mininvest: "$100" },
  { name: "RetroDrops", mininvest: "$1000" },
  { name: "Amazon", mininvest: "$5000" },
  { name: "AirBnB", mininvest: "$2000" },
  { name: "Mineral Water", mininvest: "$5000" },
];

const paymentMethods = [
  { name: "Tron (TRC20)", address: "TRgtXC27Nm8td1DNySmK5Ynh1Gvp8CY8AP" },
  {
    name: "BNB Smart Chain (BEP20)",
    address: "0x01d5220ed693ddbea45918033eb7ac53c9008bb9",
  },
  { name: "Binance ID", address: "199783750" },
];

const Deposit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [screenshot, setScreenshot] = useState(null);

  const onSubmit = (data) => {
    console.log("Deposit Submitted:", data);
    setSubmittedData(data);
    setShowPaymentDetails(true);
  };

  const handlePlanChange = (e) => {
    const plan = plans.find((p) => p.name === e.target.value);
    setSelectedPlan(plan);
  };

  const handleSecondFormSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Confirmation Submitted:", {
      paymentMethod: submittedData.paymentMethod,
      address: selectedPayment?.address,
      screenshot,
    });
    alert("Payment proof submitted successfully!");
    setShowPaymentDetails(false);
    reset();
  };

  const selectedPayment = paymentMethods.find(
    (method) => method.name === submittedData?.paymentMethod
  );

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md text-white">
      {!showPaymentDetails ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Plan Selection */}{" "}
          <h2 className="text-3xl font-semibold text-center mb-6">
            Deposit Funds
          </h2>
          <div>
            <label className="block font-medium mb-2">
              Select Investment Plan
            </label>
            <select
              {...register("plan", { required: "Plan is required" })}
              onChange={handlePlanChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select plan
              </option>
              {plans.map((plan) => (
                <option
                  key={plan.name}
                  value={plan.name}
                  className="text-black"
                >
                  {plan.name}
                </option>
              ))}
            </select>
            {errors.plan && (
              <p className="text-red-500 text-sm">{errors.plan.message}</p>
            )}
          </div>
          {/* Minimum Investment Info */}
          <p>
            Minimum Investment: <strong>{selectedPlan.mininvest}</strong>
          </p>
          {/* Amount */}
          <div>
            <label className="block font-medium mb-2">Deposit Amount ($)</label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: parseInt(selectedPlan.mininvest.replace("$", "")),
                  message: `Minimum is ${selectedPlan.mininvest}`,
                },
              })}
              className="w-full px-4 py-2 bg-transparent border rounded-md text-white"
              placeholder={`Min ${selectedPlan.mininvest}`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          {/* Payment Method */}
          <div>
            <label className="block font-medium mb-2">Payment Method</label>
            <select
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
              className="w-full px-4 py-2 bg-transparent border rounded-md"
            >
              <option value="" disabled>
                Select method
              </option>
              {paymentMethods.map((method) => (
                <option
                  key={method.name}
                  value={method.name}
                  className="text-black"
                >
                  {method.name}
                </option>
              ))}
            </select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Submit Deposit
          </button>
        </form>
      ) : (
        // Payment Confirmation Form
        <form
          onSubmit={handleSecondFormSubmit}
          className="flex flex-col items-center space-y-4  rounded-lg"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Deposit USDT
          </h2>

          {/* QR Code */}
          <div className="bg-white p-2 rounded">
            <img
              src="https://overlandresources.s3.eu-north-1.amazonaws.com/qr+code.png"
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Network */}
          <div className="w-full">
            <label className="text-gray-400 text-sm">Network</label>
            <div className="flex items-center justify-between border border-gray-600 bg-transparent px-3 py-2 rounded mt-1 text-white">
              <span>{submittedData.paymentMethod}</span>
            </div>
          </div>

          {/* Deposit Address */}
          <div className="w-full">
            <label className="text-gray-400 text-sm">Deposit Address</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={selectedPayment?.address || ""}
                className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedPayment?.address || "");
                  toast.success("Address copied to clipboard");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400"
                title="Copy"
              >
                <FaRegCopy />
              </button>
            </div>
          </div>

          {/* Upload Screenshot */}
          <div className="w-full">
            <label className="text-gray-400 text-sm">Upload Screenshot</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="w-full text-white mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Save and Share Address
          </button>
        </form>
      )}
    </div>
  );
};

export default Deposit;
