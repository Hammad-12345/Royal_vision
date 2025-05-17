import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contactus = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const quicksupport = [
    {
      title: "Call us",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={22}
          height={22}
        >
          <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
        </svg>
      ),
      text: "+92 334-7899087",
    },
    {
      title: "Mail us",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={22}
          height={22}
        >
          <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
        </svg>
      ),
      text: "overland1234@gmail.com",
    },
    {
      title: "Visit us",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={22}
          height={22}
        >
          <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
        </svg>
      ),
      text: "#65 Street, Overland Plaza, Rawalpindi",
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
    // Here you can add your API call to send the form data
    reset();
  };

  return (
    <div
      className=" py-8 px-4 sm:px-6 lg:px-8 bg-cover space-y-4"
      style={{
        backgroundImage: `url(https://overlandresources.s3.eu-north-1.amazonaws.com/Contactusbg.jpg)`,
        backgroundColor: "rgba(31, 41, 55, 0.75)",
        backgroundBlendMode: "multiply",
        backgroundAttachment: "fixed",
        // bac
      }}
    >
      <div className=" flex lg:flex-row lg:justify-start justify-center gap-8">
        {/* Left side - Image */}
        <div className="lg:w-1/2  lg:flex hidden items-center justify-center">
          {/* <img 
            src="/Contactusbg.jpg" 
            alt="Contact Us" 
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          /> */}
        </div>

        {/* Right side - Contact Form */}
        <div className="lg:w-1/2 md:w-3/4 w-full font-poppins p-8 rounded-lg shadow-lg bg-gradient-to-r from-black via-blue-950 to-blue-600 relative">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-3 relative text-white">
              <label htmlFor="name" className="block text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name Here"
                {...register("name")}
                className={`w-full px-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                className="absolute top-10 left-4"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-3 relative text-white">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email Here"
                {...register("email")}
                className={`w-full px-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
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
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-3 relative text-white">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Number Here"
                {...register("phone")}
                className={`w-full px-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                className="absolute top-9 left-4"
              >
                <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
              </svg>
              {errors.phone && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-3 relative text-white">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Enter Message Here"
                {...register("message")}
                className={`w-full px-12 py-3 border bg-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-white placeholder-gray-500 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                className="absolute top-9 left-4"
              >
                <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path>
              </svg>
              {errors.message && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 font-semibold rounded-full text-white px-6 py-4  hover:bg-blue-500 transition-colors duration-300 font-poppins backdrop-blur-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="font-poppins space-y-6 max-w-8xl mx-auto ">
        <div className="space-y-2">
          <h1 className="text-white text-4xl">Quick Support</h1>
          <div className="text-white">You can get all information</div>
        </div>
        <div className="grid lg:grid-cols-3 md:px-0 px-2 grid-cols-1 lg:space-y-0 space-y-4 lg:space-x-4">
          {quicksupport.map((quick) => (
            <>
              <div className="text-white border border-white px-6 rounded space-y-4 h-48 flex flex-col justify-center">
                <h1 className="text-3xl flex items-center space-x-4">
                  {quick.icon} <div>{quick.title}</div>
                </h1>
                <div className="text-lg">{quick.text}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contactus;
