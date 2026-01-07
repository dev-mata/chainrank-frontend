
import { X } from "lucide-react";
import { useRouter } from "next/navigation"

export default function AuthRequiredModal({
    open,
    onClose,
    title = "Login Required",
    message = "You need to login first to join this group",
    buttonText = "Login / Register",
    redirectTo = "/login"
}

) {

    const router = useRouter();

    if (!open) return null;

    const goToLogin = () => {
        onClose?.();
        router.push(redirectTo);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white border border-gray-200 p-5 relative">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-gray-700 hover:text-black"
                    aria-label="Close">
                    <X size={18} />
                </button>

                <h3 className="text-lg font-bold text-black font-rhm mb-2">{title}</h3>
                <p className="text-sm text-gray-700 font-rhm mb-4">{message}</p>

                <div className="flex gap-2 justify-end">
                    <button onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-sm font-rhm hover:bg-gray-50">
                        Cancel
                    </button>

                    <button className="px-4 py-2 border-1 font-rhm bg-rose-300 text-black font-semibold text-sm"
                        onClick={goToLogin}>
                        {buttonText}
                    </button>
                </div>
            </div>

        </div>
    )
}