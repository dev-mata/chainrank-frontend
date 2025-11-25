
import GroupCard from './GroupCard';

export default function GroupGrid({ groups, loading, variant = 'regular' }) {

    console.log('Rendering GroupGrid with groups:', loading ? 'loading' : groups);

    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="
              bg-white border border-gray-200 
              shadow-[3px_3px_0px_rgba(0,0,0,1)]
              max-w-md w-full mx-auto
              animate-pulse
            "
                    >
                        {/* Image skeleton */}
                        <div className="w-full h-40 bg-gray-100" />

                        {/* Content skeleton */}
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-100 rounded w-3/4" />
                            <div className="h-3 bg-gray-100 rounded w-full" />
                            <div className="h-3 bg-gray-100 rounded w-2/3" />

                            <div className="flex justify-between items-center pt-2">
                                <div className="h-4 bg-gray-100 rounded w-1/3" />
                                <div className="h-8 bg-gray-100 rounded w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!groups || groups.length === 0) {
        return (
            <div className="py-10 text-center">
                <p className="text-sm md:text-base text-gray-600 font-rhm">
                    No groups found
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
                <GroupCard
                    key={group._id || group.id}
                    group={group}
                    variant={variant}
                />
            ))}
        </div>
    );
}
