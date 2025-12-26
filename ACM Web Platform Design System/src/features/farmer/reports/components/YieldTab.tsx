import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import type { YieldViewMode, YieldBySeason, YieldByCrop, YieldByPlot } from "../types";
import { YIELD_VIEW_OPTIONS } from "../constants";

interface YieldTabProps {
    yieldViewMode: YieldViewMode;
    onViewModeChange: (mode: YieldViewMode) => void;
    chartData: YieldBySeason[] | YieldByCrop[] | YieldByPlot[];
}

export function YieldTab({
    yieldViewMode,
    onViewModeChange,
    chartData,
}: YieldTabProps) {
    const getDataKey = () => {
        switch (yieldViewMode) {
            case "season":
                return "season";
            case "crop":
                return "crop";
            case "plot":
                return "plot";
            default:
                return "season";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg text-[#333333]">Yield & Productivity</h3>
                    <p className="text-sm text-[#777777]">
                        Track yield performance across seasons, crops, and plots
                    </p>
                </div>
                <Select value={yieldViewMode} onValueChange={onViewModeChange}>
                    <SelectTrigger className="w-[160px] rounded-xl border-[#E0E0E0]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {YIELD_VIEW_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey={getDataKey()} tick={{ fontSize: 12, fill: "#777777" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#777777" }} />
                    <RechartsTooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #E0E0E0",
                            borderRadius: "12px",
                            padding: "12px",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="yield"
                        stroke="#4CAF50"
                        strokeWidth={3}
                        fill="url(#yieldGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
