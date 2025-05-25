import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import { FaChartLine, FaMoneyBillWave, FaCalendarAlt, FaWallet } from 'react-icons/fa';

const MineralWater = () => {
  const [totalInvestment, setTotalInvestment] = useState(0);

  useEffect(() => {
    const fetchMineralWaterInvestments = async () => {
      try {
        const token = localStorage.getItem('mytoken');
        const res = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/fetchallinvestment', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        if (!res.ok) throw new Error(await res.text());
        const investments = await res.json();

        const mineralWaterData = investments.filter(item => 
          item.investmentPlan === 'Mineral Water' && item.paymentMode === 'active'
        );
        const total = mineralWaterData.reduce((sum, item) => sum + (item.price || 0), 0);
        setTotalInvestment(total);

      } catch (err) {
        console.error(err);
        toast.error('Failed to load Mineral Water investments');
      }
    };

    fetchMineralWaterInvestments();
  }, []);

  const MetricCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <div className="text-xl font-bold mt-1">{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={FaChartLine}
          title="Total Investment"
          value={<CountUp end={totalInvestment.toFixed(2)} duration={2} prefix="$" separator="," />}
          color="text-pink"
        />
        
        <MetricCard
          icon={FaMoneyBillWave}
          title="Total Profit"
          value={<span className="text-green-400">$0</span>}
          color="text-green-400"
        />
        
        <MetricCard
          icon={FaCalendarAlt}
          title="Today's Profit"
          value={<span className="text-green-400">$0</span>}
          color="text-green-400"
        />
        
        <MetricCard
          icon={FaWallet}
          title="Total Withdrawal"
          value={<span className="text-blue-400">$0</span>}
          color="text-blue-400"
        />
      </div>

      <div className="bg-gradient-to-br from-[#0F1120] to-[#070c3e] p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-400" />
            <span className="text-gray-300">Scheduled Withdrawal</span>
          </div>
          <span className="text-blue-400 font-medium">$20 in 15 days</span>
        </div>
      </div>
    </div>
  );
};

export default MineralWater;
