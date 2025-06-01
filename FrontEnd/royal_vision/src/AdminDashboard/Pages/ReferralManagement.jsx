import React, { useState, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../UserDashboard/Component/Table';
import { FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
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
const ReferralManagement = () => {
  const [referralInvestments, setReferralInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedreferral, updateselectedreferral] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedreferral);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('referrer.email', {
      header: 'Referred User',
      cell: (info) => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('referredUser.email', {
      header: 'Referrer',
      cell: (info) => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors">
          {info.getValue()}
        </span>
      ),
    }),
    // columnHelper.accessor('amount', {
    //   header: 'Investment Amount',
    //   cell: (info) => (
    //     <span className="font-semibold text-emerald-600">
    //       ${info.getValue()}
    //     </span>
    //   ),
    // }),
    columnHelper.accessor('referralEarned', {
      header: 'Earnings',
      cell: (info) => (
        <span className="font-semibold text-purple-600">
         3%
        </span>
      ),
    }),
    columnHelper.accessor('referralEarnTransfer', {
      header: 'Status',
      cell: (info) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          info.getValue() ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {info.getValue() ? 'Paid' : 'Pending'}
        </span>
      ),
    }),
    // columnHelper.accessor('createdAt', {
    //   header: 'Investment Date',
    //   cell: (info) => (
    //     <span className="text-gray-400">
    //       {new Date(info.getValue()).toLocaleDateString()}
    //     </span>
    //   ),
    // }),
    columnHelper.accessor('_id', {
      header: 'Actions',
      cell: (info) => (
        <button
          onClick={() => handleReferralEarning(info.row.original)}
          disabled={info.row.original.referralEarnTransfer}
          className={`px-3 py-1 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600'`}
        >
          Process Referral
        </button>
      ),
    }),
  ];

  const fetchReferralInvestments = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/admin/referred-investments',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch referral investments');
      const data = await response.json();
      console.log(data.data)
      setReferralInvestments(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching referral investments:', error);
      toast.error('Failed to load referral investments');
      setLoading(false);
    }
  };

  const handleReferralEarning = async (investment) => {
    updateselectedreferral([investment]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    updateselectedreferral([]);
  };

  const detailColumns = [
    columnHelper.accessor('id', {
      header: 'Invest ID',
      cell: (info) => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('plan', {
      header: 'Invest Plan',
      cell: (info) => (
        <span className="text-blue-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('amount', {
      header: 'Investment Amount',
      cell: (info) => (
        <span className="font-semibold text-emerald-600">
          ${info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <span className="font-semibold text-purple-600">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => (
        <span className="text-gray-400">
          {formatTimestamp(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor('', {
      header: 'Action',
      cell: (info) => (
        <button
        onClick={() => sendreferalearning(info.row.original)}
        // disabled={info.row.original.referralEarnTransfer}
        className={`px-3 py-1 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600'`}
      >
        Send Referral Earning
      </button>
      ),
    }),
  ];
const sendreferalearning=async(investmentamount)=>
{
  const referralEarning = investmentamount.amount * 0.03;
  console.log('Investment Amount:', investmentamount.amount);
  console.log('Referral Earning (3%):', referralEarning);
  try {
    const res = await fetch(
      'http://localhost:8080/api/admin/sendreferalearning',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ReferedFrom:selectedreferral[0].referrer.id,
          ReferedTo:selectedreferral[0].referredUser.id,
          InvestId:investmentamount.id,
          InvestPlan:investmentamount.plan,
          InvestAmount:investmentamount.amount,
          Earning: referralEarning,

        }),
      });
      const data=await res.json()
      toast.success(data.message)
      setIsModalOpen(false)
      fetchReferralInvestments()
  } catch (error) {
    toast.error(error)
  }
}
  useEffect(() => {
    fetchReferralInvestments();
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
          {/* <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Total Referral Earnings</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${referralInvestments.reduce((sum, inv) => sum + (inv.amount * 0.03), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div> */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <FaUserFriends className="text-green-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Active Referrals</p>
                <p className="text-lg font-semibold text-gray-800">
                  {referralInvestments.filter(inv => !inv.referralEarnTransfer).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-md overflow-hidden">
        <Table data={referralInvestments} columns={columns} pagination={true} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">Referral Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className='grid grid-cols-2 text-black'>
              <div className='border-r'>
                <h2 className='font-bold'>Referred User</h2>
                <span>{selectedreferral[0].referrer.email}</span>
              </div>
              <div>
                <h2 className='font-bold'>Referrer User</h2>
                <span>{selectedreferral[0].referredUser.email}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h3 className="font-bold text-black mb-2">Investment Details</h3>
              {selectedreferral[0].investments.map((investment, index) => (
                <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Investment Amount</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        ${investment.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Referral Earnings (3%)</p>
                      <p className="text-lg font-semibold text-purple-600">
                        ${(investment.amount * 0.03).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Plan</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {investment.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-lg font-semibold text-green-600">
                        {investment.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl shadow-md overflow-hidden">
              <Table data={selectedreferral[0].investments} columns={detailColumns} pagination={false} />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralManagement; 