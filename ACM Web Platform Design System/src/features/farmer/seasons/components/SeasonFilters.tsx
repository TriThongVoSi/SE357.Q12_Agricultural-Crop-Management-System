import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterState } from '../types';

interface SeasonFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  uniqueCrops: string[];
  uniqueYears: string[];
}

export function SeasonFilters({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  uniqueCrops,
  uniqueYears,
}: SeasonFiltersProps) {
  return (
    <div className="bg-white border-b border-[#E0E0E0] px-6 py-3">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Crop Filter */}
            <Select value={filters.crop} onValueChange={(value) => setFilters({ ...filters, crop: value })}>
              <SelectTrigger className="w-40 border-[#E0E0E0] acm-rounded-sm h-9 text-sm">
                <SelectValue placeholder="All Crops" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {uniqueCrops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value as FilterState['status'] })
              }
            >
              <SelectTrigger className="w-40 border-[#E0E0E0] acm-rounded-sm h-9 text-sm">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PLANNED">Planned</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>

            {/* Year Filter */}
            <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
              <SelectTrigger className="w-32 border-[#E0E0E0] acm-rounded-sm h-9 text-sm">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(filters.crop !== 'all' || filters.status !== 'all' || filters.year !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ crop: 'all', status: 'all', year: 'all' })}
                className="h-9 text-sm text-[#777777] hover:text-[#333333]"
              >
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <Input
              placeholder="Search seasons (min 2 characters)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#E0E0E0] acm-rounded-sm h-9 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
