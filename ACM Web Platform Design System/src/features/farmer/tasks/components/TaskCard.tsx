import { Edit, Trash2, Check, MoreVertical, MapPin, Clock, Paperclip } from 'lucide-react';
import { useDrag } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Task } from '../types';
import { TASK_TYPES } from '../constants';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const TaskIcon = TASK_TYPES[task.type].icon;
  const taskColor = TASK_TYPES[task.type].color;

  return (
    <div
      ref={drag}
      className={`bg-white border border-[#E0E0E0] rounded-xl p-3 cursor-move acm-card-shadow hover:shadow-lg transition-all group ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{ borderLeftWidth: '4px', borderLeftColor: taskColor }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <TaskIcon className="w-4 h-4" style={{ color: taskColor }} />
          <h4 className="text-sm text-[#333333] line-clamp-2">{task.title}</h4>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-3 h-3" />
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
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#777777]">
          <MapPin className="w-3 h-3" />
          <span>{task.plot}</span>
          <span>•</span>
          <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20 text-xs px-1.5 py-0">
            {task.crop}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#777777]">
          <Clock className="w-3 h-3" />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          {task.attachments > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                <span className="numeric">{task.attachments}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-[#3BA55D]/10 text-[#3BA55D]">
              {task.assigneeInitials}
            </AvatarFallback>
          </Avatar>
          {task.priority === 'high' && (
            <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20 text-xs px-1.5 py-0">
              High
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

