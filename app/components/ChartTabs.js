'use client';

import { useState } from 'react';
import { Star, Flame, Trophy, StarIcon } from 'lucide-react';
import Image from 'next/image';
import astroAvatar from '../../public/sub2.png'; // your actual image
import owToolsAvatar from '../../public/sub3.png'; // your actual image

const tabList = [
  { key: 'top', label: 'Top Charts', icon: Trophy },
  { key: 'trending', label: 'Top Trending', icon: Flame },
  { key: 'rated', label: 'Top Rated', icon: StarIcon },
];

// Dummy data
const chartData = {
  top: [
    {
      name: 'Ow Tools',
      avatar: owToolsAvatar,
      description: 'Make your own Nike arc',
      rating: 4.9,
      reviews: 120,
      tags: ['Sneakers', 'Discord'],
      price: '$5.00',
      frequency: '/month',
    },
    {
      name: 'Astro',
      avatar: astroAvatar,
      description: 'The most complete trading group anywhere',
      rating: 4.8,
      reviews: 92,
      tags: ['Stocks', 'Telegram'],
      price: '$125.00',
      frequency: '/month',
      trial: true,
    },
  ],
  trending: [
    {
      name: 'Astro',
      avatar: astroAvatar,
      description: 'The most complete trading group anywhere',
      rating: 4.8,
      reviews: 92,
      tags: ['Stocks', 'Telegram'],
      price: '$125.00',
      frequency: '/month',
      trial: true,
    },
  ],
  rated: [
    {
      name: 'Ow Tools',
      avatar: owToolsAvatar,
      description: 'Make your own Nike arc',
      rating: 4.9,
      reviews: 120,
      tags: ['Sneakers', 'Discord'],
      price: '$5.00',
      frequency: '/month',
    },
  ],
};

export default function ChartTabs() {
  const [activeTab, setActiveTab] = useState('top');

  return (
    <section className="px-4 py-6 max-w-2xl mx-auto">




      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            Our Charts<span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block" />
          </h2>
          <p className="text-xs font-rhm text-gray-600 mt-1">Highest ranked communities based on feedback in the past month.</p>
        </div>
        <a href='/groupboard' className="border border-gray-400 px-4 py-2 text-sm font-rhm text-gray-700 hover:bg-gray-50 flex items-center gap-1">
          See more →
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-200">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1 pb-2 px-2 text-sm font-medium transition ${activeTab === tab.key
                ? 'text-gray-800 border-b-2 border-green-500'
                : 'text-gray-400'
              }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Community Cards */}
      <div className="space-y-4">
        {chartData[activeTab].map((group, i) => (
          <div key={i} className="flex items-start gap-4 border p-4 rounded-md">
            <Image
              src={group.avatar}
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover"
              width={48}
              height={48}
            />
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-700 font-rhm">{group.description}</p>
              <div className="flex items-center text-sm mt-1 gap-0 text-rose-500 font-rhm">
                {[...Array(1)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-gray-600 text-xs ml-2">
                  {group.rating} ({group.reviews})•{group.tags.join('•')}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 font-rhm">
                <p className="text-lg font-bold text-gray-800">
                  {group.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {group.frequency}
                  </span>
                </p>
                {group.trial && (
                  <span className="bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded font-mono">
                    Free trial
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
