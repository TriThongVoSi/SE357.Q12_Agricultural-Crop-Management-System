import React from "react";
import {
    Droplets,
    Wind,
    Sun,
    Eye,
    Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import type { WeatherData } from "../types";

interface WeatherDetailsProps {
    weatherData: WeatherData;
    getUVIndexColor: (index: number) => string;
    getUVIndexLabel: (index: number) => string;
}

/**
 * Weather Details Grid Component
 * Displays detailed weather metrics in a grid layout with tooltips
 */
export const WeatherDetails = React.memo<WeatherDetailsProps>(
    ({ weatherData, getUVIndexColor, getUVIndexLabel }) => {
        return (
            <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Humidity */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-[#4A90E2]/10 rounded-xl p-3 cursor-help hover:bg-[#4A90E2]/15 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Droplets className="w-5 h-5 text-[#4A90E2]" />
                                    <span className="text-xs text-[#6B7280]">Humidity</span>
                                </div>
                                <div className="numeric text-2xl text-[#1F2937]">
                                    {weatherData.humidity}%
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Relative humidity level</p>
                            <p className="text-xs text-[#6B7280] mt-1">
                                Ideal for most crops
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Wind */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-[#3BA55D]/10 rounded-xl p-3 cursor-help hover:bg-[#3BA55D]/15 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Wind className="w-5 h-5 text-[#3BA55D]" />
                                    <span className="text-xs text-[#6B7280]">Wind Speed</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="numeric text-2xl text-[#1F2937]">
                                        {weatherData.windSpeed}
                                    </span>
                                    <span className="text-sm text-[#6B7280]">km/h</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <Compass className="w-3 h-3 text-[#6B7280]" />
                                    <span className="text-xs text-[#6B7280]">
                                        {weatherData.windDirection}
                                    </span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Wind speed and direction</p>
                            <p className="text-xs text-[#6B7280] mt-1">
                                Light breeze from northeast
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* UV Index */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-[#F4C542]/10 rounded-xl p-3 cursor-help hover:bg-[#F4C542]/15 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sun className="w-5 h-5 text-[#F4C542]" />
                                    <span className="text-xs text-[#6B7280]">UV Index</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="numeric text-2xl text-[#1F2937]">
                                        {weatherData.uvIndex}
                                    </span>
                                    <Badge
                                        className={`text-xs ${getUVIndexColor(
                                            weatherData.uvIndex
                                        )} bg-transparent border-0 px-0`}
                                    >
                                        {getUVIndexLabel(weatherData.uvIndex)}
                                    </Badge>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">UV radiation level</p>
                            <p className="text-xs text-[#F4C542] mt-1">
                                ⚠ High - Take precautions
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Visibility */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="bg-[#6B7280]/10 rounded-xl p-3 cursor-help hover:bg-[#6B7280]/15 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="w-5 h-5 text-[#6B7280]" />
                                    <span className="text-xs text-[#6B7280]">Visibility</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="numeric text-2xl text-[#1F2937]">
                                        {weatherData.visibility}
                                    </span>
                                    <span className="text-sm text-[#6B7280]">km</span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-xs">Horizontal visibility distance</p>
                            <p className="text-xs text-[#6B7280] mt-1">
                                Excellent visibility
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        );
    }
);

WeatherDetails.displayName = "WeatherDetails";
