'use client';

import { Star } from 'lucide-react';

const reviews = [
    {
        user: '@chartguru',
        rating: 5,
        comment: 'Amazing signals and consistent updates. Helped me grow my portfolio!',
    },
    {
        user: '@newbie_trader',
        rating: 2,
        comment: 'Needs better timing for trades. Missed out on a few pumps.',
    },
];

export default function ReviewsSection() {
    const renderStars = (count) => (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < count ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
                        }`}
                />
            ))}
        </div>
    );

    return (
        <div className="bg-white p-4 border border-1 border-gray-200 mb-6">
            <h3 className="text-md font-bold text-black mb-4">⭐ Ratings & Reviews</h3>

            {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-black">{review.user}</span>
                        {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-gray-700 font-rhm">{review.comment}</p>
                </div>
            ))}

            <button className="mt-2 text-sm text-rose-600 font-semibold hover:underline">View All Reviews</button>
        </div>
    );
}
