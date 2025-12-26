import React from "react";
import { MapPin, Droplets, CloudRain, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WeatherData } from "../types";

interface CompactViewProps extends React.HTMLAttributes<HTMLDivElement> {
    weatherData: WeatherData | null;
    location: string | null;
}

/**
 * Compact Weather Display Component
 * Minimal card view showing essential weather information
 * Uses forwardRef to support PopoverTrigger asChild pattern
 */
export const CompactView = React.forwardRef<HTMLDivElement, CompactViewProps>(
    ({ weatherData, location, className, ...props }, ref) => {
        // Show placeholder if no weather data
        if (!weatherData) {
            return (
                <Card 
                    ref={ref} 
                    {...props}
                    className="w-60 border-[#E0E0E0] rounded-2xl shadow-sm bg-gradient-to-br from-[#4A90E2]/5 via-white to-[#F4C542]/5 cursor-pointer hover:shadow-md transition-all"
                >
                    <CardContent className="p-3.5">
                        <div className="text-center text-[#6B7280] text-sm">
                            📍 Click to set your location
                        </div>
                    </CardContent>
                </Card>
            );
        }

        const WeatherIcon = weatherData.icon;

        return (
            <Card 
                ref={ref} 
                {...props}
                className="w-60 border-[#E0E0E0] rounded-2xl shadow-sm bg-gradient-to-br from-[#4A90E2]/5 via-white to-[#F4C542]/5 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
            >
            <CardContent className="p-3.5">
                <div className="flex items-center justify-between mb-2">
                    {/* Main Weather Display */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#F4C542]/20 rounded-full blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-[#F4C542] to-[#F4C542]/70 p-2 rounded-xl">
                                <WeatherIcon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="numeric text-xl text-[#1F2937]">
                                    {weatherData.temperature}
                                </span>
                                <span className="text-xs text-[#6B7280]">°C</span>
                            </div>
                            <div className="text-[0.65rem] text-[#4A90E2]">
                                {weatherData.condition}
                            </div>
                        </div>
                    </div>

                    {/* Expand Icon */}
                    <ExternalLink className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#4A90E2] transition-colors" />
                </div>

                {/* Location & Quick Stats */}
                <div className="flex items-center justify-between text-[0.65rem] pt-2 border-t border-[#E0E0E0]">
                    <div className="flex items-center gap-1 text-[#6B7280]">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-[#4A90E2]" />
                            <span className="numeric text-[#6B7280]">{weatherData.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CloudRain className="w-3 h-3 text-[#3BA55D]" />
                            <span className="numeric text-[#6B7280]">{weatherData.precipitation}%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});

CompactView.displayName = "CompactView";
