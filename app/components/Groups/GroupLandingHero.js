'use client';

import Image from 'next/image';
import dashboardImage from '../../../public/grp-dash.jpg'; // Replace with your actual image

export default function GroupLandingHero() {
    return (
        <section className="bg-[#f1f7f3] py-16 px-6">
            <div className="max-w-7xl mx-auto text-center flex flex-col items-center">

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
                    <span className="font-bold text-black">ChainRank, the </span>
                    <span className="text-[#E8144E] font-bold">Premier Marketplace</span><br />
                    <span className="text-black">for Monetizing Your Private Group</span>
                </h1>

                {/* Subtext */}
                <p className="mt-6 text-gray-600 max-w-2xl font-medium text-lg font-rhm">
                    Whether you're running a crypto alpha group, stock trading chat, or niche subscriber community,
                    ChainRank gives you the tools to grow, track, and earn — all in one place.
                </p>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-3">
                    <button className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition font-rhm">
                        LIST YOUR GROUP
                    </button>
                    <a 
                    href='/group-register'
                    className="w-11 h-11 border border-black flex items-center justify-center text-black hover:bg-gray-200 transition">
                        →
                    </a>
                </div>

                {/* Image */}
                <div className="mt-14 rounded-2xl overflow-hidden shadow-xl border border-gray-300 max-w-full">
                    <Image
                        src={dashboardImage}
                        alt="ChainRank Dashboard Preview"
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
