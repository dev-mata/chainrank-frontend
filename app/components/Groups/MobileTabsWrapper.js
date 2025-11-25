'use client';
import { useState } from 'react';
import {
    BarChart3, Users, Star, SlidersHorizontal, Settings, Grid
} from 'lucide-react';
import GroupOverview from './GroupOverview';
import PerformanceMetrics from './PerformanceMetrics';
import SubscriberTable from './SubscriberTable';
import AnalyticsCharts from './AnalyticsCharts';
import ReviewsSection from './ReviewsSection';
import DashboardControls from './DashboardControls';
import Header from '../Header';



const tabs = [
    { label: 'Overview', icon: Grid },
    { label: 'Metrics', icon: BarChart3 },
    { label: 'Subscribers', icon: Users },
    { label: 'Charts', icon: SlidersHorizontal },
    { label: 'Reviews', icon: Star },
    { label: 'Controls', icon: Settings },
];

export default function MobileTabsWrapper() {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="min-h-screen bg-[#f9f9f9] pt-4 pb-16 px-4">
            <Header />
            {/* Section Switcher */}
            {activeTab === 'Overview' && <GroupOverview />}
            {activeTab === 'Metrics' && <PerformanceMetrics />}
            {activeTab === 'Subscribers' && <SubscriberTable />}
            {activeTab === 'Charts' && <AnalyticsCharts />}
            {activeTab === 'Reviews' && <ReviewsSection />}
            {activeTab === 'Controls' && <DashboardControls />}

            {/* Bottom Tab Nav */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-2 md:hidden z-50">
                {tabs.map(({ label, icon: Icon }) => (
                    <button
                        key={label}
                        onClick={() => setActiveTab(label)}
                        className={`flex flex-col items-center text-xs px-2 py-1 ${activeTab === label ? 'text-rose-600 font-semibold' : 'text-gray-500'
                            }`}
                    >
                        <Icon className="w-5 h-5 mb-1" />
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
