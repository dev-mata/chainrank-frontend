'use client';
import Image from 'next/image';
import {
    Mail,
    Phone,
    Globe,
    DollarSign,
    Tag,
    Calendar,
    Clock,
    Edit,
    Pause,
    LogOut,
    CheckCircle,
    XCircle,
    AlertCircle,
    Ban,
    ExternalLink,
    Users
} from 'lucide-react';
import telegram from '../../../public/telegram.svg';
import discord from '../../../public/discord.svg';

export default function GroupOverview() {
    // Static data matching the Group model
    const groupData = {
        groupName: 'Astro Trading 🚀',
        email: 'contact@astrotrading.com',
        mobileNumber: '+1 (555) 123-4567',
        country: 'United States',
        description: 'Premium crypto trading signals and market analysis. Join our community of traders for real-time alerts, educational content, and expert insights.',
        price: 10,
        category: 'Crypto',
        telegramLink: 'https://t.me/astrotrading',
        discordLink: 'https://discord.gg/astrotrading',
        logoUrl: '/sub1.png',
        bannerUrl: '',
        groupStatus: 'approved',
        statusNote: '',
        memberCount: 1247,
        createdAt: '2024-01-15',
        updatedAt: '2024-10-20'
    };

    // Helper function to get status display
    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': {
                text: 'Pending Review',
                color: 'text-yellow-700',
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                icon: <AlertCircle className="w-4 h-4" />
            },
            'approved': {
                text: 'Live & Active',
                color: 'text-green-700',
                bg: 'bg-green-50',
                border: 'border-green-200',
                icon: <CheckCircle className="w-4 h-4" />
            },
            'rejected': {
                text: 'Rejected',
                color: 'text-red-700',
                bg: 'bg-red-50',
                border: 'border-red-200',
                icon: <XCircle className="w-4 h-4" />
            },
            'suspended': {
                text: 'Suspended',
                color: 'text-orange-700',
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                icon: <Pause className="w-4 h-4" />
            },
            'blocked': {
                text: 'Blocked',
                color: 'text-red-800',
                bg: 'bg-red-100',
                border: 'border-red-300',
                icon: <Ban className="w-4 h-4" />
            }
        };
        return statusMap[status] || statusMap['pending'];
    };

    const statusDisplay = getStatusDisplay(groupData.groupStatus);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-3 mb-3 overflow-hidden font-rhm">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-5">
                        <div className="relative">
                            <Image
                                src={groupData.logoUrl}
                                alt="Group Logo"
                                width={80}
                                height={80}
                                className="rounded-xl border-2 border-white shadow-md"
                            />
                            <div className={`absolute -bottom-1 -right-1 ${statusDisplay.bg} ${statusDisplay.border} border-2 rounded-full p-1.5`}>
                                {statusDisplay.icon}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{groupData.groupName}</h2>

                            {/* Status Badge */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusDisplay.bg} ${statusDisplay.color} ${statusDisplay.border} border`}>
                                    {statusDisplay.icon}
                                    {statusDisplay.text}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                                    <Users className="w-3.5 h-3.5" />
                                    {groupData.memberCount} members
                                </span>
                            </div>

                            {/* Quick Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                    <Tag className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">{groupData.category}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <DollarSign className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold text-green-700">${groupData.price}/mo</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-2 mt-3">
                                {groupData.telegramLink && (
                                    <a
                                        href={groupData.telegramLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-xs font-medium text-gray-700 hover:text-blue-700"
                                    >
                                        <Image src={telegram} alt="Telegram" width={16} height={16} />
                                        Telegram
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                                {groupData.discordLink && (
                                    <a
                                        href={groupData.discordLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-xs font-medium text-gray-700 hover:text-indigo-700"
                                    >
                                        <Image src={discord} alt="Discord" width={16} height={16} />
                                        Discord
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 font-rhm">
                        <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                            <Edit className="w-4 h-4" />
                            Edit Info
                        </button>
                        <button className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-lg text-sm hover:bg-orange-100 transition-all shadow-sm">
                            <Pause className="w-4 h-4" />
                            Pause
                        </button>
                        <button className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-100 transition-all shadow-sm">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
                {/* Description Card */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-blue-500 rounded"></div>
                        About This Group
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{groupData.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-4 h-4 text-blue-600" />
                            </div>
                            Contact Information
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Mail className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                                    <p className="text-sm text-gray-900 font-medium">{groupData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Mobile Number</p>
                                    <p className="text-sm text-gray-900 font-medium">{groupData.mobileNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Globe className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Country</p>
                                    <p className="text-sm text-gray-900 font-medium">{groupData.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group Details Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-5">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Tag className="w-4 h-4 text-purple-600" />
                            </div>
                            Group Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Tag className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Category</p>
                                    <p className="text-sm text-gray-900 font-medium">{groupData.category}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <DollarSign className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Subscription Price</p>
                                    <p className="text-sm text-gray-900 font-medium">${groupData.price}/month</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-0.5">Total Members</p>
                                    <p className="text-sm text-gray-900 font-medium">{groupData.memberCount} active members</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timestamps Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span><span className="font-medium text-gray-700">Created:</span> {new Date(groupData.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span><span className="font-medium text-gray-700">Last Updated:</span> {new Date(groupData.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Note (if exists) */}
            {groupData.statusNote && (
                <div className="px-6 pb-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-blue-900 mb-1">Admin Note</p>
                                <p className="text-sm text-blue-800">{groupData.statusNote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}