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
      text: "Daily Profits",
      color: "#fff",
      font: {
        size: window.innerWidth < 640 ? 16 : 20,
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
        callback: function (value) {
          return `${value} $`;
        },
      },
      grid: { color: "#2D3748" },
    },
  },
};

const DailyProfitChart = ({ profit = [] }) => {
  const chartData = useMemo(() => {
    // Get current date and last 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    // Initialize data structure
    const data = {
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

    // Process profit data
    profit.forEach(profitItem => {
      const profitDate = new Date(profitItem.date);
      const dayIndex = last7Days.findIndex(date => date === profitDate.toISOString().split('T')[0]);
      if (profitItem.amount && dayIndex >= 0) {
        data.datasets[0].data[dayIndex] += Number(profitItem.amount) || 0;
      }
    });

    return data;
  }, [profit]);

  const hasData = chartData?.datasets?.[0]?.data?.some(value => value > 0) ?? false;

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-4 sm:p-6 shadow-lg text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Daily Profits</h2>
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

export default DailyProfitChart; 