import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BUDGET_CONFIG } from "../constants";

interface BudgetTrackerProps {
    totalExpenses: number;
    budgetUsagePercentage: number;
    remainingBudget: number;
    paidExpenses: number;
    unpaidExpenses: number;
}

export function BudgetTracker({
    totalExpenses,
    budgetUsagePercentage,
    remainingBudget,
    paidExpenses,
    unpaidExpenses,
}: BudgetTrackerProps) {
    return (
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#3BA55D]" />
                    Budget Tracker
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[#777777]">Total Budget</span>
                        <span className="numeric text-[#333333]">
                            ${BUDGET_CONFIG.totalBudget.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[#777777]">Total Spent</span>
                        <span className="numeric text-[#333333]">
                            ${totalExpenses.toLocaleString()}
                        </span>
                    </div>
                    <Progress
                        value={budgetUsagePercentage}
                        className={`h-3 ${budgetUsagePercentage >= BUDGET_CONFIG.dangerThreshold
                                ? "[&>div]:bg-[#E74C3C]"
                                : budgetUsagePercentage >= BUDGET_CONFIG.warningThreshold
                                    ? "[&>div]:bg-[#F4C542]"
                                    : "[&>div]:bg-[#3BA55D]"
                            }`}
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#777777]">
                            <span className="numeric">{budgetUsagePercentage.toFixed(1)}%</span> used
                        </span>
                        <Badge
                            className={`numeric text-xs ${budgetUsagePercentage >= BUDGET_CONFIG.dangerThreshold
                                    ? "bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20"
                                    : budgetUsagePercentage >= BUDGET_CONFIG.warningThreshold
                                        ? "bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20"
                                        : "bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20"
                                }`}
                        >
                            ${remainingBudget.toLocaleString()} left
                        </Badge>
                    </div>
                </div>

                <Separator className="bg-[#E0E0E0]" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-xs text-[#777777]">Paid</p>
                        <p className="numeric text-[#3BA55D]">
                            ${paidExpenses.toLocaleString()}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-[#777777]">Unpaid</p>
                        <p className="numeric text-[#E74C3C]">
                            ${unpaidExpenses.toLocaleString()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
