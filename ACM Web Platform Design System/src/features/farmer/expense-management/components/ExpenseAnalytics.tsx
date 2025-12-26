import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// TODO: Replace with API data when available
const CATEGORY_DATA: any[] = [];
const MONTHLY_TREND: any[] = [];
const CATEGORY_COMPARISON: any[] = [];

export function ExpenseAnalytics() {
    return (
        <div className="space-y-6">
            {/* Budget vs Actual */}
            <Card className="border-[#E0E0E0] rounded-xl">
                <CardHeader>
                    <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#3BA55D]" />
                        Budget vs Actual (Last 6 Months)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={MONTHLY_TREND}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12, fill: "#777777" }}
                            />
                            <YAxis tick={{ fontSize: 12, fill: "#777777" }} />
                            <RechartsTooltip
                                formatter={(value: number) => `$${value.toLocaleString()}`}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="budget"
                                stroke="#4A90E2"
                                strokeWidth={2}
                                name="Budget"
                                strokeDasharray="5 5"
                            />
                            <Line
                                type="monotone"
                                dataKey="actual"
                                stroke="#3BA55D"
                                strokeWidth={3}
                                name="Actual"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Breakdown Pie Chart */}
                <Card className="border-[#E0E0E0] rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-[#4A90E2]" />
                            Category Breakdown
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    formatter={(value: number) => `$${value.toLocaleString()}`}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="mt-4 space-y-2">
                            {CATEGORY_DATA.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between text-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        ></div>
                                        <span className="text-[#777777]">{item.name}</span>
                                    </div>
                                    <span className="numeric text-[#333333]">
                                        ${item.value.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Category Comparison Bar Chart */}
                <Card className="border-[#E0E0E0] rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-base text-[#333333] flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-[#F4C542]" />
                            Budget vs Actual by Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={CATEGORY_COMPARISON}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis
                                    dataKey="category"
                                    tick={{ fontSize: 10, fill: "#777777" }}
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis tick={{ fontSize: 12, fill: "#777777" }} />
                                <RechartsTooltip
                                    formatter={(value: number) => `$${value.toLocaleString()}`}
                                />
                                <Legend />
                                <Bar dataKey="budget" fill="#4A90E2" name="Budget" />
                                <Bar dataKey="actual" fill="#3BA55D" name="Actual" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
