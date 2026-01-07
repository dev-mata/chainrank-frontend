"use client";

export default function FullScreenLoader({ label = "Loading..." }) {
    return (
        <div
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
                <p className="text-sm text-gray-700 font-rhm">{label}</p>
            </div>
        </div>
    );
}
