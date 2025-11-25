'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import crLogo from '../../public/logo.svg';
import { X } from 'lucide-react';
import SocialSection from './SocialSection';
import LoginRegisterButton from './Auth/LoginRegisterButton';
import Logo from './Logo';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between relative">
      {/* Logo + Brand - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>

      {/* Desktop Auth Links - Right Side */}
      <div className="hidden md:flex items-center gap-6 ml-auto z-10">
        <Link
          href="/login"
          className="text-gray-700 hover:text-black font-medium transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Register
        </Link>
      </div>

      {/* Hamburger - Mobile Only */}
      <button className="md:hidden focus:outline-none ml-auto z-10" onClick={() => setShowMobileMenu(true)}>
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
          <div className="w-6 h-0.5 bg-gray-800"></div>
        </div>
      </button>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full font-rhm bg-white shadow-lg z-50 p-6 transform transition-transform duration-300 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Logo />
          <button onClick={() => setShowMobileMenu(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <nav className="space-y-6 text-base text-gray-700">
          <a href="#" className="hover:text-black block">
            About ChainRank
          </a>
          <a href="#" className="hover:text-black block">
            Start Selling
          </a>
          <a href="#" className="hover:text-black block">
            Contact Us
          </a>
          <a href="#" className="hover:text-black block">
            FAQ's
          </a>
          <a href="#" className="hover:text-black block">
            Terms of Service
          </a>
          <a href="#" className="hover:text-black block">
            Privacy
          </a>
        </nav>
        <div className='mt-6'>
          <hr className='border-gray-200' />
          <LoginRegisterButton />
          <SocialSection isLogoVisible={false} />
        </div>
      </div>
    </header>
  );
}