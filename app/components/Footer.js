'use client';

import Image from 'next/image';
import logo from '../../public/logo.svg'; // Replace with your logo

export default function Footer() {
    const sections = [
        {
            title: 'ABOUT',
            links: ['About Chain Rank', 'Terms of Service', 'Privacy'],
        },
        {
            title: 'MAKE MONEY',
            links: ['Join a Community', 'Build on Chain Rank', 'Refer Friends'],
        },
        {
            title: 'RESOURCES',
            links: [`FAQ's`, 'Blog', 'Use our Api'],
        },
    ];

    return (
        <footer className="text-center py-10 px-4 text-sm text-gray-600">
            <Image src={logo} alt="Chain Rank Logo" width={42} className="mx-auto mb-6" />

            {sections.map((section, i) => (
                <div key={i} className="mb-6">
                    <h4 className="text-black font-bold uppercase text-xs mb-2">{section.title}</h4>
                    <ul className="space-y-3">
                        {section.links.map((link, j) => (
                            <li key={j} className="text-gray-500 hover:text-black cursor-pointer font-rhm">
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <p className="text-xs text-gray-400 font-mono mt-8">
                Chain Rank 2023. All rights reserved
            </p>
        </footer>
    );
}
