import { Eye, ChevronRight, Droplets } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "../types";

interface TodaysTasksTableProps {
  tasks: Task[];
  toggleTask: (taskId: string) => void;
  getStatusBadge: (status: string) => JSX.Element | null;
}

/**
 * Today's Tasks Table Component
 *
 * Displays a table of tasks scheduled for today with:
 * - Checkbox for task completion
 * - Task details (title, ID, plot, type)
 * - Assignee with avatar
 * - Due date and status
 * - Action buttons
 */
export function TodaysTasksTable({
  tasks,
  toggleTask,
  getStatusBadge,
}: TodaysTasksTableProps) {
  return (
    <Card className="border-[#E0E0E0] rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>
              Manage and track your daily activities
            </CardDescription>
          </div>
          <Badge className="bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20 px-3 py-1">
            Nov 9
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-[#E0E0E0] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F8F4]">
                <TableHead className="w-12"></TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Plot</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-[#F8F8F4]/50">
                  <TableCell>
                    <Checkbox
                      checked={task.checked}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-[#1F2937]">
                        {task.title}
                      </span>
                      <span className="text-xs text-[#6B7280]">{task.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {task.plot}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-[#4A90E2]" />
                      <span className="text-sm text-[#6B7280]">
                        {task.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-[#3BA55D]/10 text-[#3BA55D]">
                          {task.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-[#6B7280]">
                        {task.assignee}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-[#6B7280] numeric">
                      {task.due}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

