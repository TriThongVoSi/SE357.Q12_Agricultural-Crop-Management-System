import React from "react";
import {
    Thermometer,
    ChevronUp,
    ChevronDown,
    CloudRain,
} from "lucide-react";
import type { WeatherData } from "../types";

interface CurrentWeatherProps {
    weatherData: WeatherData;
}

/**
 * Current Weather Component
 * Displays main temperature, condition, feels-like, and high/low temps
 */
export const CurrentWeather = React.memo<CurrentWeatherProps>(({ weatherData }) => {
    const WeatherIcon = weatherData.icon;

    return (
        <div className="flex items-start justify-between mb-5">
            {/* Temperature & Condition */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#F4C542]/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-[#F4C542] to-[#F4C542]/70 p-4 rounded-2xl shadow-lg">
                        <WeatherIcon className="w-10 h-10 text-white" />
                    </div>
                </div>
                <div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="numeric text-5xl text-[#1F2937]">
                            {weatherData.temperature}
                        </span>
                        <span className="text-2xl text-[#6B7280]">°C</span>
                    </div>
                    <div className="text-sm text-[#4A90E2] mt-1">
                        {weatherData.condition}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1.5">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>
                            Feels like <span className="numeric">{weatherData.feelsLike}°C</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* High/Low & Precipitation */}
            <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                    <ChevronUp className="w-4 h-4 text-[#E74C3C]" />
                    <span className="numeric text-lg text-[#E74C3C]">
                        {weatherData.highTemp}°
                    </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <ChevronDown className="w-4 h-4 text-[#4A90E2]" />
                    <span className="numeric text-lg text-[#4A90E2]">
                        {weatherData.lowTemp}°
                    </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-2 pt-2 border-t border-[#E0E0E0]">
                    <CloudRain className="w-3.5 h-3.5 text-[#4A90E2]" />
                    <span className="numeric">{weatherData.precipitation}%</span>
                    <span>rain</span>
                </div>
            </div>
        </div>
    );
});

CurrentWeather.displayName = "CurrentWeather";
