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
        <span className="font-medium">{row.original.userId._id}</span>
      )
    },
    {
      header: 'User Email',
      accessorKey: 'userId.EmailAddress',
      cell: ({ row }) => (
        <span className="font-medium">{row.original.userId.EmailAddress}</span>
      )
    },
    {
      header: 'Investment ID',
      accessorKey: 'investmentId._id',
      cell: ({ row }) => (
        <span className="font-medium">{row.original.investmentId._id}</span>
      )
    },
    {
      header: 'Investment Plan',
      accessorKey: 'investmentPlanId',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {row.original.investmentPlanId}
        </span>
      )
    },
    {
      header: 'Investment Price',
      accessorKey: 'investmentId.price',
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {row.original.investmentId.price}
        </span>
      )
    },
    {
      header: 'Profit Amount',
      accessorKey: 'amount',
      cell: ({ row }) => (
        <span className="font-semibold text-emerald-600">
          ${row.original.amount}
        </span>
      )
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }) => (
        <span className="text-gray-600">
          {new Date(row.original.date).toLocaleDateString()}
        </span>
      )
    }
  ];

  const fetchProfits = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/profits');
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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold text-white">Profits Detail</h1>
      <div className="overflow-x-auto rounded-lg shadow-sm">
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