import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import { formatCurrency } from '../utils';

interface DashboardProps {
    financials: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ financials }) => {
    const { routesWithAllocation } = financials;

    const routeData = routesWithAllocation.map((r: any) => ({
        name: r.name,
        Revenue: r.revenue,
        Variable: r.variableCost,
        Overhead: r.allocatedOverhead,
        Profit: r.netProfit,
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    minWidth: '180px'
                }}>
                    <p style={{
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#1e293b',
                        marginBottom: '10px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid #f1f5f9'
                    }}>
                        {label}
                    </p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '6px'
                        }}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '12px',
                                color: '#64748b'
                            }}>
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '2px',
                                    background: entry.color
                                }} />
                                {entry.name}
                            </span>
                            <span style={{
                                fontFamily: "'SF Mono', 'Fira Code', monospace",
                                fontWeight: 600,
                                fontSize: '12px',
                                color: '#1e293b'
                            }}>
                                {formatCurrency(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const legendItems = [
        { name: 'Revenue', color: '#94a3b8' },
        { name: 'Variable', color: '#f87171' },
        { name: 'Overhead', color: '#60a5fa' },
        { name: 'Profit', color: '#10b981' },
        { name: 'Loss', color: '#ef4444' }
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Legend */}
            <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid #f1f5f9'
            }}>
                {legendItems.map(item => (
                    <div key={item.name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#64748b'
                    }}>
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '3px',
                            background: item.color
                        }} />
                        {item.name}
                    </div>
                ))}
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={routeData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            fontSize={11}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0' }}
                            dy={8}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            fontSize={11}
                            fontWeight={500}
                            tickFormatter={(val) => `$${val / 1000}k`}
                            tickLine={false}
                            axisLine={false}
                            width={60}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(37, 99, 235, 0.04)' }}
                            content={<CustomTooltip />}
                        />
                        <ReferenceLine y={0} stroke="#e2e8f0" strokeWidth={1} />

                        <Bar dataKey="Revenue" fill="#94a3b8" radius={[3, 3, 0, 0]} barSize={16} name="Revenue" />
                        <Bar dataKey="Variable" stackId="costs" fill="#f87171" name="Variable" radius={[0, 0, 0, 0]} barSize={16} />
                        <Bar dataKey="Overhead" stackId="costs" fill="#60a5fa" name="Overhead" radius={[3, 3, 0, 0]} barSize={16} />

                        <Bar dataKey="Profit" name="Profit" radius={[3, 3, 3, 3]} barSize={16} fill="#10b981">
                            {routeData.map((entry: any, index: number) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.Profit >= 0 ? '#10b981' : '#ef4444'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
