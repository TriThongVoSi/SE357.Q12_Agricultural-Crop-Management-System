import { useState } from 'react';
import {
    CheckCircle2,
    Play,
    Pause,
    CalendarClock,
    MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { EnhancedTask, TaskStatus } from '../types';
import { TASK_TYPES } from '../constants';

interface TaskTableViewProps {
    tasks: EnhancedTask[];
    selectedTasks: string[];
    onSelectAll: (checked: boolean) => void;
    onSelectTask: (taskId: string, checked: boolean) => void;
    onComplete: (taskId: string) => void;
    onMarkSelectedDone: () => void;
    onShiftSelected: () => void;
    getStatusColor: (status: TaskStatus) => string;
    getStatusLabel: (status: TaskStatus) => string;
}

export function TaskTableView({
    tasks,
    selectedTasks,
    onSelectAll,
    onSelectTask,
    onComplete,
    onMarkSelectedDone,
    onShiftSelected,
    getStatusColor,
    getStatusLabel,
}: TaskTableViewProps) {
    const [rescheduleTaskId, setRescheduleTaskId] = useState<string | null>(null);

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#F8F8F4] border-b border-[#E0E0E0]">
                        <tr>
                            <th className="px-4 py-3 text-left w-12">
                                <Checkbox
                                    checked={tasks.length > 0 && tasks.every((t) => selectedTasks.includes(t.id))}
                                    onCheckedChange={onSelectAll}
                                />
                            </th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Task</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Plot</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Type</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Assignee</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Due</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Status</th>
                            <th className="px-4 py-3 text-left text-sm text-[#1F2937]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => {
                            const TaskTypeIcon = TASK_TYPES[task.type].icon;
                            const typeColor = TASK_TYPES[task.type].color;

                            return (
                                <tr
                                    key={task.id}
                                    className="border-b border-[#E0E0E0] hover:bg-[#F8F8F4]/50 transition-all hover:shadow-sm"
                                >
                                    <td className="px-4 py-3">
                                        <Checkbox
                                            checked={selectedTasks.includes(task.id)}
                                            onCheckedChange={(checked: boolean) => onSelectTask(task.id, checked as boolean)}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="numeric text-xs text-[#6B7280]">{task.taskId}</span>
                                            <span className="text-sm text-[#1F2937] truncate max-w-[200px]">
                                                {task.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            className="acm-rounded-sm"
                                            style={{
                                                backgroundColor: `${task.cropColor}15`,
                                                color: task.cropColor,
                                                borderColor: `${task.cropColor}30`,
                                            }}
                                        >
                                            {task.plotName}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <TaskTypeIcon className="w-4 h-4" style={{ color: typeColor }} />
                                            <span className="text-sm text-[#6B7280]">
                                                {TASK_TYPES[task.type].label}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {task.assignees.map((assignee, idx) => (
                                                <TooltipProvider key={idx}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarFallback className="text-xs bg-[#3BA55D]/10 text-[#3BA55D]">
                                                                    {assignee.initials}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </TooltipTrigger>
                                                        <TooltipContent>{assignee.name}</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ))}
                                            <span className="text-sm text-[#6B7280]">{task.assignees[0].name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${task.isOverdue
                                                    ? 'bg-[#E74C3C]'
                                                    : task.dueDate === '2025-11-09'
                                                        ? 'bg-[#F4C542]'
                                                        : 'bg-[#3BA55D]'
                                                    }`}
                                            />
                                            <span className="text-sm text-[#6B7280]">
                                                {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span className="numeric text-xs text-[#6B7280]">{task.dueTime}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge className={`${getStatusColor(task.status)} acm-rounded-sm`}>
                                            {getStatusLabel(task.status)}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {task.status === 'not-started' && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                                <Play className="w-3 h-3" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Start</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                            {task.status === 'in-progress' && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                                <Pause className="w-3 h-3" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Pause</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                            {task.status !== 'done' && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-7 w-7 text-[#3BA55D]"
                                                                onClick={() => onComplete(task.id)}
                                                            >
                                                                <CheckCircle2 className="w-3 h-3" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Complete</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                            <Popover
                                                open={rescheduleTaskId === task.id}
                                                onOpenChange={(open: boolean) => !open && setRescheduleTaskId(null)}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                        onClick={() => setRescheduleTaskId(task.id)}
                                                    >
                                                        <CalendarClock className="w-3 h-3" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 acm-rounded-lg" align="end">
                                                    <Calendar mode="single" />
                                                    <div className="p-3 border-t">
                                                        <p className="text-xs text-[#6B7280] mb-2">Time window hints:</p>
                                                        <div className="flex gap-2">
                                                            <Badge className="text-xs bg-[#3BA55D]/10 text-[#3BA55D]">
                                                                Morning
                                                            </Badge>
                                                            <Badge className="text-xs bg-[#4A90E2]/10 text-[#4A90E2]">
                                                                Afternoon
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <MoreVertical className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="px-4 py-3 border-t border-[#E0E0E0] bg-[#F8F8F4] flex items-center justify-between rounded-b-xl">
                <p className="text-sm text-[#6B7280]">
                    Showing up to 10 tasks · Auto-filtered by Season
                </p>
                <div className="flex items-center gap-2">
                    {selectedTasks.length > 0 && (
                        <>
                            <Button
                                size="sm"
                                onClick={onMarkSelectedDone}
                                className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white acm-rounded-sm h-8 text-sm"
                            >
                                Mark Selected Done
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onShiftSelected}
                                className="acm-rounded-sm h-8 text-sm border-[#E0E0E0]"
                            >
                                Shift Selected by +1 day
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
