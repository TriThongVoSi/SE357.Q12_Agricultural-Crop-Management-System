import { Task, Plot, InventoryItem, Incident, Activity, UpcomingTaskDay } from "./types";

// Note: MOCK_INVENTORY removed - now using entity API hooks

export const DEFAULT_SEASON = "1"; // Default ID

export const HEALTH_COLORS = {
  healthy: "bg-[#3BA55D]/10 text-[#3BA55D]",
  warning: "bg-[#F4C542]/10 text-[#F4C542]",
  critical: "bg-[#E74C3C]/10 text-[#E74C3C]",
  default: "bg-[#777777]/10 text-[#777777]",
};

export const SEVERITY_STYLES = {
  high: "border-[#E74C3C]/20 bg-[#E74C3C]/5",
  medium: "border-[#F4C542]/20 bg-[#F4C542]/5",
  low: "border-[#4A90E2]/20 bg-[#4A90E2]/5",
  default: "border-[#777777]/20 bg-[#777777]/5",
};

export const SEVERITY_ICON_COLORS = {
  high: "text-[#E74C3C]",
  medium: "text-[#F4C542]",
  low: "text-[#4A90E2]",
  default: "text-[#777777]",
};

export const ACTIVITY_ICON_COLORS = {
  task: "text-[#4A90E2]",
  expense: "text-[#3BA55D]",
  incident: "text-[#E74C3C]",
  season: "text-[#F4C542]",
  default: "text-[#777777]",
};

export const STATUS_BADGE_STYLES = {
  "not-started": "bg-[#777777]/10 text-[#777777] hover:bg-[#777777]/20",
  "in-progress": "bg-[#F4C542]/10 text-[#F4C542] hover:bg-[#F4C542]/20",
  completed: "bg-[#3BA55D]/10 text-[#3BA55D] hover:bg-[#3BA55D]/20",
};

export const STATUS_BADGE_LABELS = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
};
