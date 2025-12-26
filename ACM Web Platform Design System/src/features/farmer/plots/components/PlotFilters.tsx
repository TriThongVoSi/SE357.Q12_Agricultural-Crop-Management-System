import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlotFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCrop: string;
  setFilterCrop: (crop: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterSoilType: string;
  setFilterSoilType: (type: string) => void;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
  // Dynamic filter options from API
  cropOptions: Array<{ value: string; label: string }>;
  soilTypeOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  isLoadingFilterOptions?: boolean;
}

/**
 * PlotFilters Component
 *
 * Displays search and filter controls for plots.
 */
export function PlotFilters({
  searchQuery,
  setSearchQuery,
  filterCrop,
  setFilterCrop,
  filterStatus,
  setFilterStatus,
  filterSoilType,
  setFilterSoilType,
  filteredCount,
  totalCount,
  onClearFilters,
  cropOptions,
  soilTypeOptions,
  statusOptions,
  isLoadingFilterOptions = false,
}: PlotFiltersProps) {
  const hasActiveFilters =
    searchQuery || filterCrop !== "all" || filterStatus !== "all" || filterSoilType !== "all";

  return (
    <Card className="border border-gray-200 shadow-md">
      <CardContent className="pt-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <Input
              placeholder="Search plots by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 border-[#E0E0E0] focus:border-[#3BA55D]"
            />
          </div>

          {/* Crop Filter */}
          <Select value={filterCrop} onValueChange={setFilterCrop} disabled={isLoadingFilterOptions}>
            <SelectTrigger className="border-[#E0E0E0] focus:border-[#3BA55D]">
              <SelectValue placeholder="Crop" />
            </SelectTrigger>
            <SelectContent>
              {cropOptions.map((crop) => (
                <SelectItem key={crop.value} value={crop.value}>
                  {crop.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus} disabled={isLoadingFilterOptions}>
            <SelectTrigger className="border-[#E0E0E0] focus:border-[#3BA55D]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Soil Type Filter */}
          <Select value={filterSoilType} onValueChange={setFilterSoilType} disabled={isLoadingFilterOptions}>
            <SelectTrigger className="border-[#E0E0E0] focus:border-[#3BA55D]">
              <SelectValue placeholder="Soil Type" />
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

        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E0E0E0]">
            <p className="text-sm text-[#777777]">
              Showing {filteredCount} of {totalCount} plots
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-[#3BA55D] hover:bg-[#3BA55D]/10"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

