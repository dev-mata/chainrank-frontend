'use client';

import { Calendar, Clock, Globe, Mail, Phone, Tag, DollarSign, Users } from 'lucide-react';
import PerformanceMetrics from './PerformanceMetrics';

function MiniCard({ titleIcon, title, items }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    {titleIcon}
                </div>
                <h3 className="text-sm font-bold text-gray-800">{title}</h3>
            </div>

            <div className="space-y-2">
                {items.map((it) => (
                    <div key={it.label} className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50">
                        <div className="mt-0.5">{it.icon}</div>
                        <div className="min-w-0">
                            <p className="text-[11px] text-gray-500">{it.label}</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{it.value || '-'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function GroupInfoCards({ group }) {
    const contactItems = [
        { icon: <Mail className="w-4 h-4 text-gray-500" />, label: 'Email', value: group?.email },
        { icon: <Phone className="w-4 h-4 text-gray-500" />, label: 'Mobile', value: group?.mobileNumber },
        { icon: <Globe className="w-4 h-4 text-gray-500" />, label: 'Country', value: group?.country },
    ];

    const detailItems = [
        { icon: <Tag className="w-4 h-4 text-gray-500" />, label: 'Category', value: group?.category },
        {
            icon: <DollarSign className="w-4 h-4 text-gray-500" />,
            label: 'Price',
            value: group?.price != null ? `$${group.price}/month` : '-',
        },
        {
            icon: <Users className="w-4 h-4 text-gray-500" />,
            label: 'Members',
            value: group?.memberCount != null ? `${group.memberCount} active` : '-',
        },
    ];

    return (
        <div className="p-4 md:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MiniCard title="Contact" titleIcon={<Mail className="w-4 h-4 text-blue-600" />} items={contactItems} />
                    <MiniCard title="Details" titleIcon={<Tag className="w-4 h-4 text-purple-600" />} items={detailItems} />
                </div>

                <PerformanceMetrics />
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            <span className="font-medium text-gray-700">Created:</span>{' '}
                            {group?.createdAt
                                ? new Date(group.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                : '-'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                            <span className="font-medium text-gray-700">Last Updated:</span>{' '}
                            {group?.updatedAt
                                ? new Date(group.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                : '-'}
                        </span>
                    </div>
                </div>
            </div>

            {group?.statusNote && (
                <div className="mt-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-blue-900 mb-1">Admin Note</p>
                                <p className="text-sm text-blue-800">{group.statusNote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
