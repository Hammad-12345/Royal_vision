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
      className="grid grid-cols-1 bg-cover md:grid-cols-2 min-h-screen font-poppins px-8 py-12 text-white"
      style={{
        backgroundImage: `url(/Auth.jpg)`,
        backgroundColor: "hsl(215.86deg 49.32% 6.9% / 91%)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Left Section */}
      <div className="space-y-8 mb-10 md:mb-0">
        <h1 className="text-white text-4xl">
          OverLand <span className="text-blue-600">Solutions</span>
        </h1>
        <div className="space-y-4">
          <h1 className="text-5xl text-white">
            Fuel Your Trading Ambition with{" "}
            <span className="text-blue-600">Overland Solutions</span>
          </h1>
          <p className="w-5/6 text-lg">
            Access your dashboard, track your performance, and stay connected
            with your solutions — all in one place. Secure, seamless, and
            personalized for you.
          </p>
        </div>
        <div className="space-y-6 mt-8">
          {commonstep.map((stepitem, index) => (
            <div
              key={index}
              style={index === 1 ? { marginLeft: "45px" } : {}}
              className="flex  w-4/5 items-center text-white bg-blue-900 rounded-2xl px-5 py-8 shadow-md hover:shadow-xl transition-shadow duration-300"
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
        <div className="w-4/5 relative rounded-xl text-black p-8 shadow-lg bg-gradient-to-r from-black via-blue-950 to-blue-600">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="auth tabs"
            sx={{
              span: {
                display: "none",
              },
            }}
            className="absolute top-[-30px] left-1/4  bg-blue-950 w-80 h-20 flex justify-center items-center px-3 rounded-full" // Hides default indicator
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
