import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userId.username',
        header: 'User',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'planId.name',
        header: 'Plan',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue() === 'active' ? 'bg-green-100 text-green-800' :
            info.getValue() === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: 'totalProfit',
        header: 'Total Profit',
        cell: (info) => `$${info.getValue()}`,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/investments');
        const data = await response.json();
        setInvestments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching investments:', error);
        setLoading(false);
      }
    };

    fetchInvestments();
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
      <h1 className="text-3xl font-poppins font-bold text-gray-800">Investments Management</h1>
      <Table 
        data={investments}
        columns={columns}
        pagination={true}
      />
    </div>
  );
};

export default Investments; 