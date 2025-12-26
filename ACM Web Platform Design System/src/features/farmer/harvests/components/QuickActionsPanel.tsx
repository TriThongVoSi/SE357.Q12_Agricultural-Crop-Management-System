import { QrCode, ClipboardCheck, Link as LinkIcon, Truck, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SummaryStats } from "../types";

interface QuickActionsPanelProps {
    onQuickAction: (action: string) => void;
    summaryStats: SummaryStats;
}

export function QuickActionsPanel({
    onQuickAction,
    summaryStats,
}: QuickActionsPanelProps) {
    return (
        <div className="space-y-4">
            {/* Quick Actions */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base text-[#333333]">
                        Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl border-[#E0E0E0] hover:bg-[#F8F8F4]"
                        onClick={() => onQuickAction("qr")}
                    >
                        <QrCode className="w-4 h-4 mr-2 text-[#4A90E2]" />
                        Generate QR Code
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl border-[#E0E0E0] hover:bg-[#F8F8F4]"
                        onClick={() => onQuickAction("qc")}
                    >
                        <ClipboardCheck className="w-4 h-4 mr-2 text-[#3BA55D]" />
                        Record QC Metrics
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl border-[#E0E0E0] hover:bg-[#F8F8F4]"
                        onClick={() => onQuickAction("sale")}
                    >
                        <LinkIcon className="w-4 h-4 mr-2 text-[#F4C542]" />
                        Link to Sale
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl border-[#E0E0E0] hover:bg-[#F8F8F4]"
                        onClick={() => onQuickAction("handover")}
                    >
                        <Truck className="w-4 h-4 mr-2 text-[#8B7355]" />
                        Print Handover Note
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start rounded-xl border-[#E0E0E0] hover:bg-[#F8F8F4]"
                        onClick={() => onQuickAction("weight")}
                    >
                        <Scale className="w-4 h-4 mr-2 text-[#777777]" />
                        Record Weight
                    </Button>
                </CardContent>
            </Card>

            {/* Summary Stats */}
            <Card className="border-[#E0E0E0] rounded-2xl shadow-sm bg-gradient-to-br from-[#8B7355]/5 to-transparent">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base text-[#333333]">
                        Season Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#777777]">Total Stored</span>
                        <span className="numeric text-[#333333]">
                            {summaryStats.totalStored.toLocaleString()} kg
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#777777]">Total Sold</span>
                        <span className="numeric text-[#3BA55D]">
                            {summaryStats.totalSold.toLocaleString()} kg
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#777777]">Processing</span>
                        <span className="numeric text-[#F4C542]">
                            {summaryStats.totalProcessing.toLocaleString()} kg
                        </span>
                    </div>
                    <Separator className="bg-[#E0E0E0] my-2" />
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[#777777]">Premium Grade %</span>
                        <span className="numeric text-[#333333]">
                            {summaryStats.premiumGradePercentage.toFixed(0)}%
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
