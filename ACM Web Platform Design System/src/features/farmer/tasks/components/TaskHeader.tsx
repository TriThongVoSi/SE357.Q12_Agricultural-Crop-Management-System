import { Columns3, List, CalendarDays, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ViewMode } from '../types';

interface TaskHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateTask: () => void;
}

export function TaskHeader({ viewMode, onViewModeChange, onCreateTask }: TaskHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E0E0E0] px-6 py-4 shadow-sm">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Tasks</h1>

            {/* View Switch */}
            <div className="flex items-center gap-1 bg-[#F8F8F4] p-1 rounded-xl">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === 'board' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onViewModeChange('board')}
                      className={`acm-rounded-sm ${
                        viewMode === 'board'
                          ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                          : 'hover:bg-white'
                      }`}
                    >
                      <Columns3 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Board View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onViewModeChange('list')}
                      className={`acm-rounded-sm ${
                        viewMode === 'list'
                          ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                          : 'hover:bg-white'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => onViewModeChange('calendar')}
                      className={`acm-rounded-sm ${
                        viewMode === 'calendar'
                          ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90'
                          : 'hover:bg-white'
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Calendar View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Create Task Button */}
          <Button
            className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white acm-rounded-sm acm-button-shadow"
            onClick={onCreateTask}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
}
