import { useDrop } from 'react-dnd';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

export function KanbanColumn({ status, title, color, tasks, onTaskMove, onDelete }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string }) => onTaskMove(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`bg-white rounded-xl border-2 transition-all ${
        isOver ? 'border-[#3BA55D] bg-[#3BA55D]/5' : 'border-[#E0E0E0]'
      }`}
    >
      <div className="p-4 border-b border-[#E0E0E0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <h3 className="text-sm">{title}</h3>
          </div>
          <Badge className="numeric bg-[#F8F8F4] text-[#333333] border-[#E0E0E0]">{tasks.length}</Badge>
        </div>
      </div>
      <ScrollArea className="h-[600px] p-3">
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={onDelete} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-sm text-[#777777]">No tasks</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

