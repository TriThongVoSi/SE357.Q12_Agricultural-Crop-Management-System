import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { FilterState } from '../types';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  activeFilterCount: number;
  onOpenFilters: () => void;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  activeFilterCount,
  onOpenFilters,
}: SearchFilterBarProps) {
  return (
    <div className="bg-white border-b border-[#E0E0E0] px-6 py-3">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <Input
              placeholder="Search tasks (min 2 characters)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-[#E0E0E0] acm-rounded-sm h-9 text-sm"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFilters}
            className="acm-rounded-sm border-[#E0E0E0] h-9"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-[#3BA55D] text-white px-1.5 py-0 h-4 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
