import {
    X,
    Upload,
    Save,
    Edit,
    Plus,
    DollarSign,
    Building2,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Expense, ExpenseFormData, ExpenseStatus } from "../types";

interface ExpenseFormModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    selectedExpense: Expense | null;
    formData: ExpenseFormData;
    setFormData: (data: ExpenseFormData) => void;
    handleAddExpense: () => void;
    resetForm: () => void;
    seasonOptions: { value: string; label: string }[];
}

export function ExpenseFormModal({
    isOpen,
    setIsOpen,
    selectedExpense,
    formData,
    setFormData,
    handleAddExpense,
    resetForm,
    seasonOptions,
}: ExpenseFormModalProps) {
    const handleClose = () => {
        setIsOpen(false);
        resetForm();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#333333] text-xl">
                        {selectedExpense ? (
                            <>
                                <Edit className="w-5 h-5 text-[#4A90E2]" />
                                Edit Expense
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5 text-[#3BA55D]" />
                                Add New Expense
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#777777]">
                        Fill in the expense details below. Fields marked with * are
                        required.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Date & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-[#333333]">
                                Date <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({ ...formData, date: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-[#333333]">
                                Category <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, category: value })
                                }
                            >
                                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fertilizer">Fertilizer</SelectItem>
                                    <SelectItem value="Seeds">Seeds</SelectItem>
                                    <SelectItem value="Labor">Labor</SelectItem>
                                    <SelectItem value="Equipment">Equipment</SelectItem>
                                    <SelectItem value="Pesticide">Pesticide</SelectItem>
                                    <SelectItem value="Transportation">Transportation</SelectItem>
                                    <SelectItem value="Utilities">Utilities</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[#333333]">
                            Description <span className="text-[#E74C3C]">*</span>
                        </Label>
                        <Input
                            id="description"
                            placeholder="e.g., NPK Fertilizer 20-20-20"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                        />
                    </div>

                    {/* Vendor */}
                    <div className="space-y-2">
                        <Label htmlFor="vendor" className="text-[#333333]">
                            Vendor/Supplier
                        </Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#777777]" />
                            <Input
                                id="vendor"
                                placeholder="e.g., AgroSupply Co."
                                value={formData.vendor}
                                onChange={(e) =>
                                    setFormData({ ...formData, vendor: e.target.value })
                                }
                                className="pl-10 rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>
                    </div>

                    {/* Linked Task & Season */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="linkedTask" className="text-[#333333]">
                                Linked Task
                            </Label>
                            <Input
                                id="linkedTask"
                                placeholder="e.g., Harvest - Plot B"
                                value={formData.linkedTask}
                                onChange={(e) =>
                                    setFormData({ ...formData, linkedTask: e.target.value })
                                }
                                className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedSeason" className="text-[#333333]">
                                Linked Season
                            </Label>
                            <Select
                                value={formData.linkedSeason}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, linkedSeason: value })
                                }
                            >
                                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                    <SelectValue placeholder="Select season" />
                                </SelectTrigger>
                            <SelectContent>
                                {seasonOptions
                                    .filter((option) => option.value !== "all")
                                    .map((option) => (
                                        <SelectItem key={option.value} value={option.label}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                    {/* Amount & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-[#333333]">
                                Amount ($) <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#777777]" />
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amount: e.target.value })
                                    }
                                    className="pl-10 rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-[#333333]">
                                Payment Status <span className="text-[#E74C3C]">*</span>
                            </Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value: ExpenseStatus) =>
                                    setFormData({ ...formData, status: value })
                                }
                            >
                                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="recorded">Recorded</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Upload Attachment */}
                    <div className="space-y-2">
                        <Label className="text-[#333333]">
                            Attachment (Receipt/Invoice)
                        </Label>
                        <div className="border-2 border-dashed border-[#E0E0E0] rounded-xl p-8 text-center hover:border-[#3BA55D] hover:bg-[#3BA55D]/5 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 text-[#777777] mx-auto mb-3" />
                            <p className="text-sm text-[#333333] mb-1">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-[#777777]">PDF, JPG, PNG (max 5MB)</p>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-[#333333]">
                            Additional Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any additional information..."
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            className="rounded-xl border-[#E0E0E0] focus:border-[#3BA55D] min-h-[100px]"
                        />
                    </div>

                    {/* Amount Preview */}
                    {formData.amount && (
                        <div className="p-4 rounded-xl bg-[#3BA55D]/10 border-2 border-[#3BA55D]/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-[#3BA55D]" />
                                    <span className="text-[#333333]">Total Amount:</span>
                                </div>
                                <span className="text-2xl numeric text-[#3BA55D]">
                                    ${parseFloat(formData.amount).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="rounded-xl border-[#E0E0E0]"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddExpense}
                        className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white rounded-xl"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {selectedExpense ? "Update" : "Save"} Expense
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
