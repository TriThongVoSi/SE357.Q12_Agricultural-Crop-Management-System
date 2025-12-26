import type { AgriAlert } from "./types";

/**
 * API Configuration
 */
export const API_CONFIG = {
    WEATHER_API_KEY: "7ad902a7acdf44d791675824251212",
    WEATHER_API_BASE_URL: "https://api.weatherapi.com/v1",
    DEFAULT_LOCATION: "My Farm Location",
    AUTOCOMPLETE_DEBOUNCE_MS: 300,
    FORECAST_DAYS: 4, // Request 4 days to get today + 3 forecast days
} as const;

/**
 * UV Index Thresholds
 */
export const UV_INDEX = {
    LOW_THRESHOLD: 2,
    MODERATE_THRESHOLD: 5,
    HIGH_THRESHOLD: 7,
} as const;

/**
 * UV Index Color Mapping
 */
export const UV_COLORS = {
    LOW: "text-[#3BA55D]",
    MODERATE: "text-[#F4C542]",
    HIGH: "text-[#FF8C42]",
    VERY_HIGH: "text-[#E74C3C]",
} as const;

/**
 * UV Index Label Mapping
 */
export const UV_LABELS = {
    LOW: "Low",
    MODERATE: "Moderate",
    HIGH: "High",
    VERY_HIGH: "Very High",
} as const;

/**
 * Spray Conditions Thresholds
 */
export const SPRAY_CONDITIONS = {
    MAX_WIND_SPEED: 15,
    MIN_WIND_SPEED: 5,
    MAX_TEMPERATURE: 30,
    MIN_HUMIDITY: 50,
    MAX_HUMIDITY: 70,
} as const;

/**
 * Spray Condition Color Mapping
 */
export const SPRAY_COLORS = {
    POOR: "text-[#E74C3C]",
    FAIR: "text-[#F4C542]",
    EXCELLENT: "text-[#3BA55D]",
} as const;

/**
 * Soil Moisture Thresholds
 */
export const SOIL_MOISTURE = {
    DRY_THRESHOLD: 40,
    WET_THRESHOLD: 80,
} as const;

/**
 * Soil Moisture Status Colors
 */
export const SOIL_COLORS = {
    DRY: {
        color: "text-[#E74C3C]",
        label: "Dry",
        bg: "bg-[#E74C3C]",
    },
    WET: {
        color: "text-[#4A90E2]",
        label: "Wet",
        bg: "bg-[#4A90E2]",
    },
    OPTIMAL: {
        color: "text-[#3BA55D]",
        label: "Optimal",
        bg: "bg-[#3BA55D]",
    },
} as const;

/**
 * Alert Severity Colors
 */
export const ALERT_COLORS = {
    HIGH: "border-l-[#E74C3C] bg-[#E74C3C]/5 text-[#E74C3C]",
    MEDIUM: "border-l-[#F4C542] bg-[#F4C542]/5 text-[#F4C542]",
    LOW: "border-l-[#3BA55D] bg-[#3BA55D]/5 text-[#3BA55D]",
} as const;

/**
 * Default Agricultural Alerts (when no weather data available)
 */
export const DEFAULT_AGRI_ALERTS: AgriAlert[] = [];
