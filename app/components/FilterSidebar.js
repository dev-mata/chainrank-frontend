'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function FilterSidebar({ isOpen, onClose }) {
    const [industry, setIndustry] = useState('Crypto');
    const [price, setPrice] = useState(100);
    const [rating, setRating] = useState(2.6);
    const [paymentStatus, setPaymentStatus] = useState('Free Group');
    const [groupType, setGroupType] = useState([]);
    const [popularity, setPopularity] = useState('Most Subscribed');

    const toggleGroupType = (type) => {
        setGroupType((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const applyFilters = () => {
        console.log({ industry, price, rating, paymentStatus, groupType, popularity });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto flex justify-center p-4 text-black">
            <div className="w-full max-w-md sm:rounded-lg bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Industry */}
                <div className="mb-5">
                    <h3 className="font-semibold mb-2">Industry</h3>
                    <div className="grid grid-cols-3 gap-2 font-rhm">
                        {['Crypto', 'Stocks', 'Real Estate', 'Sports Betting', 'Amazon FBA'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setIndustry(item)}
                                className={`px-3 py-1 border text-sm rounded-md font-medium ${industry === item
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-white text-black border-gray-300'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <input
                        type="range"
                        min="25"
                        max="500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full accent-rose-600"
                    />
                    <div className="flex justify-between text-sm mt-1 font-rhm">
                        <span>$25</span>
                        <span className="text-rose-600 font-bold">${price}</span>
                        <span>$500</span>
                    </div>
                </div>

                {/* Ratings */}
                <div className="mb-5">
                    <h3 className="font-semibold mb-2">Ratings</h3>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full accent-rose-600"
                    />
                    <div className="flex justify-between text-sm mt-1 font-rhm">
                        <span className="flex items-center gap-1">⭐ 1</span>
                        <span className="text-rose-600 font-bold">{rating}</span>
                        <span className="flex items-center gap-1">⭐ 5</span>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold">Payment Status</h3>
                        <button className="text-sm text-rose-500">Reset</button>
                    </div>
                    <div className="border p-3 rounded-md flex justify-between items-center">
                        <span className="text-green-600 font-medium">● Free Group</span>
                        <ChevronDown className="text-gray-500 w-4 h-4" />
                    </div>
                </div>

                {/* Group Type */}
                <div className="mb-5">
                    <h3 className="font-semibold mb-2">Group Type</h3>
                    <div className="grid grid-cols-3 gap-2 font-rhm">
                        {['Community', 'Signal', 'Coaching', 'Paid Course', 'Bots Access'].map((type) => (
                            <button
                                key={type}
                                onClick={() => toggleGroupType(type)}
                                className={`px-2 py-1 border text-xs rounded-md font-medium ${groupType.includes(type)
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-white text-black border-gray-300'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Popularity */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold">Popularity</h3>
                        <button className="text-sm text-rose-500">Reset</button>
                    </div>
                    <div className="border p-3 rounded-md flex justify-between items-center">
                        <span className="font-medium">Most Subscribed</span>
                        <ChevronDown className="text-gray-500 w-4 h-4" />
                    </div>
                </div>

                <button
                    onClick={applyFilters}
                    className="w-full border border-1 font-rhm bg-rose-300 text-black font-semibold text-sm px-4 py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
}
