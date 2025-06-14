import React, { useEffect, useRef, useState } from "react";
import { Country } from "country-state-city";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FaUser,
  FaCalendarAlt,
  FaPhone,
  FaGlobe,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// Zod schema
const schema = z.object({
  Name: z.string().min(1, "Name is required"),
  DateOfBirth: z.string().min(1, "Date of Birth is required"),
  Country: z.string().min(1, "Country is required"),
  ContactNumber: z
    .string()
    .min(1, "Contact Number is required")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
  EmailAddress: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
  ReferralCode: z.string().optional(),
});

export default function Register({ referralCode }) {
  console.log(referralCode)
  const countries = Country.getAllCountries();
  const [phoneCode, setPhoneCode] = useState("+000");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const dobRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ReferralCode: referralCode || ''
    }
  });

  const selectedCountry = watch("Country");

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.isoCode === selectedCountry);
      if (country) {
        setPhoneCode("+" + country.phonecode);
      }
    }
  }, [selectedCountry,countries]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const fullData = { 
      ...data, 
      CountryPhoneCode: phoneCode,
      ReferralCode: data.ReferralCode || undefined // Only include if it has a value
    };

    try {
      const response = await fetch("https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success('User registered successfully!');
      setTimeout(() => {
        navigate("/signin")
      }, 500);
    
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Registration failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Input wrapper
  const InputWrapper = ({ icon, children }) => (
    <div className="flex items-center border rounded-lg bg-transparent px-3 py-2 gap-2">
      <span className="text-white">{icon}</span>
      {children}
    </div>
  );

  return (
    <div className="space-y-4 text-white font-poppins">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p>Start your new journey! Please enter your details</p>
        {referralCode && (
          <p className="text-sm text-blue-400">You were referred by: {referralCode}</p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-3">
          <label>Name</label>
          <InputWrapper icon={<FaUser />}>
            <input
              {...register("Name")}
              placeholder="Enter Name"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="space-y-3">
          <label>Date of Birth</label>
          <div
            className="flex items-center border rounded-lg bg-transparent px-3 py-2 gap-2 cursor-pointer"
            onClick={() => dobRef.current?.showPicker()}
          >
            <span className="text-white">
              <FaCalendarAlt />
            </span>
            <input
              type="date"
              {...register("DateOfBirth")}
              ref={(e) => {
                register("DateOfBirth").ref(e);
                dobRef.current = e;
              }}
              className="bg-transparent outline-none w-full py-1 appearance-none"
            />
          </div>
          {errors.DateOfBirth && (
            <p className="text-red-500 text-sm">{errors.DateOfBirth.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-3">
          <label>Country</label>
          <InputWrapper icon={<FaGlobe />}>
            <select
              {...register("Country")}
              className="bg-transparent outline-none w-full py-1"
            >
              <option value="" className="text-black">Select Your Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode} className="text-black">
                  {country.name}
                </option>
              ))}
            </select>
          </InputWrapper>
          {errors.Country && <p className="text-red-500 text-sm">{errors.Country.message}</p>}
        </div>

        {/* Contact Number */}
        <div className="space-y-3">
          <label>Contact Number</label>
          <InputWrapper icon={<FaPhone />}>
            <span className="mr-2 text-gray-400">{phoneCode}</span>
            <input
              type="number"
              {...register("ContactNumber")}
              placeholder="Enter Contact Number"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.ContactNumber && (
            <p className="text-red-500 text-sm">{errors.ContactNumber.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label>Email Address</label>
          <InputWrapper icon={<FaEnvelope />}>
            <input
              type="email"
              {...register("EmailAddress")}
              placeholder="Enter Email"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.EmailAddress && (
            <p className="text-red-500 text-sm">{errors.EmailAddress.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-3">
          <label>Password</label>
          <InputWrapper icon={<FaLock />}>
            <input
              type="password"
              {...register("Password")}
              placeholder="Enter Password"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.Password && (
            <p className="text-red-500 text-sm">{errors.Password.message}</p>
          )}
        </div>

        {/* Hidden Referral Code field */}
        <input
          type="hidden"
          {...register("ReferralCode")}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-white">Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
