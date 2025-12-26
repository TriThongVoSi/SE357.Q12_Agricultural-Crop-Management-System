import { Filter, Columns, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderBarProps {
    selectedSeason: string;
}

export function HeaderBar({ selectedSeason }: HeaderBarProps) {
    return (
        <div className="p-4 border-b border-[#E0E0E0] bg-white rounded-t-xl">
            <div className="flex items-center justify-between">
                {/* Left Group */}
                <div className="flex items-center gap-3">
                    <h3 className="text-xl">Tasks Today</h3>
                    <Badge className="bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20 acm-rounded-sm">
                        Season: {selectedSeason === '2025-spring' ? 'Spring 2025' : selectedSeason}
                    </Badge>
                </div>

                {/* Right Group */}
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Filter className="w-4 h-4 text-[#6B7280]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Filter by plot, assignee, type, stage</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Columns className="w-4 h-4 text-[#6B7280]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Show/Hide columns</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="w-4 h-4 text-[#6B7280]" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Export CSV (filtered)</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
}
