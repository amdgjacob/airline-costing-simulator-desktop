export interface RouteData {
    id: number;
    name: string;
    revenue: number;
    variableCost: number;
    allocatedOverhead?: number;
}

export interface OverheadCategory {
    id: string;
    name: string;
    description: string;
    baseAmount: number;
    // Default fixity assumption (0 to 100)
    defaultFixedPct: number;
}

// Anonymized airline route data
export const INITIAL_ROUTES: RouteData[] = [
    { id: 1, name: "Route 1", revenue: 1215000, variableCost: 194500 },
    { id: 2, name: "Route 2", revenue: 962000, variableCost: 226800 },
    { id: 3, name: "Route 3", revenue: 1338000, variableCost: 244700 },
    { id: 4, name: "Route 4", revenue: 607000, variableCost: 124800 },
    { id: 5, name: "Route 5", revenue: 937000, variableCost: 151900 },
    { id: 6, name: "Route 6", revenue: 549000, variableCost: 92000 },
    { id: 7, name: "Route 7", revenue: 1016000, variableCost: 187000 },
    { id: 8, name: "Route 8", revenue: 692000, variableCost: 138500 },
];

// Total Overhead: ~3,250,000
const TOTAL_OVERHEAD = 3258000;

export const OVERHEAD_CATEGORIES: OverheadCategory[] = [
    {
        id: "flight_support",
        name: "Flight Support",
        description: "Crew personnel, operations (Committed Capacity)",
        baseAmount: 0.25 * TOTAL_OVERHEAD,
        defaultFixedPct: 0.90
    },
    {
        id: "sales",
        name: "Sales Expenses",
        description: "Reservations, agents, advertising",
        baseAmount: 0.15 * TOTAL_OVERHEAD,
        defaultFixedPct: 0.70
    },
    {
        id: "maintenance",
        name: "Maintenance",
        description: "Repair, materials (Scales with flights)",
        baseAmount: 0.20 * TOTAL_OVERHEAD,
        defaultFixedPct: 0.40
    },
    {
        id: "fees_taxes",
        name: "Fees & Taxes",
        description: "Leases, insurance, landing fees",
        baseAmount: 0.15 * TOTAL_OVERHEAD,
        defaultFixedPct: 0.85
    },
    {
        id: "depreciation",
        name: "Depreciation",
        description: "Aircraft, facilities",
        baseAmount: 0.10 * TOTAL_OVERHEAD,
        defaultFixedPct: 1.00
    },
    {
        id: "airport",
        name: "Airport Expenses",
        description: "Ground service, baggage, cargo",
        baseAmount: 0.10 * TOTAL_OVERHEAD,
        defaultFixedPct: 0.80
    },
    {
        id: "other",
        name: "Other Admin",
        description: "Office supplies, legal",
        baseAmount: 0.05 * TOTAL_OVERHEAD,
        defaultFixedPct: 1.00
    },
];
