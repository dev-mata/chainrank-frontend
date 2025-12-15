'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const DEFAULT_MENU_ITEMS = [
    {
        label: 'Crypto',
        key: 'crypto',
        dropdown: ['Bitcoin', 'Ethereum', 'Solana'],
    },
    { label: 'Stocks', key: 'stocks', dropdown: ['Tech', 'Finance', 'Energy'] },
    { label: 'Sports Betting', key: 'sports', dropdown: ['Football', 'Basketball', 'UFC'] },
    { label: 'Browse All' },
];

// --- Simple in-memory cache (persists across component mounts) ---
let cachedCategories = null;
let cachedCategoriesPromise = null;

async function fetchCategoriesOnce() {
    if (cachedCategories) return cachedCategories;

    if (!cachedCategoriesPromise) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const url = `${baseUrl}/api/category`;

        cachedCategoriesPromise = fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return res.json();
            })
            .then((json) => {
                // Expecting { success, count, data: [...] }
                cachedCategories = json.data || [];
                return cachedCategories;
            })
            .catch((err) => {
                console.error('Error loading categories:', err);
                cachedCategoriesPromise = null; // allow retry on next mount
                return null;
            });
    }

    return cachedCategoriesPromise;
}

export default function FilterMenu() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS);

    useEffect(() => {
        let isMounted = true;

        fetchCategoriesOnce().then((categories) => {
            if (!isMounted || !categories) return;

            const dynamicMenuItems = categories.map((cat) => ({
                label: cat.name,
                key: cat._id || cat.name.toLowerCase().replace(/\s+/g, '-'),
                dropdown: (cat.subcategories || []).map((sub) => sub.name),
            }));

            setMenuItems([
                ...dynamicMenuItems,
                { label: 'Browse All' },
            ]);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const toggleDropdown = (key) => {
        setActiveDropdown((prev) => (prev === key ? null : key));
    };

    return (
        <div className="w-full bg-white border-b border-gray-200 relative z-10">
            {/* Top Menu Bar */}
            <div className="flex items-center justify-between lg:justify-center px-4">
                {menuItems.map((item, index) => (
                    <div key={item.key || item.label} className="relative flex items-center">
                        <button
                            onClick={() => item.dropdown && toggleDropdown(item.key)}
                            className={`flex items-center py-3 text-sm font-rhm focus:outline-none
                                ${activeDropdown === item.key
                                    ? 'text-[#E8144E] font-bold'
                                    : 'text-gray-800 hover:text-black'}
                            `}
                        >
                            {item.label}
                            {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                        </button>

                        {index < menuItems.length - 1 && (
                            <div className="h-5 w-px bg-gray-200 mx-2" />
                        )}

                        {/* Individual dropdown — positioned relative to button */}
                        {activeDropdown === item.key && item.dropdown && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 min-w-[150px] max-h-48 overflow-y-auto border border-gray-200 rounded-md shadow-md bg-white animate-slideDown z-20">
                                <ul className="divide-y divide-gray-100">
                                    {item.dropdown.map((entry, idx) => (
                                        <li
                                            key={idx}
                                            className="px-4 py-2 text-sm font-rhm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                                        >
                                            {entry}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
