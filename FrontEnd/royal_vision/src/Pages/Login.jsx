import React, { useState } from "react";

const Login = () => {
  const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Normally validate login, then send OTP to user
    console.log("Login submitted:", formData);
    // Simulate sending OTP
    setStep(2);
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Validate OTP here
    console.log("OTP submitted:", formData.otp);
    alert("2FA Login Successful!");
  };

  return (
    <div>
      <div className=" space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white    font-poppins">
            {step === 1 ? "Sign In" : step === 2 ? "OTP" : "Forgot Password"}
          </h2>
          {step === 1 ? (
            <p className="text-white">
              Welcome Back! Please enter your Details
            </p>
          ) : (
            step === 3 && (
              <>
                <p className="text-white">
                  Donot worry! it happens please enter the email address
                  associated with your account
                </p>
              </>
            )
          )}
        </div>
        {step === 1 ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-white">
            <div className="space-y-3 relative">
              <label className="block">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter Email Here"
                required
                className="w-full px-12 py-3 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                className="absolute top-10 left-4"
              >
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
              </svg>
            </div>
            <div className="space-y-3 relative">
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter Password Here"
                required
                className="w-full bg-transparent px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                className="absolute top-10 left-4"
              >
                <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
              </svg>
            </div>
            <div className="space-y-3 flex justify-between">
              <span onClick={() => setStep(3)} className="cursor-pointer">
                Forgot Password
              </span>
              <div className="flex items-center space-x-2">
                <input type="checkbox" />
                <label>Remember me</label>
              </div>
            </div>
            <button
              type="submit"
             className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
            >
              Sign in
            </button>
          </form>
        ) : step === 2 ? (
          <>
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-white">Enter OTP</label>
                <div className="grid grid-cols-5 gap-4">
                  <input
                    type="text"
                    name="otp1"
                    onChange={handleChange}
                    value={formData.otp}
                    required
                    className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="otp1"
                    onChange={handleChange}
                    value={formData.otp}
                    required
                    className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="otp1"
                    onChange={handleChange}
                    value={formData.otp}
                    required
                    className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="otp1"
                    onChange={handleChange}
                    value={formData.otp}
                    required
                    className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="otp1"
                    onChange={handleChange}
                    value={formData.otp}
                    required
                    className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
              >
                Verify
              </button>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-white">
              <div className="space-y-3 relative">
                <label className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter Email Here"
                  required
                  className="w-full px-12 py-3 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={18}
                  height={18}
                  className="absolute top-10 left-4"
                >
                  <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                </svg>
              </div>
              <div className="space-y-3 relative">
                <label className="block">New Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="Enter New Password Here"
                  required
                  className="w-full bg-transparent px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={18}
                  height={18}
                  className="absolute top-10 left-4"
                >
                  <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
                </svg>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
