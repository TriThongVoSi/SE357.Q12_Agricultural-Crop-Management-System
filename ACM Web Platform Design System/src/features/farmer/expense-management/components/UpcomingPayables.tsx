import { AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UPCOMING_PAYABLES: any[] = []; // TODO: Replace with API data when available

export function UpcomingPayables() {
    return (
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#E74C3C]" />
                    Upcoming Payables
                </CardTitle>
                <CardDescription className="text-xs text-[#777777]">
                    <span className="numeric">{UPCOMING_PAYABLES.length}</span> payables
                    due soon
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {UPCOMING_PAYABLES.map((payable) => (
                    <div
                        key={payable.id}
                        className={`p-3 rounded-xl border-l-4 ${payable.urgency === "high"
                            ? "border-l-[#E74C3C] bg-[#E74C3C]/5"
                            : payable.urgency === "medium"
                                ? "border-l-[#F4C542] bg-[#F4C542]/5"
                                : "border-l-[#4A90E2] bg-[#4A90E2]/5"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <p className="text-sm text-[#333333]">{payable.vendor}</p>
                                <p className="text-xs text-[#777777] mt-0.5">
                                    {payable.category}
                                </p>
                            </div>
                            <Badge
                                className={`text-xs ${payable.urgency === "high"
                                    ? "bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20"
                                    : payable.urgency === "medium"
                                        ? "bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20"
                                        : "bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20"
                                    }`}
                            >
                                {payable.urgency}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-[#777777]">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(payable.dueDate).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                            <p className="numeric text-[#333333]">
                                ${payable.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
