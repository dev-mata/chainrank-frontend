'use client';

import { useState, useEffect, useMemo } from 'react';
import GroupBoardHeader from '../components/groupboard/GroupBoardHeader';
import CategoryPanel from '../components/groupboard/CategoryPanel';
import RelatedSearches from '../components/groupboard/RelatedSearches';
import GroupGrid from '../components/groupboard/GroupGrid';

export default function GroupBoardPage() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


    useEffect(() => {
        fetchGroups();
    }, [selectedCategory]);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/api/public/public-groups`);


            const data = await response.json();
            setGroups(data.data || data.groups || []);
        } catch (error) {
            console.error('Error fetching groups:', error);
            setGroups([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return groups;
        const q = searchQuery.toLowerCase();
        return (groups || []).filter((g) => {
            const title = g.title || g.groupName || '';
            const description = g.description || '';
            return (
                title.toLowerCase().includes(q) ||
                description.toLowerCase().includes(q)
            );
        });
    }, [groups, searchQuery]);

    const sponsoredGroups = useMemo(
        () => filteredGroups.filter((g) => g.sponsored === true),
        [filteredGroups]
    );

    const bestProducts = filteredGroups;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <GroupBoardHeader onSearch={handleSearch} searchQuery={searchQuery} />

            {/* Main content */}
            <main className="max-w-5xl mx-auto px-4 py-6 md:py-8">
                {/* Categories */}
                {/* <CategoryPanel
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                /> */}

                <div className="mt-6 grid gap-6 lg:grid-cols-[3fr,1.5fr]">
                    <div className="space-y-8">
                        {/* <section>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                                    Sponsored
                                </h2>
                                <span className="text-[11px] text-gray-500 font-rhm">
                                    Featured partners
                                </span>
                            </div>

                            <GroupGrid
                                groups={sponsoredGroups}
                                loading={loading}
                                variant="sponsored"
                            />
                        </section> */}

                        {/* Best products */}
                        <section>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                                    Best products
                                </h2>
                                <span className="text-[11px] text-gray-500 font-rhm">
                                    Curated by ChainRank
                                </span>
                            </div>

                            <GroupGrid groups={bestProducts} loading={loading} variant="regular" />
                        </section>
                    </div>

                    {/* Right column: Sidebar */}
                    <aside className="space-y-4 lg:space-y-6">
                        <RelatedSearches />
                        {/* Placeholder: you can add more sidebar widgets later */}
                        {/* <SomeOtherCard /> */}
                    </aside>
                </div>
            </main>
        </div>
    );
}
