import React, { useEffect, useState } from 'react';
import Table from '../Component/Table';
import { FaSpinner } from 'react-icons/fa';

const Withdrawhistory = () => {
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


  const columns = [
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info) => (
        <span className="text-emerald-400 font-medium">${info.getValue()}</span>
      )
    },
    {
      header: 'Payment Method',
      accessorKey: 'paymentMethod',
      cell: (info) => (
        <span className="text-amber-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'Wallet Address',
      accessorKey: 'walletAddress',
      cell: (info) => (
        <span className="text-slate-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const status = info.getValue();
        let statusClass = '';
        switch (status) {
          case 'pending':
            statusClass = 'text-yellow-400';
            break;
          case 'approved':
            statusClass = 'text-green-400';
            break;
          case 'rejected':
            statusClass = 'text-red-400';
            break;
          default:
            statusClass = 'text-slate-400';
        }
        return (
          <span className={`${statusClass} font-medium capitalize`}>
            {status}
          </span>
        );
      }
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (info) => (
        <span className="text-slate-400 text-sm">{formatTimestamp(info.getValue())}</span>
      )
    }
  ];

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = localStorage.getItem('mytoken');
        const response = await fetch('http://localhost:8080/dashboard/withdrawrequests', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setWithdrawals(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching withdrawal history:', error);
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Withdrawal History</h1>
      {withdrawals.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No withdrawal requests found
        </div>
      ) : (
        <Table 
          data={withdrawals} 
          columns={columns}
          pagination={true}
        />
      )}
    </div>
  );
};

export default Withdrawhistory;
