"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Copy, CheckCircle } from "lucide-react";
import CountrySelect from "./CountrySelect";

export default function JoinGroupModal({
    showModal,
    setShowModal,
    group,
    paymentMethodId,
}) {
    // Start on QR / Address tab by default
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    const [formData, setFormData] = useState({
        email: "",
        country: "",
        address1: "",
        address2: "",
        txnId: "",
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
    });

    const [cardErrors, setCardErrors] = useState({
        cardName: "",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
    })

    const onlyDigits = (v) => (v || "").replace(/\D/g, "");

    const detectBrand = (digits) => {
        if (/^3[47]/.test(digits)) return "amex";
        if (/^4/.test(digits)) return "visa";
        if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
        if (/^(6011|65|64[4-9]|622)/.test(digits)) return "discover";
        return "unknown";
    };

    const formatCardNumber = (raw) => {
        const digits = onlyDigits(raw).slice(0, 19)
        const brand = detectBrand(digits)

        if (brand === "amex") {
            const a = digits.slice(0, 4);
            const b = digits.slice(4, 10);
            const c = digits.slice(10, 15);
            return [a, b, c].filter(Boolean).join(" ");
        }

        return digits.replace(/(.{4})/g, "$1 ").trim();
    }

    const formatExpiry = (raw) => {
        const digits = onlyDigits(raw).slice(0, 4); // MMYY
        if (digits.length <= 2) return digits;
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    };

    const luhnValid = (digits) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = digits.length - 1; i >= 0; i--) {
            let d = digits.charCodeAt(i) - 48;
            if (d < 0 || d > 9) return false;
            if (shouldDouble) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            sum += d;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    const parseExpiry = (value) => {
        const v = (value || "").trim();
        const m = v.match(/^(\d{2})\s*\/\s*(\d{2})$/); // MM/YY
        if (!m) return null;
        const month = Number(m[1]);
        let year = Number(m[2]);
        if (Number.isNaN(month) || Number.isNaN(year)) return null;
        year += 2000;
        return { month, year };
    };

    const validateCardLive = (fd) => {
        const errors = { cardName: "", cardNumber: "", cardExpiry: "", cardCvc: "" };

        // Name (only complain if user typed something)
        const name = (fd.cardName || "").trim();
        if (name.length > 0) {
            if (name.length < 2) errors.cardName = "Name looks too short";
            else if (/^\d+$/.test(name)) errors.cardName = "Name can’t be only numbers";
        }

        // Number (only complain after some progress; Luhn only when length is valid)
        const digits = onlyDigits(fd.cardNumber);
        const brand = detectBrand(digits);

        const allowedLengths =
            brand === "amex" ? [15] :
                brand === "visa" ? [13, 16, 19] :
                    brand === "mastercard" ? [16] :
                        brand === "discover" ? [16, 19] :
                            [16, 19]; // unknown: allow common lengths

        if (digits.length > 0) {
            // if user has typed enough, show "incomplete"
            const minLen = Math.min(...allowedLengths);
            if (digits.length >= 6 && digits.length < minLen) {
                errors.cardNumber = "Card number is incomplete";
            }
            // only run Luhn when length matches a valid length
            if (allowedLengths.includes(digits.length) && !luhnValid(digits)) {
                errors.cardNumber = "Card number looks incorrect";
            }
        }

        // Expiry (validate month as soon as it’s typed; past-date only when complete)
        const expDigits = onlyDigits(fd.cardExpiry);
        if (expDigits.length >= 2) {
            const month = Number(expDigits.slice(0, 2));
            if (month < 1 || month > 12) errors.cardExpiry = "Invalid month";
        }
        if ((fd.cardExpiry || "").length === 5) {
            const parsed = parseExpiry(fd.cardExpiry);
            if (!parsed) errors.cardExpiry = "Use MM/YY";
            else {
                const { month, year } = parsed;
                const now = new Date();
                const end = new Date(year, month, 0, 23, 59, 59);
                if (end < now) errors.cardExpiry = "Card is expired";
            }
        }

        // CVC (brand-aware; complain only after user starts typing)
        const cvc = onlyDigits(fd.cardCvc).slice(0, 4);
        const required = brand === "amex" ? 4 : 3;

        if (cvc.length > 0) {
            if (cvc.length > required) errors.cardCvc = `CVC must be ${required} digits`;
            else if (cvc.length >= 2 && cvc.length < required) errors.cardCvc = "CVC is incomplete";
        }

        return errors;
    };



    const [agree, setAgree] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const paymentSettings = group?.paymentSettings || {};
    const manual = paymentSettings?.manualPaymentInstructions || {};

    const manualAvailable =
        paymentSettings?.allowManualPayments && !!manual.walletAddress;

    const [activeTab, setActiveTab] = useState(
        manualAvailable ? "manual" : "wallet"
    );

    const dummyData = {
        groupName: "Trial Group",
        amount: "25 USDT",
        network: "Polygon",
        walletAddress: "0x1234...ABCD5678",
        paymentRef: "GROUP-ABC-789",
    };

    const handleCopy = (text, field) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 1200);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            let nextValue = value;

            if (name === "cardNumber") nextValue = formatCardNumber(value);
            if (name === "cardExpiry") nextValue = formatExpiry(value);
            if (name === "cardCvc") nextValue = onlyDigits(value).slice(0, 4);

            const next = { ...prev, [name]: nextValue };

            // live validate only when on card tab
            if (activeTab === "wallet") {
                setCardErrors(validateCardLive(next));
            }

            return next;
        });
    };

    const isFormValid = () => {
        const baseComplete =
            formData.email.trim() &&
            formData.country.trim() &&
            formData.address1.trim();

        const manualTab = activeTab === "manual";
        const cardTab = activeTab === "wallet";

        const manualComplete = !manualTab || formData.txnId.trim();

        const cardComplete =
            !cardTab ||
            (formData.cardName.trim() &&
                formData.cardNumber.trim() &&
                formData.cardExpiry.trim() &&
                formData.cardCvc.trim());

        return baseComplete && manualComplete && cardComplete && agree;
    };

    const formValid = isFormValid();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError("");

        const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
        const stripeCustomerId =
            typeof window !== "undefined"
                ? localStorage.getItem("authstripeCustomerId")
                : null;

        if (!formValid || !group?._id) return;

        // Decide which payment method is being used
        const paymentMethod =
            activeTab === "wallet" ? "card" : manualAvailable ? "manual" : "card";

        // BASE payload (what you specified)
        const payload = {
            groupId: group._id,
            paymentMethod,
            paymentMethodId: paymentMethod === "card" ? stripeCustomerId : null,
            txnId: paymentMethod === "manual" ? formData.txnId : undefined,
        };

        // Optional: send extra info for manual payments / metadata
        if (paymentMethod === "manual") {
            payload.txnId = formData.txnId;
        }

        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/subscriptions/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setApiError(err?.message || "Failed to create subscription.");
                return;
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            setApiError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-full max-w-xl bg-white border shadow p-4 md:p-6 pb-6 rounded-none overflow-visible"
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        {!isSubmitted ? (
                            <>
                                {/* Header */}
                                <div className="mb-4  border border-gray-200 bg-gray-50 px-3 py-3 md:px-4 md:py-3 font-rhm ">
                                    {/* Top row: logo + name + rating */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {/* Logo */}
                                            <div className="flex h-10 w-10 items-center justify-center  bg-gray-200 text-xs font-semibold text-white md:h-11 md:w-11">
                                                <img
                                                    src={`${baseUrl}${group.logoUrl}`}
                                                    alt={group.name}
                                                    className="h-8 w-8 md:h-9 md:w-9"
                                                />
                                            </div>

                                            <div>
                                                <h2 className="text-sm md:text-base font-semibold text-gray-900">
                                                    {group.groupName} – Premium access
                                                </h2>
                                                <div className="mt-0.5 flex items-center gap-1 text-[11px] md:text-xs text-gray-600">
                                                    <span className="flex text-amber-400 text-[12px]">
                                                        ★★★★★
                                                    </span>
                                                    <span className="text-gray-500">(12)</span>
                                                    <span className="mx-1 text-gray-400">•</span>
                                                    <span>{group.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side: trial / price info */}
                                        <div className="text-right text-[11px] md:text-xs">
                                            <p className="font-semibold text-gray-900">
                                                2 day free trial
                                            </p>
                                            <p className="text-gray-500">${group.price}</p>
                                        </div>
                                    </div>

                                    {/* Bottom row: card networks + extra info */}
                                    <div className="mt-3 flex items-center justify-between gap-3 text-[11px] md:text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                <img src="/cards/visa.png" className="h-4" alt="Visa" />
                                                <img
                                                    src="/cards/mastercard.png"
                                                    className="h-4"
                                                    alt="Mastercard"
                                                />
                                                <img src="/cards/keme.png" className="h-4" alt="Amex" />
                                            </div>
                                            <span>Cards accepted</span>
                                        </div>

                                        <span className="text-gray-500">
                                            Secure checkout • Cancel anytime
                                        </span>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {/* User Info */}
                                    <div className="space-y-2">
                                        <input
                                            name="email"
                                            onChange={handleChange}
                                            value={formData.email}
                                            placeholder="Email Address"
                                            type="email"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                            required
                                        />


                                        <CountrySelect
                                            value={formData.country}
                                            onChange={(code) => setFormData((p) => ({ ...p, country: code }))}
                                            required
                                            className=""
                                        />
                                        <input
                                            name="address1"
                                            onChange={handleChange}
                                            value={formData.address1}
                                            placeholder="Address Line 1"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                            required
                                        />
                                        <input
                                            name="address2"
                                            onChange={handleChange}
                                            value={formData.address2}
                                            placeholder="Address Line 2 (optional)"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                        />
                                    </div>

                                    {/* Payment Tabs */}
                                    <div className="mt-4 border-b border-gray-200 flex text-xs md:text-sm font-medium">
                                        {/* Card tab – always visible */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("wallet")}
                                            className={`flex-1 py-2 flex items-center justify-center gap-1 font-rhm transition-all ${activeTab === "wallet"
                                                ? "text-black border-b-2 border-rose-400"
                                                : "text-gray-500 hover:text-black"
                                                }`}
                                        >
                                            <Wallet className="w-4 h-4" />
                                            Via Credit Card
                                        </button>

                                        {/* QR / Address tab – ONLY if manualAvailable */}
                                        {manualAvailable && (
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("manual")}
                                                className={`flex-1 py-2 flex items-center justify-center gap-1 font-rhm transition-all ${activeTab === "manual"
                                                    ? "text-black border-b-2 border-rose-400"
                                                    : "text-gray-500 hover:text-black"
                                                    }`}
                                            >
                                                <span>📷</span> Pay via QR / Address
                                            </button>
                                        )}
                                    </div>

                                    {/* Credit Card Tab */}
                                    {activeTab === "wallet" && (
                                        <div className="mt-3 p-3 border border-gray-200 bg-gray-50 font-rhm text-xs md:text-sm space-y-2">
                                            <p className="mb-1">
                                                <span className="font-semibold">Amount:</span>{" "}
                                                {group.price} $USD
                                            </p>
                                            <p className="mb-3 text-gray-700">
                                                Pay securely with your credit or debit card.
                                            </p>

                                            <input
                                                name="cardName"
                                                onChange={handleChange}
                                                value={formData.cardName}
                                                placeholder="Name on Card"
                                                className="w-full p-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm focus:outline-none focus:ring-1 focus:ring-rose-300"
                                                required={activeTab === "wallet"}
                                            />
                                            <input
                                                name="cardNumber"
                                                onChange={handleChange}
                                                value={formData.cardNumber}
                                                placeholder="Card Number"
                                                inputMode="numeric"
                                                maxLength={23}
                                                aria-invalid={!!cardErrors.cardNumber}
                                                className="w-full p-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm focus:outline-none focus:ring-1 focus:ring-rose-300 "
                                            />
                                            {cardErrors.cardNumber && (
                                                <p className="mt-1 text-[11px] text-red-500">{cardErrors.cardNumber}</p>
                                            )}


                                            <div className="flex gap-2">
                                                <input
                                                    name="cardExpiry"
                                                    onChange={handleChange}
                                                    value={formData.cardExpiry}
                                                    placeholder="MM/YY"
                                                    className="w-1/2 p-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm focus:outline-none focus:ring-1 focus:ring-rose-300"
                                                    required={activeTab === "wallet"}
                                                />

                                                {cardErrors.cardExpiry && (
                                                    <p className="mt-1 text-[11px] text-red-500">{cardErrors.cardExpiry}</p>
                                                )}
                                                <input
                                                    name="cardCvc"
                                                    onChange={handleChange}
                                                    value={formData.cardCvc}
                                                    placeholder="CVC"
                                                    inputMode="numeric"
                                                    className="w-1/2 p-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm focus:outline-none focus:ring-1 focus:ring-rose-300"
                                                    required={activeTab === "wallet"}
                                                />
                                                {cardErrors.cardCvc && (
                                                    <p className="mt-1 text-[11px] text-red-500">{cardErrors.cardCvc}</p>
                                                )}
                                            </div>

                                            <p className="mt-1 text-[10px] text-gray-500">
                                                This is a demo UI only. No real charges will be made.
                                            </p>
                                        </div>
                                    )}

                                    {/* Manual / QR Tab */}
                                    {activeTab === "manual" && manualAvailable && (
                                        <div className="mt-3 p-3 border border-gray-200 bg-gray-50 font-rhm space-y-3 text-xs md:text-sm">
                                            {/* Amount + Network */}
                                            <p className="text-gray-800">
                                                <span className="font-semibold">Send:</span>{" "}
                                                {dummyData.amount} on {dummyData.network}
                                            </p>

                                            {/* Dummy QR Code */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="bg-rose-100 text-rose-800 text-[10px] px-3 py-1 font-rhm ">
                                                    Scan to pay
                                                </div>
                                                <div className="w-28 h-28 bg-white border-[3px] border-gray-900 grid grid-cols-4 grid-rows-4 gap-[2px] p-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                    <div />
                                                    <div className="bg-gray-900" />
                                                </div>
                                                <p className="text-[10px] text-gray-500">
                                                    Dummy QR for preview purposes only.
                                                </p>
                                            </div>

                                            {/* Wallet Address */}
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-gray-800">Wallet Address:</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopy(dummyData.walletAddress, "wallet")
                                                    }
                                                    className="flex items-center gap-1 text-rose-600 hover:text-black"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                    {copiedField === "wallet" ? "Copied" : "Copy"}
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-gray-600 break-all">
                                                {dummyData.walletAddress}
                                            </p>

                                            {/* Payment Reference */}
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-gray-800">
                                                    Payment Reference:
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopy(dummyData.paymentRef, "memo")
                                                    }
                                                    className="flex items-center gap-1 text-rose-600 hover:text-black"
                                                >
                                                    <Copy className="w-3 h-3" />
                                                    {copiedField === "memo" ? "Copied" : "Copy"}
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-gray-600">
                                                {dummyData.paymentRef}
                                            </p>

                                            {/* Txn ID Input (required for manual) */}
                                            <input
                                                name="txnId"
                                                onChange={handleChange}
                                                value={formData.txnId}
                                                placeholder="Enter Transaction ID / Reference"
                                                className="w-full mt-1 p-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm focus:outline-none focus:ring-1 focus:ring-rose-300"
                                                required={activeTab === "manual"}
                                            />
                                        </div>
                                    )}

                                    {/* Agreement */}
                                    <div className="mt-3 flex items-start gap-2 text-[10px] md:text-xs font-rhm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={agree}
                                            onChange={(e) => setAgree(e.target.checked)}
                                            className="mt-0.5"
                                        />
                                        <p>
                                            By joining, you agree to{" "}
                                            <span className="font-semibold">
                                                {dummyData.groupName}
                                            </span>{" "}
                                            Terms and Conditions and the platform’s{" "}
                                            <a href="/terms" className="text-rose-700 underline">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="/privacy" className="text-rose-700 underline">
                                                Privacy Policy
                                            </a>
                                            , and allow us to charge your payment method for this
                                            payment.
                                        </p>
                                    </div>

                                    {/* Error message */}
                                    {apiError && (
                                        <p className="text-xs text-red-500 font-rhm mt-1">
                                            {apiError}
                                        </p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={!formValid || loading}
                                        className={`w-full mt-4 py-2 text-xs md:text-sm font-semibold font-rhm border ${formValid && !loading
                                            ? "bg-rose-300 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                                            }`}
                                    >
                                        {loading ? "Processing..." : "Submit"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="py-10 text-center font-rhm">
                                <CheckCircle className="mx-auto w-12 h-12 text-green-500" />
                                <h3 className="mt-3 text-base font-semibold text-gray-900">
                                    Payment Request Sent
                                </h3>
                                <p className="mt-2 text-xs md:text-sm text-gray-600">
                                    Thank you, {formData.name || "user"}! Your payment is being
                                    reviewed. You’ll receive access instructions once approved.
                                </p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-6 px-5 py-2 text-xs md:text-sm bg-rose-300 text-black font-semibold border shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
