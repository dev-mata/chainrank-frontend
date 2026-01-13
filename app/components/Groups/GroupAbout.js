'use client';

import Image from 'next/image';
import { DollarSign, ExternalLink, Tag, Users } from 'lucide-react';
import telegram from '../../../public/telegram.svg';
import discord from '../../../public/discord.svg';

export default function GroupAbout({ group, statusDisplay }) {
    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                {group?.groupName}
            </h2>

            <h3 className="text-sm font-semibold text-gray-700 mb-2 mt-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-500 rounded" />
                About This Group
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                {group?.description || '-'}
            </p>

            <hr className="border border-gray-300 mt-4 mb-4" />

            <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusDisplay.bg} ${statusDisplay.color} ${statusDisplay.border} border`}>
                    {statusDisplay.icon}
                    {statusDisplay.text}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    <Users className="w-3.5 h-3.5" />
                    {group?.memberCount ?? 0} members
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{group?.category}</span>
                    {group?.subCategory ? <span className="text-gray-400">•</span> : null}
                    {group?.subCategory ? <span className="font-medium">{group?.subCategory}</span> : null}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-700">
                        {group?.price != null ? `$${group.price}/mo` : '-'}
                    </span>
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {group?.telegramLink && (
                    <a
                        href={group.telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-xs font-medium text-gray-700 hover:text-blue-700"
                    >
                        <Image src={telegram} alt="Telegram" width={16} height={16} />
                        Telegram <ExternalLink className="w-3 h-3" />
                    </a>
                )}

                {group?.discordLink && (
                    <a
                        href={group.discordLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-xs font-medium text-gray-700 hover:text-indigo-700"
                    >
                        <Image src={discord} alt="Discord" width={16} height={16} />
                        Discord <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
    );
}
