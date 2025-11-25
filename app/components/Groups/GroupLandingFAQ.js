import { useState } from 'react';

import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'What is ChainRank?',
        answer: 'ChainRank is a platform that helps you discover and rank blockchain projects based on various metrics.',
    },
    {
        question: 'How do I join a group?',
        answer: 'You can join a group by clicking the "Join" button on the group page after logging in.',
    },
    {
        question: 'Is ChainRank free to use?',
        answer: 'Yes, ChainRank offers free access to most features. Some advanced features may require a subscription.',
    },
];

export default function GroupLandingFAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-3xl mx-auto my-8 text-gray-800 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-lg">
                        <button
                            className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
                            onClick={() => handleToggle(idx)}
                        >
                            <span className="font-medium">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIndex === idx && (
                            <div className="px-4 pb-4 text-gray-700 animate-fade-in font-rhm">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}