package org.example.QuanLyMuaVu.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.QuanLyMuaVu.DTO.Common.PageResponse;
import org.example.QuanLyMuaVu.DTO.Request.CancelSeasonRequest;
import org.example.QuanLyMuaVu.DTO.Request.CompleteSeasonRequest;
import org.example.QuanLyMuaVu.DTO.Request.CreateSeasonRequest;
import org.example.QuanLyMuaVu.DTO.Request.StartSeasonRequest;
import org.example.QuanLyMuaVu.DTO.Request.UpdateSeasonRequest;
import org.example.QuanLyMuaVu.DTO.Request.UpdateSeasonStatusRequest;
import org.example.QuanLyMuaVu.DTO.Response.SeasonDetailResponse;
import org.example.QuanLyMuaVu.DTO.Response.SeasonResponse;
import org.example.QuanLyMuaVu.Entity.Crop;
import org.example.QuanLyMuaVu.Entity.Plot;
import org.example.QuanLyMuaVu.Entity.Season;
import org.example.QuanLyMuaVu.Entity.User;
import org.example.QuanLyMuaVu.Entity.Variety;
import org.example.QuanLyMuaVu.Enums.SeasonStatus;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Mapper.SeasonMapper;
import org.example.QuanLyMuaVu.Repository.CropRepository;
import org.example.QuanLyMuaVu.Repository.ExpenseRepository;
import org.example.QuanLyMuaVu.Repository.FieldLogRepository;
import org.example.QuanLyMuaVu.Repository.HarvestRepository;
import org.example.QuanLyMuaVu.Repository.PlotRepository;

import org.example.QuanLyMuaVu.Repository.SeasonRepository;
import org.example.QuanLyMuaVu.Repository.TaskRepository;
import org.example.QuanLyMuaVu.Repository.UserRepository;
import org.example.QuanLyMuaVu.Repository.VarietyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class SeasonService {

    SeasonRepository seasonRepository;
    PlotRepository plotRepository;
    CropRepository cropRepository;
    VarietyRepository varietyRepository;
    UserRepository userRepository;
    HarvestRepository harvestRepository;
    ExpenseRepository expenseRepository;

    SeasonMapper seasonMapper;
    TaskRepository taskRepository;
    FieldLogRepository fieldLogRepository;
    FarmAccessService farmAccessService;

    /**
     * Legacy creation method kept for backward compatibility with existing
     * controllers.
     */
    public Season create(Integer plotId, Integer cropId, String seasonName, LocalDate startDate,
            Integer initialPlantCount) {
        CreateSeasonRequest request = CreateSeasonRequest.builder()
                .plotId(plotId)
                .cropId(cropId)
                .seasonName(seasonName)
                .startDate(startDate)
                .initialPlantCount(initialPlantCount)
                .build();
        SeasonDetailResponse created = createSeason(request);
        return seasonRepository.findById(created.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
    }

    /**
     * Legacy list method, returns all seasons (no filtering by user).
     */
    public List<Season> getAll() {
        return seasonRepository.findAll();
    }

    public Season getById(Integer id) {
        return seasonRepository.findById(id).orElse(null);
    }

    /**
     * Legacy update method kept for backward compatibility.
     */
    public Season update(Integer id, String seasonName, LocalDate startDate, Integer currentPlantCount) {
        UpdateSeasonRequest request = UpdateSeasonRequest.builder()
                .seasonName(seasonName)
                .startDate(startDate)
                .currentPlantCount(currentPlantCount)
                .build();
        SeasonDetailResponse updated = updateSeason(id, request);
        return seasonRepository.findById(updated.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
    }

    public void delete(Integer id) {
        deleteSeason(id);
    }

    /**
     * Get a minimal list of seasons for the current farmer (for dropdown
     * selectors).
     * Returns all accessible seasons with minimal fields.
     */
    @Transactional(readOnly = true)
    public List<org.example.QuanLyMuaVu.DTO.Response.MySeasonResponse> getMySeasons() {
        User currentUser = getCurrentUser();
        List<Integer> accessibleFarmIds = farmAccessService.getAccessibleFarmIdsForCurrentUser();

        java.util.Set<Season> allSeasons = new java.util.LinkedHashSet<>();

        if (!accessibleFarmIds.isEmpty()) {
            allSeasons.addAll(seasonRepository.findAllByPlot_Farm_IdIn(accessibleFarmIds));
        }
        allSeasons.addAll(seasonRepository.findAllByPlot_User(currentUser));

        return allSeasons.stream()
                .sorted((s1, s2) -> Integer.compare(
                        s2.getId() != null ? s2.getId() : 0,
                        s1.getId() != null ? s1.getId() : 0))
                .map(season -> org.example.QuanLyMuaVu.DTO.Response.MySeasonResponse.builder()
                        .seasonId(season.getId())
                        .seasonName(season.getSeasonName())
                        .startDate(season.getStartDate())
                        .endDate(season.getEndDate())
                        .plannedHarvestDate(season.getPlannedHarvestDate())
                        .status(season.getStatus() != null ? season.getStatus().name() : null)
                        .build())
                .toList();
    }

    // --- New Farmer workspace APIs ---

    public PageResponse<SeasonResponse> searchMySeasons(
            Integer plotId,
            Integer cropId,
            String status,
            LocalDate from,
            LocalDate to,
            int page,
            int size) {
        User currentUser = getCurrentUser();

        List<Integer> accessibleFarmIds = farmAccessService.getAccessibleFarmIdsForCurrentUser();
        List<Season> all = new ArrayList<>();

        if (!accessibleFarmIds.isEmpty()) {
            all.addAll(seasonRepository.findAllByPlot_Farm_IdIn(accessibleFarmIds));
        }
        all.addAll(seasonRepository.findAllByPlot_User(currentUser));

        // de-duplicate by season id while preserving order (latest first later)
        Map<Integer, Season> byId = new LinkedHashMap<>();
        for (Season season : all) {
            if (season.getId() != null) {
                byId.putIfAbsent(season.getId(), season);
            }
        }
        all = new ArrayList<>(byId.values());

        SeasonStatus statusFilter = null;
        if (status != null && !status.isBlank()) {
            try {
                statusFilter = SeasonStatus.fromCode(status);
            } catch (IllegalArgumentException ex) {
                throw new AppException(ErrorCode.BAD_REQUEST);
            }
        }

        final Integer plotIdFilter = plotId;
        final Integer cropIdFilter = cropId;
        final SeasonStatus statusFilterFinal = statusFilter;
        final LocalDate fromDate = from;
        final LocalDate toDate = to;

        List<SeasonResponse> filtered = all.stream()
                .filter(season -> plotIdFilter == null
                        || (season.getPlot() != null && plotIdFilter.equals(season.getPlot().getId())))
                .filter(season -> cropIdFilter == null
                        || (season.getCrop() != null && cropIdFilter.equals(season.getCrop().getId())))
                .filter(season -> statusFilterFinal == null || statusFilterFinal.equals(season.getStatus()))
                .filter(season -> {
                    if (fromDate == null && toDate == null) {
                        return true;
                    }
                    LocalDate sStart = season.getStartDate();
                    LocalDate sEnd = season.getEndDate();
                    if (sEnd == null) {
                        sEnd = sStart;
                    }
                    LocalDate rangeStart = fromDate != null ? fromDate : sStart;
                    LocalDate rangeEnd = toDate != null ? toDate : sEnd;
                    return !sEnd.isBefore(rangeStart) && !sStart.isAfter(rangeEnd);
                })
                .sorted((s1, s2) -> Integer.compare(
                        s2.getId() != null ? s2.getId() : 0,
                        s1.getId() != null ? s1.getId() : 0))
                .map(seasonMapper::toResponse)
                .toList();

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, filtered.size());
        List<SeasonResponse> pageItems = fromIndex >= filtered.size() ? List.of()
                : filtered.subList(fromIndex, toIndex);
        Page<SeasonResponse> pageData = new PageImpl<>(pageItems, pageable, filtered.size());

        return PageResponse.of(pageData, pageItems);
    }

    public SeasonDetailResponse createSeason(CreateSeasonRequest request) {
        Plot plot = plotRepository.findById(request.getPlotId())
                .orElseThrow(() -> new AppException(ErrorCode.PLOT_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessPlot(plot);

        Crop crop = cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new AppException(ErrorCode.CROP_NOT_FOUND));

        Variety variety = null;
        if (request.getVarietyId() != null) {
            variety = varietyRepository.findById(request.getVarietyId())
                    .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
            if (!variety.getCrop().getId().equals(crop.getId())) {
                throw new AppException(ErrorCode.BAD_REQUEST);
            }
        }

        LocalDate start = request.getStartDate();
        LocalDate end = request.getEndDate();

        if (start == null) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }
        if (request.getPlannedHarvestDate() != null && request.getPlannedHarvestDate().isBefore(start)) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }
        if (end != null && end.isBefore(start)) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }

        validateNoOverlappingActiveOrPlannedSeasons(plot, start, request.getPlannedHarvestDate(), end, null);

        Season season = Season.builder()
                .plot(plot)
                .crop(crop)
                .variety(variety)
                .seasonName(request.getSeasonName())
                .startDate(start)
                .plannedHarvestDate(request.getPlannedHarvestDate())
                .endDate(end)
                .status(SeasonStatus.PLANNED)
                .initialPlantCount(request.getInitialPlantCount())
                .currentPlantCount(request.getInitialPlantCount())
                .expectedYieldKg(request.getExpectedYieldKg())
                .notes(request.getNotes())
                .build();

        Season saved = seasonRepository.save(season);
        return seasonMapper.toDetailResponse(saved);
    }

    public SeasonDetailResponse getSeasonForCurrentFarmer(Integer id) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);
        return seasonMapper.toDetailResponse(season);
    }

    public SeasonDetailResponse updateSeason(Integer id, UpdateSeasonRequest request) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        if (season.getStatus() == SeasonStatus.COMPLETED
                || season.getStatus() == SeasonStatus.CANCELLED
                || season.getStatus() == SeasonStatus.ARCHIVED) {
            // Closed seasons are read-only
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        LocalDate start = request.getStartDate();
        LocalDate end = request.getEndDate();

        if (start == null) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }
        if (request.getPlannedHarvestDate() != null && request.getPlannedHarvestDate().isBefore(start)) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }
        if (end != null && end.isBefore(start)) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }

        validateNoOverlappingActiveOrPlannedSeasons(
                season.getPlot(),
                start,
                request.getPlannedHarvestDate(),
                end,
                id);

        season.setSeasonName(request.getSeasonName());
        season.setStartDate(start);
        season.setPlannedHarvestDate(request.getPlannedHarvestDate());
        season.setEndDate(end);
        season.setCurrentPlantCount(request.getCurrentPlantCount());
        season.setExpectedYieldKg(request.getExpectedYieldKg());
        season.setActualYieldKg(request.getActualYieldKg());
        season.setNotes(request.getNotes());

        if (request.getVarietyId() != null) {
            Variety variety = varietyRepository.findById(request.getVarietyId())
                    .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
            if (!variety.getCrop().getId().equals(season.getCrop().getId())) {
                throw new AppException(ErrorCode.BAD_REQUEST);
            }
            season.setVariety(variety);
        }

        Season saved = seasonRepository.save(season);
        return seasonMapper.toDetailResponse(saved);
    }

    public SeasonResponse updateSeasonStatus(Integer id, UpdateSeasonStatusRequest request) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        SeasonStatus targetStatus;
        try {
            targetStatus = SeasonStatus.fromCode(request.getStatus());
        } catch (IllegalArgumentException ex) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        SeasonStatus currentStatus = season.getStatus();
        if (!isValidStatusTransition(currentStatus, targetStatus)) {
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        if (targetStatus == SeasonStatus.ACTIVE && request.getActualStartDate() != null) {
            season.setStartDate(request.getActualStartDate());
        }
        if ((targetStatus == SeasonStatus.COMPLETED || targetStatus == SeasonStatus.CANCELLED
                || targetStatus == SeasonStatus.ARCHIVED)
                && request.getActualEndDate() != null) {
            LocalDate end = request.getActualEndDate();
            if (end.isBefore(season.getStartDate())) {
                throw new AppException(ErrorCode.INVALID_SEASON_DATES);
            }
            season.setEndDate(end);
        }

        season.setStatus(targetStatus);

        // When closing a season, sync actual yield from its harvest batches
        if (targetStatus == SeasonStatus.COMPLETED || targetStatus == SeasonStatus.ARCHIVED) {
            var harvests = harvestRepository.findAllBySeason_Id(season.getId());
            if (harvests != null && !harvests.isEmpty()) {
                season.setActualYieldKg(
                        harvests.stream()
                                .map(h -> h.getQuantity() != null ? h.getQuantity() : java.math.BigDecimal.ZERO)
                                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add));
            }
        }

        Season saved = seasonRepository.save(season);
        return seasonMapper.toResponse(saved);
    }

    public void deleteSeason(Integer id) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        if (season.getStatus() != SeasonStatus.PLANNED) {
            throw new AppException(ErrorCode.SEASON_HAS_CHILD_RECORDS);
        }

        boolean hasTasks = taskRepository.existsBySeason_Id(id);
        boolean hasFieldLogs = fieldLogRepository.existsBySeason_Id(id);
        boolean hasHarvests = harvestRepository.existsBySeason_Id(id);
        boolean hasExpenses = expenseRepository.existsBySeason_Id(id);

        if (hasTasks || hasFieldLogs || hasHarvests || hasExpenses) {
            throw new AppException(ErrorCode.SEASON_HAS_CHILD_RECORDS);
        }

        seasonRepository.delete(season);
    }

    private boolean isValidStatusTransition(SeasonStatus currentStatus, SeasonStatus targetStatus) {
        if (currentStatus == null) {
            return targetStatus == SeasonStatus.PLANNED;
        }

        if (currentStatus == targetStatus) {
            return true;
        }

        return switch (currentStatus) {
            case PLANNED -> EnumSet.of(SeasonStatus.ACTIVE, SeasonStatus.CANCELLED).contains(targetStatus);
            case ACTIVE -> EnumSet.of(SeasonStatus.COMPLETED, SeasonStatus.CANCELLED, SeasonStatus.ARCHIVED)
                    .contains(targetStatus);
            case COMPLETED, CANCELLED -> targetStatus == SeasonStatus.ARCHIVED;
            case ARCHIVED -> false;
        };
    }

    /**
     * Start a season: PLANNED → ACTIVE.
     * Validates that farm and plot are active before starting.
     */
    public SeasonResponse startSeason(Integer id, StartSeasonRequest request) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        if (season.getStatus() != SeasonStatus.PLANNED) {
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        // Validate farm and plot are active
        if (season.getPlot() == null || season.getPlot().getFarm() == null) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        if (season.getPlot().getFarm().getActive() == null || !season.getPlot().getFarm().getActive()) {
            throw new AppException(ErrorCode.FARM_INACTIVE);
        }

        // If actualStartDate provided, update startDate
        if (request != null && request.getActualStartDate() != null) {
            season.setStartDate(request.getActualStartDate());
        }

        season.setStatus(SeasonStatus.ACTIVE);
        Season saved = seasonRepository.save(season);
        return seasonMapper.toResponse(saved);
    }

    /**
     * Complete a season: ACTIVE → COMPLETED.
     * Checks for pending tasks and warns if forceComplete is not set.
     * Auto-calculates actual yield from harvests if not provided.
     */
    public SeasonResponse completeSeason(Integer id, CompleteSeasonRequest request) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        if (season.getStatus() != SeasonStatus.ACTIVE) {
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        // Validate end date
        LocalDate endDate = request.getEndDate();
        if (endDate.isBefore(season.getStartDate())) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }

        // Check for pending/in-progress tasks
        long pendingOrInProgressTasks = taskRepository.countBySeason_IdAndStatusIn(
                season.getId(),
                List.of(org.example.QuanLyMuaVu.Enums.TaskStatus.PENDING,
                        org.example.QuanLyMuaVu.Enums.TaskStatus.IN_PROGRESS));

        if (pendingOrInProgressTasks > 0 && !Boolean.TRUE.equals(request.getForceComplete())) {
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        // Set end date
        season.setEndDate(endDate);

        // Calculate actual yield
        if (request.getActualYieldKg() != null) {
            season.setActualYieldKg(request.getActualYieldKg());
        } else {
            // Auto-calculate from harvests
            var harvests = harvestRepository.findAllBySeason_Id(season.getId());
            if (harvests != null && !harvests.isEmpty()) {
                season.setActualYieldKg(
                        harvests.stream()
                                .map(h -> h.getQuantity() != null ? h.getQuantity() : java.math.BigDecimal.ZERO)
                                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add));
            }
        }

        season.setStatus(SeasonStatus.COMPLETED);
        Season saved = seasonRepository.save(season);
        return seasonMapper.toResponse(saved);
    }

    /**
     * Cancel a season: → CANCELLED.
     * Validates no harvests exist unless forceCancel is true.
     */
    public SeasonResponse cancelSeason(Integer id, CancelSeasonRequest request) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);

        if (season.getStatus() == SeasonStatus.COMPLETED || season.getStatus() == SeasonStatus.ARCHIVED) {
            throw new AppException(ErrorCode.INVALID_SEASON_STATUS_TRANSITION);
        }

        // Check for harvests
        boolean hasHarvests = harvestRepository.existsBySeason_Id(id);
        if (hasHarvests && !Boolean.TRUE.equals(request.getForceCancel())) {
            throw new AppException(ErrorCode.SEASON_HAS_CHILD_RECORDS);
        }

        season.setStatus(SeasonStatus.CANCELLED);
        if (season.getEndDate() == null) {
            season.setEndDate(LocalDate.now());
        }

        Season saved = seasonRepository.save(season);
        return seasonMapper.toResponse(saved);
    }

    private User getCurrentUser() {
        return farmAccessService.getCurrentUser();
    }

    private void validateNoOverlappingActiveOrPlannedSeasons(
            Plot plot,
            LocalDate start,
            LocalDate plannedHarvestDate,
            LocalDate end,
            Integer excludeSeasonId) {
        if (plot == null || start == null) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }

        LocalDate newStart = start;
        LocalDate newEnd = end != null ? end : plannedHarvestDate;

        List<Season> existing = seasonRepository.findAllByPlot_Id(plot.getId());
        for (Season other : existing) {
            if (excludeSeasonId != null && excludeSeasonId.equals(other.getId())) {
                continue;
            }
            SeasonStatus status = other.getStatus();
            if (status == null
                    || (status != SeasonStatus.PLANNED && status != SeasonStatus.ACTIVE)) {
                continue;
            }

            LocalDate otherStart = other.getStartDate();
            LocalDate otherEnd = other.getEndDate() != null
                    ? other.getEndDate()
                    : other.getPlannedHarvestDate();

            if (otherStart == null && otherEnd == null) {
                // Conservatively treat undefined ranges as overlapping
                throw new AppException(ErrorCode.SEASON_OVERLAP);
            }

            if (rangesOverlap(newStart, newEnd, otherStart, otherEnd)) {
                throw new AppException(ErrorCode.SEASON_OVERLAP);
            }
        }
    }

    private boolean rangesOverlap(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        LocalDate s1 = start1;
        LocalDate e1 = end1;
        LocalDate s2 = start2;
        LocalDate e2 = end2;

        if (s1 == null || s2 == null) {
            return true;
        }

        if (e1 != null && e2 != null) {
            return !e1.isBefore(s2) && !e2.isBefore(s1);
        }
        if (e1 == null && e2 != null) {
            return !e2.isBefore(s1);
        }
        if (e1 != null) { // e2 == null
            return !e1.isBefore(s2);
        }
        // both open-ended
        return true;
    }
}
