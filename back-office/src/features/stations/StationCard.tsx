import { Battery, Repeat, MapPin, ChevronRight } from 'lucide-react';
import type { Station } from '../../types';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useNavigate } from 'react-router-dom';

interface StationCardProps {
    station: Station;
}

export function StationCard({ station }: StationCardProps) {
    const navigate = useNavigate();

    return (
        <Card
            className="group relative overflow-hidden transition-all hover:border-fanga-green/40 hover:shadow-md"
            padding="none"
            onClick={() => navigate(`/stations/${station.id}`)}
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                        <div className={`mt-1 p-2 rounded-lg ${station.status === 'active' ? 'bg-green-50 text-fanga-green' : 'bg-amber-50 text-amber-600'}`}>
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-fanga-green transition-colors">
                                {station.name}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">{station.id}</p>
                        </div>
                    </div>
                    <StatusBadge status={station.status} />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50/50 rounded-lg p-3 border border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Battery size={14} /> Batteries
                        </span>
                        <span className="font-mono font-medium text-lg text-gray-900">
                            {station.available_batteries}
                        </span>
                    </div>
                    <div className="flex flex-col border-l border-gray-200 pl-4">
                        <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Repeat size={14} /> Swaps (24h)
                        </span>
                        <span className="font-mono font-medium text-lg text-gray-900">
                            {station.total_swaps_today}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center group-hover:bg-fanga-green/5 transition-colors">
                <span className="text-xs font-medium text-gray-500 group-hover:text-fanga-green">Voir les détails</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-fanga-green group-hover:translate-x-1 transition-all" />
            </div>

            {station.status === 'maintenance' && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-400" />
            )}
        </Card>
    );
}
