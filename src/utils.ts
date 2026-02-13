import type { RouteData, OverheadCategory } from './data';

export interface RouteState extends RouteData {
    isActive: boolean;
}

export interface OverheadState extends OverheadCategory {
    currentFixedPct: number;
}

export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: 0,
    }).format(value);
};

export const calculateFinancials = (
    routes: RouteState[],
    overheads: OverheadState[],
    initialRoutes: RouteData[]
) => {
    const activeRoutes = routes.filter((r) => r.isActive);

    const totalRevenue = activeRoutes.reduce((sum, r) => sum + r.revenue, 0);
    const totalVariableDirect = activeRoutes.reduce((sum, r) => sum + r.variableCost, 0);

    // Base totals from 2016 for scaling reference
    const baseTotalVariable = initialRoutes.reduce((sum, r) => sum + r.variableCost, 0);

    // Calculate Projected Overhead
    // Fixed portion stays constant. Variable portion scales with activity (route toggles).
    // Sliders define cost BEHAVIOR (fixed vs variable), not cost AMOUNT.

    let totalOverhead = 0;

    const overheadsBreakdown = overheads.map(cat => {
        // Convert percentage (0-100) to decimal (0-1)
        const fixedPctDecimal = cat.currentFixedPct / 100;
        const fixedAmount = cat.baseAmount * fixedPctDecimal;
        const variableAmountBase = cat.baseAmount * (1 - fixedPctDecimal);

        // Scale variable portion by activity ratio
        // If baseTotalVariable is 0 (shouldn't happen), avoid NaN
        const activityRatio = baseTotalVariable > 0 ? totalVariableDirect / baseTotalVariable : 0;
        const projectedVariable = variableAmountBase * activityRatio;

        const totalForCat = fixedAmount + projectedVariable;
        totalOverhead += totalForCat;

        return {
            ...cat,
            projectedTotal: totalForCat,
            projectedFixed: fixedAmount,
            projectedVariable: projectedVariable
        };
    });

    const netIncome = totalRevenue - totalVariableDirect - totalOverhead;
    const margin = totalRevenue > 0 ? netIncome / totalRevenue : 0;

    // Allocate overhead to active routes for display (Death Spiral view)
    // Standard allocation: Overhead allocated based on Share of Variable Direct Costs
    const routesWithAllocation = activeRoutes.map(r => {
        const share = totalVariableDirect > 0 ? r.variableCost / totalVariableDirect : 0;
        const allocated = totalOverhead * share;
        return {
            ...r,
            allocatedOverhead: allocated,
            netProfit: r.revenue - r.variableCost - allocated
        };
    });

    return {
        totalRevenue,
        totalVariableDirect,
        totalOverhead,
        netIncome,
        margin,
        overheadsBreakdown,
        routesWithAllocation
    };
};
