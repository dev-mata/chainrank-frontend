'use client';

export default function GroupHeader({ bannerSrc, logoSrc, statusDisplay, onEdit, onLogout }) {
    return (
        <div className="md:col-span-2">
            <div className="relative h-28 md:h-auto rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                {bannerSrc ? (
                    <img src={bannerSrc} alt="Group Banner" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50" />
                )}

                <div className="absolute bottom-5 left-4 flex items-end gap-3">
                    <div className="relative">
                        <img
                            src={logoSrc}
                            alt="Group Logo"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover bg-white"
                        />
                        <div className={`absolute -bottom-1 -right-1 ${statusDisplay.bg} ${statusDisplay.border} border-2 rounded-full p-1`}>
                            {statusDisplay.icon}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex items-center justify-end gap-2">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
                >
                    Edit
                </button>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-100 transition-all shadow-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
