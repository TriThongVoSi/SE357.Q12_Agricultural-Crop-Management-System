import { MapPin, List, Plus, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewMode } from "../types";

interface PlotHeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onAddPlot: () => void;
}

/**
 * PlotHeader Component
 *
 * Displays the header section with title, description, view toggle, and add plot button.
 */
export function PlotHeader({ viewMode, setViewMode, onAddPlot }: PlotHeaderProps) {
  return (
    <Card className="border border-gray-200 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="text-3xl text-[#333333] flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#3BA55D]" />
              My Plots
            </CardTitle>
            <CardDescription className="mt-2">
              Manage your agricultural plots and land parcels
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="inline-flex rounded-lg bg-[#F5F5F5] p-1">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-[#3BA55D]"
                    : "hover:bg-white/50"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={`${
                  viewMode === "map"
                    ? "bg-white shadow-sm text-[#3BA55D]"
                    : "hover:bg-white/50"
                }`}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Map
              </Button>
            </div>

            <Button
              onClick={onAddPlot}
              className="bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Plot
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

