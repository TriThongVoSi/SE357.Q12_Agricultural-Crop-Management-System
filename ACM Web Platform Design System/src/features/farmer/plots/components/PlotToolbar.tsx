import { MapPin, List, Plus, MapIcon, Search, Filter, X, GitMerge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ViewMode } from "../types";
import { useState } from "react";

interface PlotToolbarProps {
  // View mode
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Actions
  onAddPlot: () => void;
  onMergePlots?: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Filters
  filterCrop: string;
  setFilterCrop: (crop: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterSoilType: string;
  setFilterSoilType: (type: string) => void;
  
  // Filter options
  cropOptions: Array<{ value: string; label: string }>;
  soilTypeOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  isLoadingFilterOptions?: boolean;
  
  // Counts
  filteredCount: number;
  totalCount: number;
  selectedCount?: number;
  
  // Handlers
  onClearFilters: () => void;
  
  // Show merge button
  showMergeButton?: boolean;
}

/**
 * PlotToolbar Component
 * 
 * Unified toolbar that combines header, search, filters, and actions.
 * Provides a clean, scannable interface for plot management.
 */
export function PlotToolbar({
  viewMode,
  setViewMode,
  onAddPlot,
  onMergePlots,
  searchQuery,
  setSearchQuery,
  filterCrop,
  setFilterCrop,
  filterStatus,
  setFilterStatus,
  filterSoilType,
  setFilterSoilType,
  cropOptions,
  soilTypeOptions,
  statusOptions,
  isLoadingFilterOptions = false,
  filteredCount,
  totalCount,
  selectedCount = 0,
  onClearFilters,
  showMergeButton = false,
}: PlotToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const hasActiveFilters =
    searchQuery || filterCrop !== "all" || filterStatus !== "all" || filterSoilType !== "all";
    
  const activeFilterCount = 
    (filterCrop !== "all" ? 1 : 0) + 
    (filterStatus !== "all" ? 1 : 0) + 
    (filterSoilType !== "all" ? 1 : 0);

  return (
    <Card className="border border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        {/* Top Row: Title + Search + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Title Section */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 leading-tight">
              <MapPin className="w-6 h-6 text-emerald-600" />
              My Plots
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              View and manage all farm plots
            </p>
          </div>

          {/* Search Bar - Prominent */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search plots..."
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
                    <h3 className="text-sm font-semibold text-slate-900">Filter Plots</h3>
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

                  {/* Crop Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Crop</label>
                    <Select value={filterCrop} onValueChange={setFilterCrop} disabled={isLoadingFilterOptions}>
                      <SelectTrigger className="border-gray-300 focus:border-emerald-600">
                        <SelectValue placeholder="All crops" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropOptions.map((crop) => (
                          <SelectItem key={crop.value} value={crop.value}>
                            {crop.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus} disabled={isLoadingFilterOptions}>
                      <SelectTrigger className="border-gray-300 focus:border-emerald-600">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Soil Type Filter */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-700">Soil Type</label>
                    <Select value={filterSoilType} onValueChange={setFilterSoilType} disabled={isLoadingFilterOptions}>
                      <SelectTrigger className="border-gray-300 focus:border-emerald-600">
                        <SelectValue placeholder="All soil types" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypeOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Filter Summary */}
                  {hasActiveFilters && (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-xs text-slate-600">
                        Showing {filteredCount} of {totalCount} plots
                      </p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Merge Plots Button (conditional) */}
            {showMergeButton && onMergePlots && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMergePlots}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                disabled={selectedCount < 2}
              >
                <GitMerge className="w-4 h-4 mr-2" />
                Merge Plots
              </Button>
            )}

            {/* View Toggle */}
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-emerald-600"
                    : "hover:bg-white/50 text-slate-600"
                }`}
              >
                <List className="w-4 h-4 mr-1.5" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={`h-8 ${
                  viewMode === "map"
                    ? "bg-white shadow-sm text-emerald-600"
                    : "hover:bg-white/50 text-slate-600"
                }`}
              >
                <MapIcon className="w-4 h-4 mr-1.5" />
                Map
              </Button>
            </div>

            {/* Add Plot Button */}
            <Button
              onClick={onAddPlot}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Plot
            </Button>
          </div>
        </div>

        {/* Active Filters Summary (shown below search when filters active) */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-600">Active filters:</span>
              {filterCrop !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md">
                  Crop: {cropOptions.find(c => c.value === filterCrop)?.label}
                  <button
                    onClick={() => setFilterCrop("all")}
                    className="hover:text-slate-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md">
                  Status: {statusOptions.find(s => s.value === filterStatus)?.label}
                  <button
                    onClick={() => setFilterStatus("all")}
                    className="hover:text-slate-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterSoilType !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md">
                  Soil: {soilTypeOptions.find(t => t.value === filterSoilType)?.label}
                  <button
                    onClick={() => setFilterSoilType("all")}
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








