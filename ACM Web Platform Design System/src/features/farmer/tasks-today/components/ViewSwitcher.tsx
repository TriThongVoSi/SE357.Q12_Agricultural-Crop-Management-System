import { Table as TableIcon, CalendarDays, Columns2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { TaskViewMode } from '../types';

interface ViewSwitcherProps {
    viewMode: TaskViewMode;
    onViewModeChange: (mode: TaskViewMode) => void;
}

export function ViewSwitcher({ viewMode, onViewModeChange }: ViewSwitcherProps) {
    return (
        <div className="mt-3 flex items-center gap-1 bg-[#F8F8F4] p-1 rounded-xl w-fit">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={viewMode === 'table' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onViewModeChange('table')}
                            className={`acm-rounded-sm ${viewMode === 'table'
                                    ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                                    : 'hover:bg-white'
                                }`}
                        >
                            <TableIcon className="w-4 h-4 mr-1" />
                            <span className="text-sm">Table</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Table View</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onViewModeChange('calendar')}
                            className={`acm-rounded-sm ${viewMode === 'calendar'
                                    ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                                    : 'hover:bg-white'
                                }`}
                        >
                            <CalendarDays className="w-4 h-4 mr-1" />
                            <span className="text-sm">Calendar</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Calendar View</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={viewMode === 'split' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onViewModeChange('split')}
                            className={`acm-rounded-sm ${viewMode === 'split'
                                    ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                                    : 'hover:bg-white'
                                }`}
                        >
                            <Columns2 className="w-4 h-4 mr-1" />
                            <span className="text-sm">Split</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Split View (Table + Calendar)</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
