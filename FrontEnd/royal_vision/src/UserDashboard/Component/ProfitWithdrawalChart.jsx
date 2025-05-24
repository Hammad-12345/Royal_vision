import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Chart Data (Placeholder)
export const data = {
  labels: ["Profit", "Withdrawal"],
  datasets: [
    {
      label: "Amount ($)",
      data: [8000, 2000], // Placeholder data: 80% Profit, 20% Withdrawal
      backgroundColor: [
        "rgba(99, 102, 241, 0.8)", // Indigo color for profit
        "rgba(236, 72, 153, 0.8)", // Pink color for withdrawal
      ],
      borderColor: [
        "rgba(99, 102, 241, 1)",
        "rgba(236, 72, 153, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

// Chart Options
export const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          font: {
            size: 14,
            weight: "500",
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Profit vs Withdrawal",
        color: "#fff",
        font: {
          size: 20,
          weight: "600",
        },
        padding: {
          bottom: 20,
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

const ProfitWithdrawalChart = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-6 shadow-lg text-white ">
      <h2 className="text-xl font-bold mb-4">Profit vs Withdrawal</h2>
      <div className="w-full h-[300px]"> {/* Set custom height here, smaller for pie chart */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ProfitWithdrawalChart; 