import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Table from "../../UserDashboard/Component/Table";

const ProfitManagement = () => {
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profitPercentage, setProfitPercentage] = useState("");
  const [adminInterestPercentage, setAdminInterestPercentage] = useState("");
  const [interestError, setInterestError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchActiveInvestments();
  }, []);

  const fetchActiveInvestments = async () => {
    try {
      const token = localStorage.getItem("mytoken");
      const response = await fetch(
        "https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/investments",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch investments");
      const data = await response.json();
      console.log(data.data);
      setActiveInvestments(
        data.data.filter((inv) => inv.paymentMode === "active")
      );
      setIsLoading(false)
    } catch (error) {
      toast.error("Failed to load investments");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleProfitClick = (investment) => {
    setSelectedInvestment(investment);
    setShowModal(true);
  };

  const handleSubmitProfit = async () => {
    try {
      // Validate admin interest percentage first
      if (!adminInterestPercentage || adminInterestPercentage.trim() === '') {
        toast.error("Please enter an interest percentage");
        return;
      }

      const error = validateInterestPercentage(adminInterestPercentage, selectedInvestment.investmentPlan);
      if (error) {
        toast.error(error);
        return;
      }

      let calculatedAmount = 0;
      const investmentAmount = selectedInvestment.price;

      // Calculate profit based on investment plan
      switch (selectedInvestment.investmentPlan) {
        case "Gold Trading":
          // 2.5% daily profit (average of 1.5% and 3.5%)
          calculatedAmount = investmentAmount * (adminInterestPercentage / 100);
          break;
        case "RetroDrops":
          // 42.5% profit in 180 days (average of 35% and 50%), distributed daily
          const retroDropsDailyRate = (adminInterestPercentage / 100) / 180;
          calculatedAmount = investmentAmount * retroDropsDailyRate;
          break;
        case "Amazon":
          // 14% monthly profit (average of 13% and 15%), distributed daily
          const amazonDailyRate = (adminInterestPercentage / 100) / 30;
          calculatedAmount = investmentAmount * amazonDailyRate;
          break;
        case "AirBnB":
          // 8.75% monthly profit (average of 7.5% and 10%), distributed daily
          const airbnbDailyRate = (adminInterestPercentage / 100) / 30;
          calculatedAmount = investmentAmount * airbnbDailyRate;
          break;
        case "Mineral Water":
          // 10.5% monthly profit (average of 8.5% and 12.5%), distributed daily
          const waterDailyRate = (adminInterestPercentage / 100) / 30;
          calculatedAmount = investmentAmount * waterDailyRate;
          break;
        default:
          toast.error("Invalid investment plan");
          return;
      }
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/add-profit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          investmentId: selectedInvestment.id,
          userId: selectedInvestment.userId,
          investmentPlanId: selectedInvestment.investmentPlan,
          amount: calculatedAmount,
        }),
      });

      if (!response.ok) throw new Error("Failed to add profit");

      toast.success("Profit added successfully");
      setShowModal(false);
      setProfitPercentage("");
      fetchActiveInvestments();
    } catch (error) {
      toast.error("Failed to add profit");
      console.error(error);
    }
  };

  const getProfitRange = (plan) => {
    switch (plan) {
      case "Gold Trading":
        return "1.5% - 3.5%";
      case "RetroDrops":
        return "35% - 50% (180 Days)";
      case "Amazon":
        return "13% - 15% (Monthly)";
      case "AirBnB":
        return "7.5% - 10% (Monthly)";
      case "Mineral Water":
        return "8.5% - 12.5% (Monthly)";
      default:
        return "N/A";
    }
  };

  const validateInterestPercentage = (value, plan) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }

    switch (plan) {
      case "Gold Trading":
        if (numValue < 1.5 || numValue > 3.5) {
          return "Interest must be between 1.5% and 3.5%";
        }
        break;
      case "RetroDrops":
        if (numValue < 35 || numValue > 50) {
          return "Interest must be between 35% and 50%";
        }
        break;
      case "Amazon":
        if (numValue < 13 || numValue > 15) {
          return "Interest must be between 13% and 15%";
        }
        break;
      case "AirBnB":
        if (numValue < 7.5 || numValue > 10) {
          return "Interest must be between 7.5% and 10%";
        }
        break;
      case "Mineral Water":
        if (numValue < 8.5 || numValue > 12.5) {
          return "Interest must be between 8.5% and 12.5%";
        }
        break;
      default:
        return "Invalid investment plan";
    }
    return "";
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setAdminInterestPercentage(value);
    if (selectedInvestment) {
      const error = validateInterestPercentage(value, selectedInvestment.investmentPlan);
      setInterestError(error);
    }
  };

  const columns = [
    {
      header: "Invest ID",
      accessorKey: "id",
      cell: (info) => (
        <span className="font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "User",
      accessorKey: "userId",
      cell: (info) => (
        <span className="font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "User Email",
      accessorKey: "userEmail",
      cell: (info) => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Plan",
      accessorKey: "investmentPlan",
      cell: (info) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "price",
      cell: (info) => (
        <span className="font-semibold text-emerald-600">
          ${info.getValue().toLocaleString()}
        </span>
      ),
    },
    {
      header: "Range",
      accessorKey: "investmentPlan",
      cell: (info) => (
        <span className="text-gray-600">
          {getProfitRange(info.getValue())}
        </span>
      ),
    },
    {
      header: "Action",
      cell: (info) => (
        <button
          onClick={() => handleProfitClick(info.row.original)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Profit
        </button>
      ),
    },
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div>
      <Table data={activeInvestments} columns={columns} pagination={true} />

      {/* Profit Modal */}
      {showModal && selectedInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Profit</h3>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Investment Plan
              </label>
              <div className="w-full p-2 rounded bg-gray-800 text-white">
                {selectedInvestment.investmentPlan}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Investment Amount
              </label>
              <div className="w-full p-2 rounded bg-gray-800 text-white">
                ${selectedInvestment.price}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Daily Profit Rate
              </label>
              <div className="w-full p-2 rounded bg-gray-800 text-white">
                {selectedInvestment.investmentPlan === "Gold Trading"
                  ? "1.5% - 3.5%"
                  : selectedInvestment.investmentPlan === "RetroDrops"
                  ? "35% - 50% (180 Days)"
                  : selectedInvestment.investmentPlan === "Amazon"
                  ? "13% - 15% (Monthly)"
                  : selectedInvestment.investmentPlan === "AirBnB"
                  ? "7.5% - 10% (Monthly)"
                  : selectedInvestment.investmentPlan === "Mineral Water"
                  ? "8.5% - 12.5% (Monthly)"
                  : "N/A"}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Admin Interest Percentage
              </label>
              <input
                type="number"
                step="0.01"
                value={adminInterestPercentage}
                onChange={handleInterestChange}
                className={`w-full p-2 rounded bg-gray-800 text-white ${
                  interestError ? "border-red-500" : ""
                }`}
                placeholder="Enter interest percentage"
              />
              {interestError && (
                <p className="text-red-500 text-sm mt-1">{interestError}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitProfit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Profit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfitManagement;
