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
const data = {
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
      },
    },
    title: {
      display: true,
      text: "Monthly Total Profit",
      color: "#fff",
      font: {
        size: 20,
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
        ticks: { color: "#fff" },
        grid: { color: "#2D3748" },
    },
    y: {
      ticks: {
        color: "#fff",
        callback: (value) => `$${value}`,
      },
      grid: { color: "#2D3748" },
    },
  },
};

const Totalprofitchart = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-6 shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Total Profit (Monthly)</h2>
      <div className="w-full h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Totalprofitchart;
