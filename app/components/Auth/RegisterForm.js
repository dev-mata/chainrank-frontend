'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../Logo';
import SocialSection from '../SocialSection';

export default function CreateAccountForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [emailError, setEmailError] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') setEmailError(false);
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className='flex flex-col items-center justify-center text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <Logo />
          </div>
          <div className='text-3xl font-bold'>Create an Account</div>
          <div className='font-rhm mt-2 text-gray-500'>Join us! Let’s get started</div>
        </div>

        <form className="space-y-3">
          {/* Email Field */}
          <input
            type="email"
            name="email"
            className={`block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${emailError ? 'border-red-500' : 'border-gray-300'
              }`}
            value={form.email}
            onChange={handleChange}
            placeholder="joe@domain.com"
            required
          />

          {/* Mobile Number Field */}
          <input
            type="tel"
            name="mobile"
            className="block w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="block w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className='flex flex-col gap-3 mt-10'>
            <button
              type="submit"
              className="w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            >
              Create Account
            </button>

            <a
              href="/login"
              className="w-full text-center border border-1 font-rhm bg-white text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            >
              Login
            </a>
          </div>
        </form>

        <hr className='border-gray-200 mt-8 px-6' />


        <SocialSection isLogoVisible={false} className="mt-8" />
      </div>
    </div>
  );
}
