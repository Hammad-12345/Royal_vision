import React from "react";
import Totalinvestchart from "../Component/Totalinvestchart";
import Totalprofitchart from "../Component/Totalprofitchart";
import Table from "../Component/Table";
import OverallInvestmentHistory from "./OverallInvestmentHistory";

const cardData = [
  { title: "Total Invest", count: 0 },
  { title: "Total Profit", count: 0 },
  { title: "Gold Trading", count: 0 },
  { title: "Air bnb", count: 0 },
  { title: "Amazon", count: 0 },
  { title: "Mineral Water", count: 0 },
  { title: "Retro Drops", count: 0 },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Cards Section */}
      <div className="font-poppins grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card) => (
          <div
            key={card.title}
            className="bg-gradient-to-br h-36 from-[#0F1120] to-[#070c3e] space-y-4 rounded-2xl p-6 shadow-lg text-white"
          >
            <h2 className="text-lg mb-2">{card.title}</h2>
            <p className="text-xl">{card.count}$</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <h2 className="text-2xl font-bold">
        Charts
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Totalinvestchart/>
        <Totalprofitchart/>
      </div>
      <OverallInvestmentHistory/>
    </div>
  );
};

export default Dashboard;
