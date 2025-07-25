import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import { FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaWallet } from 'react-icons/fa';

const Airbnbhistory = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);
  const [airbnbInvestments, setAirbnbInvestments] = useState([]);
  const [investmentProfits, setInvestmentProfits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState({});

  const calculateRemainingDays = (createdAt) => {
    const investmentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - investmentDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const remainingDays = 30 - differenceInDays;
    return remainingDays > 0 ? remainingDays : 0;
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const remainingSeconds = diffInSeconds % 60;
    if (diffInSeconds < 60) return 'just now';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ${remainingSeconds > 0 ? `and ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
   
    if (diffInHours < 24) {
      if (remainingMinutes === 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      }
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} ${remainingSeconds > 0 ? `and ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const handleSendProfitToWallet = async (investment, profit) => {
    try {
      setLoadingInvestments(prev => ({ ...prev, [investment._id]: true }));
      const token = localStorage.getItem('mytoken');
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/sendprofittowallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ investment, profit }),
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      toast.success('Profit successfully sent to wallet!');
      fetchAirbnbData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send profit to wallet');
    } finally {
      setLoadingInvestments(prev => ({ ...prev, [investment._id]: false }));
    }
  };
  const fetchAirbnbData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('mytoken');
      // Fetch investments
      const investmentRes = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchallinvestment', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!investmentRes.ok) throw new Error(await investmentRes.text());
      const investments = await investmentRes.json();

      const airbnbData = investments.filter(item => 
        item.investmentPlan === 'AirBnB' && item.paymentMode === 'active'
      ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setAirbnbInvestments(airbnbData);
      const total = airbnbData.reduce((sum, item) => sum + (item.price || 0), 0);
      setTotalInvestment(total);

      // Fetch profits
      const profitRes = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchprofit', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!profitRes.ok) throw new Error(await profitRes.text());
      const profits = await profitRes.json();

      // Filter profits for Airbnb
      const airbnbProfits = profits.profits.filter(item => 
        item.investmentPlanId === 'AirBnB' && item.sendtoWallet === false
      );

      // Calculate profits per investment
      const profitsPerInvestment = {};
      airbnbProfits.forEach(profit => {
        if (!profitsPerInvestment[profit.investmentId]) {
          profitsPerInvestment[profit.investmentId] = {
            total: 0,
            today: 0
          };
        }
        profitsPerInvestment[profit.investmentId].total += profit.amount || 0;
        
        const today = new Date().toISOString().split('T')[0];
        if (profit.date?.split('T')[0] === today) {
          profitsPerInvestment[profit.investmentId].today += profit.amount || 0;
        }
      });
      setInvestmentProfits(profitsPerInvestment);

      // Calculate total profit and today's profit
      const totalProfitAmount = airbnbProfits.reduce((sum, item) => sum + (item.amount || 0), 0);
      setTotalProfit(totalProfitAmount);

      const today = new Date().toISOString().split('T')[0];
      const todayProfitAmount = airbnbProfits
        .filter(item => item.date?.split('T')[0] === today)
        .reduce((sum, item) => sum + (item.amount || 0), 0);
      setTodayProfit(todayProfitAmount);

    } catch (err) {
      console.error(err);
      toast.error('Failed to load Airbnb data');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAirbnbData();
  }, []);

  const InvestmentCard = ({ investment, index }) => {
    const profits = investmentProfits[investment._id] || { total: 0, today: 0 };
    const remainingDays = calculateRemainingDays(investment.updatedAt);
    const isLoading = loadingInvestments[investment._id];
    
    return (
      <div className="space-y-6 mb-8 border border-gray-600 p-4 rounded-lg">
        <div className="flex">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-lg font-medium">
            Investment 0{index + 1}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Investment</h3>
            <div className="text-2xl font-bold text-blue-400">
             {
              investment.price > 0 ? <span className="text-blue-400">${investment.price}</span> : 'N/A'
             }
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-green-400 bg-opacity-20">
                <FaMoneyBillWave className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Profit</h3>
                <div className="text-xl font-bold text-green-400">
                  {
                    profits.total > 0 ? <span className="text-green-400">${profits.total}</span> : 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-green-400 bg-opacity-20">
                <FaCalendarAlt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Today's Profit</h3>
                <div className="text-xl font-bold text-green-400">
                  {
                    profits.today > 0 ? <span className="text-green-400">${profits.today}</span> : 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Status</h3>
            <div className="text-2xl font-bold">
              <span className="text-green-400">Active</span>
            </div>
          </div> */}

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Daily Profit</h3>
            <div className="text-2xl font-bold">
              <span className="text-green-400">7.5% - 10% of earned profit</span>
              <span className="text-gray-400 text-sm ml-2">(30 Days)</span>
            </div>
          </div> */}

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Withdrawal</h3>
            <div className="text-2xl font-bold text-blue-400">After 30 days</div>
          </div> */}
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-pink bg-opacity-20">
                <FaChartLine className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Investment</h3>
                <div className="text-xl font-bold">
                  <CountUp end={investment.price || 0} duration={2} prefix="$" separator="," />
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-green-400 bg-opacity-20">
                <FaMoneyBillWave className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Profit</h3>
                <div className="text-xl font-bold text-green-400">
                  <CountUp end={profits.total} duration={2} prefix="$" separator="," />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-green-400 bg-opacity-20">
                <FaCalendarAlt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Today's Profit</h3>
                <div className="text-xl font-bold text-green-400">
                  <CountUp end={profits.today} duration={2} prefix="$" separator="," />
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-blue-400 bg-opacity-20">
                <FaWallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Withdrawal</h3>
                <div className="text-xl font-bold text-blue-400">0$</div>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
          <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-blue-400" />
              <span className="text-gray-300">Investment Date</span>
            </div>
            <div className="sm:text-right">
              <span className="text-blue-400 font-medium">
                {new Date(investment.createdAt).toLocaleString()}
              </span>
              <div className="sm:text-sm text-xs text-gray-400">
                {formatRelativeTime(investment.createdAt)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex sm:flex-row flex-col sm:space-y-0 space-y-2 sm:items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaWallet className="text-blue-400" />
              <span className="text-gray-300">Withdrawal Status</span>
            </div>
            {remainingDays > 0 ? (
              <span className="text-white font-medium">
           <span className="text-white font-bold text-xl"> {remainingDays} </span> days remaining until send profit to wallet for withdrawal </span>
            
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={() => handleSendProfitToWallet(investment, profits.total)}
                  disabled={isLoading || profits.total <= 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isLoading || profits.total <= 0
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaWallet className="w-4 h-4" />
                      <span>Send to Wallet</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
         <div className="w-full flex justify-center items-center min-h-[200px]">
         <svg
           className="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
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
       </div>
      ) : airbnbInvestments.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          No Airbnb investments found
        </div>
      ) : (
        airbnbInvestments.map((investment, index) => (
          <InvestmentCard key={investment._id || index} investment={investment} index={index} />
        ))
      )}
    </div>
  );
};

export default Airbnbhistory;
