import React from "react";
import { Sun } from "lucide-react";

/**
 * Farming Recommendation Component
 * Displays AI-generated or rule-based farming recommendations
 */
export const FarmingRecommendation = React.memo(() => {
    return (
        <div className="mt-4 p-3 bg-[#3BA55D]/10 rounded-xl border border-[#3BA55D]/20">
            <div className="flex items-start gap-2">
                <Sun className="w-4 h-4 text-[#3BA55D] mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-xs text-[#1F2937] mb-1">
                        ✓ Perfect day for outdoor farm work!
                    </p>
                    <p className="text-[0.65rem] text-[#6B7280]">
                        Clear skies expected throughout the day. Optimal conditions for
                        irrigation between 6 AM - 10 AM. Consider checking Plot A1&apos;s
                        moisture levels.
                    </p>
                </div>
            </div>
        </div>
    );
});

FarmingRecommendation.displayName = "FarmingRecommendation";
