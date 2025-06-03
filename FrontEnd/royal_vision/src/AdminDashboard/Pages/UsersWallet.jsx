import React, { useEffect, useState } from 'react';

const UsersWallet = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/userswallet');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setWallets(data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Could not load wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Wallets</h1>
        <p className="text-gray-400 mt-2">Manage and monitor user wallet balances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-white dark:bg-[#1E2140] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{wallet.user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.user.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Wallet ID</span>
                  <p className="text-sm  text-gray-700 dark:text-gray-300 break-words">{wallet.id}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Balance</span>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${wallet.balance.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(wallet.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersWallet;
