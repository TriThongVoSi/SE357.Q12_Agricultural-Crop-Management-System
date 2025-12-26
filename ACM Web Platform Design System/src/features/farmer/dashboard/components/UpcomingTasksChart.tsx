import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UpcomingTaskDay } from "../types";

interface UpcomingTasksChartProps {
  upcomingTasks: UpcomingTaskDay[];
}

/**
 * Upcoming Tasks Chart Component
 *
 * Displays a 7-day bar chart visualization showing:
 * - Task count per day
 * - Overdue task indicators
 * - Summary statistics
 *
 * Uses a simple bar chart implementation with tooltips for detailed information.
 */
export function UpcomingTasksChart({ upcomingTasks }: UpcomingTasksChartProps) {
  const maxCount = Math.max(...upcomingTasks.map((d) => d.count));

  return (
    <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Upcoming Tasks (7 Days)</CardTitle>
        <CardDescription>
          Workload distribution for the next week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart */}
          <div className="flex items-end justify-between gap-3 h-40">
            {upcomingTasks.map((day, index) => {
              const height = (day.count / maxCount) * 100;
              const hasOverdue = day.overdue > 0;

              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-1 flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="relative w-full">
                          <div
                            className={`w-full rounded-t-xl transition-all group-hover:opacity-80 ${
                              hasOverdue ? "bg-[#E74C3C]" : "bg-[#3BA55D]"
                            }`}
                            style={{
                              height: `${height}%`,
                              minHeight: "24px",
                            }}
                          >
                            {hasOverdue && (
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                <AlertTriangle className="w-4 h-4 text-[#E74C3C]" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="numeric text-sm text-[#1F2937]">
                            {day.count}
                          </div>
                          <div className="text-xs text-[#6B7280]">
                            {day.day}
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{day.count} tasks scheduled</p>
                      {hasOverdue && (
                        <p className="text-xs text-[#E74C3C]">
                          {day.overdue} overdue
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>

          {/* Summary */}
          <div className="pt-3 border-t border-[#E0E0E0] flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-[#6B7280]">
                Total:{" "}
                <span className="numeric text-[#1F2937]">
                  {upcomingTasks.reduce((sum, d) => sum + d.count, 0)}
                </span>
              </span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-[#6B7280]">
                Overdue:{" "}
                <span className="numeric text-[#E74C3C]">
                  {upcomingTasks.reduce((sum, d) => sum + d.overdue, 0)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

