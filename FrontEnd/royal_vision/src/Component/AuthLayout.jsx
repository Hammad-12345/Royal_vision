import React, { useState } from "react";
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
        // {
        //   StepTitle: "Seamless Experience",
        //   StepDescription:
        //     "Enjoy smooth navigation and lightning-fast access to your solutions.",
        // },
    {
        StepTitle: "Trusted Platform",
        StepDescription:
          "Join thousands of users who trust Overland Solutions every day.",
      }
  ];

  // Determine current tab based on route
  const getTabIndex = () => {
    if (location.pathname.includes("signin")) return 0;
    if (location.pathname.includes("signup")) return 1;
    return 0;
  };

  const [tabIndex, setTabIndex] = useState(getTabIndex());

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(newValue === 0 ? "signin" : "signup");
  };

  return (
    <div
      className="grid grid-cols-1 bg-cover xl:space-y-0 space-y-16 xl:grid-cols-2 min-h-screen font-poppins md:px-8 px-5 py-12 text-white"
      style={{
        backgroundImage: `url(https://d3hwx9f38knfi9.cloudfront.net/Auth.jpg)`,
        backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Left Section */}
      <div className="space-y-8 mb-10 md:mb-0">
      <div className="lg:w-44 flex flex-col items-center text-white hover:text-blue-200 transition-colors font-poppins">
          <img src="https://d3hwx9f38knfi9.cloudfront.net/logodesign.png"  className="w-24 h-24"
             alt="" srcset="" />
             <span className=" uppercase font-poppins">Overland Solutions</span>
          </div>
        <div className="space-y-4">
          <h1 className="md:text-5xl text-3xl text-white xl:text-start  text-center leading-tight">
            Fuel Your Trading Ambition with{" "}
            <span className="text-blue-600">Overland Solutions</span>
          </h1>
          <p className="md:w-5/6 w-full text-lg xl:text-start text-center xl:mx-0 mx-auto">
            Access your dashboard, track your performance, and stay connected
            with your solutions — all in one place. Secure, seamless, and
            personalized for you.
          </p>
        </div>
        <div className="space-y-6 mt-8">
          {commonstep.map((stepitem, index) => (
            <div
              key={index}
              // style={index === 1 ? { marginLeft: "45px" } : {}}
              className={`flex md:w-2/3 w-full xl:mx-0 mx-auto items-center text-white ${index===1 && "xl:ml-11"} bg-blue-900 rounded-2xl px-5 py-8 shadow-md hover:shadow-xl transition-shadow duration-300`}
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
      <div className="flex justify-center self-start">
        <div className="xl:w-4/5 md:w-4/5 w-full relative rounded-xl text-black p-8 shadow-lg bg-gradient-to-r from-black via-blue-950 to-blue-600">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="auth tabs"
            sx={{
              span: {
                display: "none",
              },
            }}
            className="absolute top-[-30px] right-0  bg-blue-950 md:w-80 h-20 flex justify-center items-center px-3 rounded-full" // Hides default indicator
          >
            <Tab
              label="Sign In"
              sx={{
                width: "50%",
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "9999px",
                mr: 1,
                bgcolor: tabIndex === 0 && "white",
                color: tabIndex === 0 ? "white" : "white",
                transition: "all 0.3s",
              }}
            />
            <Tab
              label="Sign Up"
              sx={{
                width: "50%",
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "9999px",
                ml: 1,
                bgcolor: tabIndex === 1 && "white",
                color: tabIndex === 1 ? "white" : "white",
                transition: "all 0.3s",
              }}
            />
          </Tabs>

          {/* Renders Login or Register component via React Router */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
