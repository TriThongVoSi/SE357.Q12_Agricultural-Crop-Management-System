import type {
    AITip,
    Payable,
    CategoryData,
    MonthlyTrendData,
    CategoryComparisonData,
} from "./types";

// Note: INITIAL_EXPENSES, AI_TIPS, UPCOMING_PAYABLES, CATEGORY_DATA, 
// MONTHLY_TREND, CATEGORY_COMPARISON removed - now using entity API hooks

// Budget Configuration
export const BUDGET_CONFIG = {
    totalBudget: 50000,
    warningThreshold: 75,
    dangerThreshold: 90,
};

// Category Colors
export const CATEGORY_COLORS: Record<string, string> = {
    Fertilizer: "#3BA55D",
    Seeds: "#4A90E2",
    Equipment: "#F4C542",
    Pesticide: "#81C784",
    Labor: "#8B7355",
    Transportation: "#7CB342",
    Utilities: "#9C27B0",
    Maintenance: "#FF9800",
    Other: "#777777",
};

// Select Options
export const SEASON_OPTIONS = [
    { value: "all", label: "All Seasons" },
    { value: "Rice Season 2025", label: "Rice Season 2025" },
    { value: "Corn Season 2025", label: "Corn Season 2025" },
    { value: "Wheat Season 2025", label: "Wheat Season 2025" },
];

export const CATEGORY_OPTIONS = [
    { value: "all", label: "All Categories" },
    { value: "Fertilizer", label: "Fertilizer" },
    { value: "Seeds", label: "Seeds" },
    { value: "Labor", label: "Labor" },
    { value: "Equipment", label: "Equipment" },
    { value: "Pesticide", label: "Pesticide" },
    { value: "Transportation", label: "Transportation" },
    { value: "Utilities", label: "Utilities" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Other", label: "Other" },
];

export const STATUS_OPTIONS = [
    { value: "all", label: "All Status" },
    { value: "paid", label: "Paid" },
    { value: "unpaid", label: "Unpaid" },
    { value: "pending", label: "Pending" },
    { value: "recorded", label: "Recorded" },
];
