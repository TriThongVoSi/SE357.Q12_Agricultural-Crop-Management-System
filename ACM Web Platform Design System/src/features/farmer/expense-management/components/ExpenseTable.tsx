import {
    CheckCircle2,
    AlertCircle,
    Clock,
    Paperclip,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    Tag,
    Link as LinkIcon,
    Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Expense } from "../types";
import { CATEGORY_COLORS } from "../constants";

interface ExpenseTableProps {
    filteredExpenses: Expense[];
    totalExpenses: number;
    handleEditExpense: (expense: Expense) => void;
    handleDeleteExpense: (id: string) => void;
}

export function ExpenseTable({
    filteredExpenses,
    totalExpenses,
    handleEditExpense,
    handleDeleteExpense,
}: ExpenseTableProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "paid":
                return (
                    <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Paid
                    </Badge>
                );
            case "unpaid":
                return (
                    <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Unpaid
                    </Badge>
                );
            case "pending":
                return (
                    <Badge className="bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case "recorded":
                return (
                    <Badge className="bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Recorded
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getCategoryColor = (category: string) => {
        return CATEGORY_COLORS[category] || "#777777";
    };

    const totalAmount = filteredExpenses.reduce(
        (sum, exp) => sum + exp.amount,
        0
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm text-[#777777]">
                        Showing <span className="numeric">{filteredExpenses.length}</span>{" "}
                        of <span className="numeric">{totalExpenses}</span> expenses
                    </p>
                </div>
                <Badge className="bg-[#F8F8F4] text-[#333333] border-[#E0E0E0]">
                    <span className="numeric">Total: ${totalAmount.toLocaleString()}</span>
                </Badge>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E0E0E0]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F8F8F4] hover:bg-[#F8F8F4]">
                            <TableHead className="text-[#333333]">Date</TableHead>
                            <TableHead className="text-[#333333]">Category</TableHead>
                            <TableHead className="text-[#333333]">Description</TableHead>
                            <TableHead className="text-[#333333]">Linked To</TableHead>
                            <TableHead className="text-[#333333] text-right">Amount</TableHead>
                            <TableHead className="text-[#333333]">Status</TableHead>
                            <TableHead className="text-[#333333] text-center">Receipt</TableHead>
                            <TableHead className="text-[#333333]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExpenses.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-12 text-[#777777]"
                                >
                                    <AlertCircle className="w-12 h-12 mx-auto mb-3 text-[#E0E0E0]" />
                                    <p>No expenses found</p>
                                    <p className="text-sm mt-1">Try adjusting your filters</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredExpenses.map((expense) => (
                                <TableRow key={expense.id} className="hover:bg-[#F8F8F4]/50">
                                    <TableCell className="text-sm text-[#777777]">
                                        {new Date(expense.date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            style={{
                                                borderColor: `${getCategoryColor(expense.category)}40`,
                                                backgroundColor: `${getCategoryColor(expense.category)}10`,
                                                color: getCategoryColor(expense.category),
                                            }}
                                        >
                                            <Tag className="w-3 h-3 mr-1" />
                                            {expense.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-[#333333]">
                                                {expense.description}
                                            </span>
                                            {expense.vendor && (
                                                <span className="text-xs text-[#777777]">
                                                    {expense.vendor}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {expense.linkedSeason && (
                                                <span className="text-xs text-[#777777] flex items-center gap-1">
                                                    <LinkIcon className="w-3 h-3" />
                                                    {expense.linkedSeason}
                                                </span>
                                            )}
                                            {expense.linkedTask && (
                                                <span className="text-xs text-[#777777] flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {expense.linkedTask}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right numeric text-[#333333]">
                                        ${expense.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(expense.status)}</TableCell>
                                    <TableCell className="text-center">
                                        {expense.attachment ? (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 hover:bg-[#3BA55D]/10"
                                                        >
                                                            <Paperclip className="w-4 h-4 text-[#3BA55D]" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="text-xs">{expense.attachment}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ) : (
                                            <span className="text-xs text-[#E0E0E0]">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
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
                                                    onClick={() => handleEditExpense(expense)}
                                                >
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Receipt className="w-4 h-4 mr-2" />
                                                    Download Receipt
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteExpense(expense.id)}
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
        </div>
    );
}
