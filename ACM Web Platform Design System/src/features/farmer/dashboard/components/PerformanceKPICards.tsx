import { TrendingUp, DollarSign, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { DashboardOverview } from "@/entities/dashboard";

interface PerformanceKPICardsProps {
  selectedSeason: string;
  overview?: DashboardOverview | null;
  isLoading?: boolean;
}

/**
 * Performance KPI Cards Component
 *
 * Displays three key performance indicators:
 * - Average Yield per hectare
 * - Cost per Hectare
 * - On-time task completion percentage
 *
 * Each card shows the current value, trend comparison, and contextual icon.
 */
export function PerformanceKPICards({ selectedSeason, overview, isLoading }: PerformanceKPICardsProps) {
  // Extract KPI values from overview or show N/A
  const avgYield = overview?.kpis?.avgYieldTonsPerHa;
  const costPerHectare = overview?.kpis?.costPerHectare;
  const onTimePercent = overview?.kpis?.onTimePercent;

  // Format display values
  const formatNumber = (val: number | null | undefined, decimals = 1) => {
    if (val === null || val === undefined) return "N/A";
    return val.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-[#1F2937] mb-1">Performance Overview</h2>
        <p className="text-sm text-[#6B7280]">
          Key metrics for{" "}
          {overview?.seasonContext?.seasonName ?? selectedSeason} season
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Avg Yield KPI */}
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-[#6B7280]">Avg Yield</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="w-3.5 h-3.5 text-[#6B7280]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Average crop yield per hectare across all plots
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#6B7280]" />
                  ) : (
                    <>
                      <span className="numeric text-3xl text-[#1F2937]">
                        {formatNumber(avgYield)}
                      </span>
                      {avgYield !== null && avgYield !== undefined && (
                        <span className="text-sm text-[#6B7280]">tons/ha</span>
                      )}
                    </>
                  )}
                </div>
                {avgYield !== null && avgYield !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B7280]">Based on actual yield</span>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-[#3BA55D]/10 text-[#3BA55D] border border-[#3BA55D]/20">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost/Hectare KPI */}
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-[#6B7280]">Cost/Hectare</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="w-3.5 h-3.5 text-[#6B7280]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Total operational cost per hectare</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#6B7280]" />
                  ) : (
                    <>
                      <span className="numeric text-3xl text-[#1F2937]">
                        {costPerHectare !== null && costPerHectare !== undefined
                          ? formatNumber(costPerHectare, 0)
                          : "N/A"}
                      </span>
                      {costPerHectare !== null && costPerHectare !== undefined && (
                        <span className="text-sm text-[#6B7280]">USD</span>
                      )}
                    </>
                  )}
                </div>
                {costPerHectare !== null && costPerHectare !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B7280]">
                      Total: {formatNumber(overview?.expenses?.totalExpense, 0)} USD
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-[#4A90E2]/10 text-[#4A90E2] border border-[#4A90E2]/20">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* On-time % KPI */}
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-[#6B7280]">On-time %</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="w-3.5 h-3.5 text-[#6B7280]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          Tasks completed on or before due date
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#6B7280]" />
                  ) : (
                    <>
                      <span className="numeric text-3xl text-[#1F2937]">
                        {onTimePercent !== null && onTimePercent !== undefined
                          ? formatNumber(onTimePercent, 0)
                          : "N/A"}
                      </span>
                      {onTimePercent !== null && onTimePercent !== undefined && (
                        <span className="text-sm text-[#6B7280]">%</span>
                      )}
                    </>
                  )}
                </div>
                {onTimePercent !== null && onTimePercent !== undefined && (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20 px-2 py-1">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      On track
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-[#F4C542]/10 text-[#F4C542] border border-[#F4C542]/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

