import React, { useState, useEffect } from 'react';

const Profits = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  const processDailyProfits = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/process-profits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchProfits();
      }
    } catch (error) {
      console.error('Error processing daily profits:', error);
    }
  };

  const fetchProfits = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/profits');
      const data = await response.json();
      setProfits(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profits:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfits();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-poppins font-bold text-gray-800">Profits Management</h1>
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-poppins hover:bg-blue-700 transition-colors"
          onClick={processDailyProfits}
        >
          Process Daily Profits
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profits.map((profit) => (
                <tr key={profit._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{profit.userId.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">${profit.investmentId.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">${profit.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">
                    {new Date(profit.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profits; 