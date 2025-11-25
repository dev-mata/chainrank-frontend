'use client';

import ArticleCard from './ArticleCard';
import article1 from '../../public/trendinggroup.png';
import article2 from '../../public/trialgroup.png'; // Replace with actual image paths

const articles = [
    {
        tag: 'CHAIN RANK',
        title: `Getting pitch perfect: Meet the founders on Virgin’s Start Up’s new Angel Investment Accelerator`,
        date: '5 May 2023',
        image: article1,
    },
    {
        tag: 'CHAIN RANK',
        title: `Getting pitch perfect: Meet the founders on Virgin’s Start Up’s new Angel Investment Accelerator`,
        date: '5 May 2023',
        image: article2,
    },
    // Add more articles here...
];

export default function ArticleList() {
    return (
        <section className="max-w-xl mx-auto px-4 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-500 mb-6">
                Articles to get you started
                <span className="ml-1 w-2 h-2 bg-green-500 inline-block rounded-full" />
            </h2>

            {articles.map((article, i) => (
                <ArticleCard key={i} article={article} />
            ))}
        </section>
    );
}
