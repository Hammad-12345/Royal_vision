import React, { useState, useEffect, useMemo } from "react";
import CountUp from "react-countup";
import Totalinvestchart from "../Component/Totalinvestchart";
import Totalprofitchart from "../Component/Totalprofitchart";
import DailyProfitChart from "../Component/DailyProfitChart";
import ProfitWithdrawalChart from "../Component/ProfitWithdrawalChart";
import OverallInvestmentHistory from "./OverallInvestmentHistory";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import GoldTradingHistory from "./GoldTradingHistory";
import AirbnbHistory from "./Airbnbhistory";
import Retrodrops from "./Retrodrops";
import MineralWater from "./MineralWater";
import AmazonHistory from "./Amazonhistory";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([
    { title: "Total Invest", count: 0 },
    { title: "Total Investment Profit", count: 0 },
    { title: "Wallet Profit", count: 0 },
    { title: "Pending Profit", count: 0 },
  ]);
  const [animationKey, setAnimationKey] = useState(0);
  const [activePlans, setActivePlans] = useState([]);
  const [inactivePlans, setInactivePlans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [totalprofitcharts,settotalprofitchart]=useState([])
  const handleToggle = useMemo(
    () => (panel) => {
      setExpanded(expanded === panel ? null : panel);
    },
    [expanded]
  );

  const AccordionItem = useMemo(() => {
    return ({ title, content, panelId }) => {
      const isExpanded = expanded === panelId;

      return (
        <div className="mb-4 rounded-lg bg-gradient-to-br from-[#0F1120] to-[#070c3e] shadow-md">
          <button
            className="w-full px-6 py-4 text-left hover:bg-[#1E3A8A]/20 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] rounded-lg transition-colors duration-200"
            onClick={() => handleToggle(panelId)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              {isExpanded ? (
                <IoIosArrowUp className="w-6 h-6 text-white transform transition-transform duration-200" />
              ) : (
                <IoIosArrowDown className="w-6 h-6 text-white transform transition-transform duration-200" />
              )}
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 bg-gradient-to-br from-[#0F1120] to-[#070c3e] border-t border-[#1E3A8A]/20">
              {content}
            </div>
          </div>
        </div>
      );
    };
  }, [expanded, handleToggle]);

  useEffect(() => {
    const fetchInvestments = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("mytoken");
        
        // Fetch investments
        const res = await fetch(
          "https://overland-23a4680d9e06.herokuapp.com/dashboard/fetchallinvestment",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );

        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        console.log('Raw investment data:', data);
        setInvestments(data);

        // Fetch profits
        const profitRes = await fetch(
          "https://overland-23a4680d9e06.herokuapp.com/dashboard/fetchprofit",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );

        if (!profitRes.ok) throw new Error(await res.text());
        const profitData = await profitRes.json();
        console.log('Profit data:', profitData);
        settotalprofitchart(profitData.profits)
        
        // Calculate wallet and pending profits
        let walletProfit = 0;
        let pendingProfit = 0;
        
        profitData.profits.forEach(profit => {
          if (profit.sendtoWallet) {
            walletProfit += Number(profit.amount) || 0;
          } else {
            pendingProfit += Number(profit.amount) || 0;
          }
        });

        let totals = {
          "Total Invest": 0,
          "Total Investment Profit": profitData.totalProfit || 0,
          "Wallet Profit": walletProfit || 0,
          "Pending Profit": pendingProfit || 0,
        };

        // Define all available investment plans
        const allPlans = [
          "Gold/Stocks",
          "AirBnB",
          "RetroDrops",
          "Mineral Water",
          "Amazon"
        ];

        // Initialize all plans with zero amount
        const planInvestments = {};
        allPlans.forEach(plan => {
          planInvestments[plan] = 0;
        });

        // Calculate total investments for each plan
        data.forEach((item) => {
          // Only count investments with active payment mode
          if (item.paymentMode === 'active') {
            const amount = Number(item.price) || 0;
            totals["Total Invest"] += amount;
          }

          if (item.investmentPlan && planInvestments[item.investmentPlan] !== undefined) {
            // Only count active payment mode investments in plan totals
            if (item.paymentMode === 'active') {
              planInvestments[item.investmentPlan] += Number(item.price) || 0;
            }
          }
        });

        // Separate active and inactive plans
        const active = [];
        const inactive = [];
        
        // First, add all plans with zero investment to inactive
        allPlans.forEach(plan => {
          if (planInvestments[plan] === 0) {
            inactive.push({ name: plan, amount: 0 });
          } else {
            active.push({ name: plan, amount: planInvestments[plan] });
          }
        });

        console.log('Plan investments:', planInvestments);
        console.log('Active plans:', active);
        console.log('Inactive plans:', inactive);

        setActivePlans(active);
        setInactivePlans(inactive);

        const updated = cardData.map((card) => ({
          ...card,
          count: totals[card.title] || 0,
        }));

        setCardData(updated);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const memoizedCards = useMemo(
    () => (
      <div className="font-poppins grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cardData.map((card) => (
          <div
            key={card.title}
            className="bg-gradient-to-br h-36 from-[#0F1120] to-[#070c3e] space-y-4 rounded-2xl p-4 sm:p-6 shadow-lg text-white"
          >
            <h2 className="text-base sm:text-lg mb-2">{card.title}</h2>
            {isLoading ? (
             <svg
             className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
           >
             <circle
               className="opacity-25"
               cx="12"
               cy="12"
               r="10"
               stroke="currentColor"
               strokeWidth="4"
             ></circle>
             <path
               className="opacity-75"
               fill="currentColor"
               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
             ></path>
           </svg>
            ) : (
              <p className="text-2xl sm:text-3xl font-semibold">
                ${card.count}
              </p>
            )}
          </div>
        ))}
      </div>
    ),
    [cardData, animationKey, isLoading]
  );

  const memoizedActivePlans = useMemo(
    () => (
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Active Investment Plans</h2>
        {activePlans.map((plan, index) => {
          const HistoryComponent = {
            "Gold/Stocks": GoldTradingHistory,
            AirBnB: AirbnbHistory,
            RetroDrops: Retrodrops,
            "Mineral Water": MineralWater,
            Amazon: AmazonHistory,
          }[plan.name];

          return (
            <AccordionItem
              key={plan.name}
              panelId={`active-${index}`}
              title={
                <div className="flex justify-between items-center w-full space-x-2">
                  <span className="text-sm sm:text-base">{plan.name}</span>
                  <span className="text-blue-400 font-semibold text-sm sm:text-base">
                   {
                plan.amount
                   }
                  </span>
                </div>
              }
              content={
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">
                        Total Investment
                      </h4>
                      <p className="text-lg sm:text-xl font-bold text-blue-400">
                      ${plan.amount}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Status</h4>
                      <p className="text-lg sm:text-xl font-bold text-green-400">Active</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Daily Profit</h4>
                      <p className="text-lg sm:text-xl font-bold text-green-400">
                        {plan.name === "Gold/Stocks"
                          ? "1.5% - 3.5%"
                          : plan.name === "RetroDrops"
                          ? "N/A"
                          : plan.name === "Amazon"
                          ? "N/A"
                          : plan.name === "AirBnB"
                          ? "N/A"
                          : plan.name === "Mineral Water"
                          ? "N/A"
                          : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Withdrawal</h4>
                      <p className="text-lg sm:text-xl font-bold text-blue-400">
                        {plan.name === "Gold/Stocks"
                          ? "Every 15 days"
                          : plan.name === "RetroDrops"
                          ? "After 6 months"
                          : plan.name === "Amazon"
                          ? "Monthly"
                          : plan.name === "AirBnB"
                          ? "Monthly"
                          : plan.name === "Mineral Water"
                          ? "Monthly"
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {HistoryComponent && (
                    <div className="mt-4 sm:mt-6">
                      {/* <h3 className="text-base sm:text-2xl font-semibold mb-3 sm:mb-4">
                        Plans Summary
                      </h3> */}
                      <HistoryComponent />
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
      </div>
    ),
    [activePlans, AccordionItem]
  );

  const memoizedInactivePlans = useMemo(
    () => (
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Available Investment Plans</h2>
        {inactivePlans.map((plan, index) => (
          <AccordionItem
            key={plan.name}
            panelId={`inactive-${index}`}
            title={
              <div className="flex justify-between items-center w-full space-x-3">
                <span className="text-sm sm:text-base">{plan.name}</span>
                <span className="text-blue-400 font-semibold text-sm sm:text-base">No active investment</span>
              </div>
            }
            content={
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                    <h4 className="text-gray-400 text-xs sm:text-sm">Status</h4>
                    <p className="text-lg sm:text-xl font-bold text-gray-400">Inactive</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                    <h4 className="text-gray-400 text-xs sm:text-sm">Action</h4>
                    <button
                      onClick={() => navigate(`/Deposit/${plan.name}`)}
                      className="text-blue-400 hover:text-blue-300 font-semibold text-sm sm:text-base"
                    >
                      Start Investing →
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
    ),
    [inactivePlans, AccordionItem, navigate]
  );

  const memoizedCharts = useMemo(
    () => (
      <>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DailyProfitChart profit={totalprofitcharts} />
          {/* <ProfitWithdrawalChart investments={investments} /> */}
          <Totalinvestchart investments={investments} />
          <Totalprofitchart profit={totalprofitcharts} />
        </div>
      </>
    ),
    [investments,totalprofitcharts]
  );

  return (
    <div className="space-y-8 text-white">
      {memoizedCards}
      {memoizedActivePlans}
      {memoizedCharts}
      {memoizedInactivePlans}
      <OverallInvestmentHistory />
    </div>
  );
};

export default React.memo(Dashboard);
