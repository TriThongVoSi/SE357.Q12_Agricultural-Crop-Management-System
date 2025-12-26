import { Building2, Plus, Search, Filter, X } from "lucide-react";
import { useState } from "react";
import {
    Button,
    Input,
    Card,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/ui";

interface FarmToolbarProps {
    // Search
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    // Filters
    activeFilter: boolean | null;
    setActiveFilter: (value: boolean | null) => void;

    // Actions
    onCreateFarm: () => void;

    // Counts
    filteredCount: number;
    totalCount: number;
    selectedCount?: number;

    // Handlers
    onClearFilters: () => void;
}

/**
 * FarmToolbar Component
 * 
 * Unified toolbar that combines header, search, filters, and actions.
 * Provides a clean, scannable interface for farm management.
 */
export function FarmToolbar({
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    onCreateFarm,
    filteredCount,
    totalCount,
    selectedCount = 0,
    onClearFilters,
}: FarmToolbarProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const hasActiveFilters = searchQuery || activeFilter !== null;
    const activeFilterCount = activeFilter !== null ? 1 : 0;

    const getActiveFilterLabel = (): string => {
        if (activeFilter === true) return "Active";
        if (activeFilter === false) return "Inactive";
        return "All";
    };

    return (
        <Card className="border border-gray-200 shadow-sm">
            <div className="px-6 py-4">
                {/* Top Row: Title + Search + Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Title Section */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 leading-tight">
                            <Building2 className="w-6 h-6 text-emerald-600" />
                            Farms
                        </h1>
                        <p className="text-sm text-slate-600 mt-1">
                            Manage your farm properties
                        </p>
                    </div>

                    {/* Search Bar - Prominent */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search farms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 pl-10 border-gray-300 focus:border-emerald-600 focus:ring-emerald-600"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Filters Button */}
                        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-300 hover:bg-gray-50"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filters
                                    {activeFilterCount > 0 && (
                                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-emerald-600 rounded-full">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-slate-900">Filter Farms</h3>
                                        {hasActiveFilters && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    onClearFilters();
                                                    setIsFilterOpen(false);
                                                }}
                                                className="h-auto p-1 text-xs text-emerald-600 hover:text-emerald-700"
                                            >
                                                Clear All
                                            </Button>
                                        )}
                                    </div>

                                    {/* Status Filter */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-700">Status</label>
                                        <Select
                                            value={activeFilter === null ? "all" : activeFilter ? "active" : "inactive"}
                                            onValueChange={(value) => {
                                                if (value === "all") {
                                                    setActiveFilter(null);
                                                } else if (value === "active") {
                                                    setActiveFilter(true);
                                                } else {
                                                    setActiveFilter(false);
                                                }
                                            }}
                                        >
                                            <SelectTrigger className="border-gray-300 focus:border-emerald-600">
                                                <SelectValue placeholder="All statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Farms</SelectItem>
                                                <SelectItem value="active">Active Only</SelectItem>
                                                <SelectItem value="inactive">Inactive Only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Filter Summary */}
                                    {hasActiveFilters && (
                                        <div className="pt-3 border-t border-gray-200">
                                            <p className="text-xs text-slate-600">
                                                Showing {filteredCount} of {totalCount} farms
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Create Farm Button */}
                        <Button
                            onClick={onCreateFarm}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            size="sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Farm
                        </Button>
                    </div>
                </div>

                {/* Active Filters Summary (shown below search when filters active) */}
                {hasActiveFilters && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-slate-600">Active filters:</span>
                            {activeFilter !== null && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md">
                                    Status: {getActiveFilterLabel()}
                                    <button
                                        onClick={() => setActiveFilter(null)}
                                        className="hover:text-slate-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                            Clear All
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
