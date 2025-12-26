import { AlertTriangle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { PesticideStatus } from "../types";

// TODO: Replace with API data when available
const PESTICIDE_RECORDS: any[] = [];

interface PesticideTabProps {
    getPesticideStatusBadge: (status: PesticideStatus) => {
        className: string;
        label: string;
    };
}

export function PesticideTab({ getPesticideStatusBadge }: PesticideTabProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg text-[#333333] mb-1">
                        Pesticide & Compliance
                    </h3>
                    <p className="text-sm text-[#777777]">
                        Track PHI compliance and chemical usage
                    </p>
                </div>
                <Badge className="bg-[#E53935]/10 text-[#E53935] border-[#E53935]/20">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    3 lots need review
                </Badge>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E0E0E0]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F5F5F5] hover:bg-[#F5F5F5]">
                            <TableHead className="text-[#333333]">Lot ID</TableHead>
                            <TableHead className="text-[#333333]">Chemical</TableHead>
                            <TableHead className="text-[#333333] text-right">
                                Quantity (L)
                            </TableHead>
                            <TableHead className="text-[#333333] text-right">
                                PHI (days)
                            </TableHead>
                            <TableHead className="text-[#333333] text-right">
                                Days Remaining
                            </TableHead>
                            <TableHead className="text-[#333333]">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PESTICIDE_RECORDS.map((record) => {
                            const statusBadge = getPesticideStatusBadge(record.status);
                            return (
                                <TableRow key={record.id} className="hover:bg-[#F5F5F5]/50">
                                    <TableCell className="numeric text-[#333333]">
                                        {record.lotId}
                                    </TableCell>
                                    <TableCell className="text-[#333333]">
                                        {record.chemical}
                                    </TableCell>
                                    <TableCell className="text-right numeric text-[#333333]">
                                        {record.quantity.toFixed(1)}
                                    </TableCell>
                                    <TableCell className="text-right numeric text-[#333333]">
                                        {record.phi}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={`numeric ${record.daysRemaining < 0
                                                ? "text-[#E53935]"
                                                : record.daysRemaining <= 5
                                                    ? "text-[#FFB300]"
                                                    : "text-[#4CAF50]"
                                                }`}
                                        >
                                            {record.daysRemaining}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={statusBadge.className}>
                                            {statusBadge.label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="bg-[#FFB300]/5 border border-[#FFB300]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#FFB300] mt-0.5" />
                    <div>
                        <p className="text-sm text-[#333333] mb-1">Compliance Reminder</p>
                        <p className="text-xs text-[#777777]">
                            PHI (Pre-Harvest Interval) must be observed before harvesting.
                            Lots marked in red have violated the PHI period and require
                            review before sale.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
