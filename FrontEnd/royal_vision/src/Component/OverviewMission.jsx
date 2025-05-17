import React from "react";
import { Link } from "react-router-dom";
const OverviewMission = () => {
  const overviewmissionvision = [
    {
      Title: "Overview",
      paragraph:
        "Overland Solutions is a modern investment firm offering diverse, high-potential opportunities across a range of markets....",
    },
    {
      Title: "Mission",
      paragraph:
        "Empowering financial success through innovative solutions, advanced analytics, and personalized strategies.",
    },
    {
      Title: "Vision",
      paragraph:
        "Empowering inclusive financial access for all, from beginners to experts, through smart investing and sustainable ecosystems.",
    },
  ];
  return (
    <>
      <div
        className="p-6 space-y-6 font-poppins relative"
        style={{
          backgroundImage: `url(https://d3hwx9f38knfi9.cloudfront.net/forexlight1.jpg)`,
          //  backgroundColor: "rgba(31, 41, 55, 0.75)",
          //  backgroundBlendMode: "multiply",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-4xl font-extrabold text-blue-600 text-center ">
          About
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {overviewmissionvision.map((item) => (
            <>
              <div className="space-y-4 border border-gray-300 shadow-lg p-4 rounded-2xl">
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
