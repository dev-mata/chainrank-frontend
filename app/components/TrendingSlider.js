'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrendingSlider({ pageTitle, communities = [], loading = false, error = null }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  const slugFromName = (name) =>
    name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || '';

  const navigateToGroup = (group) => {
    if (!group) return;

    const slug = slugFromName(group.groupName) || group._id;

    const params = new URLSearchParams({
      id: group._id || '',
    });

    router.push(`/discover/${slug}?${params.toString()}`);
  };

  return (
    <section className="py-6 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            {pageTitle}
            <span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block" />
          </h2>
          <p className="text-xs font-rhm text-gray-600 mt-1">
            Communities currently in high demand
          </p>
        </div>
        <a
          href="/groupboard"
          className="border border-gray-400 px-4 py-2 text-sm font-rhm text-gray-700 hover:bg-gray-50 flex items-center gap-1"
        >
          See more →
        </a>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12">
          <p className="text-red-500 font-rhm">
            Failed to load trending groups. Please try again later.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && communities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-rhm">No trending groups available at the moment.</p>
        </div>
      )}

      {/* Mobile: Slider */}
      {!loading && !error && communities.length > 0 && (
        <div className="block md:hidden">
          <Swiper spaceBetween={12} slidesPerView={'auto'}>
            {communities.map((item) => (
              <SwiperSlide
                key={item._id}
                style={{ width: 340 }}
                className="bg-white border border-gray-200 shadow-sm overflow-hidden"
              >
                <TrendingCard
                  item={item}
                  onClick={() => navigateToGroup(item)}
                  baseUrl={baseUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Desktop: Grid */}
      {!loading && !error && communities.length > 0 && (
        <div className="hidden md:grid grid-cols-3 gap-4">
          {communities.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 shadow-sm overflow-hidden"
            >
              <TrendingCard
                item={item}
                onClick={() => navigateToGroup(item)}
                baseUrl={baseUrl}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function TrendingCard({ item, onClick, baseUrl }) {
  const bannerUrl = item.bannerUrl ? `${baseUrl}${item.bannerUrl}` : '/placeholder-banner.png';
  const logoUrl = item.logoUrl ? `${baseUrl}${item.logoUrl}` : '/placeholder-avatar.png';

  // Build tags from category and subCategory
  const tags = [item.category, item.subCategory].filter(Boolean);

  return (
    <div
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="relative w-full h-32">
        <img
          src={bannerUrl}
          alt={`${item.groupName} banner`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-banner.png';
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <img
              src={logoUrl}
              alt={item.groupName}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-avatar.png';
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {item.groupName}
            </h3>
            <p className="text-xs text-gray-600 font-rhm line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-sm font-bold text-gray-900 font-rhm">
              ${item.price}
            </p>
            <p className="text-xs text-gray-500">/year</p>
          </div>
        </div>

        <div className="flex items-center text-sm mt-2 gap-1 text-rose-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
          <span className="text-gray-600 text-xs ml-2 font-rhm">
            4.8 (120) • {tags.join(' • ')}
          </span>
        </div>
      </div>
    </div>
  );
}
