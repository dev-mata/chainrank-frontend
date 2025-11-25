'use client';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';

const subscribersData = [
    { day: 'Mon', count: 20 },
    { day: 'Tue', count: 50 },
    { day: 'Wed', count: 75 },
    { day: 'Thu', count: 60 },
    { day: 'Fri', count: 100 },
    { day: 'Sat', count: 90 },
    { day: 'Sun', count: 120 },
];

const revenueData = [
    { day: 'Mon', amount: 200 },
    { day: 'Tue', amount: 500 },
    { day: 'Wed', amount: 700 },
    { day: 'Thu', amount: 450 },
    { day: 'Fri', amount: 1200 },
    { day: 'Sat', amount: 950 },
    { day: 'Sun', amount: 1350 },
];

export default function AnalyticsCharts() {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* Subscribers Over Time */}
            <div className="bg-white p-4 border border-1 border-gray-200">
                <h3 className="text-md font-bold text-black mb-4">📈 Subscribers Over Time</h3>
                <ResponsiveContainer width="100%" height={250} className="font-rhm text-sm font-semibold">
                    <LineChart data={subscribersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#e11d48" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Revenue Trend */}
            <div className="bg-white p-4 border border-1 border-gray-200">
                <h3 className="text-md font-bold text-black mb-4">💰 Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={250} className="font-rhm text-sm font-semibold">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#E8144E" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
