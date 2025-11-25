

import Image from 'next/image';
import trendinggroup from '../../../public/grp-stat.jpg';

export default function GroupLandingStat() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-18 bg-white max-w-7xl mx-auto gap-10">

            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <div className=" overflow-hidden">
                    <Image
                        src={trendinggroup}
                        alt="Featured ChainRank Group"
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2">
                <h2 className="text-[#E8144E] font-bold text-xl mb-2">Get Discovered</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
                    List Your Group on ChainRank
                </h1>
                <p className="text-gray-600 mb-6 font-rhm">
                    Thousands of traders are searching for premium alpha groups every day.
                    Boost your visibility, grow your subscriber base, and start earning by
                    listing your community on the #1 group discovery platform.
                </p>

                <button className="bg-[#E8144E] text-white font-semibold py-3 px-6  hover:bg-indigo-700 transition">
                    Start Listing
                </button>

                <div className="mt-8 flex flex-wrap gap-6 text-center md:text-left">
                    <div>
                        <p className="text-2xl font-bold text-[#E8144E]">148,000+</p>
                        <p className="text-gray-600 text-sm font-rhm">Active Users</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#E8144E]">134+</p>
                        <p className="text-gray-600 text-sm font-rhm">Verified Groups</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#E8144E]">12+</p>
                        <p className="text-gray-600 text-sm font-rhm">Supported Niches</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
