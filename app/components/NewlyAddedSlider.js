'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Star } from 'lucide-react';
import avatar from '../../public/trendingavatar.png';
import banner from '../../public/trendinggroup.png';

const trendingCommunities = [
    {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    },
    {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    }, {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    }, {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    }, {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    }, {
        name: 'Sage Design Academy',
        description: 'Become a designer that thinks and builds',
        price: '$120',
        duration: '/year',
        rating: 4.8,
        reviews: 120,
        tags: ['Stocks', 'Discord'],
        avatar: avatar,
        banner: banner,
    }

];

export default function TrendingSlider() {
    return (
        <section className="px-4 py-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                        Newly Added
                        <span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block" />
                    </h2>
                    <p className="text-xs font-rhm text-gray-600 mt-1">
                        New Communities added this week
                    </p>
                </div>
                <a href='/groupboard'  className="border border-gray-400 px-4 py-2 text-sm font-rhm text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                    See more →
                </a>
            </div>

            {/* Mobile: Slider */}
            <div className="block md:hidden">
                <Swiper spaceBetween={12} slidesPerView={'auto'}>
                    {trendingCommunities.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: 340 }}
                            className="bg-white border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <TrendingCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid grid-cols-3 gap-4">
                {trendingCommunities.slice(0, 6).map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                        <TrendingCard item={item} />
                    </div>
                ))}
            </div>
        </section>
    );
}

function TrendingCard({ item }) {
    return (
        <>
            <Image
                src={item.banner}
                alt={item.name + ' banner'}
                className="w-full h-32 object-cover"
                width={280}
                height={128}
            />
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <Image
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600 font-rhm">{item.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-900 font-rhm">{item.price}</p>
                        <p className="text-xs text-gray-500">{item.duration}</p>
                    </div>
                </div>
                <div className="flex items-center text-sm mt-2 gap-1 text-rose-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-gray-600 text-xs ml-2 font-rhm">
                        {item.rating} ({item.reviews})•{item.tags.join('•')}
                    </span>
                </div>
            </div>
        </>
    );
}
