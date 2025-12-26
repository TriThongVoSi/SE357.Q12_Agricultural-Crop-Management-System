import {
    Droplets,
    Sprout,
    ShowerHead,
    Search as SearchIcon,
    Eye,
    Package,
} from 'lucide-react';
import { TaskType, TaskTypeConfig } from './types';

export const TASK_TYPES: Record<TaskType, TaskTypeConfig> = {
    irrigate: { label: 'Irrigate', icon: Droplets, color: '#4A90E2' },
    fertilize: { label: 'Fertilize', icon: Sprout, color: '#3BA55D' },
    spray: { label: 'Spray', icon: ShowerHead, color: '#F4C542' },
    weed: { label: 'Weed', icon: SearchIcon, color: '#777777' },
    scout: { label: 'Scout', icon: Eye, color: '#4A90E2' },
    harvest: { label: 'Harvest', icon: Package, color: '#E74C3C' },
};
