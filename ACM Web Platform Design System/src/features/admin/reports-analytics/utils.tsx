import { AlertCircle, Activity } from 'lucide-react';
import { SystemAlert } from './types';

export const getAlertIcon = (type: SystemAlert['type']) => {
    switch (type) {
        case 'error':
            return <AlertCircle className="w-4 h-4 text-red-600" />;
        case 'warning':
            return <AlertCircle className="w-4 h-4 text-amber-600" />;
        case 'info':
            return <Activity className="w-4 h-4 text-blue-600" />;
    }
};

export const getAlertBadge = (severity: SystemAlert['severity']) => {
    const colors = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-amber-100 text-amber-700',
        low: 'bg-blue-100 text-blue-700',
    };
    return colors[severity];
};

export const getHealthStatus = (status: string) => {
    const colors = {
        excellent: 'text-emerald-600',
        good: 'text-blue-600',
        warning: 'text-amber-600',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600';
};
