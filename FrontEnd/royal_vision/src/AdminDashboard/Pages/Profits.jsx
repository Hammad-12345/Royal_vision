import React, { useState, useEffect } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Profits = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      header: 'User',
      accessorKey: 'userId._id',
      cell: ({ row }) => (
        <span className="font-medium text-white">{row.original.userId._id}</span>
      )
    },
    {
      header: 'User Email',
      accessorKey: 'userId.EmailAddress',
      cell: ({ row }) => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors">{row.original.userId.EmailAddress}</span>
      )
    },
    {
      header: 'Investment ID',
      accessorKey: 'investmentId._id',
      cell: ({ row }) => (
        <span className="font-medium text-white">{row.original.investmentId._id}</span>
      )
    },
    {
      header: 'Plan',
      accessorKey: 'investmentPlanId',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-900">
          {row.original.investmentPlanId}
        </span>
      )
    },
    {
      header: 'Invest Price',
      accessorKey: 'investmentId.price',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-900 text-purple-200">
          ${row.original.investmentId.price}
        </span>
      )
    },
    {
      header: 'Profit Amount',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-emerald-400">
          ${row.original.amount}
        </span>
      )
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }) => (
        <span className="text-gray-400">
          {new Date(row.original.date).toLocaleDateString()}
        </span>
      )
    }
  ];

  const fetchProfits = async () => {
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/profits');
      const data = await response.json();
      console.log(data)
      setProfits(data.profits);
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
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-xl shadow-md overflow-hidden">
        <div className="min-w-full">
          <Table 
            data={profits}
            columns={columns}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Profits; 