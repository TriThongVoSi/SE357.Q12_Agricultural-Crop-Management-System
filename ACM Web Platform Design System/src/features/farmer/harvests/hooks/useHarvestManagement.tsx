import { useState, useMemo, useCallback } from "react";
import { Package, CheckCircle2, Clock, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useHarvestsBySeason, useCreateHarvest, useDeleteHarvest, type Harvest as ApiHarvest } from '@/entities/harvest';
import { useOptionalSeason } from '@/shared/contexts';
import type { HarvestBatch, HarvestFormData, HarvestGrade, HarvestStatus, ChartDataPoint, SummaryStats } from "../types";
import { DAILY_TREND_DATA, GRADE_DISTRIBUTION_COLORS, GRADE_POINTS_MAP, PLANNED_YIELD } from "../constants";

const INITIAL_FORM_DATA: HarvestFormData = { batchId: "", date: "", quantity: "", grade: "A", moisture: "", season: "", plot: "", crop: "", status: "stored", notes: "", purity: "", foreignMatter: "", brokenGrains: "" };

const transformApiToFeature = (h: ApiHarvest): HarvestBatch => ({
    id: String(h.id),
    batchId: `BATCH-${h.id}`,
    date: h.harvestDate,
    createdAt: h.createdAt ?? undefined,
    quantity: h.quantity,
    grade: 'A',
    moisture: 12.0,
    status: 'stored',
    season: 'Current',
    plot: 'Plot A',
    crop: 'Crop',
    notes: h.note ?? undefined,
});

export function useHarvestManagement() {
    const seasonContext = useOptionalSeason();
    const seasonId = seasonContext?.selectedSeasonId ?? 0;

    const { data: apiData, isLoading: apiLoading, error: apiError, refetch } = useHarvestsBySeason(seasonId, undefined, { enabled: seasonId > 0 });
    const createMutation = useCreateHarvest(seasonId, {
        onSuccess: () => { toast.success("Harvest Added"); setIsAddBatchOpen(false); resetForm(); },
        onError: (err) => toast.error("Failed", { description: err.message }),
    });
    const deleteMutation = useDeleteHarvest(seasonId, {
        onSuccess: () => toast.success("Batch Deleted"),
        onError: (err) => toast.error("Failed to delete", { description: err.message }),
    });

    const [selectedSeason, setSelectedSeason] = useState("all");
    const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState<HarvestBatch | null>(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<HarvestFormData>(INITIAL_FORM_DATA);

    // No mock fallback - return empty array when no API data
    const batches = useMemo(() => {
        return apiData?.items?.map(transformApiToFeature) ?? [];
    }, [apiData]);

    const isLoading = seasonId > 0 ? apiLoading : false;
    const error = seasonId > 0 ? apiError : null;

    const filteredBatches = useMemo(() => batches.filter(b => selectedSeason === "all" || b.season === selectedSeason), [batches, selectedSeason]);
    const totalHarvested = useMemo(() => filteredBatches.reduce((sum, b) => sum + b.quantity, 0), [filteredBatches]);
    const lotsCount = filteredBatches.length;
    const avgGrade = useMemo(() => {
        if (batches.length === 0) return "N/A";
        const avg = batches.reduce((sum, b) => sum + GRADE_POINTS_MAP[b.grade], 0) / batches.length;
        return avg >= 3.5 ? "Premium" : avg >= 2.5 ? "A" : avg >= 1.5 ? "B" : "C";
    }, [batches]);
    const avgMoisture = useMemo(() => lotsCount === 0 ? "0.0" : (filteredBatches.reduce((s, b) => s + b.moisture, 0) / lotsCount).toFixed(1), [filteredBatches, lotsCount]);
    const yieldVsPlan = useMemo(() => ((totalHarvested / PLANNED_YIELD) * 100).toFixed(1), [totalHarvested]);
    const dailyTrend: ChartDataPoint[] = DAILY_TREND_DATA;
    const gradeDistribution: ChartDataPoint[] = useMemo(() => [
        { name: "Premium", value: batches.filter(b => b.grade === "Premium").length, color: GRADE_DISTRIBUTION_COLORS["Premium"] },
        { name: "Grade A", value: batches.filter(b => b.grade === "A").length, color: GRADE_DISTRIBUTION_COLORS["Grade A"] },
        { name: "Grade B", value: batches.filter(b => b.grade === "B").length, color: GRADE_DISTRIBUTION_COLORS["Grade B"] },
        { name: "Grade C", value: batches.filter(b => b.grade === "C").length, color: GRADE_DISTRIBUTION_COLORS["Grade C"] },
    ].filter(i => i.value > 0), [batches]);
    const summaryStats: SummaryStats = useMemo(() => ({
        totalStored: batches.filter(b => b.status === "stored").reduce((s, b) => s + b.quantity, 0),
        totalSold: batches.filter(b => b.status === "sold").reduce((s, b) => s + b.quantity, 0),
        totalProcessing: batches.filter(b => b.status === "processing").reduce((s, b) => s + b.quantity, 0),
        premiumGradePercentage: batches.length > 0 ? (batches.filter(b => b.grade === "Premium").length / batches.length) * 100 : 0,
    }), [batches]);

    function getStatusBadge(status: HarvestStatus) {
        const badges: Record<HarvestStatus, JSX.Element> = {
            stored: <Badge className="bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20"><Package className="w-3 h-3 mr-1" />Stored</Badge>,
            sold: <Badge className="bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20"><CheckCircle2 className="w-3 h-3 mr-1" />Sold</Badge>,
            processing: <Badge className="bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20"><Clock className="w-3 h-3 mr-1" />Processing</Badge>,
        };
        return badges[status] ?? null;
    }
    function getGradeBadge(grade: HarvestGrade) {
        const c: Record<HarvestGrade, string> = { Premium: "bg-[#3BA55D]/10 text-[#3BA55D] border-[#3BA55D]/20", A: "bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20", B: "bg-[#F4C542]/10 text-[#333333] border-[#F4C542]/20", C: "bg-[#8B7355]/10 text-[#8B7355] border-[#8B7355]/20" };
        return <Badge className={c[grade]}><Award className="w-3 h-3 mr-1" />{grade}</Badge>;
    }

    const handleAddBatch = useCallback(() => {
        if (!formData.batchId || !formData.date || !formData.quantity || !formData.moisture) { toast.error("Missing Fields"); return; }
        if (seasonId > 0) {
            createMutation.mutate({ harvestDate: formData.date, quantity: parseFloat(formData.quantity), unit: 1, note: formData.notes });
        } else {
            toast.success("Harvest Added", { description: `${formData.batchId} - ${formData.quantity}kg` });
            setIsAddBatchOpen(false);
            resetForm();
        }
    }, [formData, seasonId, createMutation]);

    const handleDeleteBatch = useCallback((id: string) => {
        const numId = parseInt(id, 10);
        if (!isNaN(numId) && seasonId > 0) deleteMutation.mutate(numId);
        else toast.success("Batch Deleted");
    }, [seasonId, deleteMutation]);

    const resetForm = useCallback(() => setFormData(INITIAL_FORM_DATA), []);
    const handleViewDetails = useCallback((batch: HarvestBatch) => { setSelectedBatch(batch); setIsDetailsDrawerOpen(true); }, []);
    const handleQuickAction = useCallback((action: string) => {
        const msgs: Record<string, [string, string]> = { qr: ["Generating QR", "Ready shortly"], qc: ["Record QC", "Opening..."], sale: ["Link Sale", "Opening..."], handover: ["Printing", "Preparing..."], weight: ["Scale Reading", "Opening..."] };
        const m = msgs[action];
        if (m) toast.success(m[0], { description: m[1] });
    }, []);
    const handleExport = useCallback(() => toast.success("Exporting to CSV"), []);
    const handlePrint = useCallback(() => toast.success("Printing Summary"), []);

    return {
        seasonId, hasSeasonContext: !!seasonContext,
        selectedSeason, setSelectedSeason, isAddBatchOpen, setIsAddBatchOpen, selectedBatch, setSelectedBatch, isDetailsDrawerOpen, setIsDetailsDrawerOpen, batches, formData, setFormData,
        isLoading, error: error ?? null, refetch,
        filteredBatches, totalHarvested, lotsCount, avgGrade, avgMoisture, yieldVsPlan, dailyTrend, gradeDistribution, summaryStats,
        getStatusBadge, getGradeBadge,
        handleAddBatch, handleDeleteBatch, resetForm, handleViewDetails, handleQuickAction, handleExport, handlePrint,
        isCreating: createMutation.isPending, isDeleting: deleteMutation.isPending,
    };
}
