import { LucideIcon } from 'lucide-react';

/**
 * Time range filter options for dashboard data
 */
export type TimeRange = '7d' | '30d' | '90d';

/**
 * Trend direction for KPI metrics
 */
export type TrendDirection = 'up' | 'down';

/**
 * User type classification
 */
export type UserType = 'farmer' | 'buyer';

/**
 * Priority levels for approvals and tasks
 */
export type Priority = 'high' | 'medium' | 'low';

/**
 * System health status indicators
 */
export type HealthStatus = 'excellent' | 'good' | 'warning';

/**
 * KPI (Key Performance Indicator) card data structure
 */
export interface KPIData {
  title: string;
  value: string;
  change: string;
  trend: TrendDirection;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}

/**
 * User growth data point for time series charts
 */
export interface UserGrowthData {
  month: string;
  farmers: number;
  buyers: number;
}

/**
 * Activity distribution data for pie charts
 */
export interface ActivityData {
  name: string;
  value: number;
  color: string;
}

/**
 * System health metric with performance indicators
 */
export interface SystemHealthMetric {
  metric: string;
  value: number;
  status: HealthStatus;
}

/**
 * Recent activity log entry
 */
export interface RecentActivity {
  id: number;
  user: string;
  userType: UserType;
  action: string;
  details: string;
  time: string;
  avatar: string;
}

/**
 * Pending approval item requiring admin action
 */
export interface PendingApproval {
  id: number;
  type: string;
  requester: string;
  date: string;
  priority: Priority;
}

