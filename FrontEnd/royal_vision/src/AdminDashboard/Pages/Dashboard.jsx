import React, { useState, useEffect } from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaExchangeAlt, FaArrowUp, FaArrowDown, FaClock, FaHourglassHalf, FaHourglassEnd, FaHourglassStart } from 'react-icons/fa';
import CountUp from 'react-countup';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeInvestments: { amount: 0, count: 0 },
    nonActiveInvestments: { amount: 0, count: 0 },
    pendingWithdrawals: 0,
    totalInvestments: { amount: 0, count: 0 },
    totalProfits: 0
  });
  console.log(stats)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const statsResponse = await fetch('https://overland-23a4680d9e06.herokuapp.com/api/admin/stats');
        const statsData = await statsResponse.json();
        console.log(statsData)
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl px-6 py-10 border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {typeof value === 'number' ? (
              <CountUp end={value} duration={2.5} separator="," />
            ) : value?.amount ? (
              <CountUp end={value.amount} duration={2.5} separator="," />
            ) : (
              value
            )}
          </p>
          {value?.count !== undefined && (
            <p className="text-sm text-gray-400 mt-1">Count: {value.count}</p>
          )}
        </div>
        <div className="p-4 bg-blue-500 bg-opacity-20 rounded-xl">
          <Icon className="text-blue-500 text-2xl" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Active Investments"
          value={stats.activeInvestments.amount}
          icon={FaMoneyBillWave}
          trend="up"
          trendValue={8}
        />
        <StatCard
          title="Total Profits"
          value={stats.totalProfits}
          icon={FaChartLine}
          trend="up"
          trendValue={15}
        />
        <StatCard
          title="Pending Withdrawals"
          value={stats.pendingWithdrawals}
          icon={FaExchangeAlt}
          trend="down"
          trendValue={5}
        />
        <StatCard
          title="Non Active Investments"
          value={stats.nonActiveInvestments.amount}
          icon={FaHourglassHalf}
          trend="down"
          trendValue={3}
        />
        <StatCard
          title="Total Investments"
          value={stats.totalInvestments.amount}
          icon={FaClock}
          trend="up"
          trendValue={10}
        />
         <StatCard
          title="Investments Count"
          value={stats.totalInvestments.count}
          icon={FaClock}
          trend="up"
          trendValue={10}
        />
         <StatCard
          title="Active Investments Count"
          value={stats.activeInvestments.count}
          icon={FaClock}
          trend="up"
          trendValue={10}
        />
           <StatCard
          title="Non Active Investments Count"
          value={stats.nonActiveInvestments.count}
          icon={FaClock}
          trend="up"
          trendValue={10}
        />
      </div>
    </div>
  );
};

export default Dashboard; 