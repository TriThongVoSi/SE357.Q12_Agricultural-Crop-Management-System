import { Download, Filter } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SEASON_OPTIONS } from "../constants";

interface HeaderBarProps {
    selectedSeason: string;
    onSeasonChange: (season: string) => void;
    onFilterClick: () => void;
    onExportClick: () => void;
}

export function HeaderBar({
    selectedSeason,
    onSeasonChange,
    onFilterClick,
    onExportClick,
}: HeaderBarProps) {
    return (
        <Card className="border-[#E0E0E0] rounded-2xl shadow-sm mb-6 sticky top-0 z-10 bg-white">
            <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl text-[#333333]">
                            Reports Overview
                        </CardTitle>
                        <CardDescription className="text-sm text-[#777777]">
                            Track productivity, costs, and compliance
                        </CardDescription>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Select value={selectedSeason} onValueChange={onSeasonChange}>
                            <SelectTrigger className="w-[180px] rounded-xl border-[#E0E0E0]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {SEASON_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            className="rounded-xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/5"
                            onClick={onFilterClick}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>

                        <Button
                            className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white rounded-xl shadow-sm"
                            onClick={onExportClick}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
