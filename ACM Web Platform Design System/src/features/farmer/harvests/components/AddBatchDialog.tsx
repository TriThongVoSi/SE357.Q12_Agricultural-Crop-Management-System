import { Plus, X, Save, ClipboardCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import type { HarvestFormData, HarvestGrade, HarvestStatus } from "../types";
import { SEASON_OPTIONS, GRADE_OPTIONS, STATUS_OPTIONS } from "../constants";

interface AddBatchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formData: HarvestFormData;
    onFormChange: (data: HarvestFormData) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export function AddBatchDialog({
    open,
    onOpenChange,
    formData,
    onFormChange,
    onSubmit,
    onCancel,
}: AddBatchDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#333333] text-xl">
                        <Plus className="w-5 h-5 text-[#3BA55D]" />
                        Add Harvest Batch
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#777777]">
                        Record a new harvest batch with quality control metrics
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="batchId" className="text-[#333333]">
                                Batch ID <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Input
                                id="batchId"
                                placeholder="HRV-2025-XXX"
                                value={formData.batchId}
                                onChange={(e) =>
                                    onFormChange({ ...formData, batchId: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-[#333333]">
                                Harvest Date <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    onFormChange({ ...formData, date: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-[#333333]">
                                Quantity (kg) <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                placeholder="0"
                                value={formData.quantity}
                                onChange={(e) =>
                                    onFormChange({ ...formData, quantity: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="grade" className="text-[#333333]">
                                Grade <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Select
                                value={formData.grade}
                                onValueChange={(value: HarvestGrade) =>
                                    onFormChange({ ...formData, grade: value })
                                }
                            >
                                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {GRADE_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="moisture" className="text-[#333333]">
                                Moisture % <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Input
                                id="moisture"
                                type="number"
                                step="0.1"
                                placeholder="0.0"
                                value={formData.moisture}
                                onChange={(e) =>
                                    onFormChange({ ...formData, moisture: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="season" className="text-[#333333]">
                                Season
                            </Label>
                            <Select
                                value={formData.season}
                                onValueChange={(value: string) =>
                                    onFormChange({ ...formData, season: value })
                                }
                            >
                                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                    <SelectValue placeholder="Select season" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SEASON_OPTIONS.filter((opt) => opt.value !== "all").map(
                                        (option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="plot" className="text-[#333333]">
                                Plot
                            </Label>
                            <Input
                                id="plot"
                                placeholder="e.g., Plot A - North Field"
                                value={formData.plot}
                                onChange={(e) =>
                                    onFormChange({ ...formData, plot: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="crop" className="text-[#333333]">
                                Crop
                            </Label>
                            <Input
                                id="crop"
                                placeholder="e.g., Rice, Corn, Wheat"
                                value={formData.crop}
                                onChange={(e) =>
                                    onFormChange({ ...formData, crop: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-[#333333]">
                            Status
                        </Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value: HarvestStatus) =>
                                onFormChange({ ...formData, status: value })
                            }
                        >
                            <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator className="bg-[#E0E0E0]" />

                    {/* QC Metrics */}
                    <div>
                        <h4 className="text-sm text-[#333333] mb-4 flex items-center gap-2">
                            <ClipboardCheck className="w-4 h-4 text-[#3BA55D]" />
                            Quality Control Metrics (Optional)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="purity" className="text-[#333333]">
                                    Purity %
                                </Label>
                                <Input
                                    id="purity"
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={formData.purity}
                                    onChange={(e) =>
                                        onFormChange({ ...formData, purity: e.target.value })
                                    }
                                    className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="foreignMatter" className="text-[#333333]">
                                    Foreign Matter %
                                </Label>
                                <Input
                                    id="foreignMatter"
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={formData.foreignMatter}
                                    onChange={(e) =>
                                        onFormChange({ ...formData, foreignMatter: e.target.value })
                                    }
                                    className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brokenGrains" className="text-[#333333]">
                                    Broken Grains %
                                </Label>
                                <Input
                                    id="brokenGrains"
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    value={formData.brokenGrains}
                                    onChange={(e) =>
                                        onFormChange({ ...formData, brokenGrains: e.target.value })
                                    }
                                    className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-[#333333]">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any additional notes about this harvest batch..."
                            value={formData.notes}
                            onChange={(e) =>
                                onFormChange({ ...formData, notes: e.target.value })
                            }
                            className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D] min-h-[100px]"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="rounded-xl border-[#E0E0E0]"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white rounded-xl"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Batch
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
