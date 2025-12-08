'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { X, Star, MessageCircle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import JoinGroupModal from '@/app/components/JoinGroupModal';

export default function GroupPage() {
    const router = useRouter();
    const { slug } = useParams();
    const searchParams = useSearchParams();

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL; // e.g. http://localhost:5000

    const [showModal, setShowModal] = useState(false);
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const id = searchParams.get('id');

    const nameFromUrl = searchParams.get('name');
    const bannerUrlFromUrl = searchParams.get('bannerUrl');

    const fallback = {
        banner: '/trialgroup.png',
        members: '225',
        about:
            'Top-tier crypto signals group sharing real-time trade alerts, PnL screenshots, and weekly performance reports.',
        features: [
            'Private  Access to Exclusive Information',

        ],
        reviews: [
            {
                user: 'Reviews will show here...',
                rating: 5.0,
                time: '1 day ago',
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit amet...',
            },
        ],
        pricing: {
            price: 120,
            period: 'year',
            ratingStars: 5,
        },
    };

    const prettySlug = slug?.replace(/-/g, ' ');

    // ------------------------------------------------------------------
    // 🔄 FETCH REAL GROUP DATA BY ID
    // ------------------------------------------------------------------
    useEffect(() => {
        if (!id) {
            setError('Missing group id in URL');
            setLoading(false);
            return;
        }

        if (!apiBase) {
            setError('API base URL is not configured');
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        async function fetchGroup() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${apiBase}/api/public/public-groups/${id}`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`Failed to load group (status ${res.status})`);
                }

                const json = await res.json();

                if (!json.success || !json.data) {
                    throw new Error('Invalid response from server');
                }

                setGroup(json.data);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(err);
                    setError(err.message || 'Failed to load group');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchGroup();


        return () => controller.abort();
    }, [id, apiBase]);


    const effectiveName = group?.groupName || prettySlug || 'Unknown group';
    const effectiveDescription = group?.description || fallback.about;
    const effectiveMembers =
        group?.membersCount ??
        group?.memberCount ??
        searchParams.get('members') ??
        fallback.members;

    const effectivePrice = group?.price ?? fallback.pricing.price;
    const effectivePeriod = fallback.pricing.period;
    const effectiveRatingStars = fallback.pricing.ratingStars;

    const category = group?.category || searchParams.get('category');
    const country = group?.country || searchParams.get('country');

    const featuresFromApi = Array.isArray(group?.features) ? group.features : null;
    const featuresToShow =
        featuresFromApi && featuresFromApi.length > 0 ? featuresFromApi : fallback.features;

    const bannerSrc = (() => {
        const fromApi = group?.bannerUrl;
        const raw = fromApi || bannerUrlFromUrl;

        if (!raw) return fallback.banner;

        if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;

        return apiBase ? `${apiBase}${raw}` : raw;
    })();

    const logoSrc = (() => {
        const raw = group?.logoUrl;
        if (!raw) return '/placeholder-avatar.png';

        if (raw.startsWith('http://') || raw.startsWith('https://')) return raw;
        return apiBase ? `${apiBase}${raw}` : raw;
    })();


    const CTACard = ({ price, period, ratingStars }) => (
        <div className="bg-rose-50 border border-gray-200 shadow-[5px_5px_0px_rgba(0,0,0,1)] p-4 mb-4 md:mb-6 md:sticky md:top-20 relative">
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-1 font-rhm">
                Premium Access
            </p>

            <div className="flex items-baseline justify-between mb-2">
                <span className="text-xl font-bold text-black font-rhm">
                    ${price}{' '}
                    <span className="text-xs font-normal text-gray-600">
                        / {period}
                    </span>
                </span>

                <div className="flex text-rose-500">
                    {[...Array(ratingStars)].map((_, i) => (
                        <Star key={i} size={16} fill="#E31950" stroke="#E31950" />
                    ))}
                </div>
            </div>

            <p className="text-xs text-gray-600 mb-3 font-rhm">
                Instant access after joining. Safe, vetted & community backed.
            </p>

            <button
                onClick={() => setShowModal(true)}
                className="absolute border border-1 font-rhm -bottom-4 right-3 bg-rose-300 text-black font-semibold text-sm px-4 py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            >
                Join Group
            </button>

            <JoinGroupModal showModal={showModal} setShowModal={setShowModal} group={group} />
        </div>
    );
    // ------------------------------------------------------------------
    // Page Layout
    // ------------------------------------------------------------------
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
                <p className="text-red-500 font-rhm mb-3">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <h1 className="text-xl font-bold text-rose-500 capitalize">
                    {effectiveName}
                </h1>
                <button
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-black flex items-center gap-1"
                >
                    <X size={18} /> <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            {/* Main */}
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                {/* Banner */}
                <img
                    src={bannerSrc}
                    alt="Group banner"
                    width={1200}
                    height={400}
                    className="w-full h-56 md:h-80 lg:h-96 object-cover mb-6 md:mb-8"
                />

                {/* Mobile CTA */}
                <div className="md:hidden mb-6">
                    <CTACard
                        price={effectivePrice}
                        period={effectivePeriod}
                        ratingStars={effectiveRatingStars}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* LEFT SIDE */}
                    <div className="flex-1">
                        <div className="mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={logoSrc}
                                    alt={effectiveName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <h3 className="text-2xl md:text-3xl font-bold text-rose-500">
                                    {effectiveName}
                                </h3>
                            </div>

                            <div className="flex gap-2 mt-1 text-gray-600 items-center">
                                <MessageCircle size={18} />
                                <span className="text-sm md:text-base font-rhm">
                                    {effectiveMembers} members
                                    {category ? ` · ${category}` : ''}
                                    {country ? ` · ${country}` : ''}
                                </span>
                            </div>
                        </div>

                        {/* About */}
                        <h4 className="text-lg md:text-xl font-semibold mb-3 text-black">
                            About
                        </h4>

                        <p className="text-sm md:text-base text-gray-700 mb-6 font-rhm leading-relaxed">
                            {effectiveDescription}
                        </p>

                        {/* Features */}
                        <h4 className="text-lg md:text-xl font-semibold mb-3 text-black mt-4">
                            Features
                        </h4>
                        <ul className="space-y-2 mb-4">
                            {featuresToShow.map((feature, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-gray-700 text-sm md:text-base font-rhm"
                                >
                                    <CheckCircle size={18} className="text-rose-500 mt-[2px]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full md:w-80 lg:w-96 md:pt-1">
                        <div className="hidden md:block">
                            <CTACard
                                price={effectivePrice}
                                period={effectivePeriod}
                                ratingStars={effectiveRatingStars}
                            />
                        </div>

                        {/* Reviews */}
                        <h4 className="text-lg md:text-xl font-semibold mb-3 text-black">
                            Reviews
                        </h4>

                        {fallback.reviews.map((review, i) => (
                            <div key={i} className="bg-rose-100 p-4 border border-rose-200 mb-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-black text-sm md:text-base">
                                        {review.user}
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star size={14} fill="currentColor" stroke="currentColor" />
                                        <span className="text-sm font-bold">{review.rating}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 font-rhm">{review.time}</p>
                                <p className="mt-1 text-sm text-gray-800 font-rhm">
                                    {review.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
