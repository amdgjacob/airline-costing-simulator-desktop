import React from 'react';

interface RadialChartProps {
    value: number;
    label: string;
    size?: number;
    strokeWidth?: number;
    color?: 'blue' | 'green' | 'red' | 'orange';
}

export const RadialChart: React.FC<RadialChartProps> = ({
    value,
    label,
    size = 140,
    strokeWidth = 10,
    color = 'blue'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    const colors = {
        blue: '#2563eb',
        green: '#10b981',
        red: '#ef4444',
        orange: '#f59e0b'
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    style={{ transform: 'rotate(-90deg)' }}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={colors[color]}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                    />
                </svg>
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ transform: 'translateY(-4px)' }}
                >
                    <span style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: '#1e293b',
                        letterSpacing: '-0.03em',
                        lineHeight: 1
                    }}>
                        {value}%
                    </span>
                </div>
            </div>
            <span style={{
                marginTop: '12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#64748b'
            }}>
                {label}
            </span>
        </div>
    );
};
