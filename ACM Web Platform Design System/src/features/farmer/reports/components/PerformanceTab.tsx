import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// TODO: Replace with API data when available
const TASK_PERFORMANCE: any[] = [];

export function PerformanceTab() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg text-[#333333] mb-1">Task Performance</h3>
                <p className="text-sm text-[#777777]">
                    Monitor task completion trends and status
                </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={TASK_PERFORMANCE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#777777" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#777777" }} />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="onTime"
                        stroke="#4CAF50"
                        strokeWidth={3}
                        name="On-time %"
                        dot={{ fill: "#4CAF50", r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-6">
                <h4 className="text-sm text-[#333333] mb-4">Task Status Breakdown</h4>
                <div className="overflow-x-auto rounded-xl border border-[#E0E0E0]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#F5F5F5] hover:bg-[#F5F5F5]">
                                <TableHead className="text-[#333333]">Month</TableHead>
                                <TableHead className="text-[#333333] text-right">
                                    On-time
                                </TableHead>
                                <TableHead className="text-[#333333] text-right">Late</TableHead>
                                <TableHead className="text-[#333333] text-right">
                                    Overdue
                                </TableHead>
                                <TableHead className="text-[#333333] text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {TASK_PERFORMANCE.map((record, index) => {
                                const total = record.onTime + record.late + record.overdue;
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="text-[#333333]">
                                            {record.month}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className="text-[#4CAF50] numeric">
                                                {record.onTime}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className="text-[#FFB300] numeric">
                                                {record.late}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className="text-[#E53935] numeric">
                                                {record.overdue}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right numeric text-[#333333]">
                                            {total}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
