import { useState } from 'react';
import {
  TimeRange,
  KPIData,
  UserGrowthData,
  ActivityData,
  SystemHealthMetric,
  RecentActivity,
  PendingApproval,
} from '../types';
import {
  MOCK_KPI_DATA,
  MOCK_USER_GROWTH_DATA,
  MOCK_ACTIVITY_DATA,
  MOCK_SYSTEM_HEALTH,
  MOCK_RECENT_ACTIVITIES,
  MOCK_PENDING_APPROVALS,
} from '../constants';

/**
 * Return type for the useAdminDashboard hook
 */
export interface UseAdminDashboardReturn {
  // State
  timeRange: TimeRange;
  
  // Data
  kpiData: KPIData[];
  userGrowthData: UserGrowthData[];
  activityData: ActivityData[];
  systemHealth: SystemHealthMetric[];
  recentActivities: RecentActivity[];
  pendingApprovals: PendingApproval[];
  
  // Handlers
  setTimeRange: (range: TimeRange) => void;
  handleExportReport: () => void;
  handleReviewApproval: (approvalId: number) => void;
  handleQuickAction: (action: string) => void;
}

/**
 * Custom hook for Admin Dashboard state management and business logic
 * 
 * Encapsulates all state, data fetching, and event handlers for the dashboard.
 * This separation allows the UI components to focus purely on presentation.
 */
export const useAdminDashboard = (): UseAdminDashboardReturn => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  /**
   * Handle export report action
   * In production, this would trigger a report generation API call
   */
  const handleExportReport = () => {
    console.log(`Exporting report for time range: ${timeRange}`);
    // TODO: Implement actual export functionality
  };

  /**
   * Handle approval review action
   * @param approvalId - ID of the approval item to review
   */
  const handleReviewApproval = (approvalId: number) => {
    console.log(`Reviewing approval: ${approvalId}`);
    // TODO: Implement approval review flow
  };

  /**
   * Handle quick action button clicks
   * @param action - Type of quick action (add-farmer, add-buyer, etc.)
   */
  const handleQuickAction = (action: string) => {
    console.log(`Quick action triggered: ${action}`);
    // TODO: Implement quick action navigation/modals
  };

  // In a real application, data would be filtered/fetched based on timeRange
  // For now, we return the mock data directly
  return {
    // State
    timeRange,
    
    // Data
    kpiData: MOCK_KPI_DATA,
    userGrowthData: MOCK_USER_GROWTH_DATA,
    activityData: MOCK_ACTIVITY_DATA,
    systemHealth: MOCK_SYSTEM_HEALTH,
    recentActivities: MOCK_RECENT_ACTIVITIES,
    pendingApprovals: MOCK_PENDING_APPROVALS,
    
    // Handlers
    setTimeRange,
    handleExportReport,
    handleReviewApproval,
    handleQuickAction,
  };
};

