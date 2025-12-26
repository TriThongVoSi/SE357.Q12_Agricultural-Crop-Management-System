package org.example.QuanLyMuaVu.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.QuanLyMuaVu.DTO.Response.*;
import org.example.QuanLyMuaVu.Entity.*;
import org.example.QuanLyMuaVu.Enums.IncidentStatus;
import org.example.QuanLyMuaVu.Enums.SeasonStatus;
import org.example.QuanLyMuaVu.Enums.TaskStatus;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Repository.*;
import org.example.QuanLyMuaVu.Util.CurrentUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Dashboard Service
 * Aggregates farmer-owned data for the dashboard overview.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DashboardService {

    private final CurrentUserService currentUserService;
    private final FarmerOwnershipService ownershipService;
    private final FarmRepository farmRepository;
    private final PlotRepository plotRepository;
    private final SeasonRepository seasonRepository;
    private final DashboardTaskViewRepository dashboardTaskViewRepository;
    private final TaskRepository taskRepository;
    private final ExpenseRepository expenseRepository;
    private final HarvestRepository harvestRepository;
    private final IncidentRepository incidentRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockMovementRepository stockMovementRepository;
    private final SupplyLotRepository supplyLotRepository;
    private final UserRepository userRepository;

    private static final int LOW_STOCK_THRESHOLD = 5;
    private static final List<TaskStatus> COMPLETED_STATUSES = List.of(TaskStatus.DONE, TaskStatus.CANCELLED);
    private static final List<IncidentStatus> OPEN_STATUSES = List.of(IncidentStatus.OPEN, IncidentStatus.IN_PROGRESS);

    /**
     * Get dashboard overview with all aggregated metrics.
     */
    public DashboardOverviewResponse getOverview(Integer seasonId) {
        Long ownerId = currentUserService.getCurrentUserId();
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Determine the season context
        Season season = resolveSeasonContext(seasonId, ownerId);

        // Build response
        return DashboardOverviewResponse.builder()
                .seasonContext(buildSeasonContext(season))
                .counts(buildCounts(ownerId))
                .kpis(buildKpis(season))
                .expenses(buildExpenses(season))
                .harvest(buildHarvest(season))
                .alerts(buildAlerts(ownerId))
                .build();
    }

    /**
     * Get today's tasks for dashboard table.
     */
    public Page<TodayTaskResponse> getTodayTasks(Integer seasonId, Pageable pageable) {
        Long ownerId = currentUserService.getCurrentUserId();
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LocalDate today = LocalDate.now();
        Page<DashboardTaskView> tasks = dashboardTaskViewRepository.findTodayTasks(user.getId(), seasonId, today, pageable);

        return tasks.map(this::mapToTodayTaskResponse);
    }

    /**
     * Get upcoming tasks within N days.
     */
    public List<TodayTaskResponse> getUpcomingTasks(int days, Integer seasonId) {
        Long ownerId = currentUserService.getCurrentUserId();
        User user = userRepository.findById(ownerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        LocalDate today = LocalDate.now();
        LocalDate untilDate = today.plusDays(days);

        List<DashboardTaskView> tasks = dashboardTaskViewRepository.findUpcomingTasks(
                user.getId(),
                seasonId,
                today,
                untilDate,
                COMPLETED_STATUSES);

        return tasks.stream()
                .map(this::mapToTodayTaskResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get plot status list for owner's plots.
     */
    public List<PlotStatusResponse> getPlotStatus(Integer seasonId) {
        Long ownerId = currentUserService.getCurrentUserId();

        List<Plot> plots = plotRepository.findAllByFarmOwnerId(ownerId);

        return plots.stream()
                .map(this::mapToPlotStatusResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get low stock alerts.
     */
    public List<LowStockAlertResponse> getLowStock(int limit) {
        Long ownerId = currentUserService.getCurrentUserId();

        // Get all warehouses belonging to user's farms
        List<Farm> farms = ownershipService.getOwnedFarms();
        if (farms.isEmpty()) {
            return List.of();
        }

        List<LowStockAlertResponse> lowStockItems = new ArrayList<>();

        for (Farm farm : farms) {
            List<Warehouse> warehouses = warehouseRepository.findAllByFarm(farm);
            for (Warehouse warehouse : warehouses) {
                // Find all supply lots with movements at this warehouse
                List<Integer> lotIds = stockMovementRepository.findDistinctSupplyLotIdsByWarehouse(warehouse, null);
                for (Integer lotId : lotIds) {
                    SupplyLot lot = supplyLotRepository.findById(lotId).orElse(null);
                    if (lot == null)
                        continue;

                    BigDecimal onHand = stockMovementRepository.calculateOnHandQuantity(lot, warehouse, null);
                    if (onHand != null && onHand.compareTo(BigDecimal.valueOf(LOW_STOCK_THRESHOLD)) <= 0) {
                        lowStockItems.add(LowStockAlertResponse.builder()
                                .supplyLotId(lot.getId())
                                .batchCode(lot.getBatchCode())
                                .itemName(lot.getSupplyItem() != null ? lot.getSupplyItem().getName() : "Unknown")
                                .warehouseName(warehouse.getName())
                                .locationLabel("") // Location label computed if needed
                                .onHand(onHand)
                                .unit(lot.getSupplyItem() != null ? lot.getSupplyItem().getUnit() : "unit")
                                .build());
                    }

                    if (lowStockItems.size() >= limit)
                        break;
                }
                if (lowStockItems.size() >= limit)
                    break;
            }
            if (lowStockItems.size() >= limit)
                break;
        }

        return lowStockItems;
    }

    // =========================================================================
    // PRIVATE HELPERS
    // =========================================================================

    private Season resolveSeasonContext(Integer seasonId, Long ownerId) {
        if (seasonId != null) {
            // Verify ownership
            return ownershipService.requireOwnedSeason(seasonId);
        }

        // Default: find most recent ACTIVE season, or latest by start_date
        List<Season> activeSeasons = seasonRepository.findActiveSeasonsByOwnerIdOrderByStartDateDesc(ownerId);
        if (!activeSeasons.isEmpty()) {
            return activeSeasons.get(0);
        }

        // Fallback: latest season
        List<Season> allSeasons = seasonRepository.findAllByFarmOwnerId(ownerId);
        if (!allSeasons.isEmpty()) {
            return allSeasons.stream()
                    .max(Comparator.comparing(Season::getStartDate))
                    .orElse(null);
        }

        return null;
    }

    private DashboardOverviewResponse.SeasonContext buildSeasonContext(Season season) {
        if (season == null) {
            return null;
        }
        return DashboardOverviewResponse.SeasonContext.builder()
                .seasonId(season.getId())
                .seasonName(season.getSeasonName())
                .startDate(season.getStartDate())
                .endDate(season.getEndDate())
                .plannedHarvestDate(season.getPlannedHarvestDate())
                .build();
    }

    private DashboardOverviewResponse.Counts buildCounts(Long ownerId) {
        long activeFarms = farmRepository.countByOwnerIdAndActiveTrue(ownerId);
        long activePlots = plotRepository.countByFarmOwnerId(ownerId);

        Map<String, Integer> seasonsByStatus = new LinkedHashMap<>();
        for (SeasonStatus status : SeasonStatus.values()) {
            long count = seasonRepository.countByStatusAndFarmOwnerId(status, ownerId);
            seasonsByStatus.put(status.name(), (int) count);
        }

        return DashboardOverviewResponse.Counts.builder()
                .activeFarms((int) activeFarms)
                .activePlots((int) activePlots)
                .seasonsByStatus(seasonsByStatus)
                .build();
    }

    private DashboardOverviewResponse.Kpis buildKpis(Season season) {
        if (season == null) {
            return DashboardOverviewResponse.Kpis.builder().build();
        }

        Integer seasonId = season.getId();

        // Cost per hectare
        BigDecimal costPerHectare = null;
        BigDecimal totalExpense = expenseRepository.sumTotalCostBySeasonId(seasonId);
        Plot plot = season.getPlot();
        if (plot != null && plot.getArea() != null && plot.getArea().compareTo(BigDecimal.ZERO) > 0) {
            costPerHectare = totalExpense.divide(plot.getArea(), 2, RoundingMode.HALF_UP);
        }

        // On-time percentage
        BigDecimal onTimePercent = null;
        long totalCompleted = taskRepository.countCompletedBySeasonId(seasonId);
        if (totalCompleted > 0) {
            long onTime = taskRepository.countCompletedOnTimeBySeasonId(seasonId);
            onTimePercent = BigDecimal.valueOf(onTime)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(BigDecimal.valueOf(totalCompleted), 1, RoundingMode.HALF_UP);
        }

        // Avg yield: actual_yield_kg / plot_area (returns null if not available)
        BigDecimal avgYieldTonsPerHa = null;
        if (season.getActualYieldKg() != null && plot != null && plot.getArea() != null
                && plot.getArea().compareTo(BigDecimal.ZERO) > 0) {
            avgYieldTonsPerHa = season.getActualYieldKg()
                    .divide(BigDecimal.valueOf(1000), 4, RoundingMode.HALF_UP) // kg to tons
                    .divide(plot.getArea(), 2, RoundingMode.HALF_UP);
        }

        return DashboardOverviewResponse.Kpis.builder()
                .avgYieldTonsPerHa(avgYieldTonsPerHa)
                .costPerHectare(costPerHectare)
                .onTimePercent(onTimePercent)
                .build();
    }

    private DashboardOverviewResponse.Expenses buildExpenses(Season season) {
        BigDecimal totalExpense = BigDecimal.ZERO;
        if (season != null) {
            totalExpense = expenseRepository.sumTotalCostBySeasonId(season.getId());
        }
        return DashboardOverviewResponse.Expenses.builder()
                .totalExpense(totalExpense)
                .build();
    }

    private DashboardOverviewResponse.Harvest buildHarvest(Season season) {
        if (season == null) {
            return DashboardOverviewResponse.Harvest.builder()
                    .totalQuantityKg(BigDecimal.ZERO)
                    .totalRevenue(BigDecimal.ZERO)
                    .build();
        }

        Integer seasonId = season.getId();
        BigDecimal totalQty = harvestRepository.sumQuantityBySeasonId(seasonId);
        BigDecimal totalRevenue = harvestRepository.sumRevenueBySeasonId(seasonId);
        BigDecimal expectedYieldKg = season.getExpectedYieldKg();

        BigDecimal yieldVsPlanPercent = null;
        if (expectedYieldKg != null && expectedYieldKg.compareTo(BigDecimal.ZERO) > 0) {
            yieldVsPlanPercent = totalQty.subtract(expectedYieldKg)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(expectedYieldKg, 1, RoundingMode.HALF_UP);
        }

        return DashboardOverviewResponse.Harvest.builder()
                .totalQuantityKg(totalQty)
                .totalRevenue(totalRevenue)
                .expectedYieldKg(expectedYieldKg)
                .yieldVsPlanPercent(yieldVsPlanPercent)
                .build();
    }

    private DashboardOverviewResponse.Alerts buildAlerts(Long ownerId) {
        // Open incidents
        long openIncidents = incidentRepository.countByFarmOwnerIdAndStatusIn(ownerId, OPEN_STATUSES);

        // Expiring lots (within 30 days) - simplified for MVP
        int expiringLots = 0;
        LocalDate expiryThreshold = LocalDate.now().plusDays(30);
        List<Farm> farms = ownershipService.getOwnedFarms();
        for (Farm farm : farms) {
            List<Warehouse> warehouses = warehouseRepository.findAllByFarm(farm);
            for (Warehouse warehouse : warehouses) {
                List<Integer> lotIds = stockMovementRepository.findDistinctSupplyLotIdsByWarehouse(warehouse, null);
                for (Integer lotId : lotIds) {
                    SupplyLot lot = supplyLotRepository.findById(lotId).orElse(null);
                    if (lot != null && lot.getExpiryDate() != null
                            && !lot.getExpiryDate().isAfter(expiryThreshold)) {
                        expiringLots++;
                    }
                }
            }
        }

        // Low stock count
        int lowStockCount = getLowStock(100).size(); // Count all, but cap at 100

        return DashboardOverviewResponse.Alerts.builder()
                .openIncidents((int) openIncidents)
                .expiringLots(expiringLots)
                .lowStockItems(lowStockCount)
                .build();
    }

    private TodayTaskResponse mapToTodayTaskResponse(DashboardTaskView task) {
        String plotName = task.getPlotName() != null ? task.getPlotName() : "";
        String type = inferTaskType(task.getTitle(), task.getDescription());
        LocalDate dueDate = task.getDueDate() != null ? task.getDueDate() : task.getPlannedDate();
        return TodayTaskResponse.builder()
                .taskId(task.getTaskId())
                .title(task.getTitle())
                .plotName(plotName)
                .type(type)
                .assigneeName(task.getAssigneeName() != null ? task.getAssigneeName() : "")
                .dueDate(dueDate)
                .status(task.getStatus() != null ? task.getStatus().name() : "")
                .build();
    }

    private String inferTaskType(String title, String description) {
        String text = String.format("%s %s", title != null ? title : "", description != null ? description : "")
                .toLowerCase();
        if (text.contains("irrigat") || text.contains("water")) return "irrigation";
        if (text.contains("fertil") || text.contains("npk")) return "fertilizing";
        if (text.contains("spray") || text.contains("pest") || text.contains("insect")) return "spraying";
        if (text.contains("harvest") || text.contains("collect")) return "harvesting";
        if (text.contains("inspect") || text.contains("scout")) return "scouting";
        return "scouting";
    }

    private PlotStatusResponse mapToPlotStatusResponse(Plot plot) {
        // Determine crop name from latest active season
        String cropName = "N/A";
        String stage = "N/A";
        String health = "HEALTHY"; // Default

        List<Season> seasons = seasonRepository.findAllByPlot_Id(plot.getId());
        if (!seasons.isEmpty()) {
            Season latestSeason = seasons.stream()
                    .max(Comparator.comparing(Season::getStartDate))
                    .orElse(null);
            if (latestSeason != null) {
                if (latestSeason.getCrop() != null) {
                    cropName = latestSeason.getCrop().getCropName();
                }
                stage = latestSeason.getStatus() != null ? latestSeason.getStatus().name() : "N/A";

                // Simple health logic: check for open incidents
                List<Incident> incidents = incidentRepository.findAllBySeason(latestSeason);
                long openCount = incidents.stream()
                        .filter(i -> i.getStatus() == IncidentStatus.OPEN
                                || i.getStatus() == IncidentStatus.IN_PROGRESS)
                        .count();
                if (openCount > 2) {
                    health = "CRITICAL";
                } else if (openCount > 0) {
                    health = "WARNING";
                }
            }
        }

        return PlotStatusResponse.builder()
                .plotId(plot.getId())
                .plotName(plot.getPlotName())
                .areaHa(plot.getArea())
                .cropName(cropName)
                .stage(stage)
                .health(health)
                .build();
    }
}
