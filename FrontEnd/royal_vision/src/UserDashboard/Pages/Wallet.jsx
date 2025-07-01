import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaWallet, FaExchangeAlt, FaHistory } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from "../Component/Table";
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
const Wallet = () => {
  const navigate = useNavigate();
  // Dummy data
  const walletData = {
    balance: 0,
    transactions: [
      {
        id: 1,
        type: "credit",
        amount: 0,
        description: "Payment Received",
        date: "2024-03-15",
      },
      {
        id: 2,
        type: "debit",
        amount: 0,
        description: "Service Payment",
        date: "2024-03-14",
      },
      {
        id: 3,
        type: "credit",
        amount: 0,
        description: "Refund",
        date: "2024-03-13",
      },
    ],
  };
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalApprovedWithdrawals, setTotalApprovedWithdrawals] = useState(0);
  const [profittowallet, setprofittowallet] = useState([]);
  const [referaltoWallet, setreferaltoWallet] = useState([]);
  const [withdrawRequest, setWithdrawRequest] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: "",
    paymentMethod: "bank",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchwalletbalance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("mytoken")
              )}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setWalletBalance(
          data.wallet?.walletBalance != null ? data.wallet.walletBalance : 0
        );
        setprofittowallet(data.ProfitToWallet ? data.ProfitToWallet : []);
        setreferaltoWallet(data.ReferalToWallet ? data.ReferalToWallet : []);
        setWithdrawRequest(
          data.WithdrawRequesthistory ? data.WithdrawRequesthistory : []
        );

        // Calculate total approved withdrawals
        const approvedWithdrawals = data.WithdrawRequesthistory
          ? data.WithdrawRequesthistory.filter(
              (request) => request.status === "approved"
            ).reduce((sum, request) => sum + (request.amount || 0), 0)
          : 0;
        setTotalApprovedWithdrawals(approvedWithdrawals);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWalletBalance();
  }, []);

  const columns = [
    {
      header: "Profit To Wallet Transfer Id",
      accessorKey: "_id",
      cell: (info) => (
        <span className="text-cyan-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "investmentId",
      accessorKey: "investmentId",
      cell: (info) => (
        <span className="text-indigo-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "investmentPlan",
      accessorKey: "investmentPlan",
      cell: (info) => (
        <span className="text-violet-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "originalAmount",
      accessorKey: "originalAmount",
      cell: (info) => <span className="text-sky-300">${info.getValue()}</span>,
    },
    {
      header: "profitAmount",
      accessorKey: "profitAmount",
      cell: (info) => (
        <span className="text-emerald-400 font-medium">${info.getValue()}</span>
      ),
    },
    {
      header: "paymentMethod",
      accessorKey: "paymentMethod",
      cell: (info) => <span className="text-amber-400">{info.getValue()}</span>,
    },
    {
      header: "createdAt",
      accessorKey: "createdAt",
      cell: (info) => (
        <span className="text-slate-400 text-sm">
          {formatTimestamp(info.getValue())}
        </span>
      ),
    },
  ];

  const ReferalToWalletColumns = [
    {
      header: "Referal To Wallet Transfer Id",
      accessorKey: "_id",
      cell: (info) => (
        <span className="text-cyan-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "Referal To Id",
      accessorKey: "ReferedTo",
      cell: (info) => (
        <span className="text-cyan-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "investment Id",
      accessorKey: "investmentId",
      cell: (info) => (
        <span className="text-indigo-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "investment Plan",
      accessorKey: "investmentPlan",
      cell: (info) => (
        <span className="text-violet-400 font-medium">{info.getValue()}</span>
      ),
    },
    {
      header: "Investment Amount",
      accessorKey: "InvestmentAmount",
      cell: (info) => <span className="text-sky-300">${info.getValue()}</span>,
    },
    {
      header: "Amount To Wallet",
      accessorKey: "AmountToWallet",
      cell: (info) => (
        <span className="text-emerald-400 font-medium">${info.getValue()}</span>
      ),
    },
    // {
    //   header: 'Remaining Investment Amount',
    //   accessorKey: 'RemainingInvestmentAmount',
    //   cell: (info) => (
    //     <span className="text-amber-400">{info.getValue()}</span>
    //   )
    // },
    {
      header: "createdAt",
      accessorKey: "createdAt",
      cell: (info) => (
        <span className="text-slate-400 text-sm">
          {formatTimestamp(info.getValue())}
        </span>
      ),
    },
  ];

  const WithdrawRequestColumns = [
    {
      header: "Withdrawal ID",
      accessorKey: "_id",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-blue-600">
          {info.getValue() || "N/A"}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-emerald-600">
          ${info.getValue()}
        </span>
      ),
    },
    {
      header: "Method",
      accessorKey: "paymentMethod",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-cyan-600">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Wallet Address",
      accessorKey: "walletAddress",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-sky-600">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const color =
          info.getValue() === "approved"
            ? "bg-green-600"
            : info.getValue() === "rejected"
            ? "bg-red-600"
            : "bg-yellow-600";
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
          >
            {info.getValue()}
          </span>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: (info) => (
        <span className="px-2 py-1 rounded text-orange-600 text-sm">
          {formatTimestamp(info.getValue())}
        </span>
      ),
    },
  ];

  return (
    <div className="relative space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <FaWallet className="text-4xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium opacity-90 mb-2">
                Available Balance
              </h3>
              {isLoading ? (
               <svg
               className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
             >
               <circle
                 className="opacity-25"
                 cx="12"
                 cy="12"
                 r="10"
                 stroke="currentColor"
                 strokeWidth="4"
               ></circle>
               <path
                 className="opacity-75"
                 fill="currentColor"
                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
               ></path>
             </svg>
              ) : (
                <h2 className="text-4xl font-semibold">${walletBalance}</h2>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1E2140] to-[#0F1120] rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <MdAccountBalance className="text-4xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium opacity-90 mb-2">
                Total Earnings
              </h3>
              {isLoading ? (
                <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              ) : (
                <>
                  <h2 className="text-4xl font-semibold">
                    ${walletBalance + totalApprovedWithdrawals}
                  </h2>
                  <p className="text-sm opacity-75 mt-2">
                    (Including {totalApprovedWithdrawals.toFixed(2)} withdrawn)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/Withdraw")}
          disabled={walletBalance < 20}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-blue-500 text-white`}
        >
          <GiCash /> Withdraw
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            showHistory
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <FaHistory /> History
        </button>
      </div>

      {showHistory && (
        <div className="space-y-8">
          {/* Profit to Wallet History Table */}
          <div className="shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Profit to Wallet History
            </h3>
            <Table data={profittowallet} columns={columns} pagination={true} />
          </div>

          {/* Referal to Wallet History Table */}
          <div className="shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Referal to Wallet History
            </h3>
            <Table
              data={referaltoWallet}
              columns={ReferalToWalletColumns}
              pagination={true}
            />
          </div>

          {/* Withdraw Request History Table */}
          <div className="shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Withdraw Request History
            </h3>
            <Table
              data={withdrawRequest}
              columns={WithdrawRequestColumns}
              pagination={true}
            />
          </div>
        </div>
      )}

      {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {walletData.transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="text-gray-800 font-medium">{transaction.description}</h4>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Wallet;
