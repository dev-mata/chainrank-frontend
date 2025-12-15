'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Star } from 'lucide-react';
import avatar from '../../public/sub1.png'; 

const reviews = [
    {
        username: 'Otto_22',
        rating: 5,
        date: 'June 2023',
        text: `Being a part of this website's trading community has been a transformative experience. The diversity of perspectives, trading strategies, and risk management approaches I've encountered is truly eye-opening. It's not just about the money; it's also about the camaraderie. This platform is a must-join for anyone.`,
        community: 'The Moonshot',
        communityAvatar: avatar,
    },
    {
        username: 'Trevor#123',
        rating: 2,
        date: 'May 2023',
        text: `Joining the platform was a game-changer for me as a strategy enthusiast. The variety of tools available allowed me to connect with traders of different experience levels.`,
        community: 'The Hive',
        communityAvatar: avatar,
    },
];

export default function RecentReviews() {
    return (
        <section className="bg-green-50 mt-12 py-10 px-4">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">Recent Reviews.</h2>
            <p className="text-center text-gray-600 mb-6">
                We go above and beyond and this is how we know
            </p>

            {/* Slider */}
            <Swiper spaceBetween={16} slidesPerView={'auto'}>
                {reviews.map((review, i) => (
                    <SwiperSlide
                        key={i}
                        style={{ width: 320 }}
                        className="bg-white rounded-lg shadow p-5 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="font-bold text-black mb-1">{review.username}</h3>
                            <div className="flex gap-1 mb-3 text-rose-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-sm font-rhm text-gray-800 mb-6 leading-snug whitespace-pre-line">
                                {review.text}
                            </p>
                            <p className="text-xs font-bold text-black">{review.date}</p>
                        </div>

                        {/* Community footer */}
                        <div className="bg-rose-100 mt-4 rounded-full px-4 py-2 flex items-center gap-2">
                            <Image
                                src={review.communityAvatar}
                                alt={review.community}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            <span className="text-sm font-bold text-black">{review.community}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
