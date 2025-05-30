import React, { useState, useEffect } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Profits = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      header: 'User',
      accessorKey: 'userId',
      cell: ({ row }) => row.original.userId
    },
    {
      header: 'Investment Plan',
      accessorKey: 'investmentPlanId',
      cell: ({ row }) => row.original.investmentPlanId
    },
    {
      header: 'Investment ID',
      accessorKey: 'investmentId',
      cell: ({ row }) => row.original.investmentId
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ row }) => `$${row.original.amount}`
    },
    {
      header: 'Date',
      accessorKey: 'date',
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString()
    }
  ];

  const fetchProfits = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/profits');
      const data = await response.json();
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
      <Table 
        data={profits}
        columns={columns}
        pagination={true}
      />
    </div>
  );
};

export default Profits; 