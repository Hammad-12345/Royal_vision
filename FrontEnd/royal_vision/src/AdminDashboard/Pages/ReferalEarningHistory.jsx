import React, { useState, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../UserDashboard/Component/Table';
import { FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
const ReferalEarningHistory = () => {
  const [referralEarnings, setReferralEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('ReferedFrom._id', {
      header: 'Refered From ID',
      cell: (info) => (
        <span className="font-medium text-blue-400 hover:text-blue-300 transition-colors">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('ReferedFrom.EmailAddress', {
        header: 'Refered From Email',
        cell: (info) => (
          <span className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('ReferedTo._id', {
        header: 'Refered To ID',
        cell: (info) => (
          <span className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('ReferedTo.EmailAddress', {
          header: 'Refered To Email',
          cell: (info) => (
            <span className="font-medium text-violet-400 hover:text-violet-300 transition-colors">{info.getValue()}</span>
          ),
        }),
    columnHelper.accessor('InvestId._id', {
      header: 'Invest Id',
      cell: (info) => (
        <span className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('InvestPlan', {
      header: 'Plan',
      cell: (info) => (
        <span className="font-semibold text-green-500 hover:text-green-400 transition-colors">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('InvestAmount', {
      header: 'Amount',
      cell: (info) => (
        <span className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
          ${info.getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor('Earning', {
      header: 'Earnings',
      cell: (info) => (
        <span className="font-semibold text-purple-500 hover:text-purple-400 transition-colors">
          ${info.getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor('Earning', {
        header: 'Earning Percentage',
        cell: (info) => (
          <span className="font-semibold text-pink-500 hover:text-pink-400 transition-colors">
           3%
          </span>
        ),
      }),
    columnHelper.accessor('createdAt', {
      header: 'Date',
      cell: (info) => (
        <span className="text-gray-400 hover:text-gray-300 transition-colors">
           {formatTimestamp(info.getValue())}
        </span>
      ),
    }),
  ];

  const fetchReferralEarnings = async () => {
    try {
      const response = await fetch(
        'https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/fetchreferalearning',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch referral earnings');
      const data = await response.json();
      console.log(data.data)
      setReferralEarnings(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching referral earnings:', error);
      toast.error('Failed to load referral earnings');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralEarnings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Total Referral Earnings</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${referralEarnings.reduce((sum, earning) => sum + earning.Earning, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-md overflow-hidden">
        <Table data={referralEarnings} columns={columns} pagination={true} />
      </div>
    </div>
  );
};

export default ReferalEarningHistory;
