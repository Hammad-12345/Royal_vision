import React, { useState, useEffect } from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaExchangeAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import CountUp from 'react-countup';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeInvestments: 0,
    totalProfits: 0,
    pendingWithdrawals: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const statsResponse = await fetch('http://localhost:8080/api/admin/stats');
        const statsData = await statsResponse.json();
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {typeof value === 'number' ? (
              <CountUp end={value} duration={2.5} separator="," />
            ) : (
              value
            )}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <FaArrowUp className="text-green-500 mr-1" />
              ) : (
                <FaArrowDown className="text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}%
              </span>
            </div>
          )}
        </div>
        <div className="p-4 bg-blue-500 bg-opacity-20 rounded-xl">
          <Icon className="text-blue-500 text-3xl" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <div className="flex items-center space-x-2">
            <FaUsers className="text-blue-500 text-xl" />
            <span className="text-white text-lg">
              Total Users: <span className="font-bold">{stats.totalUsers}</span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Active Investments"
          value={stats.activeInvestments}
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
      </div>
    </div>
  );
};

export default Dashboard; 