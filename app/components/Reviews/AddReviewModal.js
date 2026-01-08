import { Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";


function StarRating({ value, onChange }) {
    const [hover, setHover] = useState(0)

    const active = hover || value;


    return (
        <>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                    <button
                        key={n}
                        type="button"
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => onChange(n)}
                        className="p-1 rounded hover:bg-gray-100 transition"
                        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    >

                        <Star size={20}
                            className={active >= n ? "text-yellow-500 " : "text-gray-300"}
                            fill={active >= n ? "currentColor" : "none"}
                        />

                    </button>
                ))}
                <span className="ml-2 text-xs text-gray-500 font-rhm">{value || 0}/5</span>

            </div>
        </>
    )
}
export default function AddReviewModal({ open, onClose, onSubmit }) {


    const [name, setName] = useState("")
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState("")

    const canSubmit = useMemo(() => rating >= 1 && message.trim().length >= 3, [rating, message])


    useEffect(() => {
        if (!open) return;

        setName("")
        setRating(0)
        setMessage("")
    }, [open])

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.()
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, onClose])


    if (!open) return null;


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSubmit) return

        onSubmit?.({
            user: name.trim() || "Anonymous",
            rating,
            message: message.trim()
        })
    }





    return (
        <>
            <div className="fixed inset-0 z-50 bg-white/50 ">
                <button
                    type="button"
                    className="absolute inset-0 bg-black/40"
                    onClick={onClose}
                    aria-label="Close Modal"
                />



                <div className="relative mx-auto mt-20 w-[92%] max-w-lg bg-white shadow-xl">
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                        <h3 className="text-lg font-semibold text-black font-rhm">Add a Review</h3>

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                            aria-label="Close">
                            <X size={18} />
                        </button>

                    </div>

                    <form onSubmit={handleSubmit} className="px-5 py-4">
                        <label className="block text-sm font-medium font-rhm text-gray-700 mb-1">
                            Your Name (optional)
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John"
                            className="w-full border px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-rose-200">
                        </input>


                        <div className="mt-4">
                            <label className="block text-sm font-medium font-rhm text-gray-700 mb-1">
                                Rating
                            </label>

                            <StarRating value={rating} onChange={setRating} />

                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium font-rhm text-gray-700 mb-1">
                                Review
                            </label>

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Share details of your experience.."
                                rows={4}
                                className="w-full resize-none border px-3 py-2 text-sm font-rhm outline-none focus:ring-2 focus:ring-rose-200"
                            />
                            <p className="text-xs font-rhm text-gray-500 justify-end flex">Minimum 3 characters</p>

                        </div>

                        <div className="mt-5 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-rhm border hover:bg-gray-40 transition">
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="px-4 py-2 text-sm font-semibold font-rhm text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:hover:bg-rose-500 transition"
                            >
                                Submit Review
                            </button>

                        </div>
                    </form>
                </div>
            </div>

        </>)
}