import clsx from 'clsx';
import type { StationStatus } from '../../types';

interface StatusBadgeProps {
    status: StationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        active: "bg-green-50 text-green-700 border-green-200",
        maintenance: "bg-amber-50 text-amber-700 border-amber-200",
    };

    const labels = {
        active: "Active",
        maintenance: "Maintenance"
    };

    return (
        <span className={clsx(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            styles[status]
        )}>
            <span className={clsx("w-1.5 h-1.5 rounded-full mr-1.5", status === 'active' ? 'bg-green-500' : 'bg-amber-500')}></span>
            {labels[status]}
        </span>
    );
}
