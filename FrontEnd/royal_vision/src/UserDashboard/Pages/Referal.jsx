import React, { useState, useEffect } from 'react';
import { FaShareAlt, FaCopy, FaUsers, FaGift, FaTimes, FaMoneyBillWave } from 'react-icons/fa';
import Table from '../Component/Table';
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
const Referal = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState({});
  const [isReferralDataLoading, setIsReferralDataLoading] = useState(true);
  const [isEarningsLoading, setIsEarningsLoading] = useState(true);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    successfulReferrals: 0,
    referredTo: []
  });
  const [earningsHistory, setEarningsHistory] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [referaltowallethistory, setReferaltowallethistory] = useState([]);
  const fetchEarningsHistory = async () => {
    setIsEarningsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('mytoken'));
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/user/fetchreferalhistoryuser', {
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
      setReferaltowallethistory(data.fetchReferaltowallethistory || []);
      setTotalEarnings(data.totalEarnings || 0);
    } catch (error) {
      console.error('Error fetching earnings history:', error);
    } finally {
      setIsEarningsLoading(false);
    }
  };
  useEffect(() => {
    // Fetch user's referral code and stats
    const fetchReferralData = async () => {
      setIsReferralDataLoading(true);
      try {
        const token = JSON.parse(localStorage.getItem('mytoken'));
        const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/user/referral-data', {
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
      } finally {
        setIsReferralDataLoading(false);
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
      cell: (info) => (
        <span className="text-blue-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Investment Id',
      accessorFn: (row) => row.InvestId._id || 'N/A',
      cell: (info) => (
        <span className="text-blue-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Investment Plan',
      accessorKey: 'InvestPlan',
      cell: (info) => (
        <span className="text-emerald-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Amount',
      accessorFn: (row) => `$${row.InvestAmount}`,
      cell: (info) => (
        <span className="text-amber-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Earning',
      accessorFn: (row) => `$${row.Earning}`,
      cell: (info) => (
        <span className="text-green-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Earning %',
      cell: () => (
        <span className="text-purple-400 font-medium">
          3%
        </span>
      ),
    },
    {
      header: 'Date',
      accessorFn: (row) => formatTimestamp(row.createdAt),
      cell: (info) => (
        <span className="text-cyan-400 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (row) => (
        <button
          className={`inline-flex items-center px-3 py-3 text-white text-sm font-medium rounded-lg transition-all duration-200 ${
            row.row.original.referalwalletflag 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => !row.row.original.referalwalletflag && handleAction(row.row.original)}
          disabled={row.row.original.referalwalletflag || isLoading[row.row.original._id]}
        >
          {isLoading[row.row.original._id] ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : row.row.original.referalwalletflag ? (
            'Already Sent to Wallet'
          ) : (
            'Send Referal Earning To Wallet'
          )}
        </button>
      ),
    },
  ];
  const referaltowallethistorycolumns = [
    {
        header: 'Referel to wallet transfer Id',
        accessorFn: (row) => row._id || 'N/A',
        cell: (info) => (
            <span className="text-gray-300 font-medium">
                {info.getValue()}
            </span>
        )
    },
    {
        header: 'Refered User Id',
        accessorFn: (row) => row.ReferedTo || 'N/A',
        cell: (info) => (
            <span className="text-blue-400 font-medium">
                {info.getValue()}
            </span>
        )
    },
    {
      header: 'Investment Id',
      accessorFn: (row) => row.investmentId || 'N/A',
      cell: (info) => (
          <span className="text-blue-400 font-medium">
              {info.getValue()}
          </span>
      )
  },
    {
        header: 'Investment Plan',
        accessorKey: 'investmentPlan',
        cell: (info) => (
            <span className="text-emerald-400 font-medium">
                {info.getValue()}
            </span>
        )
    },
    {
        header: 'Investment Amount',
        accessorKey: 'InvestmentAmount',
        cell: (info) => (
            <span className="text-green-400 font-medium">
                ${info.getValue().toLocaleString()}
            </span>
        )
    },
    {
        header: 'Amount To Wallet',
        accessorKey: 'AmountToWallet',
        cell: (info) => (
            <span className="text-amber-400 font-medium">
                ${info.getValue().toLocaleString()}
            </span>
        )
    },
    // {
    //     header: 'Remaining Amount',
    //     accessorKey: 'RemainingInvestmentAmount',
    //     cell: (info) => (
    //         <span className="text-orange-400 font-medium">
    //             ${parseFloat(info.getValue()).toLocaleString()}
    //         </span>
    //     )
    // },
    {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: (info) => (
            <span className="text-cyan-400 font-medium">
                {formatTimestamp(info.getValue())}
            </span>
        )
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                info.getValue() === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
                {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
            </span>
        )
    }
];
  const handleAction = async(row) => {
    if(totalEarnings > 50)
    {
      setIsLoading(prev => ({ ...prev, [row._id]: true }));
      try {
        const token = JSON.parse(localStorage.getItem('mytoken'));
        const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/user/sendreferalearningtowallet', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(row)
        });

        if (!response.ok) {
          throw new Error('Failed to send earnings to wallet');
        }

        const data = await response.json();
        toast.success('Earnings sent to wallet successfully!');
        fetchEarningsHistory(); // Refresh the data
      } catch (error) {
        console.error('Error sending earnings to wallet:', error);
        toast.error(error.message || 'Failed to send earnings to wallet');
      } finally {
        setIsLoading(prev => ({ ...prev, [row._id]: false }));
      }
    }
  };
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold  mb-2">Refer & Earn</h1>
        <p className="text-xl">Invite your friends and earn rewards!</p>
      </div>

      <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">Your Referral Link</h2>
        <div className="flex sm:flex-row flex-col items-center justify-center gap-4 mb-6">
          {isReferralDataLoading ? (
            <div className="flex items-center justify-center w-full">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 mx-auto"
          onClick={handleShare}
          disabled={isReferralDataLoading}
        >
          <FaShareAlt /> Share with Friends
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {isReferralDataLoading ? (
          // Loading skeleton for stats
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] p-6 rounded-xl shadow-md flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          ))
        ) : (
          <>
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
          </>
        )}
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
        <h2 className="text-2xl font-semibold text-white mb-6 font-poppins">Referal Earning History</h2>
        {/* {isEarningsLoading ? (
          <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
      ) : ( */}
          <Table 
            data={earningsHistory} 
            columns={earningsColumns}
            pagination={true}
            loading={isEarningsLoading}
          />
        {/* )} */}
      </div>


       {/* Earnings History Section */}
       <div className="rounded-xl shadow-md p-2 mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 font-poppins">Referal To Wallet History</h2>
        {/* {isEarningsLoading ? (
          <div className="flex items-center justify-center py-8">
            <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : ( */}
          <Table 
            data={referaltowallethistory} 
            columns={referaltowallethistorycolumns}
            pagination={true}
            loading={isEarningsLoading}
          />
        {/* )} */}
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
            <p className="text-gray-300">You receive 3% directly and 3% of the investor’s profit every time they withdraw.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referal;
