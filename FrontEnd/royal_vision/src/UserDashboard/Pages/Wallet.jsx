import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaWallet, FaExchangeAlt, FaHistory } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
const Wallet = () => {
  const navigate = useNavigate();
  // Dummy data
  const walletData = {
    balance: 0,
    transactions: [
      { id: 1, type: 'credit', amount: 0, description: 'Payment Received', date: '2024-03-15' },
      { id: 2, type: 'debit', amount: 0, description: 'Service Payment', date: '2024-03-14' },
      { id: 3, type: 'credit', amount: 0, description: 'Refund', date: '2024-03-13' },
    ]
  };
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    paymentMethod: 'bank'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const response = await fetch("http://localhost:8080/dashboard/fetchwalletbalance",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("mytoken"))}`
          }
        }
      );
      const data = await response.json(); 
      console.log(data);
      setWalletBalance(data.walletBalance!=null?data.walletBalance:0);
    };
    fetchWalletBalance();
  }, []);

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/dashboard/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("mytoken"))}`
        },
        body: JSON.stringify(withdrawalForm)
      });
      const data = await response.json();
      if (response.ok) {
        setWalletBalance(prev => prev - withdrawalForm.amount);
        setIsWithdrawModalOpen(false);
        // Reset form
        setWithdrawalForm({ amount: '', paymentMethod: 'bank' });
      } else {
        alert(data.message || 'Withdrawal failed');
      }
    } catch (error) {
      alert('Error processing withdrawal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
        <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <FaWallet className="text-4xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium opacity-90 mb-2">Available Balance</h3>
              <h2 className="text-4xl font-semibold">
                $<CountUp
                  end={walletBalance}
                  decimals={2}
                  duration={2.5}
                  separator=","
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => navigate("/Withdraw")}
          disabled={walletBalance < 50}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors bg-blue-500 text-white` }
        >
          <GiCash /> Withdraw
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          <FaHistory /> History
        </button>
      </div>

      

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
