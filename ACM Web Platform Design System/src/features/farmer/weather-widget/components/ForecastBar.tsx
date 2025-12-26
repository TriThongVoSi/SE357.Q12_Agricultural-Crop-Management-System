import React from "react";
import { Calendar, CloudRain } from "lucide-react";
import type { ForecastDay } from "../types";

interface ForecastBarProps {
    forecast: ForecastDay[];
}

/**
 * Forecast Bar Component
 * Displays 3-day weather forecast in a compact horizontal layout
 */
export const ForecastBar = React.memo<ForecastBarProps>(({ forecast }) => {
    return (
        <div className="bg-gradient-to-r from-[#F8F8F4] to-white px-4 py-3 border-b border-[#E0E0E0]">
            <div className="flex items-center gap-1 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">3-Day Forecast</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
                {forecast.map((day, index) => {
                    const DayIcon = day.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E0E0E0] hover:bg-[#F8F8F4] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <DayIcon className="w-4 h-4 text-[#4A90E2]" />
                                <div>
                                    <div className="text-xs text-[#6B7280]">{day.day}</div>
                                    <div className="flex items-center gap-1 text-[0.65rem]">
                                        <span className="numeric text-[#E74C3C]">{day.high}°</span>
                                        <span className="text-[#6B7280]">/</span>
                                        <span className="numeric text-[#4A90E2]">{day.low}°</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <CloudRain className="w-3 h-3 text-[#4A90E2]" />
                                <span className="text-[0.65rem] numeric text-[#6B7280]">
                                    {day.precipitation}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

ForecastBar.displayName = "ForecastBar";
