
const categories = [
    { id: 'all', label: 'All', count: null },
    { id: 'paid-groups', label: 'Paid groups', count: null },
    { id: 'agencies', label: 'Agencies', count: null },
    { id: 'coaching', label: 'Coaching and courses', count: null },
    { id: 'physical', label: 'Physical products', count: null },
    { id: 'software', label: 'Software', count: null },
    { id: 'newsletters', label: 'Newsletters', count: null },
    { id: 'events', label: 'Events', count: null },
];

export default function CategoryPanel({ selectedCategory, onCategoryChange }) {
    return (
        <div className="w-full border-b border-gray-200 bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => onCategoryChange(category.id)}
                                className={`
                                    inline-flex items-center gap-2
                                    px-3 py-1.5
                                    rounded-full
                                    border
                                    text-xs md:text-sm
                                    font-rhm
                                    whitespace-nowrap
                                    transition-all duration-200
                                    ${isActive
                                        ? 'bg-rose-500 text-white border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-[1px]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-rose-50 hover:border-gray-400'
                                    }
                                `}
                            >
                                <span className="font-medium">{category.label}</span>

                                {category.count != null && (
                                    <span
                                        className={`
                                            text-[10px] font-semibold px-2 py-0.5 rounded-full
                                            ${isActive
                                                ? 'bg-rose-400 text-white'
                                                : 'bg-gray-100 text-gray-700'
                                            }
                                        `}
                                    >
                                        {category.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
