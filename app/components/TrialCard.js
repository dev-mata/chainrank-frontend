'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Users2 } from 'lucide-react';

export default function TrialCard({ group }) {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!group) return null;

    const slugFromName = (name) =>
        name
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || '';

    const navigate = () => {
        const slug = slugFromName(group.groupName) || group._id;

        // 🔥 ONLY PASS THE ID — remove everything else
        const params = new URLSearchParams({
            id: group._id || '',
        });

        router.push(`/discover/${slug}?${params.toString()}`);
    };

    const bannerSrc = group.bannerUrl
        ? (group.bannerUrl.startsWith('http')
            ? group.bannerUrl
            : `${baseUrl}${group.bannerUrl}`)
        : '/fallback-banner.jpg';

    const logoSrc = group.logoUrl
        ? (group.logoUrl.startsWith('http')
            ? group.logoUrl
            : `${baseUrl}${group.logoUrl}`)
        : '/fallback-logo.jpg';

    return (
        <div
            onClick={navigate}
            className="group cursor-pointer bg-white overflow-visible relative shadow border max-w-xl p-2 mx-auto pb-12"
        >
            <img
                src={bannerSrc}
                alt={`${group.groupName} banner`}
                width={600}
                height={300}
                className="w-full h-40 object-cover"
            />

            <div className="flex items-start p-4 gap-3">
                <img
                    src={logoSrc}
                    alt={`${group.groupName} logo`}
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12"
                />
                <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                        {group.groupName}
                    </h3>
                    <p className="text-sm text-gray-600 leading-tight font-rhm line-clamp-3">
                        {group.description}
                    </p>
                </div>
            </div>

            <div className="absolute -bottom-3 left-3 bg-rose-100 text-rose-800 text-sm rounded-full px-4 py-1 flex items-center shadow-sm">
                <Users2 className="w-4 h-4 mr-2" />
                <span className="truncate">
                    {group.category} · {group.country}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate();
                }}
                className="
                    absolute border border-1 font-rhm -bottom-4 right-3 
                    bg-rose-300 text-black font-semibold text-sm px-4 py-2 
                    shadow-[5px_5px_0px_rgba(0,0,0,1)]
                    transition-all duration-300 transform
                    group-hover:bg-rose-400
                    group-hover:scale-110
                    group-hover:shadow-[7px_7px_0px_rgba(0,0,0,1)]
                "
            >
                Start trial
            </button>
        </div>
    );
}
