import React from 'react';
import type { RouteState } from '../utils';
import { formatCurrency } from '../utils';

interface RouteManagerProps {
    routes: RouteState[];
    onToggleRoute: (id: number) => void;
}

export const RouteManager: React.FC<RouteManagerProps> = ({ routes, onToggleRoute }) => {
    const activeCount = routes.filter(r => r.isActive).length;

    return (
        <div className="h-full flex flex-col">
            <div className="card-header">
                <div>
                    <div className="card-title">Route Control</div>
                    <div className="card-subtitle">Click cards to toggle routes</div>
                </div>
                <span className={`badge ${activeCount === routes.length
                    ? 'badge--success'
                    : activeCount > 0
                        ? 'badge--warning'
                        : 'badge--danger'
                    }`}>
                    {activeCount} of {routes.length} active
                </span>
            </div>

            <div className="card-body custom-scrollbar" style={{ overflowY: 'auto' }}>
                <div className="route-grid">
                    {routes.map((route) => {
                        const contribution = route.revenue - route.variableCost;
                        return (
                            <div
                                key={route.id}
                                onClick={() => onToggleRoute(route.id)}
                                className={`route-card ${route.isActive ? 'route-card--active' : 'route-card--inactive'
                                    }`}
                            >
                                <div className={`route-status ${route.isActive ? 'route-status--active' : ''}`} />

                                <div className="route-name">{route.name}</div>

                                <div className="route-metrics">
                                    <div className="route-metric">
                                        <div className="route-metric-label">Revenue</div>
                                        <div className="route-metric-value">
                                            {formatCurrency(route.revenue)}
                                        </div>
                                    </div>
                                    <div className="route-metric" style={{ textAlign: 'right' }}>
                                        <div className="route-metric-label">Contribution Margin</div>
                                        <div
                                            className="route-metric-value"
                                            style={{ color: contribution >= 0 ? '#10b981' : '#ef4444' }}
                                        >
                                            {contribution >= 0 ? '+' : ''}{formatCurrency(contribution)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
