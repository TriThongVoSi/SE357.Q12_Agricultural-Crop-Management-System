import { useState } from 'react';
import { toast } from 'sonner';
import type { DateRange, UserActivityFilter } from '../types';
import {
    KPI_DATA,
    USER_ACTIVITY_DATA,
    SEASON_STATUS_DATA,
    EXPENSES_DATA,
    METRICS_DATA,
    SYSTEM_ALERTS,
    SYSTEM_HEALTH,
} from '../constants';

export const useReportsAnalytics = () => {
    // State management
    const [dateRange, setDateRange] = useState<DateRange>('month');
    const [filterOpen, setFilterOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [userActivityFilter, setUserActivityFilter] = useState<UserActivityFilter>({
        farmers: true,
        buyers: true,
        admins: true,
    });

    // Filter state
    const [cropFilter, setCropFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    // Handlers
    const handleExport = (format: string) => {
        toast.success(`Exporting report as ${format.toUpperCase()}`, {
            description: 'Your report will be downloaded shortly.',
        });
    };

    const handleFilterClear = () => {
        setCropFilter('all');
        setRegionFilter('all');
        setRoleFilter('all');
    };

    const handleFilterApply = () => {
        setFilterOpen(false);
    };

    const handleSettingsSave = () => {
        toast.success('Settings saved', {
            description: 'Report settings have been updated successfully.',
        });
        setSettingsOpen(false);
    };

    // Computed data
    const filteredUserActivityData = USER_ACTIVITY_DATA.map(item => ({
        date: item.date,
        ...(userActivityFilter.farmers && { farmers: item.farmers }),
        ...(userActivityFilter.buyers && { buyers: item.buyers }),
        ...(userActivityFilter.admins && { admins: item.admins }),
    }));

    return {
        // State
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

        // Data
        kpiData: KPI_DATA,
        userActivityData: USER_ACTIVITY_DATA,
        seasonStatusData: SEASON_STATUS_DATA,
        expensesData: EXPENSES_DATA,
        metricsData: METRICS_DATA,
        systemAlerts: SYSTEM_ALERTS,
        systemHealth: SYSTEM_HEALTH,
        filteredUserActivityData,

        // Handlers
        handleExport,
        handleFilterClear,
        handleFilterApply,
        handleSettingsSave,
    };
};
