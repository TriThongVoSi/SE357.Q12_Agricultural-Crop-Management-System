import { Droplets, Sprout, ShowerHead, Eye, Package } from 'lucide-react';
import type { Task, TaskStatus } from './types';

export const TASK_TYPES = {
  irrigation: { label: 'Irrigation', icon: Droplets, color: '#4A90E2' },
  fertilizing: { label: 'Fertilizing', icon: Sprout, color: '#3BA55D' },
  spraying: { label: 'Spraying', icon: ShowerHead, color: '#F4C542' },
  scouting: { label: 'Scouting', icon: Eye, color: '#777777' },
  harvesting: { label: 'Harvesting', icon: Package, color: '#E74C3C' },
} as const;

export const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20',
  'in-progress': 'bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20',
  paused: 'bg-[#777777]/10 text-[#777777] border-[#777777]/20',
  completed: 'bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  paused: 'Paused',
  completed: 'Completed',
};

export const STATUS_COLOR_VALUES: Record<TaskStatus, string> = {
  todo: '#4A90E2',
  'in-progress': '#F4C542',
  paused: '#777777',
  completed: '#3BA55D',
};

export const KANBAN_COLUMNS = [
  { status: 'todo' as TaskStatus, title: 'To Do', color: '#4A90E2' },
  { status: 'in-progress' as TaskStatus, title: 'In Progress', color: '#F4C542' },
  { status: 'paused' as TaskStatus, title: 'Paused (Weather Hold)', color: '#777777' },
  { status: 'completed' as TaskStatus, title: 'Completed', color: '#3BA55D' },
];

// Note: MOCK_TASKS removed - now using entity API hooks
