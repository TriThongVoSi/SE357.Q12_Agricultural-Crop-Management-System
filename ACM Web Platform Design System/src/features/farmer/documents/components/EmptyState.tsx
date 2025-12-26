import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    searchQuery: string;
    activeFilterCount: number;
    onClearAll: () => void;
}

export function EmptyState({
    searchQuery,
    activeFilterCount,
    onClearAll,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-32 h-32 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6">
                <FileQuestion className="w-16 h-16 text-[#4CAF50]" />
            </div>
            <h3 className="text-xl text-[#333333] mb-2">No Documents Found</h3>
            <p className="text-sm text-[#777777] text-center max-w-md">
                We couldn't find any documents matching your search or filters. Try
                adjusting your criteria.
            </p>
            {(searchQuery || activeFilterCount > 0) && (
                <Button
                    variant="outline"
                    className="mt-6 rounded-xl border-[#4CAF50] text-[#4CAF50]"
                    onClick={onClearAll}
                >
                    Clear Search & Filters
                </Button>
            )}
        </div>
    );
}
