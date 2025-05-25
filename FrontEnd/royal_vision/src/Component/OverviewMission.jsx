import React from "react";
import { Link } from "react-router-dom";
const OverviewMission = () => {
  const overviewmissionvision = [
    {
      Title: "Overview",
      paragraph:
        " Unlock Your Financial Freedom with Overland Solution! We ignite your investment journey, fueling your growth with expert guidance and proven strategies. Start with a single step, and we'll empower you to soar. Join our community of savvy investors and transform your financial future today!",
    },
    {
      Title: "Mission",
      paragraph:
        "Empowering financial success through innovative solutions, advanced analytics, and personalized strategies..",
    },
    {
      Title: "Vision",
      paragraph:
        " To attain global leadership as the premier investment partner, distinguished by exceptional performance, unwavering integrity, and unrelenting commitment to client success.",
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
