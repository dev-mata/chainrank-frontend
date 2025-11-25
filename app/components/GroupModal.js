'use client';

import { X, Star, MessageCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import bannerImg from '../../public/trialgroup.png';
import { useEffect } from 'react';

export default function GroupModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      {/* Outer Container */}
      <div className="relative bg-white w-full max-w-md md:max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="p-4 md:p-8">
          <Image
            src={bannerImg}
            alt="Banner"
            className="w-full h-64 md:h-96 object-cover rounded mb-6 mt-6"
          />

          <button
            onClick={() => alert('Registration functionality not implemented yet.')}
            className="w-full py-3 mb-8 border border-1 font-rhm bg-rose-300 text-black font-semibold text-md shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:bg-rose-400 transition-all"
          >
            Join Group
          </button>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-rose-500">Astro Alerts</h3>
              <div className="flex gap-2 mt-2 text-gray-600 items-center">
                <MessageCircle size={18} /> <span className="text-sm md:text-base">225 members</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 text-right">
              <div className="flex text-rose-500 mb-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#E31950" stroke="#E31950" />
                ))}
              </div>
              <p className="text-md md:text-lg font-semibold text-gray-800 font-rhm">$120 / year</p>
            </div>
          </div>

          {/* Description */}
          <h4 className="text-lg md:text-xl font-semibold mb-3 text-black">About</h4>

          <p className="text-sm md:text-base text-gray-700 mb-6 font-rhm leading-relaxed">
            Top-tier crypto signals group sharing real-time trade alerts, PnL screenshots, and weekly performance reports. Trusted by 5K+ traders.
          </p>

          {/* ✅ Features Section */}
          <h4 className="text-lg md:text-xl font-semibold mb-3 text-black mt-8">Features</h4>
          <ul className="space-y-2 mb-8">
            {[
              'Access to VendorList with 200+ HQ items.',
              '1:1 coaching and mentorship from experienced resellers.',
              'Exclusive guides for Facebook, unbans, and receipt methods.',
              'Ebay view bot and methods to lower product cost.',
              'Join a community of like-minded, driven individuals.',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm md:text-base font-rhm">
                <CheckCircle size={18} className="text-rose-500 mt-[2px]" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Reviews Section */}
          <h4 className="text-lg md:text-xl font-semibold mb-3 text-black">Reviews</h4>
          <div className="bg-rose-100 p-4  mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-black text-sm md:text-base">Klay Thompson</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" stroke="currentColor" />
                <span className="text-sm font-bold">5.0</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 font-rhm">1 day ago</p>
            <p className="mt-1 text-sm text-gray-800 font-rhm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit amet...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
