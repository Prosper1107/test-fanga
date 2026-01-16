import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import type { StationStatus } from '../../types';

interface StationFiltersProps {
    search: string;
    onSearchChange: (val: string) => void;
    statusFilter: StationStatus | 'all';
    onStatusFilterChange: (val: StationStatus | 'all') => void;
    sortBy: 'batteries' | 'name' | 'swaps';
    onSortChange: (val: 'batteries' | 'name' | 'swaps') => void;
}

export function StationFilters({
    search, onSearchChange,
    statusFilter, onStatusFilterChange,
    sortBy, onSortChange
}: StationFiltersProps) {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sortOptions = [
        { value: 'name', label: 'Trier par Nom' },
        { value: 'batteries', label: 'Trier par Batteries' },
        { value: 'swaps', label: 'Trier par Swaps' },
    ] as const;

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search */}
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-fanga-green focus:border-fanga-green sm:text-sm transition-colors"
                    placeholder="Rechercher une station (nom, ID)..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">

                {/* Status Filter */}
                <div className="w-full md:w-auto flex items-center p-1 bg-gray-50 rounded-lg border border-gray-200">
                    {(['all', 'active', 'maintenance'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => onStatusFilterChange(status)}
                            className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-all ${statusFilter === status
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {status === 'all' ? 'Toutes' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="hidden md:block h-6 w-px bg-gray-200 mx-1" />

                {/* Custom Sort Dropdown */}
                <div className="relative w-full md:w-auto z-20" ref={sortRef}>
                    <button
                        type="button"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="w-full md:w-48 px-3 py-2 text-left text-sm font-medium bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-fanga-green/20"
                    >
                        <span className="truncate text-gray-700">
                            {sortOptions.find(o => o.value === sortBy)?.label}
                        </span>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isSortOpen && (
                        <div className="absolute z-50 right-0 mt-2 w-full md:w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in zoom-in-95 duration-200">
                            {sortOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.value}
                                    onClick={() => {
                                        onSortChange(option.value);
                                        setIsSortOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between group"
                                >
                                    <span className={`${sortBy === option.value ? 'text-fanga-green font-medium' : 'text-gray-700'}`}>
                                        {option.label}
                                    </span>
                                    {sortBy === option.value && (
                                        <Check size={16} className="text-fanga-green" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
