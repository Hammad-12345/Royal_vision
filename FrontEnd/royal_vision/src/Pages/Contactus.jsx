import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const Contactus = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you can add your API call to send the form data
    reset();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-cover"  style={{
      backgroundImage: `url(/Contactusbg.jpg)`,
      backgroundColor: "rgba(31, 41, 55, 0.75)",
      backgroundBlendMode: "multiply",
      backgroundAttachment:"fixed"
      // bac
    }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left side - Image */}
        <div className="lg:w-1/2 flex items-center justify-center">
          {/* <img 
            src="/Contactusbg.jpg" 
            alt="Contact Us" 
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          /> */}
        </div>

        {/* Right side - Contact Form */}
        <div className="lg:w-1/2 font-poppins p-8 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Contact Us</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white placeholder-gray-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-400 mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                {...register('message')}
                className={`w-full px-4 py-2 border bg-transparent rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-white placeholder-gray-500 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
