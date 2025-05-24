import React from 'react';
import CountUp from 'react-countup';
import { FaWallet, FaExchangeAlt, FaHistory } from 'react-icons/fa';

const Wallet = () => {
  // Dummy data
  const walletData = {
    balance: 25000.50,
    transactions: [
      { id: 1, type: 'credit', amount: 5000, description: 'Payment Received', date: '2024-03-15' },
      { id: 2, type: 'debit', amount: 1500, description: 'Service Payment', date: '2024-03-14' },
      { id: 3, type: 'credit', amount: 3000, description: 'Refund', date: '2024-03-13' },
    ]
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <FaWallet className="text-4xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium opacity-90 mb-2">Available Balance</h3>
              <h2 className="text-4xl font-semibold">
                $<CountUp
                  end={walletData.balance}
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
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          <FaExchangeAlt /> Transfer
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          <FaHistory /> History
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
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
      </div>
    </div>
  );
};

export default Wallet;
