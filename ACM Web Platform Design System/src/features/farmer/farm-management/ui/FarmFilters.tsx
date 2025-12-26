import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui';

interface FarmFiltersProps {
    keyword: string;
    onKeywordChange: (value: string) => void;
    activeFilter: boolean | null;
    onActiveFilterChange: (value: boolean | null) => void;
}

/**
 * Farm filters component for search and active status filtering
 */
export function FarmFilters({
    keyword,
    onKeywordChange,
    activeFilter,
    onActiveFilterChange,
}: FarmFiltersProps) {
    const handleFilterChange = (value: string) => {
        if (value === 'all') {
            onActiveFilterChange(null);
        } else if (value === 'active') {
            onActiveFilterChange(true);
        } else if (value === 'inactive') {
            onActiveFilterChange(false);
        }
    };

    const currentFilterValue =
        activeFilter === null ? 'all' : activeFilter ? 'active' : 'inactive';

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
                <Input
                    type="text"
                    placeholder="Search farms by name..."
                    value={keyword}
                    onChange={(e) => onKeywordChange(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="w-full sm:w-48">
                <Select value={currentFilterValue} onValueChange={handleFilterChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Farms</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="inactive">Inactive Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
