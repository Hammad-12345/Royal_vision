import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import { FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaWallet } from 'react-icons/fa';

const GoldTradingHistory = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);
  const [goldInvestments, setGoldInvestments] = useState([]);
  console.log(goldInvestments);
  const [investmentProfits, setInvestmentProfits] = useState({});

  const calculateRemainingDays = (createdAt) => {
    const investmentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - investmentDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const remainingDays = 15 - 15;
    return remainingDays > 0 ? remainingDays : 0;
  };

  const handleSendProfitToWallet = async (investmentId) => {
    try {
      const token = localStorage.getItem('mytoken');
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/sendprofittowallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ investmentId }),
      });

      if (!response.ok) throw new Error(await response.text());
      const result = await response.json();
      toast.success('Profit successfully sent to wallet!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send profit to wallet');
    }
  };

  useEffect(() => {
    const fetchGoldTradingData = async () => {
      try {
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

        const goldData = investments.filter(item => 
          item.investmentPlan === 'Gold Trading' && item.paymentMode === 'active'
        );
        setGoldInvestments(goldData);
        const total = goldData.reduce((sum, item) => sum + (item.price || 0), 0);
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

        // Filter profits for GoldTrading
        const goldProfits = profits.profits.filter(item => 
          item.investmentPlanId === 'Gold Trading'
        );

        // Calculate profits per investment
        const profitsPerInvestment = {};
        goldProfits.forEach(profit => {
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
        const totalProfitAmount = goldProfits.reduce((sum, item) => sum + (item.amount || 0), 0);
        setTotalProfit(totalProfitAmount);

        const today = new Date().toISOString().split('T')[0];
        const todayProfitAmount = goldProfits
          .filter(item => item.date?.split('T')[0] === today)
          .reduce((sum, item) => sum + (item.amount || 0), 0);
        setTodayProfit(todayProfitAmount);

      } catch (err) {
        console.error(err);
        toast.error('Failed to load Gold Trading data');
      }
    };

    fetchGoldTradingData();
  }, []);

  const InvestmentCard = ({ investment }) => {
    const profits = investmentProfits[investment._id] || { total: 0, today: 0 };
    const remainingDays = calculateRemainingDays(investment.createdAt);
    
    return (
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Investment</h3>
            <div className="text-2xl font-bold text-blue-400">
              <CountUp end={investment.price || 0} duration={2} prefix="$" separator="," />
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Status</h3>
            <div className="text-2xl font-bold">
              <span className="text-green-400">Active</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Daily Profit</h3>
            <div className="text-2xl font-bold">
              <span className="text-green-400">1.5% - 3.5%</span>
              <span className="text-gray-400 text-sm ml-2">(15 Days)</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Withdrawal</h3>
            <div className="text-2xl font-bold text-blue-400">After 15 days</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
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
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
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
          </div>

          <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full text-blue-400 bg-opacity-20">
                <FaWallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total Withdrawal</h3>
                <div className="text-xl font-bold text-blue-400">0$</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-blue-400" />
              <span className="text-gray-300">Investment Date</span>
            </div>
            <span className="text-blue-400 font-medium">
              {new Date(investment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaWallet className="text-blue-400" />
              <span className="text-gray-300">Withdrawal Status</span>
            </div>
            {remainingDays > 0 ? (
              <span className="text-yellow-400 font-medium">
                {remainingDays} days remaining until withdrawal
              </span>
            ) : (
              <button
                onClick={() => handleSendProfitToWallet(investment._id)}
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

  return (
    <div className="space-y-6">
      {goldInvestments.map((investment, index) => (
        <InvestmentCard key={investment._id || index} investment={investment} />
      ))}
    </div>
  );
};

export default GoldTradingHistory;
