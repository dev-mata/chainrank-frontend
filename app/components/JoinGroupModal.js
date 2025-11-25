"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Copy, CheckCircle } from "lucide-react";

export default function JoinGroupModal({ showModal, setShowModal }) {
    // Start on QR / Address tab by default
    const [activeTab, setActiveTab] = useState("manual");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        address1: "",
        address2: "",
        txnId: "",
    });
    const [agree, setAgree] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        setIsSubmitted(true);
    };

    const isFormValid = () => {
        const baseComplete =
            formData.name.trim() &&
            formData.email.trim() &&
            formData.country.trim() &&
            formData.address1.trim();

        const manualTab = activeTab === "manual";
        const manualComplete = !manualTab || formData.txnId.trim();

        return baseComplete && manualComplete && agree;
    };

    const formValid = isFormValid();

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
                                <div className="mb-4 text-center">
                                    <h2 className="text-base md:text-lg font-semibold text-gray-900">
                                        Join {dummyData.groupName}
                                    </h2>
                                    <p className="mt-1 text-xs md:text-sm text-gray-600 font-rhm">
                                        Fill in your details and complete the payment to start.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {/* User Info */}
                                    <div className="space-y-2">
                                        <input
                                            name="name"
                                            onChange={handleChange}
                                            value={formData.name}
                                            placeholder="Full Name"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                            required
                                        />
                                        <input
                                            name="email"
                                            onChange={handleChange}
                                            value={formData.email}
                                            placeholder="Email Address"
                                            type="email"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                            required
                                        />
                                        <input
                                            name="country"
                                            onChange={handleChange}
                                            value={formData.country}
                                            placeholder="Country"
                                            className="w-full p-2 text-sm border border-gray-300 bg-gray-50 font-rhm focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-300"
                                            required
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
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("wallet")}
                                            className={`flex-1 py-2 flex items-center justify-center gap-1 font-rhm transition-all ${activeTab === "wallet"
                                                ? "text-black border-b-2 border-rose-400"
                                                : "text-gray-500 hover:text-black"
                                                }`}
                                        >
                                            <Wallet className="w-4 h-4" />
                                            Connect Wallet
                                        </button>
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
                                    </div>

                                    {/* Wallet Tab */}
                                    {activeTab === "wallet" && (
                                        <div className="mt-3 p-3 border border-gray-200 bg-gray-50 font-rhm text-xs md:text-sm">
                                            <p className="mb-1">
                                                <span className="font-semibold">Amount:</span>{" "}
                                                {dummyData.amount}
                                            </p>
                                            <p className="mb-2">
                                                <span className="font-semibold">Network:</span>{" "}
                                                {dummyData.network}
                                            </p>
                                            <button
                                                type="button"
                                                className="w-full mt-1 py-2 text-xs md:text-sm bg-rose-300 text-black font-semibold border shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                                            >
                                                Connect Wallet
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full mt-2 py-2 text-xs md:text-sm border border-gray-300 bg-white font-rhm hover:bg-gray-50"
                                            >
                                                Simulate Payment
                                            </button>
                                        </div>
                                    )}

                                    {/* Manual / QR Tab */}
                                    {activeTab === "manual" && (
                                        <div className="mt-3 p-3 border border-gray-200 bg-gray-50 font-rhm space-y-3 text-xs md:text-sm">
                                            {/* Amount + Network */}
                                            <p className="text-gray-800">
                                                <span className="font-semibold">Send:</span>{" "}
                                                {dummyData.amount} on {dummyData.network}
                                            </p>

                                            {/* Dummy QR Code */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="bg-rose-100 text-rose-800 text-[10px] px-3 py-1 rounded-full shadow-sm">
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
                                                <span className="text-gray-800">Payment Reference:</span>
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

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={!formValid}
                                        className={`w-full mt-4 py-2 text-xs md:text-sm font-semibold font-rhm border ${formValid
                                            ? "bg-rose-300 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                            : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                                            }`}
                                    >
                                        Submit
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
