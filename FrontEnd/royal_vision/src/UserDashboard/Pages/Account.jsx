import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import { LoggedIn } from '../../Redux/Slice/auth'
const Account = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.Token.userDetail);
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      Name: user?.Name || '',
      CurrentPassword: '',
      NewPassword: ''
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;
      if (profileImage) {
        const formData = new FormData();
        formData.append('img', profileImage);
        const uploadRes = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/upload', {
          method: 'POST',
          body: formData,
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('mytoken'))}`,
          },
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }
      console.log(imageUrl)
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/dashboard/updateprofile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('mytoken'))}`,
        },
        body: JSON.stringify({
          ...data,
          profileImage: imageUrl,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      toast.success('Profile updated successfully!')
      const result = await response.json();
      console.log(result)
      dispatch(
        LoggedIn({
          token: JSON.parse(localStorage.getItem('mytoken')),
          user: result.user,
        })
      );
      setValue('CurrentPassword','')
      setValue('NewPassword','')
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
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
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-black via-blue-950 to-blue-600 rounded-lg shadow-md text-white">
      <h2 className="text-3xl font-semibold text-center mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={previewUrl || user?.profileImage || "https://via.placeholder.com/150"}
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700"
            >
              <FaCamera className="text-white" />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-3">
          <label>Name</label>
          <InputWrapper icon={<FaUser />}>
            <input
              {...register('Name', { required: 'Name is required' })}
              placeholder="Enter Name"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.Name && <p className="text-red-500 text-sm">{errors.Name.message}</p>}
        </div>

        {/* Current Password
        <div className="space-y-3">
          <label>Current Password</label>
          <InputWrapper icon={<FaLock />}>
            <input
              type="password"
              {...register('CurrentPassword', { required: 'Current Password is required' })}
              placeholder="Enter Current Password"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.CurrentPassword && <p className="text-red-500 text-sm">{errors.CurrentPassword.message}</p>}
        </div> */}

        {/* New Password
        <div className="space-y-3">
          <label>New Password</label>
          <InputWrapper icon={<FaLock />}>
            <input
              type="password"
              {...register('NewPassword', { required: 'New Password is required' })}
              placeholder="Enter New Password"
              className="bg-transparent outline-none w-full py-1"
            />
          </InputWrapper>
          {errors.NewPassword && <p className="text-red-500 text-sm">{errors.NewPassword.message}</p>}
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Account;
