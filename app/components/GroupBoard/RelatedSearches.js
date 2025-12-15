'use client';

import { Search, TrendingUp, Shield, DollarSign, Brain, Globe } from 'lucide-react';

const relatedSearches = [
    {
        id: 1,
        label: 'Join a crypto trading community',
        icon: TrendingUp,
        trending: true,
    },
    {
        id: 2,
        label: 'Start automating crypto trades',
        icon: Brain,
        trending: false,
    },
    {
        id: 3,
        label: 'Master crypto investment strategies',
        icon: DollarSign,
        trending: true,
    },
    {
        id: 4,
        label: 'Discover memecoin insights',
        icon: Globe,
        trending: false,
    },
    {
        id: 5,
        label: 'Build wealth through crypto signals',
        icon: Shield,
        trending: false,
    },
];

export default function RelatedSearches() {
    const handleSearchClick = (search) => {
        console.log('Clicked search:', search);
    };

    return (
        <div className="bg-rose-50 border border-gray-200 shadow-[3px_3px_0px_rgba(0,0,0,1)] p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <span>Related Searches</span>
                </h3>
                <Search className="w-4 h-4 text-gray-500" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {relatedSearches.map((search) => {
                    const Icon = search.icon;

                    return (
                        <button
                            key={search.id}
                            type="button"
                            onClick={() => handleSearchClick(search)}
                            className={`
                inline-flex items-center gap-1.5
                px-3 py-1.5
                rounded-full
                border text-xs
                font-rhm
                transition-all duration-200
                ${search.trending
                                    ? 'bg-rose-500 text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-rose-50'
                                }
              `}
                        >
                            <Icon
                                size={14}
                                className={
                                    search.trending
                                        ? 'text-white'
                                        : 'text-rose-500'
                                }
                            />
                            <span className="whitespace-nowrap">{search.label}</span>

                            {search.trending && (
                                <span className="ml-1 text-[10px] uppercase tracking-wide bg-rose-400 text-white px-1.5 py-0.5 rounded-full">
                                    Trending
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
