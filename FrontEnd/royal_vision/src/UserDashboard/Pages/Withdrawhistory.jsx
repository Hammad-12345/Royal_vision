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
        <span className="text-slate-400 text-sm">{formatTimestamp(info.getValue())}</span>
      )
    }
  ];

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = localStorage.getItem('mytoken');
        const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/withdrawrequests', {
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Withdrawal History</h1>
      <Table 
        data={withdrawals} 
        columns={columns}
        pagination={true}
        loading={loading}
      />
    </div>
  );
};

export default Withdrawhistory;
