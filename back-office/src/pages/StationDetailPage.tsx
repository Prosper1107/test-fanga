import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { toggleStatus } from '../features/stations/stationsSlice';
import { ChevronLeft, Battery, Repeat, Sliders, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card } from '../components/ui/Card';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { StationDetailSkeleton } from '../features/stations/StationDetailSkeleton';

export default function StationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [id]);

    const station = useAppSelector(state =>
        state.stations.stations.find(s => s.id === id)
    );

    if (isLoading) {
        return <StationDetailSkeleton />;
    }

    if (!station) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <h2 className="text-xl font-bold text-gray-900">Station introuvable</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-fanga-green hover:underline"
                >
                    Retour au tableau de bord
                </button>
            </div>
        );
    }

    const handleToggleStatus = () => {
        dispatch(toggleStatus(station.id));
        const newStatus = station.status === 'active' ? 'maintenance' : 'active';
        if (newStatus === 'active') {
            toast.success(`La station ${station.name} est maintenant active.`);
        } else {
            toast.warning(`La station ${station.name} est en maintenance.`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ChevronLeft size={20} />
                <span className="font-medium">Retour</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Main Info */}
                <div className="flex-1 w-full">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{station.name}</h1>
                            <StatusBadge status={station.status} />
                        </div>
                        <p className="text-gray-500 font-mono">{station.id}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="flex items-center p-6 gap-4">
                            <div className="p-3 bg-green-50 rounded-full text-green-600">
                                <Battery size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Batteries Disponibles</p>
                                <p className="text-2xl font-bold text-gray-900">{station.available_batteries}</p>
                            </div>
                        </Card>

                        <Card className="flex items-center p-6 gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <Repeat size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Swaps Aujourd'hui</p>
                                <p className="text-2xl font-bold text-gray-900">{station.total_swaps_today}</p>
                            </div>
                        </Card>
                    </div>

                    {/* Simulating a "Feed" or "Log" area for realism */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Activités Récentes</h3>
                        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
                            <div className="flex items-start gap-3 pb-4 border-b border-gray-50">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-900">Swap effectué par Driver #4392</p>
                                    <p className="text-xs text-gray-400">Il y a 12 minutes</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-green-400" />
                                <div>
                                    <p className="text-sm text-gray-900">Station en ligne</p>
                                    <p className="text-xs text-gray-400">Il y a 2 heures</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="w-full md:w-80 space-y-4">
                    <Card>
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sliders size={18} /> Actions
                        </h3>
                        <div className="space-y-3">
                            <button
                                onClick={handleToggleStatus}
                                className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${station.status === 'active'
                                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                                    }`}
                            >
                                {station.status === 'active' ? (
                                    <>
                                        <AlertTriangle size={18} />
                                        Mettre en Maintenance
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Activer la Station
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                            Note: Le changement de statut affectera la visibilité de la station sur l'application chauffeur.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
