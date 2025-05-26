import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    totalProfits: 0,
    pendingWithdrawals: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-poppins font-bold text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-poppins text-gray-600">Total Users</h3>
          <p className="text-3xl font-poppins font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-poppins text-gray-600">Total Investments</h3>
          <p className="text-3xl font-poppins font-bold text-gray-800 mt-2">${stats.totalInvestments}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-poppins text-gray-600">Total Profits Distributed</h3>
          <p className="text-3xl font-poppins font-bold text-gray-800 mt-2">${stats.totalProfits}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-poppins text-gray-600">Pending Withdrawals</h3>
          <p className="text-3xl font-poppins font-bold text-gray-800 mt-2">{stats.pendingWithdrawals}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-4">Recent Activities</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Activity rows will be populated here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 