import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { EnhancedTask, TaskStatus } from '../types';
import { TASK_TYPES } from '../constants';

interface TaskCalendarViewProps {
    tasks: EnhancedTask[];
    mode: 'week' | 'month';
    currentWeek: Date;
    onModeChange: (mode: 'week' | 'month') => void;
    onWeekChange: (date: Date) => void;
    onComplete: (taskId: string) => void;
    getStatusColor: (status: TaskStatus) => string;
}

export function TaskCalendarView({
    tasks,
    mode,
    currentWeek,
    onModeChange,
    onWeekChange,
    onComplete,
}: TaskCalendarViewProps) {
    const getWeekDays = () => {
        const days = [];
        const start = new Date(currentWeek);
        start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const getTasksForDate = (date: Date) => {
        return tasks.filter((task) => {
            const taskDate = new Date(task.dueDate);
            return (
                taskDate.getFullYear() === date.getFullYear() &&
                taskDate.getMonth() === date.getMonth() &&
                taskDate.getDate() === date.getDate()
            );
        });
    };

    const weekDays = getWeekDays();
    const monthName = currentWeek.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                const newDate = new Date(currentWeek);
                                newDate.setDate(newDate.getDate() - 7);
                                onWeekChange(newDate);
                            }}
                            className="h-8 w-8 acm-rounded-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-lg min-w-[180px] text-center">{monthName}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                const newDate = new Date(currentWeek);
                                newDate.setDate(newDate.getDate() + 7);
                                onWeekChange(newDate);
                            }}
                            className="h-8 w-8 acm-rounded-sm"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-1 bg-[#F8F8F4] p-1 rounded-lg">
                        <Button
                            variant={mode === 'week' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onModeChange('week')}
                            className={`text-xs acm-rounded-sm ${mode === 'week' ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90' : ''
                                }`}
                        >
                            Week
                        </Button>
                        <Button
                            variant={mode === 'month' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onModeChange('month')}
                            className={`text-xs acm-rounded-sm ${mode === 'month' ? 'bg-[#3BA55D] text-white hover:bg-[#3BA55D]/90' : ''
                                }`}
                        >
                            Month
                        </Button>
                    </div>
                </div>

                <Button
                    className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white acm-rounded-sm h-8"
                    onClick={() => onWeekChange(new Date())}
                >
                    Today
                </Button>
            </div>

            {/* Week View */}
            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                    const dayTasks = getTasksForDate(day);
                    const isToday = day.toDateString() === new Date().toDateString();

                    return (
                        <div
                            key={index}
                            className={`border rounded-lg p-3 min-h-[150px] ${isToday ? 'border-[#3BA55D] border-2 bg-[#3BA55D]/5' : 'border-[#E0E0E0]'
                                }`}
                        >
                            <div className="mb-2">
                                <div className={`text-xs ${isToday ? 'text-[#3BA55D]' : 'text-[#6B7280]'}`}>
                                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                                <div className={`text-lg ${isToday ? 'text-[#3BA55D]' : 'text-[#1F2937]'}`}>
                                    {day.getDate()}
                                </div>
                            </div>

                            <div className="space-y-2">
                                {dayTasks.slice(0, 2).map((task) => {
                                    const TaskTypeIcon = TASK_TYPES[task.type].icon;
                                    const typeColor = TASK_TYPES[task.type].color;

                                    return (
                                        <TooltipProvider key={task.id}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className="text-xs px-2 py-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                                        style={{
                                                            backgroundColor: `${typeColor}15`,
                                                            borderLeft: `3px solid ${typeColor}`,
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <TaskTypeIcon className="w-3 h-3" style={{ color: typeColor }} />
                                                            <span className="numeric text-[0.65rem] text-[#6B7280]">
                                                                {task.taskId}
                                                            </span>
                                                        </div>
                                                        <div className="truncate text-[#1F2937]">{task.title}</div>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-[250px]">
                                                    <div className="space-y-1">
                                                        <div className="text-sm">{task.title}</div>
                                                        <div className="text-xs text-[#6B7280]">
                                                            {task.plotName} • {task.assignees[0].name}
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-2">
                                                            <div
                                                                className={`w-2 h-2 rounded-full ${task.isOverdue ? 'bg-[#E74C3C]' : 'bg-[#3BA55D]'
                                                                    }`}
                                                            />
                                                            <span className="text-xs">
                                                                {task.isOverdue ? 'Overdue' : 'On track'}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="h-6 text-xs"
                                                                onClick={() => onComplete(task.id)}
                                                            >
                                                                <Check className="w-3 h-3 mr-1" />
                                                                Complete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    );
                                })}
                                {dayTasks.length > 2 && (
                                    <div className="text-xs text-[#6B7280] px-2">+{dayTasks.length - 2} more</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
