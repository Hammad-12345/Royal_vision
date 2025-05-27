import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  console.log(selectedInvestment)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedInvestment(null);
    setIsModalOpen(false);
  };

  const handleUpdatePaymentMode = async () => {
    console.log(selectedInvestment)
    try {
      const response = await fetch(`http://localhost:8080/api/admin/updateinvestments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedInvestment),
      });

      if (response.ok) {
        // Update the local state
        fetchInvestments();
        handleClose();
      } else {
        console.error('Failed to update payment mode');
      }
    } catch (error) {
      console.error('Error updating payment mode:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'userId',
        header: 'User ID',
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'userEmail',
        header: 'Email',
        cell: (info) => (
          <span className="text-blue-600 hover:text-blue-800 transition-colors">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'investmentPlan',
        header: 'Investment Plan',
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Amount',
        cell: (info) => (
          <span className="font-semibold text-emerald-600">
            ${info.getValue().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'paymentMode',
        header: 'Payment Mode',
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              info.getValue() === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
              info.getValue() === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              info.getValue() === 'reject' ? 'bg-red-100 text-red-800 border border-red-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
            </span>
            <button
              onClick={() => handleEdit(info.row.original)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => (
          <span className="text-gray-600">
            {new Date(info.getValue()).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        ),
      },
    ],
    []
  );
  const fetchInvestments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/investments');
      const data = await response.json();
      console.log(data)
      setInvestments(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching investments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchInvestments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-poppins font-bold bg-clip-text text-white">
          Investments Management
        </h1>
        <div className="rounded-lg shadow-sm">
          <span className="text-lg font-medium">Total Investments: {investments.length}</span>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <div className="min-w-full">
          <Table 
            data={investments} 
            columns={columns} 
            pagination={true}
          />
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all duration-300 scale-100 opacity-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Payment Mode</h2>
            
            {/* Screenshot Preview */}
            {selectedInvestment?.screenshot && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot
                </label>
                <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={selectedInvestment.screenshot} 
                    alt="Payment Screenshot" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Mode
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                defaultValue={selectedInvestment?.paymentMode}
                onChange={(e) => setSelectedInvestment({...selectedInvestment, paymentMode: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdatePaymentMode()}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments; 