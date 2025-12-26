import React from "react";
import { Gauge } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { WeatherData } from "../types";

interface AdditionalInfoProps {
    weatherData: WeatherData;
}

/**
 * Additional Info Component
 * Displays supplementary weather information like pressure, sunrise/sunset
 */
export const AdditionalInfo = React.memo<AdditionalInfoProps>(
    ({ weatherData }) => {
        return (
            <div className="pt-3 border-t border-[#E0E0E0]">
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[#6B7280]">Pressure</span>
                        <div className="flex items-center gap-1">
                            <Gauge className="w-3 h-3 text-[#6B7280]" />
                            <span className="numeric text-[#1F2937]">
                                {weatherData.pressure} mb
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#6B7280]">Sunrise</span>
                        <span className="numeric text-[#1F2937]">
                            {weatherData.sunrise}
                        </span>
                    </div>
                </div>
                <Separator className="my-2" />
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-[#6B7280]">Sunset</span>
                        <span className="numeric text-[#1F2937]">
                            {weatherData.sunset}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#6B7280]">Today's Range</span>
                        <span className="numeric text-[#1F2937]">
                            {weatherData.lowTemp}° - {weatherData.highTemp}°
                        </span>
                    </div>
                </div>
            </div>
        );
    }
);

AdditionalInfo.displayName = "AdditionalInfo";
