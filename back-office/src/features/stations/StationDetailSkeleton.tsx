import { Card } from '../../components/ui/Card';

export function StationDetailSkeleton() {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="mb-6 flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-64 h-8 bg-gray-200 rounded" />
                            <div className="w-20 h-6 bg-gray-200 rounded-full" />
                        </div>
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="h-32 bg-white"><div className="w-full h-full bg-gray-100 rounded" /></Card>
                        <Card className="h-32 bg-white"><div className="w-full h-full bg-gray-100 rounded" /></Card>
                    </div>

                    <div className="mt-8">
                        <div className="w-40 h-6 bg-gray-200 rounded mb-4" />
                        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
                            <div className="h-12 bg-gray-100 rounded" />
                            <div className="h-12 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80">
                    <Card className="h-64 bg-white"><div className="w-full h-full bg-gray-100 rounded" /></Card>
                </div>
            </div>
        </div>
    );
}
