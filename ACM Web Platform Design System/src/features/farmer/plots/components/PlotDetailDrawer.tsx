import {
  MapPin,
  Edit,
  GitMerge,
  QrCode,
  Trash2,
  AlertCircle,
  LayoutGrid,
  Droplets,
  TestTube,
  Activity,
  Download,
  Upload,
  FileText,
  Info,
  Sprout,
  Calendar,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlotStatusChip } from "./PlotStatusChip";
import { Plot, PlotStatus } from "../types";

interface PlotDetailDrawerProps {
  plot: Plot | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onMerge: () => void;
  onMarkDormant: (plot: Plot) => void;
  onGenerateQR: (plot: Plot) => void;
  onDelete: (plotId: string) => void;
}

/**
 * PlotDetailDrawer Component
 *
 * Side drawer displaying detailed plot information with tabs for different data sections.
 */
export function PlotDetailDrawer({
  plot,
  isOpen,
  onClose,
  onEdit,
  onMerge,
  onMarkDormant,
  onGenerateQR,
  onDelete,
}: PlotDetailDrawerProps) {
  if (!plot) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-[#333333]">
            <MapPin className="w-5 h-5 text-[#3BA55D]" />
            {plot.name}
          </SheetTitle>
          <SheetDescription>
            Plot ID: {plot.id} • {plot.area.toFixed(1)} hectares
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-[#F5F5F5]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="soil">Soil Data</TabsTrigger>
            <TabsTrigger value="seasons">Seasons</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-[#E0E0E0]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#3BA55D]/10 rounded-lg">
                      <LayoutGrid className="w-5 h-5 text-[#3BA55D]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#777777]">Area</p>
                      <p className="text-lg text-[#333333]">
                        {plot.area.toFixed(1)} ha
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E0E0E0]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#A57F55]/10 rounded-lg">
                      <Droplets className="w-5 h-5 text-[#A57F55]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#777777]">Soil Type</p>
                      <p className="text-lg text-[#333333]">{plot.soilType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E0E0E0]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                      <TestTube className="w-5 h-5 text-[#4A90E2]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#777777]">pH Level</p>
                      <p className="text-lg text-[#333333]">{plot.pH.toFixed(1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#E0E0E0]">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F4C542]/10 rounded-lg">
                      <Activity className="w-5 h-5 text-[#F4C542]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#777777]">Status</p>
                      <div className="mt-1"><PlotStatusChip status={plot.status} /></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-[#E0E0E0]">
              <CardHeader>
                <CardTitle className="text-base">Plot Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#777777]">Created Date</span>
                  <span className="text-sm text-[#333333]">
                    {new Date(plot.createdDate).toLocaleDateString()}
                  </span>
                </div>
                {plot.crop && (
                  <div className="flex justify-between">
                    <span className="text-sm text-[#777777]">Current Crop</span>
                    <span className="text-sm text-[#333333]">{plot.crop}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* QR Code Preview */}
            <Card className="border-[#E0E0E0]">
              <CardHeader>
                <CardTitle className="text-base">QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-24 h-24 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-[#333333]" />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateQR(plot)}
                    className="border-[#3BA55D] text-[#3BA55D]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download QR
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Soil Data Tab */}
          <TabsContent value="soil" className="space-y-4 mt-6">
            <Card className="border-[#E0E0E0]">
              <CardHeader>
                <CardTitle className="text-base">Soil Test Results</CardTitle>
                <CardDescription>
                  Last updated:{" "}
                  {plot.soilTestDate
                    ? new Date(plot.soilTestDate).toLocaleDateString()
                    : "No data"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-[#777777]">pH Level</Label>
                    <p className="text-2xl text-[#333333] mt-1">
                      {plot.pH.toFixed(1)}
                    </p>
                    <p className="text-xs text-[#3BA55D] mt-1">Optimal</p>
                  </div>
                  <div>
                    <Label className="text-xs text-[#777777]">
                      Organic Matter (%)
                    </Label>
                    <p className="text-2xl text-[#333333] mt-1">
                      {plot.organicMatter?.toFixed(1) || "N/A"}
                    </p>
                    <p className="text-xs text-[#3BA55D] mt-1">Good</p>
                  </div>
                  <div>
                    <Label className="text-xs text-[#777777]">
                      Electrical Conductivity
                    </Label>
                    <p className="text-2xl text-[#333333] mt-1">
                      {plot.electricalConductivity?.toFixed(1) || "N/A"}
                    </p>
                    <p className="text-xs text-[#777777] mt-1">dS/m</p>
                  </div>
                  <div>
                    <Label className="text-xs text-[#777777]">Soil Type</Label>
                    <p className="text-2xl text-[#333333] mt-1">{plot.soilType}</p>
                  </div>
                </div>

                <Separator className="bg-[#E0E0E0]" />

                <div className="space-y-2">
                  <Label className="text-sm text-[#333333]">
                    Upload Soil Test Report
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#3BA55D] text-[#3BA55D]"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload PDF/CSV
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E0E0E0] bg-[#4A90E2]/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#4A90E2] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#333333]">
                      Soil Analysis Recommendation
                    </p>
                    <p className="text-xs text-[#777777] mt-1">
                      Based on your soil data, consider applying organic matter to
                      improve soil structure. Schedule next soil test in 6 months.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Linked Seasons Tab */}
          <TabsContent value="seasons" className="space-y-4 mt-6">
            <Card className="border-[#E0E0E0]">
              <CardHeader>
                <CardTitle className="text-base">Linked Seasons</CardTitle>
                <CardDescription>
                  Growing seasons associated with this plot
                </CardDescription>
              </CardHeader>
              <CardContent>
                {plot.seasons && plot.seasons.length > 0 ? (
                  <div className="space-y-3">
                    {plot.seasons.map((season) => (
                      <div
                        key={season.id}
                        className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Sprout className="w-5 h-5 text-[#3BA55D]" />
                          <div>
                            <p className="text-sm text-[#333333]">{season.name}</p>
                            <p className="text-xs text-[#777777]">
                              {season.crop} • Started{" "}
                              {new Date(season.startDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            season.status === "Active"
                              ? "border-[#3BA55D] text-[#3BA55D]"
                              : "border-[#777777] text-[#777777]"
                          }
                        >
                          {season.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-[#777777] mx-auto mb-3 opacity-30" />
                    <p className="text-sm text-[#777777]">
                      No seasons linked to this plot
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 border-[#3BA55D] text-[#3BA55D]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Season
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-3 mt-6">
            <Button
              className="w-full justify-start bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
              onClick={() => {
                onClose();
                onEdit();
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Plot Details
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-[#3BA55D] text-[#3BA55D]"
              onClick={() => {
                onClose();
                onMerge();
              }}
            >
              <GitMerge className="w-4 h-4 mr-2" />
              Merge/Split Plot
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-[#F4C542] text-[#F4C542]"
              onClick={() => {
                onMarkDormant(plot);
                onClose();
              }}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Mark as Dormant
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onGenerateQR(plot)}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Generate & Print QR Code
            </Button>

            <Separator className="bg-[#E0E0E0] my-4" />

            <Button
              variant="outline"
              className="w-full justify-start border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => {
                onDelete(plot.id);
                onClose();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Plot
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

