import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { LoggedIn } from '../Redux/Slice/auth'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [token, settoken] = useState("");
  const navigate = useNavigate()
  // ✅ LOGIN with fetch
  const onLoginSubmit = async (data) => {
    try {
      const response = await fetch("http://backendoverland-env.eba-agakzdv8.eu-north-1.elasticbeanstalk.com/auth/login", {
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
    }
  };

  const onOTPSubmit = async (data) => {
    const otp = [data.otp1, data.otp2, data.otp3, data.otp4, data.otp5].join(
      ""
    );
    console.log("OTP entered:", otp);

    try {
      const response = await fetch("http://backendoverland-env.eba-agakzdv8.eu-north-1.elasticbeanstalk.com/auth/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success(result.message);
        const mytoken = JSON.stringify(result.newtoken);
        dispatch(LoggedIn(result.newtoken))
        navigate("/")
        localStorage.setItem("mytoken", mytoken);
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);

        // redirect or store session, etc.
      } else {
        toast.error(result.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onResetSubmit = async (data) => {
    const payload = {
      email: data.resetEmail,
      newPassword: data.newpassword,
    };
  
    try {
      const response = await fetch("http://backendoverland-env.eba-agakzdv8.eu-north-1.elasticbeanstalk.com/auth/newpassword", {
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
          : "We'll send a password reset link to your email."}
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
            className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500"
          >
            Sign In
          </button>
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
                {...register(`otp${i}`, { required: true })}
                className="w-full px-4 py-3 bg-transparent border border-gray-300 rounded-lg text-center"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500"
          >
            Verify
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
          <button
            type="submit"
            className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4 hover:bg-blue-500"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
