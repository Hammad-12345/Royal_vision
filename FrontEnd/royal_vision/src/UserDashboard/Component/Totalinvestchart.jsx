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
      text: "Monthly Total Investment",
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

const Totalinvestchart = ({ investments = [] }) => {
  const chartData = useMemo(() => {
    // Filter for active investments only
    const activeInvestments = investments.filter(inv => inv.paymentMode === 'active');

    // Define the start and end dates for the 12-month period (May 25, 2025 to May 25, 2026)
    const startDate = new Date('2025-05-25T00:00:00.000Z');
    const endDate = new Date('2026-05-25T23:59:59.999Z');

    // Get the 12 months starting from May 2025 for monthly data
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      return date.toLocaleString('default', { month: 'short' });
    });

    // Initialize data structure
    const data = {
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
          data.datasets[0].data[monthIndex] += Number(investment.price) || 0;
        }
      }
    });

    return data;
  }, [investments]);

  const hasData = chartData?.datasets?.[0]?.data?.some(value => value > 0) ?? false;

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] rounded-2xl p-4 sm:p-6 shadow-lg text-white">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Total Investment (Monthly)</h2>
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

export default Totalinvestchart;
