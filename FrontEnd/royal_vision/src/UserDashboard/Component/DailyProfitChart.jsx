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
  Filler
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
  Legend,
  Filler
);

// Chart Data (Placeholder)
const data = {
  labels: [
    "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"
  ],
  datasets: [
    {
      label: "Daily Profit ($)",
      data: [100, 150, 120, 180, 200, 160, 220], // Placeholder data
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.1)", // Tailwind blue-500 with transparency
      borderColor: "#3B82F6", // Tailwind blue-500
      pointBackgroundColor: "#3B82F6",
      pointBorderColor: "#fff",
      tension: 0.4,
    },
  ],
};

// Chart Options
const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Daily Profits",
        color: "#fff",
        font: {
          size: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "#2D3748" },
      },
      y: {
        ticks: {
          color: "#fff",
          callback: function (value) {
            return `${value} $`;
          },
        },
        grid: { color: "#2D3748" },
      },
    },
  };
  

const DailyProfitChart = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-6 shadow-lg text-white">
    <h2 className="text-xl font-bold mb-4">Daily Profits</h2>
    <div className="w-full h-[300px]"> {/* Set custom height here */}
      <Line data={data} options={options} />
    </div>
  </div>
  );
};

export default DailyProfitChart; 