import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'userId',
        header: 'User ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'userEmail',
        header: 'Email',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'investmentPlan',
        header: 'Investment Plan',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'price',
        header: 'Amount',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
      {
        accessorKey: 'paymentMode',
        header: 'Payment Mode',
        cell: (info) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue() === 'active' ? 'bg-green-100 text-green-800' :
            info.getValue() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
          </span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/investments');
        const data = await response.json();
        setInvestments(data.data);
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
      <div className="overflow-x-auto">
        <Table 
          data={investments} 
          columns={columns} 
          pagination={true}
        />
      </div>
    </div>
  );
};

export default Investments; 