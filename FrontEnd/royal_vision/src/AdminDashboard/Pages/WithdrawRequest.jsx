import React, { useEffect, useState } from 'react';
import Table from '../../UserDashboard/Component/Table';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
};

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // const token = localStorage.getItem('mytoken');
      const requestToUpdate = withdrawals.find(w => w._id === id);
      // console.log(requestToUpdate);
      
      if (!requestToUpdate) {
        throw new Error('Withdrawal request not found');
      }

      const updatedRequest = {
        ...requestToUpdate,
        status: newStatus
      };
      // console.log(updatedRequest);
      const response = await fetch(`https://overland-23a4680d9e06.herokuapp.com/api/admin/updatewithdrawrequests`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${JSON.parse(token)}`
        },
        body: JSON.stringify(updatedRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(`Withdrawal request ${newStatus} successfully`);
      
      // Update the local state
      // setWithdrawals(prev => prev.map(w => 
      //   w._id === id ? { ...w, status: newStatus } : w
      // ));
      fetchWithdrawals();
    } catch (error) {
      console.error('Error updating withdrawal status:', error);
      toast.error('Failed to update withdrawal status');
    }
  };

  const columns = [
    {
      header: 'Withdrawal ID',
      accessorKey: '_id',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-blue-600">
          {info.getValue() || 'N/A'}
        </span>
      )
    },
    {
      header: 'User ID',
      accessorKey: 'userId._id',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-purple-600">
          {info.getValue() || 'N/A'}
        </span>
      )
    },
    {
      header: 'User Name',
      accessorKey: 'userId.Name',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-purple-600">
          {info.getValue() || 'N/A'}
        </span>
      )
    },
    {
      header: 'User Email',
      accessorKey: 'userId.EmailAddress',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-indigo-600">
          {info.getValue() || 'N/A'}
        </span>
      )
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-emerald-600">
          ${info.getValue()}
        </span>
      )
    },
    {
      header: 'Method',
      accessorKey: 'paymentMethod',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-cyan-600">
          {info.getValue()}
        </span>
      )
    },
    {
      header: 'Wallet Address',
      accessorKey: 'walletAddress',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sky-600">
          {info.getValue()}
        </span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const color =
        info.getValue() === 'approved'
          ? 'bg-green-600'
          : info.getValue() === 'rejected'
          ? 'bg-red-600'
          : 'bg-yellow-600';
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
          {info.getValue()}
        </span>
      )
      }
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (info) => (
        <span className="px-2 py-1 rounded text-orange-600 text-sm">
          {formatTimestamp(info.getValue())}
        </span>
      )
    },
    {
      header: 'Actions',
      accessorKey: '_id',
      cell: (info) => {
        const request = withdrawals.find(w => w._id === info.getValue());
        if (request?.status === 'pending') {
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(info.getValue(), 'approved')}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(info.getValue(), 'rejected')}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </div>
          );
        }
        return null;
      }
    }
  ];
  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem('mytoken');
      const response = await fetch('https://overland-23a4680d9e06.herokuapp.com/api/admin/withdraw-requests', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.data)
      setWithdrawals(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
      toast.error('Failed to fetch withdrawal requests');
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchWithdrawals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
  }

  return (
    <div> 
     
        <Table 
          data={withdrawals} 
          columns={columns}
          pagination={true}
        />
     
    </div>
  );
};

export default WithdrawRequest;
