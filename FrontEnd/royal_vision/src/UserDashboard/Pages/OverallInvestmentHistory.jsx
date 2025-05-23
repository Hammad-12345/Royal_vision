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
  const [data,setData]=useState([])

  const isHome = location.pathname === '/';
  const dataToShow = isHome ? data.slice(0, 5) : data;
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('mytoken'); // adjust key as you stored it
        const res = await fetch('http://localhost:8080/dashboard/fetchallinvestment', {
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
      }
    };

    fetchInvestments();
  }, []);
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
