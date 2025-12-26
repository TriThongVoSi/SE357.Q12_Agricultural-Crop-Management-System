import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import { KPICards } from './components/KPICards';
import { UserGrowthChart } from './components/UserGrowthChart';
import { ActivityDistribution } from './components/ActivityDistribution';
import { SystemHealthMetrics } from './components/SystemHealthMetrics';
import { PendingApprovals } from './components/PendingApprovals';
import { RecentActivitiesTable } from './components/RecentActivitiesTable';
import { QuickActions } from './components/QuickActions';

/**
 * AdminDashboard Component
 * 
 * Main dashboard view for administrators with comprehensive platform monitoring.
 * Displays KPIs, charts, system health, recent activities, and quick actions.
 * 
 * Refactored into modular components following Clean Code principles:
 * - Single Responsibility: Each component has one clear purpose
 * - Separation of Concerns: Logic separated into custom hook
 * - DRY: Reusable components and utilities
 */
export function AdminDashboard() {
  const {
    timeRange,
    kpiData,
    userGrowthData,
    activityData,
    systemHealth,
    recentActivities,
    pendingApprovals,
    setTimeRange,
    handleExportReport,
    handleReviewApproval,
    handleQuickAction,
  } = useAdminDashboard();

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="mb-1">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your agricultural platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            className="bg-[#2563EB] hover:bg-[#1E40AF]"
            onClick={handleExportReport}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards kpiData={kpiData} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserGrowthChart data={userGrowthData} />
        <ActivityDistribution data={activityData} />
      </div>

      {/* System Health & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemHealthMetrics metrics={systemHealth} />
        <PendingApprovals 
          approvals={pendingApprovals} 
          onReview={handleReviewApproval} 
        />
      </div>

      {/* Recent Activities */}
      <RecentActivitiesTable activities={recentActivities} />

      {/* Quick Actions */}
      <QuickActions onAction={handleQuickAction} />
    </div>
  );
}

