import React, { useState, useEffect } from 'react';
import { FaShareAlt, FaCopy, FaUsers, FaGift, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import Table from '../Component/Table';
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
const Referal = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    referredTo: []
  });
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    // Fetch user's referral code and stats
    const fetchReferralData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('mytoken'));
        const response = await fetch('http://localhost:8080/api/user/referral-data', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch referral data');
        }
        const data = await response.json();
        console.log(data)
        setReferralCode(data.referralCode);
        setReferralStats(data.stats);
        // Generate the full referral link
        const baseUrl = window.location.origin;
        setReferralLink(`${baseUrl}/signup/ref/${data.referralCode}`);
      } catch (error) {
        console.error('Error fetching referral data:', error);
      }
    };

    // Fetch referral earnings history
    const fetchEarningsHistory = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('mytoken'));
        const response = await fetch('http://localhost:8080/api/user/fetchreferalhistoryuser', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch earnings history');
        }
        const data = await response.json();
        console.log(data)
        setEarningsHistory(data.referralEarnings || []);
        setTotalEarnings(data.totalEarnings || 0);
      } catch (error) {
        console.error('Error fetching earnings history:', error);
      }
    };

    fetchReferralData();
    fetchEarningsHistory();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Royal Vision',
        text: `Use my referral link to join Royal Vision!`,
        url: referralLink
      });
    }
  };

  const earningsColumns = [
    {
      header: 'Referred User',
      accessorFn: (row) => row.ReferedTo?.EmailAddress || 'N/A',
    },
    {
      header: 'Investment Plan',
      accessorKey: 'InvestPlan',
    },
    {
      header: 'Amount',
      accessorFn: (row) => `$${row.InvestAmount.toFixed(2)}`,
    },
    {
      header: 'Earning',
      accessorFn: (row) => `$${row.Earning.toFixed(2)}`,
      cell: ({ getValue }) => (
        <span className="text-green-400">{getValue()}</span>
      ),
    },
    {
      header: 'Date',
      accessorFn: (row) => formatTimestamp(row.createdAt),
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold  mb-2">Refer & Earn</h1>
        <p className="text-xl">Invite your friends and earn rewards!</p>
      </div>

      <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">Your Referral Link</h2>
        <div className="flex sm:flex-row flex-col items-center justify-center gap-4 mb-6">
          <span className="text-lg font-bold text-white px-6 py-3 bg-gray-800 rounded-lg border-2 border-dashed border-blue-500 break-all">
            {referralLink || 'Loading...'}
          </span>
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
              copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={handleCopyCode}
          >
            <FaCopy /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 mx-auto"
          onClick={handleShare}
        >
          <FaShareAlt /> Share with Friends
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Total Referrals</h3>
            <p className="text-2xl font-bold text-white">{referralStats.totalReferrals}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaGift className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Successful Referrals</h3>
            <p className="text-2xl font-bold text-white">{referralStats.successfulReferrals}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Referred To</h3>
            <p className="text-2xl font-bold text-white">
              {referralStats.referredTo?.length > 0 ? referralStats.referredTo.length : "No one"}
            </p>
            {referralStats.referredTo?.length > 0 && (
              <button
                onClick={() => setShowDetails(true)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600"
              >
                View Details
              </button>
            )}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaMoneyBillWave className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Total Earnings</h3>
            <p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
          </div>
        </div> 
      
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-300 mb-1">Referred To</h3>
            <p className="text-2xl font-bold text-white">
              {referralStats.referredTo?.length > 0 ? referralStats.referredTo.length : "No one"}
            </p>
            {referralStats.referredTo?.length > 0 && (
              <button
                onClick={() => setShowDetails(true)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600"
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </div> */}

      {/* Referral Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-black">Referred Users</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {referralStats.referredTo.map((user, index) => (
                <div key={index} className="border-b py-3 last:border-b-0 space-y-0">
                  <p className="font-semibold text-black">Email:</p>
                  <p className="text-sm text-gray-600">{user.email || 'No email provided'}</p>
                  <p className="font-semibold text-black">
                    Joined:
                  </p>
                  <p className='text-sm text-gray-600'>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Earnings History Section */}
      <div className="rounded-xl shadow-md p-2 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 font-poppins">Earnings History</h2>
        {earningsHistory.length > 0 ? (
          <Table 
            data={earningsHistory} 
            columns={earningsColumns}
            pagination={true}
          />
        ) : (
          <p className="text-gray-300 text-center py-4">No earnings history available yet.</p>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-8 text-white">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Share your code</h3>
            <p className="text-gray-300">Share your unique referral code with friends and family</p>
          </div>
          <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">They sign up</h3>
            <p className="text-gray-300">Your friends sign up using your referral code</p>
          </div>
          <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">You both earn</h3>
            <p className="text-gray-300">You and your friend both receive rewards!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referal;
