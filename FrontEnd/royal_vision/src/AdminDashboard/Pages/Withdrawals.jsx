import React, { useState, useEffect } from 'react';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/withdrawals');
      const data = await response.json();
      setWithdrawals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      setLoading(false);
    }
  };

  const updateWithdrawalStatus = async (id, status) => {
    try {
      const response = await fetch(`https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/withdrawals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchWithdrawals();
      }
    } catch (error) {
      console.error('Error updating withdrawal status:', error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
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
      <h1 className="text-3xl font-poppins font-bold text-gray-800">Withdrawals Management</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Payment Details</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{withdrawal.userId.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">${withdrawal.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{withdrawal.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">
                    {new Date(withdrawal.requestDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{withdrawal.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{withdrawal.paymentDetails}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">
                    {withdrawal.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => updateWithdrawalStatus(withdrawal._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          onClick={() => updateWithdrawalStatus(withdrawal._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

export default Withdrawals; 