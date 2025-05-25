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
  const [cardData, setCardData] = useState([
    { title: "Total Invest", count: 0 },
    { title: "Total Profit", count: 0 },
  ]);
  const [animationKey, setAnimationKey] = useState(0);
  const [activePlans, setActivePlans] = useState([]);
  const [inactivePlans, setInactivePlans] = useState([]);
  const [chartData, setChartData] = useState({
    dailyProfit: null,
    totalProfit: null,
    totalInvestment: null,
    profitWithdrawal: null
  });

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

  // Function to process investment data for charts
  const processChartData = (investments) => {
    // Filter for active investments only
    const activeInvestments = investments.filter(inv => inv.paymentMode === 'active');

    // Get current date and last 7 days for daily profit
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    // Define the start and end dates for the 12-month period (May 25, 2025 to May 25, 2026)
    const startDate = new Date('2025-05-25T00:00:00.000Z');
    const endDate = new Date('2026-05-25T23:59:59.999Z');

    // Get the 12 months starting from May 2025 for monthly data
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i); // Start from May 2025 and add months
      return date.toLocaleString('default', { month: 'short' });
    });

    // Initialize data structures
    const dailyProfitData = {
      labels: last7Days.map(date => date.split('-')[2]), // Just the day number
      datasets: [{
        label: "Daily Profit ($)",
        data: Array(7).fill(0),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        tension: 0.4,
      }]
    };

    const totalProfitData = {
      labels: last12Months,
      datasets: [{
        label: "Total Profit ($)",
        data: Array(12).fill(0),
        fill: false,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        pointBackgroundColor: "#3B82F6",
        tension: 0.4,
      }]
    };

    const totalInvestmentData = {
      labels: last12Months,
      datasets: [{
        label: "Total Investment ($)",
        data: Array(12).fill(0),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        tension: 0.4,
      }]
    };

    // Process active investments
    activeInvestments.forEach(investment => {
      const investDate = new Date(investment.createdAt);

      // Check if the investment date falls within the 12-month period
      if (investDate >= startDate && investDate <= endDate) {
        // Find the correct month index within the last12Months array
        const monthDiff = (investDate.getFullYear() - startDate.getFullYear()) * 12 + (investDate.getMonth() - startDate.getMonth());
        const monthIndex = monthDiff; // Index from 0 (start) to 11 (end of period)

        if (monthIndex >= 0 && monthIndex < 12) {
           // Update total investment
          totalInvestmentData.datasets[0].data[monthIndex] += Number(investment.price) || 0;

          // Update total profit
          if (investment.profit) {
            totalProfitData.datasets[0].data[monthIndex] += Number(investment.profit) || 0;
          }
        }
      }

      // Update daily profit (still based on last 7 days from today)
      const dayIndex = last7Days.findIndex(date => date === investDate.toISOString().split('T')[0]);
      if (investment.profit && dayIndex >= 0) {
        dailyProfitData.datasets[0].data[dayIndex] += Number(investment.profit) || 0;
      }
    });

    // Calculate profit vs withdrawal for active investments only
    const totalProfit = activeInvestments.reduce((sum, inv) => sum + (Number(inv.profit) || 0), 0);
    const totalWithdrawal = activeInvestments.reduce((sum, inv) => sum + (Number(inv.withdrawal) || 0), 0);

    const profitWithdrawalData = {
      labels: ["Profit", "Withdrawal"],
      datasets: [{
        label: "Amount ($)",
        data: [totalProfit, totalWithdrawal],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 2,
      }]
    };

    return {
      dailyProfit: dailyProfitData,
      totalProfit: totalProfitData,
      totalInvestment: totalInvestmentData,
      profitWithdrawal: profitWithdrawalData
    };
  };

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem("mytoken");
        const res = await fetch(
          "http://localhost:8080/dashboard/fetchallinvestment",
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

        // Process data for charts
        const processedChartData = processChartData(data);
        setChartData(processedChartData);

        let totals = {
          "Total Invest": 0,
          "Total Profit": 0,
        };

        // Define all available investment plans
        const allPlans = [
          "Gold Trading",
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

          if (item.profit) {
            totals["Total Profit"] += Number(item.profit);
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
            <p className="text-2xl sm:text-3xl font-semibold">
              <CountUp
                key={`${card.title}-${animationKey}`}
                end={card.count}
                duration={2}
                prefix="$"
                separator=","
              />
            </p>
          </div>
        ))}
      </div>
    ),
    [cardData, animationKey]
  );

  const memoizedActivePlans = useMemo(
    () => (
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Active Investment Plans</h2>
        {activePlans.map((plan, index) => {
          const HistoryComponent = {
            "Gold Trading": GoldTradingHistory,
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
                    <CountUp
                      end={plan.amount}
                      duration={2}
                      prefix="$"
                      separator=","
                    />
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
                        <CountUp
                          end={plan.amount}
                          duration={2}
                          prefix="$"
                          separator=","
                        />
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Status</h4>
                      <p className="text-lg sm:text-xl font-bold text-green-400">Active</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Daily Profit</h4>
                      <p className="text-lg sm:text-xl font-bold text-green-400">
                        {plan.name === "Gold Trading"
                          ? "1.5% - 3.5%"
                          : plan.name === "RetroDrops"
                          ? "35% - 50% (180 Days)"
                          : plan.name === "Amazon"
                          ? "13% - 15% (Monthly)"
                          : plan.name === "AirBnB"
                          ? "7.5% - 10% (Monthly)"
                          : plan.name === "Mineral Water"
                          ? "8.5% - 12.5% (Monthly)"
                          : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-3 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm">Withdrawal</h4>
                      <p className="text-lg sm:text-xl font-bold text-blue-400">
                        {plan.name === "Gold Trading"
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
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                        Investment History
                      </h3>
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
          <DailyProfitChart data={chartData.dailyProfit} />
          <ProfitWithdrawalChart data={chartData.profitWithdrawal} />
          <Totalinvestchart data={chartData.totalInvestment} />
          <Totalprofitchart data={chartData.totalProfit} />
        </div>
      </>
    ),
    [chartData]
  );

  const memoizedInvestmentPlans = useMemo(
    () => (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Plans Dashboard</h2>
        <AccordionItem
          panelId="panel1"
          title="Gold Trading Investment Dashboard"
          content={<GoldTradingHistory />}
        />

        <AccordionItem
          panelId="panel2"
          title="Airbnb Investment Dashboard"
          content={<AirbnbHistory />}
        />

        <AccordionItem
          panelId="panel3"
          title="Retrodrops Investment Dashboard"
          content={<Retrodrops />}
        />

        <AccordionItem
          panelId="panel4"
          title="Mineral Water Investment Dashboard"
          content={<MineralWater />}
        />

        <AccordionItem
          panelId="panel5"
          title="Amazon Investment Dashboard"
          content={<AmazonHistory />}
        />
      </div>
    ),
    [AccordionItem]
  );

  return (
    <div className="space-y-8 text-white">
      {memoizedCards}
      {memoizedActivePlans}
      {memoizedCharts}
      {memoizedInactivePlans}
      {/* {memoizedInvestmentPlans} */}
      <OverallInvestmentHistory />
    </div>
  );
};

export default React.memo(Dashboard);
