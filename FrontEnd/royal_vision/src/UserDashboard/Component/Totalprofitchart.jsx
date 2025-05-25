import React from "react";
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

// Dummy monthly profit data
const defaultData = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "Total Profit ($)",
      data: [100, 200, 800, 350, 900, 400, 2000, 1300, 700, 1100, 1400, 1600], // Dummy values
      fill: false,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "#3B82F6", // Tailwind blue-500
      pointBackgroundColor: "#3B82F6",
      tension: 0.4,
    },
  ],
};

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

const Totalprofitchart = ({ data = defaultData }) => {
  const hasData = data?.datasets?.[0]?.data?.some(value => value > 0) ?? false;

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-4 sm:p-6 shadow-lg text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Total Profit (Monthly)</h2>
      <div className="w-full h-[250px] sm:h-[300px]">
        {hasData ? (
          <Line data={data} options={options} />
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
