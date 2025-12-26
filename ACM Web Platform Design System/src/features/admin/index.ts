// Export admin feature components
export { AdminDashboard } from './dashboard';
export * from './document-management';

// Export types for consumers
export type {
  KPIData,
  UserGrowthData,
  ActivityData,
  SystemHealthMetric,
  RecentActivity,
  PendingApproval,
  TimeRange,
  TrendDirection,
  UserType,
  Priority,
  HealthStatus,
} from './dashboard/types';
