'use client';
import Image from 'next/image';
import sampleImage from '../../public/sub1.png'
import star from '../../public/star.svg'
import topRated from '../../public/toprated.svg'
import hot from '../../public/hot.svg'
import telegram from '../../public/telegram.svg'
import discord from '../../public/discord.svg'


import { useState } from 'react';
import { Flame, Star, SlidersHorizontal } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const tabs = [
    { label: 'Top', icon: star },
    { label: 'Trending', icon: topRated },
    { label: 'Top Rated', icon: hot },
];

const groups = [
    { id: 1, name: 'Tesla', price: '$5.00', rank: '4.2(45)', icon: sampleImage },
    { id: 2, name: 'Crypto Community', price: '$10.00', rank: '4.2(45)', icon: sampleImage },
    { id: 3, name: 'Tesla', price: '$5.00', rank: '4.2(45)', icon: sampleImage },
    { id: 4, name: 'Crypto Community', price: '$10.00', rank: '4.2(45)', icon: sampleImage },
    { id: 5, name: 'Tesla', price: '$5.00', rank: '4.2(45)', icon: sampleImage },
];

export default function ChainRankChart({pageTitle}) {
    const [activeTab, setActiveTab] = useState('Top');
    const [showFilter, setShowFilter] = useState(false);


    return (
        <div className="bg-[#fdf6f6] p-4 rounded-lg max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-black">{pageTitle}</h2>
                <button onClick={() => setShowFilter(true)}>

                    <SlidersHorizontal className="w-5 h-5 text-gray-600" />

                </button>
            </div>

            <FilterSidebar isOpen={showFilter} onClose={() => setShowFilter(false)} />


            <div className="flex gap-3 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${activeTab === tab.label
                            ? 'bg-purple-100 text-purple-700'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Image src={tab.icon} alt={tab.label} width={20} height={20} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="py-2">#</th>
                            <th className="py-2">Group</th>
                            <th className="py-2">Rank</th>
                            <th className="py-2">Platform</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {groups.map((group, i) => (
                            <tr key={group.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="py-3">{i + 1}</td>
                                <td className="py-3 flex items-center gap-2">
                                    <Image src={group.icon} alt={group.name} width={32} height={32} className="rounded-full" />
                                    <div>
                                        <p className="font-semibold">{group.name}</p>
                                        <p className="text-sm font-rhm text-gray-500">{group.price}/mo</p>
                                    </div>
                                </td>
                                <td className="py-3 font-rhm">{group.rank}</td>
                                <td className="py-3 flex items-center gap-2">
                                    <Image src={telegram} alt="Telegram" width={24} height={24} />
                                    <Image src={discord} alt="Discord" width={24} height={24} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
