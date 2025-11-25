'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../Logo';
import SocialSection from '../SocialSection';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className='flex flex-col items-center justify-center text-center mb-8'>
          <div className='flex justify-center mb-6'>
            <Logo />
          </div>

          <div className='text-3xl font-bold'>Let's Sign you in</div>
          <div className='font-rhm mt-2 text-gray-500'>Welcome back! You have been missed</div>

        </div>

        <form className="space-y-3">
          {/* Email Field */}
          <div>

            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-4 py-3 rounded-md border text-black focus:outline-none ${emailError ? 'border-red-500' : 'border-gray-300'
                }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              placeholder="joe@domain.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>

            <div className="relative ">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-black focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex justify-end items-center">

              <a href="#" className="text-sm text-gray-600 hover:text-black mt-2 font-rhm justify-end">
                <span className="">  Forgot Password?</span>

              </a>
            </div>
          </div>

          <div className='flex flex-col gap-3 mt-10'>
            <button
              type="submit"
              className="w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              Login
            </button>

            <a
              href='/register'
              className="w-full text-center border border-1 font-rhm bg-white text-black font-semibold text-sm px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              Creeate Account
            </a>
          </div>


        </form>
          <hr className='border-gray-200 mt-8' />

        <SocialSection isLogoVisible={false} className="mt-8" />
      </div>
    </div>
  );
}
