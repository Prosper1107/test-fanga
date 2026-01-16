import { Card } from '../../components/ui/Card';

export function StationCardSkeleton() {
    return (
        <Card className="animate-pulse" padding="none">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3 w-full">
                        <div className="w-10 h-10 rounded-lg bg-gray-200" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                    </div>
                    <div className="w-16 h-5 bg-gray-200 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 p-3 border border-gray-100/50 rounded-lg">
                    <div className="h-10 bg-gray-100 rounded" />
                    <div className="h-10 bg-gray-100 rounded" />
                </div>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex justify-between">
                <div className="h-3 bg-gray-100 rounded w-20" />
            </div>
        </Card>
    );
}
