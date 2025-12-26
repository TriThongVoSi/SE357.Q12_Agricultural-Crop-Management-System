export type ExpenseStatus = "paid" | "unpaid" | "pending" | "recorded";
export type TipType = "saving" | "warning" | "optimization";
export type UrgencyLevel = "high" | "medium" | "low";

export interface Expense {
    id: string;
    date: string;
    category: string;
    description: string;
    linkedTask?: string;
    linkedSeason?: string;
    amount: number;
    status: ExpenseStatus;
    attachment?: string;
    notes?: string;
    vendor?: string;
}

export interface AITip {
    id: string;
    type: TipType;
    title: string;
    description: string;
    potentialSaving?: number;
}

export interface Payable {
    id: string;
    vendor: string;
    amount: number;
    dueDate: string;
    category: string;
    urgency: UrgencyLevel;
}

export interface ExpenseFormData {
    date: string;
    category: string;
    description: string;
    linkedTask: string;
    linkedSeason: string;
    amount: string;
    status: ExpenseStatus;
    notes: string;
    vendor: string;
}

export interface CategoryData {
    name: string;
    value: number;
    color: string;
}

export interface MonthlyTrendData {
    month: string;
    budget: number;
    actual: number;
}

export interface CategoryComparisonData {
    category: string;
    budget: number;
    actual: number;
}
