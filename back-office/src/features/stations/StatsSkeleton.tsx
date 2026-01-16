export function StatsSkeleton() {
    return (
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3 min-w-[180px]">
                    <div className="w-8 h-8 bg-gray-200 rounded-md" />
                    <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-20 mb-1" />
                        <div className="h-5 bg-gray-200 rounded w-10" />
                    </div>
                </div>
            ))}
        </div>
    );
}
