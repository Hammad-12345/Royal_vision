import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const commonstep = [
    {
      StepTitle: "Secure Access",
      StepDescription:
        "All your data is protected with industry-standard encryption",
    },
    {
      StepTitle: "Personal Dashboard",
      StepDescription:
        "Track performance, manage resources, and monitor activity in real-time",
    },
    {
      StepTitle: "Trusted Platform",
      StepDescription:
        "Join thousands of users who trust Overland Solutions every day.",
    },
  ];

  const getTabIndex = () => {
    if (location.pathname.includes("signin")) return 0;
    if (location.pathname.includes("signup")) return 1;
    return 0;
  };

  const [tabIndex, setTabIndex] = useState(getTabIndex());

  // Sync tabIndex with path changes
  useEffect(() => {
    setTabIndex(getTabIndex());
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(newValue === 0 ? "signin" : "signup");
  };

  return (
    <div
      className="grid grid-cols-1 bg-cover xl:space-y-0 space-y-8 xl:grid-cols-2 min-h-screen font-poppins px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-white"
      style={{
        backgroundImage: `url(https://d3hwx9f38knfi9.cloudfront.net/Auth.jpg)`,
        backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Left Section */}
      <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-0">
        <div className="lg:w-44 flex flex-col items-center xl:mx-0 mx-auto text-white hover:text-blue-200 transition-colors font-poppins">
          <img
            src="https://overlandresources.s3.eu-north-1.amazonaws.com/newlogo-removebg-preview.png"
            className="w-32 h-20 sm:w-40 sm:h-24"
            alt=""
          />
          <span className="text-sm sm:text-base uppercase font-poppins">Overland Solutions</span>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white xl:text-start text-center leading-tight">
            Fuel Your Trading Ambition with{" "}
            <span className="text-blue-600">Overland Solutions</span>
          </h1>
          <p className="text-base sm:text-lg xl:text-start text-center xl:mx-0 mx-auto max-w-2xl">
            Access your dashboard, track your performance, and stay connected
            with your solutions — all in one place. Secure, seamless, and
            personalized for you.
          </p>
        </div>
        <div className="space-y-6 mt-8">
          {commonstep.map((stepitem, index) => (
            <div
              key={index}
              className={`flex md:w-2/3 w-full xl:mx-0 mx-auto items-center text-white ${
                index === 1 && "xl:ml-11"
              } bg-blue-900 rounded-2xl px-5 py-8 shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="min-w-[80px] h-[80px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-xl font-semibold shadow-lg mr-5">
                {`Step ${index + 1}`}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{stepitem.StepTitle}</h3>
                <p className="text-sm">{stepitem.StepDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Tabs + Form Outlet */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
