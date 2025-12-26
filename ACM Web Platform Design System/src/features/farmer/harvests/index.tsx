import { useHarvestManagement } from "./hooks/useHarvestManagement";
import { HarvestHeader } from "./components/HarvestHeader";
import { HarvestKPICards } from "./components/HarvestKPICards";
import { HarvestTable } from "./components/HarvestTable";
import { HarvestCharts } from "./components/HarvestCharts";
import { QuickActionsPanel } from "./components/QuickActionsPanel";
import { AddBatchDialog } from "./components/AddBatchDialog";
import { HarvestDetailsDrawer } from "./components/HarvestDetailsDrawer";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SEASON_OPTIONS } from "./constants";

export function HarvestManagement() {
    const {
        // State
        selectedSeason,
        setSelectedSeason,
        isAddBatchOpen,
        setIsAddBatchOpen,
        selectedBatch,
        isDetailsDrawerOpen,
        setIsDetailsDrawerOpen,
        batches,
        formData,
        setFormData,

        // Computed values
        filteredBatches,
        totalHarvested,
        lotsCount,
        avgGrade,
        avgMoisture,
        yieldVsPlan,
        dailyTrend,
        gradeDistribution,
        summaryStats,

        // Utilities
        getStatusBadge,
        getGradeBadge,

        // Handlers
        handleAddBatch,
        handleDeleteBatch,
        resetForm,
        handleViewDetails,
        handleQuickAction,
        handleExport,
        handlePrint,
    } = useHarvestManagement();

    const handleDrawerAction = (action: string, batch: typeof selectedBatch) => {
        if (!batch) return;

        if (action === "qr") {
            toast.success("Generating QR Code", {
                description: `QR for ${batch.batchId}`,
            });
        } else if (action === "handover") {
            toast.success("Printing Handover Note", {
                description: `For batch ${batch.batchId}`,
            });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-[1920px] mx-auto p-6">
                <HarvestHeader
                    onAddBatch={() => {
                        resetForm();
                        setIsAddBatchOpen(true);
                    }}
                />

                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                                <SelectTrigger className="w-full md:w-64">
                                    <SelectValue placeholder="All Seasons" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SEASON_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <HarvestKPICards
                    totalHarvested={totalHarvested}
                    lotsCount={lotsCount}
                    avgGrade={avgGrade}
                    avgMoisture={avgMoisture}
                    yieldVsPlan={yieldVsPlan}
                />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                    <div className="space-y-6">
                        <HarvestTable
                            batches={filteredBatches}
                            totalBatches={batches.length}
                            onViewDetails={handleViewDetails}
                            onDeleteBatch={handleDeleteBatch}
                            onExport={handleExport}
                            onPrint={handlePrint}
                            getStatusBadge={getStatusBadge}
                            getGradeBadge={getGradeBadge}
                        />

                        <HarvestCharts
                            dailyTrend={dailyTrend}
                            gradeDistribution={gradeDistribution}
                        />
                    </div>

                    <QuickActionsPanel
                        onQuickAction={handleQuickAction}
                        summaryStats={summaryStats}
                    />
                </div>
            </div>

            <AddBatchDialog
                open={isAddBatchOpen}
                onOpenChange={setIsAddBatchOpen}
                formData={formData}
                onFormChange={setFormData}
                onSubmit={handleAddBatch}
                onCancel={() => {
                    setIsAddBatchOpen(false);
                    resetForm();
                }}
            />

            <HarvestDetailsDrawer
                batch={selectedBatch}
                open={isDetailsDrawerOpen}
                onOpenChange={setIsDetailsDrawerOpen}
                onAction={handleDrawerAction}
                getStatusBadge={getStatusBadge}
                getGradeBadge={getGradeBadge}
            />
        </div>
    );
}
