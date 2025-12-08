'use client';

import Image from 'next/image';
import sub1 from "../../public/sub1.png"
import sub2 from "../../public/sub2.png"
import sub3 from "../../public/sub3.png"
import sub4 from "../../public/sub4.png"
import sub5 from "../../public/sub5.png"
import sub6 from "../../public/sub6.png"
import sub7 from "../../public/sub7.png"


const subscriptions = [
    {
        name: 'Tesla',
        avatar: sub5,
        amount: '$25.00',
        time: '3 minutes ago',
    },
    {
        name: 'Oasis Alert',
        avatar: sub2,
        amount: '$125.00',
        time: '2 minutes ago',
    },
    {
        name: 'Crypto Community',
        avatar: '/qtf.jpg',
        avatar: sub7,
        amount: '$12.00',
        time: 'A few moments ago',
    },
];

export default function LiveSubscriptions() {
    return (
        <div className="max-w-md mx-auto px-4 py-12">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                Live Subscriptions
                <span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block" />
            </h2>
            <p className="text-sm text-gray-600 mt-1 mb-4 font-rhm">
                These people just joined a community through Chain Rank
            </p>

            {/* Subscription List */}
            <div className="space-y-4">
                {subscriptions.map((sub, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-md p-4 flex items-start gap-4"
                    >
                        <Image
                            src={sub.avatar}
                            alt={sub.name}
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-gray-900">{sub.name}</p>
                            <p className="text-sm text-gray-700 font-rhm">
                                Someone just paid <span className="font-rhm">{sub.amount}</span>
                            </p>
                            <p className="text-xs text-rose-700 mt-1">{sub.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
