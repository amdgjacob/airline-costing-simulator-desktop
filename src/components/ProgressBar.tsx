import React from 'react';

interface ProgressBarProps {
    label: string;
    value: number; // 0-100
    color?: 'green' | 'red' | 'blue' | 'orange';
    icon?: React.ReactNode;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    label,
    value,
    color = 'blue',
    icon
}) => {
    const colors = {
        green: 'bg-green-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        orange: 'bg-orange-500'
    };

    return (
        <div className="flex items-center gap-3 py-2">
            {/* Icon */}
            {icon && (
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                    {icon}
                </div>
            )}

            {/* Label */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 truncate">{label}</span>
                    <span className="text-sm font-bold text-slate-800 ml-2">{value}%</span>
                </div>
                {/* Bar */}
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
                        style={{ width: `${value}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
