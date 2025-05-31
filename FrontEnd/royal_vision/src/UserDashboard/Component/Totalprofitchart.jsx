import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
      text: "Monthly Total Profit",
      color: "#fff",
      font: {
        size: window.innerWidth < 640 ? 16 : 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => `$${context.parsed.y.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      ticks: { 
        color: "#fff",
        font: {
          size: window.innerWidth < 640 ? 10 : 12,
        },
      },
      grid: { color: "#2D3748" },
    },
    y: {
      ticks: {
        color: "#fff",
        font: {
          size: window.innerWidth < 640 ? 10 : 12,
        },
        callback: (value) => `$${value}`,
      },
      grid: { color: "#2D3748" },
    },
  },
};

const Totalprofitchart = ({ profit }) => {
  console.log(profit)
  const chartData = useMemo(() => {
    // Define the start and end dates for the 12-month period
    const endDate = new Date("2026-05-25T23:59:59.999Z"); // May 31, 2026
    const startDate = new Date("2025-05-25T00:00:00.000Z"); // May 1, 2025

    // Get the 12 months ending with the current month for monthly data
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      return date.toLocaleString('default', { month: 'short', year: '2-digit' });
    });

    // Initialize data structure with 12 months of data initialized to 0
    const data = {
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

    // Calculate monthly profits from the transactions array
    if (Array.isArray(profit)) {
      profit.forEach(transaction => {
        const transactionDate = new Date(transaction.date);
        console.log(transactionDate)
        // Check if the transaction date is within the 12-month range
        if (transactionDate >= startDate && transactionDate <= endDate) {
          // Calculate the month index (0-11) relative to the start date
          const monthDiff = (transactionDate.getFullYear() - startDate.getFullYear()) * 12 + (transactionDate.getMonth() - startDate.getMonth());
          if (monthDiff >= 0 && monthDiff < 12) {
            data.datasets[0].data[monthDiff] += transaction.amount;
          }
        }
      });
    }

    return data;
  }, [profit]);
  console.log(chartData)
  const hasData = chartData?.datasets?.[0]?.data?.some(value => value > 0) ?? false;

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-4 sm:p-6 shadow-lg text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Total Profit (Monthly)</h2>
      <div className="w-full h-[250px] sm:h-[300px]">
        {hasData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Totalprofitchart;
