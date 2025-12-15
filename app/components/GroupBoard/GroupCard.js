'use client';

import { useRouter } from 'next/navigation';
import { Star, Users, DollarSign } from 'lucide-react';

export default function GroupCard({ group, variant }) {
    const router = useRouter();

    const formatPrice = (price) => {
        if (!price && price !== 0) return 'Free';
        return `$${Number(price).toLocaleString()}`;
    };

    const formatMembers = (count) => {
        if (count == null) return null;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    const slugFromName = (name) =>
        name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || '';

    const navigateToDiscover = () => {
        if (!group) return;

        const slug = slugFromName(group.groupName || group.title) || group._id;

        const params = new URLSearchParams({
            id: group._id || '',
            name: group.groupName || group.title || '',
            description: group.description || '',


            features: Array.isArray(group.features)
                ? group.features.join(',')
                : (group.features || ''),
            bannerUrl: group.bannerUrl || '',
            logoUrl: group.logoUrl || '',
            category: group.category || '',
            country: group.country || '',
            members: String(
                group.membersCount ??
                group.memberCount ??
                0
            ),
        });

        router.push(`/discover/${slug}?${params.toString()}`);
    };

    const isSponsored = variant === 'sponsored';

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const bannerUrl = group.bannerUrl
        ? group.bannerUrl.startsWith('http')
            ? group.bannerUrl
            : `${baseUrl}${group.bannerUrl}`
        : '/placeholder-banner.png';

    const logoUrl = group.logoUrl
        ? group.logoUrl.startsWith('http')
            ? group.logoUrl
            : `${baseUrl}${group.logoUrl}`
        : '/placeholder-avatar.png';

    const title = group.title || group.groupName || 'Untitled group';
    const description = group.description || '';
    const priceLabel = formatPrice(group.price);
    const membersLabel = formatMembers(group.memberCount ?? group.membersCount);

    const tags = [group.category, group.subCategory, group.country].filter(Boolean);

    const ratingValue = group.rating || '4.8';
    const ratingCount = group.reviewCount || '0';

    return (
        <div
            onClick={navigateToDiscover}
            className={`
                bg-white border border-gray-200 shadow-sm overflow-hidden
                cursor-pointer hover:shadow-md transition-shadow duration-200
                ${isSponsored ? 'border-rose-300' : ''}
            `}
        >
            {/* Banner */}
            <div className="relative w-full h-32 bg-gray-100">
                <img
                    src={bannerUrl}
                    alt={`${title} banner`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder-banner.png';
                    }}
                />

                {isSponsored && (
                    <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-rhm">
                        Sponsored
                    </div>
                )}

                {group.featured && (
                    <div className="absolute top-2 right-2 bg-black/75 text-white text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full font-rhm">
                        Featured
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                        <img
                            src={logoUrl}
                            alt={title}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = '/placeholder-avatar.png';
                            }}
                        />
                    </div>

                    {/* Title + desc */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {title}
                        </h3>

                        {group.creator && (
                            <p className="text-[11px] text-gray-500 font-rhm">
                                by {group.creator}
                            </p>
                        )}

                        <p className="text-xs text-gray-600 font-rhm line-clamp-2 mt-0.5">
                            {description}
                        </p>
                    </div>

                    {/* Price + period + members */}
                    <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-900 font-rhm flex items-center justify-end gap-1">
                            <DollarSign size={14} className="text-rose-500" />
                            {priceLabel}
                        </p>
                        {group.period && (
                            <p className="text-xs text-gray-500 font-rhm">/{group.period}</p>
                        )}
                        {membersLabel && (
                            <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1 justify-end">
                                <Users size={12} className="text-gray-400" />
                                {membersLabel}
                            </p>
                        )}
                    </div>
                </div>

                {/* Rating + tags */}
                <div className="flex items-center text-sm mt-2 gap-1 text-rose-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                    ))}

                    <span className="text-gray-600 text-xs ml-2 font-rhm">
                        {ratingValue} ({ratingCount})
                        {tags.length > 0 && ` • ${tags.join(' • ')}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
