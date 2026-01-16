import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export function Card({ children, className, padding = 'md', onClick }: CardProps) {
    const paddings = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-8'
    };

    return (
        <div
            onClick={onClick}
            className={clsx(
                "bg-white rounded-xl shadow-sm border border-gray-200 transition-all",
                onClick && "cursor-pointer hover:shadow-md hover:border-fanga-green/30",
                paddings[padding],
                className
            )}
        >
            {children}
        </div>
    );
}
