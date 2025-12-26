import { Edit, Trash2, Check, MoreVertical, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import type { Task } from '../types';
import { TASK_TYPES, STATUS_COLORS, STATUS_LABELS } from '../constants';

interface ListViewProps {
  tasks: Task[];
  selectedTasks: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectTask: (taskId: string, checked: boolean) => void;
  onDelete: (taskId: string) => void;
}

export function ListView({ tasks, selectedTasks, onSelectAll, onSelectTask, onDelete }: ListViewProps) {
  return (
    <Card className="border-[#E0E0E0] acm-rounded-lg acm-card-shadow">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E0E0E0] bg-[#F8F8F4]">
                <TableHead className="w-12">
                  <Checkbox
                    checked={tasks.length > 0 && tasks.every((t) => selectedTasks.includes(t.id))}
                    onCheckedChange={onSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold text-[#333333]">Task Name</TableHead>
                <TableHead className="font-semibold text-[#333333]">Type</TableHead>
                <TableHead className="font-semibold text-[#333333]">Crop / Plot</TableHead>
                <TableHead className="font-semibold text-[#333333]">Assignee</TableHead>
                <TableHead className="font-semibold text-[#333333]">Due Date</TableHead>
                <TableHead className="font-semibold text-[#333333]">Status</TableHead>
                <TableHead className="font-semibold text-[#333333]">Attachments</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-[#777777]">
                    No tasks found
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => {
                  const TaskIcon = TASK_TYPES[task.type].icon;
                  const taskColor = TASK_TYPES[task.type].color;

                  return (
                    <TableRow key={task.id} className="border-b border-[#E0E0E0] hover:bg-[#F8F8F4]/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={(checked) => onSelectTask(task.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-[#333333]">{task.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TaskIcon className="w-4 h-4" style={{ color: taskColor }} />
                          <span className="text-sm text-[#777777]">{TASK_TYPES[task.type].label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20 w-fit acm-rounded-sm text-xs">
                            {task.crop}
                          </Badge>
                          <span className="text-xs text-[#777777]">{task.plot}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-[#3BA55D]/10 text-[#3BA55D]">
                              {task.assigneeInitials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-[#777777]">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-[#777777]">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${STATUS_COLORS[task.status]} acm-rounded-sm`}>
                          {STATUS_LABELS[task.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {task.attachments > 0 ? (
                          <div className="flex items-center gap-1 text-sm text-[#777777]">
                            <Paperclip className="w-4 h-4" />
                            <span className="numeric">{task.attachments}</span>
                          </div>
                        ) : (
                          <span className="text-[#777777]">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="acm-rounded-sm">
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Check className="w-4 h-4 mr-2" />
                              Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-[#E74C3C]" onClick={() => onDelete(task.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

