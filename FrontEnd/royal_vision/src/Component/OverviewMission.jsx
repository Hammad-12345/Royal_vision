import React from "react";
import { Link } from "react-router-dom";
const OverviewMission = () => {
  const overviewmissionvision = [
    {
      Title: "Overview",
      paragraph:
        "Overland Solutions is a premier trading firm dedicated to empowering individuals and institutions with the tools, technology, and insight needed to navigate global financial markets confidently and successfully. Built on a foundation of trust, transparency, and innovation, we strive to set a new benchmark in modern trading.",
    },
    {
      Title: "Mission",
      paragraph:
        "Our mission is to deliver cutting-edge solutions that combine advanced analytics, real-time data, and personalized strategies to help our clients achieve their financial goals in the most efficient and transparent manner",
    },
    {
      Title: "Vision",
      paragraph:
        "We envision a world where smart investing is accessible to everyone — whether you're a beginner stepping into the forex arena or an experienced trader managing complex portfolios. Our vision is to build a sustainable and inclusive financial ecosystem for all.",
    },
  ];
  return (
    <>
      <div className="py-8 px-8 space-y-6 font-poppins">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center ">About</h1>
        <div className=" grid grid-cols-3  space-x-4">
          {overviewmissionvision.map((item) => (
            <>
              <div className="space-y-4 border p-4 rounded">
                <h1 className="text-2xl font-bold">{item.Title}</h1>
                <div>{item.paragraph}</div>
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to={"/about"}
            className="bg-blue-600 rounded-full font-semibold hover:bg-blue-900 text-white py-3 px-4  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default OverviewMission;
