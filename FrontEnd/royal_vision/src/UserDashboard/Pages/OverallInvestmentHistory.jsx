import React, { useEffect, useState } from 'react';
import Table from '../Component/Table';
import { toast } from "react-toastify";
import { createColumnHelper } from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('investmentPlan', {
    header: 'Investment Plan',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('paymentMethod', {
    header: 'Payment Method',
  }),
  columnHelper.accessor('depositAddress', {
    header: 'Deposit Address',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: info => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString();
    },
  }),
  columnHelper.accessor('paymentMode', {
    header: 'Status',
    cell: info => {
      const value = info.getValue();
      const color =
        value === 'active'
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


const OverallInvestmentHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isHome = location.pathname === '/dashboard';
  const dataToShow = isHome ? data.slice(0, 5) : data;
  
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('mytoken');
        const res = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchallinvestment', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('mytoken'))}`,
          },
        });
        if (!res.ok) throw new Error(await res.text());
        const investments = await res.json();
        setData(investments);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load investments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  return (
    <div className="w-full block">
      <div className='flex justify-between items-center'>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Deposit History</h1>
        <h1 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Total {data.length}</h1>
      </div>
      <Table data={dataToShow} columns={columns} pagination={isHome? false:true} loading={isLoading} />

      {isHome && (
        <div className="mt-3 sm:mt-4 text-right">
          <button
            onClick={() => navigate('/investment-history')}
            className="text-blue-400 hover:underline text-sm sm:text-base"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default OverallInvestmentHistory;
