'use client';

import Image from 'next/image';
import logo from '../../public/logo-white.svg'; 
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react'; 

export default function SocialSection({ isLogoVisible }) {
  return (
    <section className="text-center py-10 px-4">
      {/* Logo in red circle */}

      {isLogoVisible && (
        <div className="w-24 h-24 mx-auto rounded-full bg-[#E8144E] flex items-center justify-center mb-6">
          <Image src={logo} alt="Chain Rank Logo" width={40} height={40} />
        </div>
      )}


      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
        Reach us on <span className="text-gray-700">Social</span>
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-700 font-rhm mb-6">
        We are always rooting for you
      </p>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-gray-700">
        <a href="#" aria-label="Facebook">
          <Facebook size={24} />
        </a>
        <a href="#" aria-label="Twitter">
          <Twitter size={24} />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram size={24} />
        </a>
        <a href="#" aria-label="YouTube">
          <Youtube size={24} />
        </a>
        <a href="#" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
      </div>
    </section>
  );
}
