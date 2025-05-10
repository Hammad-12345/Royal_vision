import React from 'react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Gold Trading',
    price: '$100',
    evaluation: '2x in 6 months',
    accountType: 'Daily profit: 1.5%',
    withdrawal: 'Every 15 days',
    balance: '$100',
    drawdown: 'N/A',
    fee: 'N/A',
  },
  {
    name: 'RetroDrops',
    price: '$1000',
    evaluation: '2x in 6 months',
    accountType: 'No daily profit',
    withdrawal: 'After 6 months',
    balance: '$1000',
    drawdown: 'N/A',
    fee: 'N/A',
  },
  {
    name: 'Amazon',
    price: '$100',
    evaluation: '13% to 15% monthly',
    accountType: 'Monthly Profit',
    withdrawal: 'Monthly',
    balance: '$100',
    drawdown: 'N/A',
    fee: 'N/A',
  },
  {
    name: 'AirBnB',
    price: '$200',
    evaluation: '7.5% to 10% monthly',
    accountType: 'Monthly Profit',
    withdrawal: 'Monthly',
    balance: '$200',
    drawdown: 'N/A',
    fee: 'N/A',
  },
  {
    name: 'Mineral Water (Coming Soon)',
    price: '$500',
    evaluation: '12.5% to 20% monthly',
    accountType: 'Monthly Profit',
    withdrawal: 'Monthly',
    balance: '$500',
    drawdown: 'N/A',
    fee: 'N/A',
  },
];

const PricingPlans = ({ showAll = false }) => {
  const visiblePlans = showAll ? plans : plans.slice(0, 3);

  return (
    <div className="p-6 font-poppins bg-gradient-to-r from-black via-blue-950 to-black">
      <h2 className="text-4xl font-bold text-center text-white mb-10">Investment <span className='text-blue-600 font-extrabold'>Plans Overview </span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePlans.map((plan, index) => (
          <div
            key={index}
            className="bg-gradient-to-br relative from-[#0F1120] to-[#1E2140] text-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-lg font-bold text-blue-400 mb-3">Price: {plan.price}</p>
            <p className="text-sm font-medium mb-2">{plan.balance} <span className="inline-block ml-2 px-3 py-1 bg-blue-900 rounded-full text-blue-300">{plan.accountType}</span></p>
            <p className="text-sm text-gray-300 mb-1">Evaluation: {plan.evaluation}</p>
            <hr className="my-4 border-gray-600" />
            <div className="space-y-1 text-sm text-gray-300">
              <p><span className="font-medium">Withdrawal:</span> {plan.withdrawal}</p>
              <p><span className="font-medium">Balance:</span> {plan.balance}</p>
              <p><span className="font-medium">Max Sim Drawdown:</span> {plan.drawdown}</p>
              <p><span className="font-medium">Analyst Performance Fee:</span> {plan.fee}</p>
            </div>
            <div className="flex justify-between mt-6">
              
              <button className="px-4 py-2 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition">Buy Preset</button>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <div className="text-center mt-8 relative ">
          <Link to="/plans" className="inline-block px-6 py-2 bg-blue-600 font-semibold rounded-full text-white hover:bg-blue-700 transition">
            View All Plans
          </Link>
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
