import React, { useState, useEffect } from 'react';
import Table from '../../UserDashboard/Component/Table';

const Profits = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDistributionDate, setLastDistributionDate] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const processDailyProfits = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/process-profits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchProfits();
        console.log(await response.json());
      } else {
        console.error('Failed to process daily profits');
      }
    } catch (error) {
      console.error('Error processing daily profits:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchProfits = async () => {
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/profits');
      const data = await response.json();
      console.log(data);
      setProfits(data.profits);
      setLastDistributionDate(data.lastDistributionDate ? new Date(data.lastDistributionDate) : null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profits:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfits();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDistDate = lastDistributionDate ? new Date(lastDistributionDate) : null;
  if (lastDistDate) {
    lastDistDate.setHours(0, 0, 0, 0);
  }

  const isButtonDisabled = isProcessing || (lastDistDate && lastDistDate.getTime() === today.getTime());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-poppins font-bold text-white">Profits Management</h1>
        <button 
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-poppins transition-colors ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          onClick={processDailyProfits}
          disabled={isButtonDisabled}
        >
          {isProcessing ? 'Processing...' : 'Process Daily Profits'}
        </button>
      </div>

      <Table 
        data={profits}
        columns={columns}
        pagination={true}
      />
    </div>
  );
};

export default Profits; 