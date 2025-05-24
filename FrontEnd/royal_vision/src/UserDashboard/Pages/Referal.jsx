import React, { useState } from 'react';
import { FaShareAlt, FaCopy, FaUsers, FaGift } from 'react-icons/fa';

const Referal = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "ROYAL123"; // This should come from your backend
  const referralStats = {
    totalReferrals: 5,
    successfulReferrals: 3,
    pendingReferrals: 2,
    rewardsEarned: 150
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Royal Vision',
        text: `Use my referral code ${referralCode} to join Royal Vision!`,
        url: window.location.origin
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold  mb-2">Refer & Earn</h1>
        <p className="text-xl">Invite your friends and earn rewards!</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Referral Code</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-2xl font-bold text-gray-700 px-6 py-3 bg-white rounded-lg border-2 border-dashed border-blue-500">
            {referralCode}
          </span>
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
              copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={handleCopyCode}
          >
            <FaCopy /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 mx-auto"
          onClick={handleShare}
        >
          <FaShareAlt /> Share with Friends
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Total Referrals</h3>
            <p className="text-2xl font-bold text-gray-800">{referralStats.totalReferrals}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaGift className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Successful Referrals</h3>
            <p className="text-2xl font-bold text-gray-800">{referralStats.successfulReferrals}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Pending Referrals</h3>
            <p className="text-2xl font-bold text-gray-800">{referralStats.pendingReferrals}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaGift className="text-3xl text-blue-500" />
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Rewards Earned</h3>
            <p className="text-2xl font-bold text-gray-800">${referralStats.rewardsEarned}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Share your code</h3>
            <p className="text-gray-600">Share your unique referral code with friends and family</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">They sign up</h3>
            <p className="text-gray-600">Your friends sign up using your referral code</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">You both earn</h3>
            <p className="text-gray-600">You and your friend both receive rewards!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referal;
