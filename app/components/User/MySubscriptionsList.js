"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function MySubscriptionsList() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const authToken =
                    typeof window !== "undefined"
                        ? localStorage.getItem("authToken")
                        : null;

                if (!authToken) {
                    setApiError("You need to be logged in to view subscriptions.");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${baseUrl}/api/subscriptions/my-subscriptions`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    setApiError(err?.message || "Failed to load subscriptions.");
                    setLoading(false);
                    return;
                }

                const data = await res.json();

                const subs = data.data || data.subscriptions || [];
                setSubscriptions(subs);
            } catch (err) {
                console.error(err);
                setApiError("Something went wrong while fetching subscriptions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    if (loading) {
        return <p className="text-sm text-gray-600">Loading subscriptions…</p>;
    }

    if (apiError) {
        return <p className="text-sm text-red-500">{apiError}</p>;
    }

    if (!subscriptions.length) {
        return (
            <p className="text-sm text-gray-600">
                You don’t have any subscriptions yet.
            </p>
        );
    }

    return (

        <div className="max-w-7xl mx-auto py-6">
            <div className="flex justify-between items-center mb-4 ">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center font-rhm">
                        My Subscriptions
                        <span className="ml-1 w-2 h-2 bg-green-500 rounded-full inline-block" />
                    </h2>
                    <p className="text-xs font-rhm text-gray-600 mt-1">
                        Communities currently in high demand
                    </p>
                </div>
                <a
                    href="/groupboard"
                    className="border border-gray-400 px-4 py-2 text-sm font-rhm text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                >
                    See more →
                </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                {subscriptions.map((sub) => (
                    <MySubscriptionCard key={sub._id} subscription={sub} baseUrl={baseUrl} />
                ))}
            </div>


        </div>

    );
}

function MySubscriptionCard({ subscription, baseUrl }) {
    const group = subscription.groupId || {};
    const config = group.subscriptionConfig || {};
    const access = subscription.accessDetails || {};

    const bannerUrl = group.bannerUrl
        ? `${baseUrl}${group.bannerUrl}`
        : "/placeholder-banner.png";
    const logoUrl = group.logoUrl
        ? `${baseUrl}${group.logoUrl}`
        : "/placeholder-avatar.png";

    const subscriptionType = subscription.subscriptionType || config.subscriptionType;
    const price = subscription.subscriptionPrice ?? group.price;
    const status = subscription.status || "unknown";

    const billingLabel =
        subscriptionType === "yearly"
            ? "/year"
            : subscriptionType === "monthly"
                ? "/month"
                : "/period";

    const tags = [group.category, group.subCategory].filter(Boolean);

    // Trial info
    const trialEndsAt = subscription.trialEndsAt
        ? new Date(subscription.trialEndsAt)
        : null;

    let trialLabel = "";
    if (status === "trial" && trialEndsAt) {
        const now = new Date();
        const diffMs = trialEndsAt.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            trialLabel = `Trial ends in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
        } else {
            trialLabel = "Trial ended";
        }
    } else if (config.hasTrialPeriod && config.trialPeriodDays) {
        trialLabel = `Includes ${config.trialPeriodDays}-day free trial`;
    }

    // Auto-renew text
    const autoRenewLabel =
        config.autoRenew && !subscription.isCancelled
            ? "Auto-renew is ON"
            : subscription.isCancelled
                ? "Cancelled – will not renew"
                : "Auto-renew is OFF";

    // Status badge style
    const getStatusStyles = () => {
        switch (status) {
            case "trial":
                return "bg-amber-100 text-amber-800";
            case "active":
                return "bg-emerald-100 text-emerald-800";
            case "cancelled":
                return "bg-gray-200 text-gray-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const accessGrantedText = access.accessGrantedAt
        ? `Access granted on ${new Date(access.accessGrantedAt).toLocaleDateString()}`
        : "Access pending";

    const telegramText = access.telegramInviteSent ? "Telegram: Sent" : "Telegram: Not sent";
    const discordText = access.discordInviteSent ? "Discord: Sent" : "Discord: Not sent";

    return (
        <div className="border overflow-hidden bg-white shadow-sm">
            {/* Banner */}
            <div className="relative w-full h-28">
                <img
                    src={bannerUrl}
                    alt={`${group.groupName || "Group"} banner`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "/placeholder-banner.png";
                    }}
                />
                {/* Status badge */}
                <div className="absolute top-2 right-2 px-2 py-1  text-[11px] font-semibold font-rhm shadow-sm bg-white">
                    <span className={`px-2 py-0.5 ${getStatusStyles()}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                        <img
                            src={logoUrl}
                            alt={group.groupName}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                                e.target.src = "/placeholder-avatar.png";
                            }}
                        />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {group.groupName || "Untitled Group"}
                        </h3>

                        <p className="text-[11px] text-gray-600 font-rhm mt-0.5">
                            Subscription:{" "}
                            <span className="font-semibold">
                                {subscriptionType ? subscriptionType.toUpperCase() : "N/A"}
                            </span>
                        </p>

                        {trialLabel && (
                            <p className="text-[11px] text-amber-700 font-rhm mt-0.5">
                                {trialLabel}
                            </p>
                        )}

                        <p className="text-[11px] text-gray-700 font-rhm mt-1">
                            {autoRenewLabel}
                        </p>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-gray-900 font-rhm">
                            ${price}
                        </p>
                        <p className="text-xs text-gray-500">{billingLabel}</p>
                    </div>
                </div>

                {/* Rating + tags (like TrendingCard) */}
                <div className="flex items-center text-sm mt-2 gap-1 text-rose-500">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="text-gray-600 text-xs ml-2 font-rhm">
                        4.8 (120){tags.length ? ` • ${tags.join(" • ")}` : ""}
                    </span>
                </div>

                {/* Access details */}
                <div className="mt-3 border-t pt-2 space-y-1">
                    <p className="text-[11px] text-gray-700 font-rhm">
                        {accessGrantedText}
                    </p>
                    <p className="text-[11px] text-gray-600 font-rhm">
                        {telegramText} • {discordText}
                    </p>
                    {access.accessNote && (
                        <p className="text-[11px] text-gray-500 font-rhm italic">
                            Note: {access.accessNote}
                        </p>
                    )}
                </div>

                {/* Optional: next billing / expiry */}
                <div className="mt-2 text-[10px] text-gray-500 font-rhm space-y-0.5">
                    {subscription.nextBillingDate && (
                        <p>
                            Next billing:{" "}
                            {new Date(subscription.nextBillingDate).toLocaleDateString()}
                        </p>
                    )}
                    {subscription.expiryDate && (
                        <p>
                            Expires:{" "}
                            {new Date(subscription.expiryDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

