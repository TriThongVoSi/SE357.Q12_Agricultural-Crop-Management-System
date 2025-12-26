import {
    Wheat,
    Package,
    Award,
    Droplets,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HarvestKPICardsProps {
    totalHarvested: number;
    lotsCount: number;
    avgGrade: string;
    avgMoisture: string;
    yieldVsPlan: string;
}

export function HarvestKPICards({
    totalHarvested,
    lotsCount,
    avgGrade,
    avgMoisture,
    yieldVsPlan,
}: HarvestKPICardsProps) {
    const isOnTarget = parseFloat(yieldVsPlan) >= 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Total Harvested */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-[#777777] mb-1">Total Harvested</p>
                            <p className="text-2xl numeric text-[#333333]">
                                {totalHarvested.toLocaleString()}
                            </p>
                            <p className="text-xs text-[#777777] mt-1">kg</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#3BA55D]/10 flex items-center justify-center">
                            <Wheat className="w-5 h-5 text-[#3BA55D]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lots Count */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-[#777777] mb-1">Lots Count</p>
                            <p className="text-2xl numeric text-[#333333]">{lotsCount}</p>
                            <p className="text-xs text-[#777777] mt-1">batches</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#4A90E2]/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#4A90E2]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Avg Grade */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-[#777777] mb-1">Avg Grade</p>
                            <p className="text-2xl text-[#333333]">{avgGrade}</p>
                            <p className="text-xs text-[#777777] mt-1">quality</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#F4C542]/10 flex items-center justify-center">
                            <Award className="w-5 h-5 text-[#F4C542]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Avg Moisture */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-[#777777] mb-1">Avg Moisture</p>
                            <p className="text-2xl numeric text-[#333333]">{avgMoisture}</p>
                            <p className="text-xs text-[#777777] mt-1">%</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#4A90E2]/10 flex items-center justify-center">
                            <Droplets className="w-5 h-5 text-[#4A90E2]" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Yield vs Plan */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-[#777777] mb-1">Yield vs Plan</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl numeric text-[#333333]">{yieldVsPlan}</p>
                                <p className="text-xs text-[#777777]">%</p>
                            </div>
                            {isOnTarget ? (
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-[#3BA55D]" />
                                    <p className="text-xs text-[#3BA55D]">On target</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingDown className="w-3 h-3 text-[#E74C3C]" />
                                    <p className="text-xs text-[#E74C3C]">Below plan</p>
                                </div>
                            )}
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#3BA55D]/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#3BA55D]" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
