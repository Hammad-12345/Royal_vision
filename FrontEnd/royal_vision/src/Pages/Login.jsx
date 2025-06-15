import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { LoggedIn } from '../Redux/Slice/auth'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [token, settoken] = useState("");
  const navigate = useNavigate()
  // ✅ LOGIN with fetch
  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Login failed");
      }

      const result = await response.json();
      toast.success(result.message);
      settoken(result.token);

      // Proceed to OTP or next step
      setStep(2);
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    
    // Handle single digit input
    if (value.length === 1) {
      setValue(`otp${index + 1}`, value);
      if (index < 4) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      // If current input is empty and backspace is pressed, move to previous input
      otpRefs.current[index - 1].focus();
      setValue(`otp${index}`, '');
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    
    if (/^\d+$/.test(pastedData)) {
      // Split the pasted data into individual digits
      const digits = pastedData.split('');
      
      // Set each digit in the corresponding input
      digits.forEach((digit, index) => {
        if (index < 5) {
          setValue(`otp${index + 1}`, digit, { shouldValidate: true });
          if (otpRefs.current[index]) {
            otpRefs.current[index].value = digit;
          }
        }
      });
      
      // Focus the next empty input or the last input
      const nextEmptyIndex = digits.length < 5 ? digits.length : 4;
      if (otpRefs.current[nextEmptyIndex]) {
        otpRefs.current[nextEmptyIndex].focus();
      }
    }
  };

  const onOTPSubmit = async (data) => {
    setIsLoading(true);
    const otp = [data.otp1, data.otp2, data.otp3, data.otp4, data.otp5].join("");
    
    if (otp.length !== 5) {
      toast.error("Please enter all 5 digits of the OTP");
      setIsLoading(false);
      return;
    }
    console.log(otp)
    try {
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message);
      
        const mytoken = JSON.stringify(result.newtoken);
        const user = JSON.stringify(result.user);
      
        localStorage.setItem("mytoken", mytoken);
        localStorage.setItem("user", user);
      
        dispatch(
          LoggedIn({
            token: result.newtoken,
            user: result.user,
          })
        ); 
        if(result.user.Role==='user')
        {
          navigate("/");
        }
        else 
        {
          navigate("/admin")
        }
      
        
      } else {
        toast.error(result.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onResetSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      email: data.resetEmail,
      newPassword: data.newpassword,
    };
  
    try {
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/auth/newpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Reset successful:", result);
        toast.success(result.message);
        setStep(1);
      } else {
        console.error("Reset failed:", result);
        toast.error(result.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white font-poppins">
        {step === 1
          ? "Sign In"
          : step === 2
          ? "OTP Verification"
          : "Forgot Password"}
      </h2>
      <p className="text-white">
        {step === 1
          ? "Welcome back! Please enter your details."
          : step === 2
          ? "Enter the OTP sent to your email."
          : ""}
      </p>

      {/* Step 1: LOGIN */}
      {step === 1 && (
        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="space-y-4 text-white"
        >
          <div className="relative space-y-3">
            <label className="block mb-1">Email</label>
            <FaEnvelope className="absolute left-4 top-11 text-white" />
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-12 py-3 bg-transparent border border-gray-300 rounded-lg text-white"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="relative space-y-3">
            <label className="block mb-1">Password</label>
            <FaLock className="absolute left-4 top-11 text-white" />
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-12 py-3 bg-transparent border border-gray-300 rounded-lg text-white"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span
              onClick={() => setStep(3)}
              className="cursor-pointer text-blue-400 text-base"
            >
              Forgot Password?
            </span>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("rememberMe")} />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-white">Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <form
          onSubmit={handleSubmit(onOTPSubmit)}
          className="space-y-4 text-white"
        >
          <label className="block">Enter OTP</label>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                maxLength={1}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                {...register(`otp${i}`, { 
                  required: true,
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Only numbers are allowed"
                  }
                })}
                className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-center"
                ref={(el) => (otpRefs.current[i - 1] = el)}
                onChange={(e) => handleOTPChange(e, i - 1)}
                onKeyDown={(e) => handleKeyDown(e, i - 1)}
                onPaste={handleOTPPaste}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      )}

      {/* Step 3: Forgot Password */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit(onResetSubmit)}
          className="space-y-4 text-white"
        >
          <div className="relative space-y-3">
            <label className="block mb-1">Email Address</label>
            <FaEnvelope className="absolute left-4 top-11 text-white" />
            <input
              type="email"
              placeholder="Enter Email"
              {...register("resetEmail", { required: "Email is required" })}
              className="w-full px-12 py-3 bg-transparent border border-gray-300 rounded-lg text-white"
            />
            {errors.resetEmail && (
              <p className="text-red-400">{errors.resetEmail.message}</p>
            )}
          </div>

          <div className="relative space-y-3">
            <label className="block mb-1">New Password</label>
            <FaLock className="absolute left-4 top-11 text-white" />
            <input
              type="password"
              placeholder="Enter Password"
              {...register("newpassword", { required: "New password is required" })}
              className="w-full px-12 py-3 bg-transparent border border-gray-300 rounded-lg text-white"
            />
            {errors.newpassword && (
              <p className="text-red-400">{errors.newpassword.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className=" self-end bg-transparent border border-gray-300 font-semibold rounded-full text-white px-6 py-4 hover:bg-gray-800 flex items-center justify-center"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
