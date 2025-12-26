import React from "react";
import { Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SprayConditions } from "../types";

interface FieldConditionsProps {
    sprayConditions: SprayConditions;
}

/**
 * Field Conditions Component
 * Displays farming-specific conditions like spray suitability
 */
export const FieldConditions = React.memo<FieldConditionsProps>(
    ({ sprayConditions }) => {
        return (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#3BA55D]/10 to-[#4A90E2]/10 border border-[#3BA55D]/20">
                <div className="flex items-center gap-1.5 mb-2">
                    <Sprout className="w-4 h-4 text-[#3BA55D]" />
                    <span className="text-sm text-[#1F2937]">Field Conditions</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">Spray Conditions</span>
                    <Badge
                        className={`${sprayConditions.color} bg-transparent border-0 px-0`}
                    >
                        {sprayConditions.label}
                    </Badge>
                </div>
            </div>
        );
    }
);

FieldConditions.displayName = "FieldConditions";
