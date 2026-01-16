import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { StationCard } from '../features/stations/StationCard';
import { StationCardSkeleton } from '../features/stations/StationCardSkeleton';
import { StatsSkeleton } from '../features/stations/StatsSkeleton';
import { StationFilters } from '../features/stations/StationFilters';
import type { StationStatus } from '../types';
import { BatteryCharging, AlertTriangle, Search as SearchIcon, Repeat } from 'lucide-react';

import { useDebounce } from '../app/useDebounce';

export default function DashboardPage() {
    const { stations } = useAppSelector((state) => state.stations);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate Async Data Fetching
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s delay
        return () => clearTimeout(timer);
    }, []);

    // Local State for Filters
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [statusFilter, setStatusFilter] = useState<StationStatus | 'all'>('all');
    const [sortBy, setSortBy] = useState<'batteries' | 'name' | 'swaps'>('name');

    // Logic: Filter & Sort
    const filteredStations = stations
        .filter(station => {
            const matchesSearch = station.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                station.id.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'batteries') return b.available_batteries - a.available_batteries;
            if (sortBy === 'swaps') return b.total_swaps_today - a.total_swaps_today;
            return a.name.localeCompare(b.name);
        });

    // Calculate Quick Stats
    const totalStats = {
        total: stations.length,
        active: stations.filter(s => s.status === 'active').length,
        maintenance: stations.filter(s => s.status === 'maintenance').length,
        totalBatteries: stations.reduce((acc, curr) => acc + curr.available_batteries, 0),
        totalSwaps: stations.reduce((acc, curr) => acc + curr.total_swaps_today, 0)
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tableau de bord</h1>
                    <p className="text-gray-500 mt-1">Vue d'ensemble du réseau de stations Fanga.</p>
                </div>

                {/* Quick StatsRow */}
                {isLoading ? (
                    <StatsSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3 transition-shadow hover:shadow-md">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <BatteryCharging size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Batteries Dispo</p>
                                <p className="text-xl font-bold text-gray-900 leading-none mt-0.5">{totalStats.totalBatteries}</p>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Repeat size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Swaps (24h)</p>
                                <p className="text-xl font-bold text-gray-900 leading-none mt-0.5">{totalStats.totalSwaps}</p>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Maintenance</p>
                                <p className="text-xl font-bold text-gray-900 leading-none mt-0.5">{totalStats.maintenance}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <StationFilters
                search={search} onSearchChange={setSearch}
                statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}
                sortBy={sortBy} onSortChange={setSortBy}
            />

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(n => <StationCardSkeleton key={n} />)}
                </div>
            ) : filteredStations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredStations.map(station => (
                        <StationCard key={station.id} station={station} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <SearchIcon className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Aucune station trouvée</h3>
                    <p className="text-gray-500">Essayez de modifier vos filtres de recherche.</p>
                </div>
            )}
        </div>
    )
}
