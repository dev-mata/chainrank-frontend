import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
    const dateText = review.createdAt
        ? new Date(review.createdAt).toLocaleDateString()
        : review.time || "";

    return (
        <>
            <div className="bg-rose-100 p-4 border border-rose-200 mb-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-black text-sm md:text-base">
                        {review.userEmail || review.user || "Anonymous"}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} fill="currentColor" stroke="currentColor" />
                        <span className="text-sm font-bold">{review.rating}</span>
                    </div>
                </div>

                <p className="text-xs text-gray-600 font-rhm">{dateText}</p>

                <p className="mt-1 text-sm text-gray-800 font-rhm">
                    {review.message}
                </p>
            </div>
        </>
    )
}