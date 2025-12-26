import { Calendar, Filter, Download, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportsAnalytics } from './hooks/useReportsAnalytics';
import { getAlertIcon, getAlertBadge, getHealthStatus } from './utils';

import { KPICard } from './components/KPICard';
import { UserActivityChart } from './components/UserActivityChart';
import { SeasonStatusChart } from './components/SeasonStatusChart';
import { ExpensesYieldChart } from './components/ExpensesYieldChart';
import { MetricsTable } from './components/MetricsTable';
import { SystemHealthCard } from './components/SystemHealthCard';
import { RecentAlertsCard } from './components/RecentAlertsCard';
import { FilterDrawer } from './components/FilterDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';
import type { DateRange } from './types';

export const ReportsAnalytics: React.FC = () => {
    const {
        dateRange,
        setDateRange,
        filterOpen,
        setFilterOpen,
        settingsOpen,
        setSettingsOpen,
        userActivityFilter,
        setUserActivityFilter,
        cropFilter,
        setCropFilter,
        regionFilter,
        setRegionFilter,
        roleFilter,
        setRoleFilter,
        kpiData,
        seasonStatusData,
        expensesData,
        metricsData,
        systemAlerts,
        systemHealth,
        filteredUserActivityData,
        handleExport,
        handleFilterClear,
        handleFilterApply,
        handleSettingsSave,
    } = useReportsAnalytics();

    // Helper functions imported from utils
    // getAlertIcon, getAlertBadge, getHealthStatus are now imported directly


    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="mb-1">Reports & Analytics</h1>
                    <p className="text-sm text-muted-foreground">
                        Platform insights, metrics, and system health monitoring
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={dateRange} onValueChange={(v: string) => setDateRange(v as DateRange)}>
                        <SelectTrigger className="w-[160px]">
                            <Calendar className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setFilterOpen(true)}>
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                                <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleExport('csv')}>
                                Export as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('excel')}>
                                Export as Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('pdf')}>
                                Export as PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)}>
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* KPI Overview Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {kpiData.map((kpi, index) => (
                    <KPICard key={index} kpi={kpi} index={index} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <UserActivityChart
                    filteredUserActivityData={filteredUserActivityData}
                    userActivityFilter={userActivityFilter}
                    setUserActivityFilter={setUserActivityFilter}
                />
                <SeasonStatusChart seasonStatusData={seasonStatusData} />
            </div>

            {/* Expenses & Yield Bar Chart */}
            <ExpensesYieldChart expensesData={expensesData} />

            {/* Detailed Metrics Table */}
            <MetricsTable metricsData={metricsData} />

            {/* System Health & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SystemHealthCard systemHealth={systemHealth} getHealthStatus={getHealthStatus} />
                <RecentAlertsCard
                    systemAlerts={systemAlerts}
                    getAlertIcon={getAlertIcon}
                    getAlertBadge={getAlertBadge}
                />
            </div>

            {/* Filter Sheet */}
            <FilterDrawer
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                cropFilter={cropFilter}
                setCropFilter={setCropFilter}
                regionFilter={regionFilter}
                setRegionFilter={setRegionFilter}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
                handleFilterClear={handleFilterClear}
                handleFilterApply={handleFilterApply}
            />

            {/* Settings Drawer */}
            <SettingsDrawer
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                handleSettingsSave={handleSettingsSave}
            />
        </div>
    );
};
