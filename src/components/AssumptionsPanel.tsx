import React from 'react';
import type { OverheadState } from '../utils';

interface AssumptionsPanelProps {
    overheads: OverheadState[];
    onChangeFixity: (id: string, newPct: number) => void;
}

export const AssumptionsPanel: React.FC<AssumptionsPanelProps> = ({ overheads, onChangeFixity }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="card-header">
                <div>
                    <div className="card-title">Cost Behavior</div>
                    <div className="card-subtitle">Adjust fixed vs variable allocation</div>
                </div>
            </div>

            <div className="card-body-compact custom-scrollbar" style={{ overflowY: 'auto', flex: 1 }}>
                {overheads.map((item, idx) => (
                    <div
                        key={item.id}
                        style={{
                            padding: '16px 0',
                            borderTop: idx > 0 ? '1px solid var(--color-gray-100)' : 'none'
                        }}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: 'var(--color-gray-700)'
                            }}>
                                {item.name}
                            </span>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: "'SF Mono', 'Fira Code', monospace",
                                color: 'var(--color-primary)',
                                background: 'rgba(37, 99, 235, 0.08)',
                                padding: '4px 10px',
                                borderRadius: '6px'
                            }}>
                                {item.currentFixedPct}% fixed
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={item.currentFixedPct}
                            onChange={(e) => onChangeFixity(item.id, parseInt(e.target.value))}
                        />

                        <div className="flex justify-between mt-2" style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            color: 'var(--color-gray-400)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                        }}>
                            <span>Variable</span>
                            <span>Fixed</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
