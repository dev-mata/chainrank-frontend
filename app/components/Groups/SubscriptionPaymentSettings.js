"use client";

import { useEffect, useState } from "react";

export default function SubscriptionPaymentSettings({ profile }) {
    const [subscriptionConfig, setSubscriptionConfig] = useState({
        subscriptionType: "monthly",
        hasTrialPeriod: false,
        trialPeriodDays: 7,
        autoRenew: true,
    });

    const [paymentSettings, setPaymentSettings] = useState({
        allowManualPayments: false,
        manualPaymentInstructions: {
            walletAddress: "",
            network: "",
            paymentReference: "",
            instructions: "",
        },
    });

    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Initialize from profile when available
    useEffect(() => {
        if (!profile) return;

        if (profile.subscriptionConfig) {
            setSubscriptionConfig((prev) => ({
                ...prev,
                ...profile.subscriptionConfig,
            }));
        }

        if (profile.paymentSettings) {
            setPaymentSettings((prev) => ({
                ...prev,
                ...profile.paymentSettings,
                manualPaymentInstructions: {
                    ...prev.manualPaymentInstructions,
                    ...(profile.paymentSettings.manualPaymentInstructions || {}),
                },
            }));
        }
    }, [profile]);

    const handleSubscriptionChange = (field, value) => {
        setSubscriptionConfig((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePaymentSettingsChange = (field, value) => {
        setPaymentSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleManualInstructionsChange = (field, value) => {
        setPaymentSettings((prev) => ({
            ...prev,
            manualPaymentInstructions: {
                ...prev.manualPaymentInstructions,
                [field]: value,
            },
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("groupToken")
                    : null;

            if (!token) {
                setErrorMessage("You are not logged in.");
                setSaving(false);
                return;
            }

            const payload = {
                subscriptionConfig,
                paymentSettings,
            };

            const res = await fetch(`${apiBaseUrl}/api/groups/settings`, {
                method: "PATCH", // change to PATCH/POST if your backend expects it
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setErrorMessage(data.error || "Failed to update settings.");
                setSaving(false);
                return;
            }

            setSuccessMessage("Subscription & payment settings updated successfully.");
            setSaving(false);

            // Optionally: revalidate local state from response if backend returns updated data
            // const updated = await res.json();
            // setSubscriptionConfig(updated.subscriptionConfig);
            // setPaymentSettings(updated.paymentSettings);
        } catch (err) {
            console.error("Error updating settings:", err);
            setErrorMessage("Network error. Please try again.");
            setSaving(false);
        }
    };

    return (
        <section className="mt-8 bg-white border border-gray-200  shadow-sm p-6 space-y-4 font-rhm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 font-rhm">
                        Subscription &amp; Payment Settings
                    </h2>
                    <p className="text-sm text-gray-500">
                        Configure how members pay and how your subscription behaves.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center  bg-rose-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {successMessage && (
                <div className="rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-800">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
                    {errorMessage}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
                {/* Subscription config */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                        Subscription Details
                    </h3>

                    <div className="space-y-3 text-sm text-gray-700">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">
                                Subscription type
                            </label>
                            <select
                                value={subscriptionConfig.subscriptionType}
                                onChange={(e) =>
                                    handleSubscriptionChange("subscriptionType", e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Auto renew</span>
                            <label className="inline-flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={subscriptionConfig.autoRenew}
                                    onChange={(e) =>
                                        handleSubscriptionChange("autoRenew", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                                />
                                <span>{subscriptionConfig.autoRenew ? "Enabled" : "Disabled"}</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Trial period</span>
                            <label className="inline-flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={subscriptionConfig.hasTrialPeriod}
                                    onChange={(e) =>
                                        handleSubscriptionChange(
                                            "hasTrialPeriod",
                                            e.target.checked
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                                />
                                <span>
                                    {subscriptionConfig.hasTrialPeriod ? "Enabled" : "Disabled"}
                                </span>
                            </label>
                        </div>

                        {subscriptionConfig.hasTrialPeriod && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Trial period (days)
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={subscriptionConfig.trialPeriodDays}
                                    onChange={(e) =>
                                        handleSubscriptionChange(
                                            "trialPeriodDays",
                                            Number(e.target.value) || 0
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Manual payments */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-800">
                            Manual Payments
                        </h3>
                        <label className="inline-flex items-center gap-2 text-xs">
                            <input
                                type="checkbox"
                                checked={paymentSettings.allowManualPayments}
                                onChange={(e) =>
                                    handlePaymentSettingsChange(
                                        "allowManualPayments",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                            />
                            <span>
                                {paymentSettings.allowManualPayments ? "Enabled" : "Disabled"}
                            </span>
                        </label>
                    </div>

                    {paymentSettings.allowManualPayments && (
                        <div className="space-y-3 text-sm text-gray-700">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Network
                                </label>
                                <input
                                    type="text"
                                    value={paymentSettings.manualPaymentInstructions.network}
                                    onChange={(e) =>
                                        handleManualInstructionsChange("network", e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="Polygon (MATIC)"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Wallet address
                                </label>
                                <input
                                    type="text"
                                    value={paymentSettings.manualPaymentInstructions.walletAddress}
                                    onChange={(e) =>
                                        handleManualInstructionsChange(
                                            "walletAddress",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="0x..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Payment reference
                                </label>
                                <input
                                    type="text"
                                    value={
                                        paymentSettings.manualPaymentInstructions.paymentReference
                                    }
                                    onChange={(e) =>
                                        handleManualInstructionsChange(
                                            "paymentReference",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="COINBUREAU-2025"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Instructions
                                </label>
                                <textarea
                                    rows={3}
                                    value={paymentSettings.manualPaymentInstructions.instructions}
                                    onChange={(e) =>
                                        handleManualInstructionsChange(
                                            "instructions",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    placeholder="Send USDT on Polygon network. Include payment reference in memo."
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
