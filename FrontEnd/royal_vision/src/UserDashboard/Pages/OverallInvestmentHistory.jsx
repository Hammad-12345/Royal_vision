import React from 'react';
import Table from '../Component/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('plan', {
    header: 'Investment Plan',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('date', {
    header: 'Date',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const value = info.getValue();
      const color =
        value === 'Active'
          ? 'bg-green-600'
          : value === 'Completed'
          ? 'bg-blue-600'
          : 'bg-yellow-600';
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
          {value}
        </span>
      );
    },
  }),
];

const fullData = [
    {
      plan: 'Gold Trading',
      price: '$1,000',
      date: '2025-05-01',
      status: 'Active'      
    },
    {
      plan: 'Airbnb',
      price: '$5,000',
      date: '2025-04-15',
      status: 'Completed',
    },
    {
      plan: 'Amazon FBA',
      price: '$2,500',
      date: '2025-03-20',
      status: 'Active',
    },
    {
      plan: 'Mineral Water',
      price: '$3,000',
      date: '2025-02-10',
      status: 'Pending',
    },
    {
      plan: 'Retro Drops',
      price: '$4,200',
      date: '2025-01-25',
      status: 'Completed',
    },
    {
      plan: 'Crypto Mining',
      price: '$6,000',
      date: '2024-12-05',
      status: 'Active',
    },
    {
      plan: 'Real Estate',
      price: '$10,000',
      date: '2024-11-01',
      status: 'Active',
    },
    {
      plan: 'NFT Flipping',
      price: '$1,500',
      date: '2024-10-15',
      status: 'Completed'
    },
    {
      plan: 'Stock Market',
      price: '$8,000',
      date: '2024-09-10',
      status: 'Active'
    },
    {
      plan: 'Poultry Farm',
      price: '$7,200',
      date: '2024-08-05',
      status: 'Pending',
    },
    {
      plan: 'Freight Shipping',
      price: '$15,000',
      date: '2024-07-20',
      status: 'Completed',
    },
    {
      plan: 'Solar Panels',
      price: '$3,400',
      date: '2024-06-30',
      status: 'Active',
    },
    {
      plan: 'Green Energy',
      price: '$9,800',
      date: '2024-05-18',
      status: 'Completed',
    },
    {
      plan: 'E-commerce SaaS',
      price: '$4,800',
      date: '2024-04-05',
      status: 'Active',
    },
    {
      plan: 'Food Truck',
      price: '$6,500',
      date: '2024-03-01',
      status: 'Pending',
    },
  ];

const OverallInvestmentHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const dataToShow = isHome ? fullData.slice(0, 5) : fullData;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Overall Investment History</h1>
      <Table data={dataToShow} columns={columns} pagination={isHome? false:true} />

      {isHome && (
        <div className="mt-4 text-right">
          <button
            onClick={() => navigate('/investment-history')}
            className="text-blue-400 hover:underline"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default OverallInvestmentHistory;
