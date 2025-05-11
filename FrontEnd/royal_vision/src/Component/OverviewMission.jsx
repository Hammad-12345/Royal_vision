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
      <div className="py-8 px-8 space-y-6 font-poppins relative" style={{
         backgroundImage: `url(/forexlight1.jpg)`,
        //  backgroundColor: "rgba(31, 41, 55, 0.75)",
        //  backgroundBlendMode: "multiply",
         backgroundAttachment:"fixed"
      }}>
        <h1 className="text-4xl font-extrabold text-blue-600 text-center ">About</h1>
        <div className=" grid grid-cols-3  space-x-4">
          {overviewmissionvision.map((item) => (
            <>
              <div className="space-y-4 border border-gray-300 shadow-lg p-4 rounded">
                <h1 className="text-2xl font-bold">{item.Title}</h1>
                <div>{item.paragraph}</div>
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            to={"/about"}
           className="bg-blue-600 font-semibold rounded-full text-white px-6 py-2  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
          >
            View More
          </Link>
        </div>
      </div>
    </>
  );
};

export default OverviewMission;
