import React, { useRef, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

interface MetricCardProps {
    label: string;
    value: string; // expecting formatted string like "$1,234"
    subValue?: string;
    color?: 'blue' | 'green' | 'red' | 'slate';
    delay?: number;
}

const NumberTicker = ({ value }: { value: string }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    // Extract number from string (e.g., "$1,234" -> 1234)
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    const prefix = value.match(/^[^\d]+/)?.[0] || "";
    const suffix = value.match(/[^\d]+$/)?.[0] || "";

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(0, numericValue, {
            duration: 1.5,
            ease: "circOut",
            onUpdate(v: number) {
                node.textContent = prefix + new Intl.NumberFormat('en-US').format(Math.round(v)) + suffix;
            },
        });

        return () => controls.stop();
    }, [numericValue]);

    return <span ref={nodeRef} />;
};

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, subValue, color = 'slate', delay = 0 }) => {
    const colors = {
        blue: 'text-indigo-600 bg-indigo-50 border-indigo-100',
        green: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        red: 'text-rose-600 bg-rose-50 border-rose-100',
        slate: 'text-slate-700 bg-white border-slate-200',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay * 0.1 }}
            className={`
                relative p-5 rounded-2xl border backdrop-blur-sm
                bg-white/60 border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300
                group
            `}
        >
            <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
                <div className={`w-2 h-2 rounded-full ${color === 'slate' ? 'bg-slate-300' : colors[color].split(' ')[0].replace('text-', 'bg-')}`}></div>
            </div>

            <div className="text-3xl font-bold text-slate-800 tracking-tight group-hover:scale-105 transition-transform origin-left">
                <NumberTicker value={value} />
            </div>

            {subValue && (
                <div className="text-xs font-medium text-slate-400 mt-2 flex items-center gap-1">
                    {subValue}
                </div>
            )}

            {/* Hover Glow */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${color === 'slate' ? 'from-slate-100/0' : 'from-' + color + '-100/0'} to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-transparent group-hover:border-${color}-200/50`}></div>
        </motion.div>
    );
};
