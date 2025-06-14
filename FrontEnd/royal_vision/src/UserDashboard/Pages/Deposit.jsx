import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate()
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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

  useEffect(() => {
    if (id) {
      const plan = plans.find(p => p.name.toLowerCase() === id.toLowerCase());
      if (plan) {
        setSelectedPlan(plan);
        reset({ plan: plan.name });
      }
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    // setIsLoading(true);
    // try {
      console.log("Deposit Submitted:", data);
      setSubmittedData(data);
      setShowPaymentDetails(true);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handlePlanChange = (e) => {
    const plan = plans.find((p) => p.name === e.target.value);
    setSelectedPlan(plan);
  };

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      // 1. Upload screenshot to backend
      const formData = new FormData();
      formData.append('img', screenshot);

      const uploadRes = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('mytoken'))}`,
        },
      });
      const uploadData = await uploadRes.json();
      const screenshotUrl = uploadData.url;

      // 2. Submit deposit with screenshot URL
      const depositData = {
        investmentPlan: submittedData.plan,
        price: submittedData.amount,
        paymentMethod: submittedData.paymentMethod,
        depositAddress: selectedPayment?.address,
        screenshot: screenshotUrl,
        paymentMode: "pending",
      };

      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/deposit", {
        method: "POST",
        body: JSON.stringify(depositData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('mytoken'))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(data.message === 'You already have 3 active plans under that investment plan. Please choose a different plan.') {
        toast.error(data.message);
        setShowPaymentDetails(false);
        return;
      }
      console.log("Deposit created:", data);
      toast.success("Deposit created successfully!");
      navigate('/investment-history')
    } catch (error) {
      console.error("Error submitting deposit:", error);
      toast.error("Error creating deposit. Please try again.");
    } finally {
      setIsUploading(false);
      setShowPaymentDetails(false);
    }
  };

  const selectedPayment = paymentMethods.find(
    (method) => method.name === submittedData?.paymentMethod
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md text-white p-4 sm:p-6 md:p-8">
        {!showPaymentDetails ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 sm:mb-6">
              Deposit Funds
            </h2>
            <div>
              <label className="block font-medium mb-2 text-sm sm:text-base">
                Select Investment Plan
              </label>
              <select
                {...register("plan", { required: "Plan is required" })}
                onChange={handlePlanChange}
                className="w-full px-3 sm:px-4 py-2 bg-transparent border border-gray-300 rounded-md text-sm sm:text-base"
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
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.plan.message}</p>
              )}
            </div>
            <p className="text-sm sm:text-base">
              Minimum Investment: <strong>{selectedPlan.mininvest}</strong>
            </p>
            <div>
              <label className="block font-medium mb-2 text-sm sm:text-base">Deposit Amount ($)</label>
              <input
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: parseInt(selectedPlan.mininvest.replace("$", "")),
                    message: `Minimum is ${selectedPlan.mininvest}`,
                  },
                })}
                className="w-full px-3 sm:px-4 py-2 bg-transparent border rounded-md text-white text-sm sm:text-base"
                placeholder={`Min ${selectedPlan.mininvest}`}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-2 text-sm sm:text-base">Payment Method</label>
              <select
                {...register("paymentMethod", {
                  required: "Payment method is required",
                })}
                className="w-full px-3 sm:px-4 py-2 bg-transparent border rounded-md text-sm sm:text-base"
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
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Next"
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSecondFormSubmit}
            className="flex flex-col items-center space-y-4 sm:space-y-6 rounded-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
              Deposit USDT
            </h2>

            <div className="w-full">
              <label className="text-gray-400 text-xs sm:text-sm">Network</label>
              <div className="flex items-center justify-between border border-gray-600 bg-transparent px-3 py-2 rounded mt-1 text-white text-sm sm:text-base">
                <span>{submittedData.paymentMethod}</span>
              </div>
            </div>

            <div className="w-full">
              <label className="text-gray-400 text-xs sm:text-sm">Deposit Address</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={selectedPayment?.address || ""}
                  className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-white pr-10 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPayment?.address || "");
                    toast.success("Address copied to clipboard");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-400 transition-colors duration-200"
                  title="Copy"
                >
                  <FaRegCopy />
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="text-gray-400 text-xs sm:text-sm">Upload Screenshot</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files[0])}
                className="w-full text-white mt-1 text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Deposit;
