import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import { FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';

const Retrodrops = () => {
  const [loading, setLoading] = useState(true);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);
  const [retrodropsInvestments, setRetrodropsInvestments] = useState([]);
  console.log(retrodropsInvestments);
  const [investmentProfits, setInvestmentProfits] = useState({});

  const calculateRemainingDays = (createdAt) => {
    const investmentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - investmentDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const remainingDays = 180 - differenceInDays;
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
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const handleSendProfitToWallet = async (investment,profit) => {
    try {
      const token = localStorage.getItem('mytoken');
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/sendprofittowallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ investment,profit }),
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      toast.success('Profit successfully sent to wallet!');
      fetchRetrodropsData();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send profit to wallet');
    }
  };

  const fetchRetrodropsData = async () => {
    try {
      setLoading(true);
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

      const retrodropsData = investments.filter(item => 
        item.investmentPlan === 'RetroDrops' && item.paymentMode === 'active'
      ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setRetrodropsInvestments(retrodropsData);
      const total = retrodropsData.reduce((sum, item) => sum + (item.price || 0), 0);
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
      console.log(profits);

      // Filter profits for Retrodrops
      const retrodropsProfits = profits.profits.filter(item => 
        item.investmentPlanId === 'RetroDrops'
      );

      // Calculate profits per investment
      const profitsPerInvestment = {};
      retrodropsProfits.forEach(profit => {
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
      const totalProfitAmount = retrodropsProfits.reduce((sum, item) => sum + (item.amount || 0), 0);
      setTotalProfit(totalProfitAmount);

      const today = new Date().toISOString().split('T')[0];
      const todayProfitAmount = retrodropsProfits
        .filter(item => item.date?.split('T')[0] === today)
        .reduce((sum, item) => sum + (item.amount || 0), 0);
      setTodayProfit(todayProfitAmount);

    } catch (err) {
      console.error(err);
      toast.error('Failed to load Retrodrops data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetrodropsData();
  }, []);

  const InvestmentCard = ({ investment, index }) => {
    const profits = investmentProfits[investment._id] || { total: 0, today: 0 };
    console.log(profits)
    const remainingDays = calculateRemainingDays(investment.createdAt);
    
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
                    profits.total > 0 ? <span className="text-green-400">${Math.floor(profits.total)}</span> : 'N/A'
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
                    profits.today > 0 ? <span className="text-green-400">${Math.floor(profits.today)}</span> : 'N/A'
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
              <span className="text-green-400">35% - 50%</span>
              <span className="text-gray-400 text-sm ml-2">(180 Days)</span>
            </div>
          </div> */}

          {/* <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Withdrawal</h3>
            <div className="text-2xl font-bold text-blue-400">After 6 months</div>
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
               <span className='text-white font-bold text-xl'>{remainingDays}</span> days remaining until send profit to wallet for withdrawal
              </span>
            ) : (
              <button
                onClick={() => handleSendProfitToWallet(investment,Math.floor(profits.total))}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Send Profit to Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {retrodropsInvestments.map((investment, index) => (
        <InvestmentCard key={investment._id || index} investment={investment} index={index} />
      ))}
    </div>
  );
};

export default Retrodrops;
