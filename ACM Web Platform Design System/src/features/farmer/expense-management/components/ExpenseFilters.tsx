import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "../constants";

interface ExpenseFiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedSeason: string;
    setSelectedSeason: (value: string) => void;
    seasonOptions: { value: string; label: string }[];
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
}

export function ExpenseFilters({
    searchQuery,
    setSearchQuery,
    selectedSeason,
    setSelectedSeason,
    seasonOptions,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
}: ExpenseFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#777777]" />
                <Input
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 rounded-xl border-[#E0E0E0] focus:border-[#3BA55D]"
                />
            </div>

            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                <SelectValue placeholder="All Seasons" />
            </SelectTrigger>
            <SelectContent>
                {seasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="rounded-xl border-[#E0E0E0]">
                    <SelectValue placeholder="All Status" />
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
    );
}
