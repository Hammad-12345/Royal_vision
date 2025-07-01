import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const paymentMethods = [
  { name: "Tron (TRC20)", address: "TRgtXC27Nm8td1DNySmK5Ynh1Gvp8CY8AP" },
  { name: "BNB Smart Chain (BEP20)", address: "0x01d5220ed693ddbea45918033eb7ac53c9008bb9" },
  { name: "Binance ID", address: "199783750" }
];

const Withdraw = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const token = localStorage.getItem("mytoken");
        const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchwalletbalance", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        const data = await response.json();
        setWalletBalance(data.wallet?.walletBalance || 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };
    fetchWalletBalance();
  }, []);

  const onSubmit = async (data) => {
    if (data.amount > walletBalance) {
      toast.error("Insufficient balance in wallet");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Withdraw Request:", data);
      const token = localStorage.getItem("mytoken");
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(`Withdrawal request of $${data.amount} submitted via ${data.paymentMethod}`);
      reset();
      navigate('/withdrawhistory');
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Failed to process withdrawal request. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Withdraw Funds
      </h2>

      <div className="mb-6 p-4 bg-white/10 rounded-lg">
        <p className="text-white text-lg">Available Balance: ${walletBalance.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name
        <div>
          <label className="block text-white font-medium mb-2">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div> */}


        {/* Payment Method */}
        <div>
          <label className="block text-white font-medium mb-2">Payment Method</label>
          <select
            {...register("paymentMethod", { required: "Please select a payment method" })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="text-black">Select method</option>
            {paymentMethods.map((method) => (
              <option key={method.name} value={method.name} className="text-black">
                {method.name}
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

         {/* Amount */}
         <div>
          <label className="block text-white font-medium mb-2">Withdrawal Amount ($)</label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 20, message: "Minimum withdrawal is $20" },
              max: { value: walletBalance, message: `Maximum withdrawal is $${walletBalance}` },
            })}
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Submit Withdrawal'
          )}
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
