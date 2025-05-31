import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Chart Options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#fff",
        font: {
          size: window.innerWidth < 640 ? 12 : 14,
        },
        padding: window.innerWidth < 640 ? 10 : 20,
      },
    },
    title: {
      display: true,
      text: "Profit vs Withdrawal",
      color: "#fff",
      font: {
        size: window.innerWidth < 640 ? 16 : 20,
      },
      padding: {
        bottom: window.innerWidth < 640 ? 10 : 20,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.parsed;
          return `${label}: $${value.toLocaleString()}`;
        }
      }
    }
  },
};

const ProfitWithdrawalChart = ({ investments = [] }) => {
  const chartData = useMemo(() => {
    // Filter for active investments only
    const activeInvestments = investments.filter(inv => inv.paymentMode === 'active');

    // Calculate total profit and withdrawal
    const totalProfit = activeInvestments.reduce((sum, inv) => sum + (Number(inv.profit) || 0), 0);
    const totalWithdrawal = activeInvestments.reduce((sum, inv) => sum + (Number(inv.withdrawal) || 0), 0);

    return {
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
  }, [investments]);

  const hasData = chartData?.datasets?.[0]?.data?.some(value => value > 0) ?? false;

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-4 sm:p-6 shadow-lg text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Profit vs Withdrawal</h2>
      <div className="w-full h-[250px] sm:h-[300px]">
        {hasData ? (
          <Pie data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitWithdrawalChart; 