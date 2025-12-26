import {
    Download,
    Printer,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    QrCode,
    Link as LinkIcon,
    AlertCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { HarvestBatch, HarvestGrade, HarvestStatus } from "../types";

interface HarvestTableProps {
    batches: HarvestBatch[];
    totalBatches: number;
    onViewDetails: (batch: HarvestBatch) => void;
    onDeleteBatch: (id: string) => void;
    onExport: () => void;
    onPrint: () => void;
    getStatusBadge: (status: HarvestStatus) => JSX.Element | null;
    getGradeBadge: (grade: HarvestGrade) => JSX.Element;
}

export function HarvestTable({
    batches,
    totalBatches,
    onViewDetails,
    onDeleteBatch,
    onExport,
    onPrint,
    getStatusBadge,
    getGradeBadge,
}: HarvestTableProps) {
    return (
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-[#333333]">Harvest Batches</CardTitle>
                        <CardDescription className="text-sm text-[#777777]">
                            Showing <span className="numeric">{batches.length}</span> of{" "}
                            <span className="numeric">{totalBatches}</span> batches
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-[#E0E0E0]"
                            onClick={onExport}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-[#E0E0E0]"
                            onClick={onPrint}
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print Summary
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto rounded-xl border border-[#E0E0E0]">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#F8F8F4] hover:bg-[#F8F8F4]">
                                <TableHead className="text-[#333333]">Date</TableHead>
                                <TableHead className="text-[#333333]">Batch ID</TableHead>
                                <TableHead className="text-[#333333] text-right">
                                    Quantity (kg)
                                </TableHead>
                                <TableHead className="text-[#333333]">Grade</TableHead>
                                <TableHead className="text-[#333333] text-right">
                                    Moisture %
                                </TableHead>
                                <TableHead className="text-[#333333]">Linked Sale</TableHead>
                                <TableHead className="text-[#333333]">Status</TableHead>
                                <TableHead className="text-[#333333]">Created At</TableHead>
                                <TableHead className="text-[#333333]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {batches.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="text-center py-12 text-[#777777]"
                                    >
                                        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-[#E0E0E0]" />
                                        <p>No harvest batches found</p>
                                        <p className="text-sm mt-1">Try adjusting your filters</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                batches.map((batch) => (
                                    <TableRow
                                        key={batch.id}
                                        className="hover:bg-[#F8F8F4]/50 cursor-pointer"
                                        onClick={() => onViewDetails(batch)}
                                    >
                                        <TableCell className="text-sm text-[#777777]">
                                            {new Date(batch.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </TableCell>
                                        <TableCell className="numeric text-[#333333]">
                                            {batch.batchId}
                                        </TableCell>
                                        <TableCell className="text-right numeric text-[#333333]">
                                            {batch.quantity.toLocaleString()}
                                        </TableCell>
                                        <TableCell>{getGradeBadge(batch.grade)}</TableCell>
                                        <TableCell className="text-right numeric text-[#333333]">
                                            {batch.moisture.toFixed(1)}%
                                        </TableCell>
                                        <TableCell>
                                            {batch.linkedSale ? (
                                                <div className="flex items-center gap-1 text-xs text-[#4A90E2]">
                                                    <LinkIcon className="w-3 h-3" />
                                                    {batch.linkedSale}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-[#E0E0E0]">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(batch.status)}</TableCell>
                                        <TableCell className="text-sm text-[#777777]">
                                            {batch.createdAt
                                                ? new Date(batch.createdAt).toLocaleString("en-US")
                                                : "-"}
                                        </TableCell>
                                        <TableCell onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 hover:bg-[#F8F8F4]"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-[#777777]" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem
                                                        onClick={() => onViewDetails(batch)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        Edit Batch
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <QrCode className="w-4 h-4 mr-2" />
                                                        Generate QR
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Printer className="w-4 h-4 mr-2" />
                                                        Print Handover
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => onDeleteBatch(batch.id)}
                                                        className="text-[#E74C3C]"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
