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

// Chart Data
const data = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  datasets: [
    {
      label: "Total Investment ($)",
      data: [300, 4000, 5000, 3560, 5670, 2000, 45780, 9080, 4560, 7890, 8990, 7880],
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
        text: "Monthly Total Investment",
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
  

const Totalinvestchart = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-6 shadow-lg text-white">
    <h2 className="text-xl font-bold mb-4">Total Investment (Monthly)</h2>
    <div className="w-full h-[500px]"> {/* 👈 Set custom height here */}
      <Line data={data} options={options} />
    </div>
  </div>
  
  );
};

export default Totalinvestchart;
