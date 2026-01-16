export function LayoutSkeleton() {
    return (
        <div className="min-h-screen bg-slate-100 flex animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="hidden lg:block w-64 bg-fanga-black p-6 border-r border-gray-800">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded bg-gray-800" />
                    <div className="w-24 h-6 bg-gray-800 rounded" />
                </div>
                <div className="space-y-4">
                    <div className="h-10 bg-gray-800 rounded-lg w-full" />
                    <div className="h-10 bg-gray-800/50 rounded-lg w-full" />
                    <div className="h-10 bg-gray-800/50 rounded-lg w-full" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header Skeleton */}
                <div className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 lg:px-8">
                    <div className="w-8 h-8 bg-gray-200 rounded lg:hidden" />
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="w-16 h-4 bg-gray-200 rounded hidden sm:block" />
                    </div>
                </div>

                {/* Content Placeholder (Spinner or Empty) */}
                <div className="p-8 flex items-center justify-center flex-1">
                    <div className="w-12 h-12 border-4 border-fanga-green/30 border-t-fanga-green rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    );
}
