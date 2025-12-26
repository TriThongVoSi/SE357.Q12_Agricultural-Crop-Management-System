import { ZoomIn, ZoomOut, Maximize, Layers, MapIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plot } from "../types";
import { getPolygonColor } from "../utils";

interface PlotMapViewProps {
  plots: Plot[];
  onViewDetails: (plot: Plot) => void;
  onGenerateQR: (plot: Plot) => void;
}

/**
 * PlotMapView Component
 *
 * Displays plots on a map visualization with controls and legend.
 */
export function PlotMapView({ plots, onViewDetails, onGenerateQR }: PlotMapViewProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <div className="relative h-[600px] bg-[#E5E3DF] rounded-lg overflow-hidden">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button variant="outline" size="icon" className="bg-white shadow-lg">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-white shadow-lg">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-white shadow-lg">
              <Maximize className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-white shadow-lg">
              <Layers className="w-4 h-4" />
            </Button>
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
            <h4 className="text-sm text-[#333333] mb-3">Plot Status</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3BA55D] rounded"></div>
                <span className="text-xs text-[#555555]">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#F4C542] rounded"></div>
                <span className="text-xs text-[#555555]">Dormant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4A90E2] rounded"></div>
                <span className="text-xs text-[#555555]">Planned</span>
              </div>
            </div>
          </div>

          {/* Mock Map - Visual Representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapIcon className="w-24 h-24 text-[#777777] mx-auto opacity-30" />
              <p className="text-[#777777]">Interactive Map View</p>
              <p className="text-sm text-[#999999] max-w-md">
                Click on plot polygons to view details. Map would show real-time
                plot boundaries with Mapbox or Leaflet integration.
              </p>
            </div>
          </div>

          {/* Plot Markers/Polygons Grid */}
          <div className="absolute inset-0 p-12">
            <div className="grid grid-cols-3 gap-8 h-full">
              {plots.slice(0, 6).map((plot) => (
                <div
                  key={plot.id}
                  className="relative cursor-pointer group"
                  onClick={() => onViewDetails(plot)}
                >
                  <div
                    className="w-full h-full rounded-lg border-4 opacity-50 group-hover:opacity-100 transition-all duration-200 group-hover:scale-105"
                    style={{
                      borderColor: getPolygonColor(plot.status),
                      backgroundColor: `${getPolygonColor(plot.status)}20`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm text-[#333333]">{plot.name}</p>
                        <p className="text-xs text-[#777777]">
                          {plot.area.toFixed(1)} ha
                        </p>
                        <p className="text-xs text-[#777777]">
                          {plot.crop || "No crop"}
                        </p>
                        <div className="mt-2 pt-2 border-t border-[#E0E0E0] flex gap-2">
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-[#3BA55D] hover:bg-[#3BA55D]/90 text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewDetails(plot);
                            }}
                          >
                            View Detail
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              onGenerateQR(plot);
                            }}
                          >
                            <QrCode className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

