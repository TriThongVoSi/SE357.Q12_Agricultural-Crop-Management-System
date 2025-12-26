import {
    Wheat,
    QrCode,
    Printer,
    Image as ImageIcon,
    ClipboardCheck,
    Link as LinkIcon,
    FileText,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { HarvestBatch, HarvestGrade, HarvestStatus } from "../types";

interface HarvestDetailsDrawerProps {
    batch: HarvestBatch | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAction: (action: string, batch: HarvestBatch) => void;
    getStatusBadge: (status: HarvestStatus) => JSX.Element | null;
    getGradeBadge: (grade: HarvestGrade) => JSX.Element;
}

export function HarvestDetailsDrawer({
    batch,
    open,
    onOpenChange,
    onAction,
    getStatusBadge,
    getGradeBadge,
}: HarvestDetailsDrawerProps) {
    if (!batch) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-[500px] sm:max-w-[500px] overflow-y-auto"
            >
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-[#333333]">
                        <Wheat className="w-5 h-5 text-[#8B7355]" />
                        Batch Details
                    </SheetTitle>
                    <SheetDescription className="text-sm text-[#777777]">
                        {batch.batchId}
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Photo Placeholder */}
                    <div className="w-full h-48 rounded-xl bg-gradient-to-br from-[#8B7355]/10 to-[#8B7355]/5 border-2 border-dashed border-[#E0E0E0] flex items-center justify-center">
                        <div className="text-center">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 text-[#E0E0E0]" />
                            <p className="text-sm text-[#777777]">No photo uploaded</p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <Card className="border-[#E0E0E0] rounded-xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-[#333333]">
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#777777]">Date</span>
                                <span className="text-sm text-[#333333]">
                                    {new Date(batch.date).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#777777]">Quantity</span>
                                <span className="numeric text-[#333333]">
                                    {batch.quantity.toLocaleString()} kg
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#777777]">Grade</span>
                                {getGradeBadge(batch.grade)}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#777777]">Moisture</span>
                                <span className="numeric text-[#333333]">
                                    {batch.moisture.toFixed(1)}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#777777]">Status</span>
                                {getStatusBadge(batch.status)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* QC Metrics */}
                    {batch.qcMetrics && (
                        <Card className="border-[#E0E0E0] rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-[#333333] flex items-center gap-2">
                                    <ClipboardCheck className="w-4 h-4 text-[#3BA55D]" />
                                    Quality Control
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#777777]">Purity</span>
                                    <span className="numeric text-[#3BA55D]">
                                        {batch.qcMetrics.purity.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#777777]">Foreign Matter</span>
                                    <span className="numeric text-[#333333]">
                                        {batch.qcMetrics.foreignMatter.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#777777]">Broken Grains</span>
                                    <span className="numeric text-[#333333]">
                                        {batch.qcMetrics.brokenGrains.toFixed(1)}%
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Linked Sale */}
                    {batch.linkedSale && (
                        <Card className="border-[#E0E0E0] rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-[#333333] flex items-center gap-2">
                                    <LinkIcon className="w-4 h-4 text-[#4A90E2]" />
                                    Linked Sale
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#777777]">Sale Reference</span>
                                    <Badge className="bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20">
                                        {batch.linkedSale}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notes */}
                    {batch.notes && (
                        <Card className="border-[#E0E0E0] rounded-xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-[#333333] flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#777777]" />
                                    Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-[#777777]">{batch.notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full justify-start rounded-xl border-[#E0E0E0]"
                            onClick={() => onAction("qr", batch)}
                        >
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate QR Code
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full justify-start rounded-xl border-[#E0E0E0]"
                            onClick={() => onAction("handover", batch)}
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print Handover Note
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
