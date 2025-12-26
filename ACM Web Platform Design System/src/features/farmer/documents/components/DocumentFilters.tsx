import { Filter, Wheat, Sprout, FolderOpen, FileCheck, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Filters } from "../types";
import {
    CROP_OPTIONS,
    STAGE_OPTIONS,
    TOPIC_OPTIONS,
    TYPE_OPTIONS,
    SEASON_OPTIONS,
} from "../constants";

interface DocumentFiltersProps {
    filters: Filters;
    activeFilterCount: number;
    isFilterOpen: boolean;
    onFilterChange: (category: keyof Filters, value: string, checked: boolean) => void;
    onClearFilters: () => void;
}

export function DocumentFilters({
    filters,
    activeFilterCount,
    isFilterOpen,
    onFilterChange,
    onClearFilters,
}: DocumentFiltersProps) {
    return (
        <aside
            className={`bg-white border-r border-[#E0E0E0] min-h-screen transition-all duration-300 ${isFilterOpen ? "block" : "hidden lg:block"
                }`}
        >
            <div className="p-6 sticky top-0">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#4CAF50]" />
                        <h3 className="text-lg text-[#333333]">Filters</h3>
                        {activeFilterCount > 0 && (
                            <Badge className="bg-[#4CAF50] text-white">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </div>
                    {activeFilterCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-xs text-[#4CAF50] hover:bg-[#4CAF50]/10"
                        >
                            Clear all
                        </Button>
                    )}
                </div>

                <ScrollArea className="h-[calc(100vh-120px)]">
                    <div className="space-y-6">
                        {/* Crop Filter */}
                        <div>
                            <Label className="flex items-center gap-2 text-[#333333] mb-3">
                                <Wheat className="w-4 h-4 text-[#4CAF50]" />
                                Crop
                            </Label>
                            <div className="space-y-2">
                                {CROP_OPTIONS.map((crop) => (
                                    <div key={crop} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`crop-${crop}`}
                                            checked={filters.crops.includes(crop)}
                                            onCheckedChange={(checked: boolean) =>
                                                onFilterChange("crops", crop, !!checked)
                                            }
                                            className={
                                                filters.crops.includes(crop)
                                                    ? "border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
                                                    : ""
                                            }
                                        />
                                        <label
                                            htmlFor={`crop-${crop}`}
                                            className="text-sm text-[#555555] cursor-pointer"
                                        >
                                            {crop}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-[#E0E0E0]" />

                        {/* Stage Filter */}
                        <div>
                            <Label className="flex items-center gap-2 text-[#333333] mb-3">
                                <Sprout className="w-4 h-4 text-[#4CAF50]" />
                                Stage
                            </Label>
                            <div className="space-y-2">
                                {STAGE_OPTIONS.map((stage) => (
                                    <div key={stage} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`stage-${stage}`}
                                            checked={filters.stages.includes(stage)}
                                            onCheckedChange={(checked: boolean) =>
                                                onFilterChange("stages", stage, !!checked)
                                            }
                                            className={
                                                filters.stages.includes(stage)
                                                    ? "border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
                                                    : ""
                                            }
                                        />
                                        <label
                                            htmlFor={`stage-${stage}`}
                                            className="text-sm text-[#555555] cursor-pointer"
                                        >
                                            {stage}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-[#E0E0E0]" />

                        {/* Topic Filter */}
                        <div>
                            <Label className="flex items-center gap-2 text-[#333333] mb-3">
                                <FolderOpen className="w-4 h-4 text-[#4CAF50]" />
                                Topic
                            </Label>
                            <div className="space-y-2">
                                {TOPIC_OPTIONS.map((topic) => (
                                    <div key={topic} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`topic-${topic}`}
                                            checked={filters.topics.includes(topic)}
                                            onCheckedChange={(checked: boolean) =>
                                                onFilterChange("topics", topic, !!checked)
                                            }
                                            className={
                                                filters.topics.includes(topic)
                                                    ? "border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
                                                    : ""
                                            }
                                        />
                                        <label
                                            htmlFor={`topic-${topic}`}
                                            className="text-sm text-[#555555] cursor-pointer"
                                        >
                                            {topic}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="bg-[#E0E0E0]" />

                        {/* Type Filter */}
                        <div>
                            <Label className="flex items-center gap-2 text-[#333333] mb-3">
                                <FileCheck className="w-4 h-4 text-[#4CAF50]" />
                                Type
                            </Label>
                            <div className="space-y-2">
                                {TYPE_OPTIONS.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <div key={type.value} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`type-${type.value}`}
                                                checked={filters.types.includes(type.value)}
                                                onCheckedChange={(checked: boolean) =>
                                                    onFilterChange("types", type.value, !!checked)
                                                }
                                                className={
                                                    filters.types.includes(type.value)
                                                        ? "border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
                                                        : ""
                                                }
                                            />
                                            <label
                                                htmlFor={`type-${type.value}`}
                                                className="text-sm text-[#555555] cursor-pointer flex items-center gap-2"
                                            >
                                                <Icon className="w-4 h-4" />
                                                {type.label}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <Separator className="bg-[#E0E0E0]" />

                        {/* Season Filter */}
                        <div>
                            <Label className="flex items-center gap-2 text-[#333333] mb-3">
                                <CalendarDays className="w-4 h-4 text-[#4CAF50]" />
                                Season
                            </Label>
                            <div className="space-y-2">
                                {SEASON_OPTIONS.map((season) => (
                                    <div key={season} className="flex items-center gap-2">
                                        <Checkbox
                                            id={`season-${season}`}
                                            checked={filters.seasons.includes(season)}
                                            onCheckedChange={(checked: boolean) =>
                                                onFilterChange("seasons", season, !!checked)
                                            }
                                            className={
                                                filters.seasons.includes(season)
                                                    ? "border-[#4CAF50] data-[state=checked]:bg-[#4CAF50]"
                                                    : ""
                                            }
                                        />
                                        <label
                                            htmlFor={`season-${season}`}
                                            className="text-sm text-[#555555] cursor-pointer"
                                        >
                                            {season}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
}
