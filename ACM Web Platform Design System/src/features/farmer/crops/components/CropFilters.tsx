import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FilterOptions } from '../hooks/useCropFilterOptions';

interface CropFiltersProps {
    searchQuery: string;
    plotFilter: string;
    seasonFilter: string;
    cropTypeFilter: string;
    varietyFilter: string;
    filterOptions: FilterOptions;
    isLoading?: boolean;
    onSearchChange: (value: string) => void;
    onPlotChange: (value: string) => void;
    onSeasonChange: (value: string) => void;
    onCropTypeChange: (value: string) => void;
    onVarietyChange: (value: string) => void;
}

export function CropFilters({
    searchQuery,
    plotFilter,
    seasonFilter,
    cropTypeFilter,
    varietyFilter,
    filterOptions,
    isLoading = false,
    onSearchChange,
    onPlotChange,
    onSeasonChange,
    onCropTypeChange,
    onVarietyChange,
}: CropFiltersProps) {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search crops..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <Select value={plotFilter} onValueChange={onPlotChange} disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder={isLoading ? "Loading..." : "All Plots"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterOptions.plotOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={seasonFilter} onValueChange={onSeasonChange} disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder={isLoading ? "Loading..." : "All Seasons"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterOptions.seasonOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={cropTypeFilter} onValueChange={onCropTypeChange} disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder={isLoading ? "Loading..." : "Crop Type"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterOptions.cropTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={varietyFilter} onValueChange={onVarietyChange} disabled={isLoading}>
                        <SelectTrigger>
                            <SelectValue placeholder={isLoading ? "Loading..." : "Variety"} />
                        </SelectTrigger>
                        <SelectContent>
                            {filterOptions.varietyOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}

