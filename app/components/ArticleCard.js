'use client';

import Image from 'next/image';

export default function ArticleCard({ article }) {
    return (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
            />
            <div className="px-6 py-4">
                <span className="text-xs text-purple-700 font-bold tracking-wider uppercase">
                    {article.tag}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-4 leading-snug font-rhm">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-500 font-rhm">{article.date}</p>
            </div>
        </div>
    );
}