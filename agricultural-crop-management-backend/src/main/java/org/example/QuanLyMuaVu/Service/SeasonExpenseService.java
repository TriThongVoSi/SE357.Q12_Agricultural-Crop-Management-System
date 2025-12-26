package org.example.QuanLyMuaVu.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.QuanLyMuaVu.DTO.Common.PageResponse;
import org.example.QuanLyMuaVu.DTO.Request.CreateExpenseRequest;
import org.example.QuanLyMuaVu.DTO.Request.UpdateExpenseRequest;
import org.example.QuanLyMuaVu.DTO.Response.ExpenseResponse;
import org.example.QuanLyMuaVu.Entity.Expense;
import org.example.QuanLyMuaVu.Entity.Season;
import org.example.QuanLyMuaVu.Entity.User;
import org.example.QuanLyMuaVu.Enums.SeasonStatus;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Repository.ExpenseRepository;
import org.example.QuanLyMuaVu.Repository.SeasonRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class SeasonExpenseService {

    ExpenseRepository expenseRepository;
    SeasonRepository seasonRepository;
    FarmAccessService farmAccessService;

    public PageResponse<ExpenseResponse> listExpensesForSeason(
            Integer seasonId,
            LocalDate from,
            LocalDate to,
            BigDecimal minAmount,
            BigDecimal maxAmount,
            int page,
            int size) {
        Season season = getSeasonForCurrentFarmer(seasonId);

        List<Expense> all = expenseRepository.findAllBySeason_Id(season.getId());

        List<ExpenseResponse> items = all.stream()
                .filter(expense -> {
                    if (from == null && to == null) {
                        return true;
                    }
                    LocalDate date = expense.getExpenseDate();
                    boolean afterFrom = from == null || !date.isBefore(from);
                    boolean beforeTo = to == null || !date.isAfter(to);
                    return afterFrom && beforeTo;
                })
                .filter(expense -> {
                    BigDecimal total = expense.getTotalCost();
                    if (total == null) {
                        total = expense.getUnitPrice()
                                .multiply(BigDecimal.valueOf(expense.getQuantity()));
                    }
                    boolean aboveMin = minAmount == null || total.compareTo(minAmount) >= 0;
                    boolean belowMax = maxAmount == null || total.compareTo(maxAmount) <= 0;
                    return aboveMin && belowMax;
                })
                .sorted((e1, e2) -> Integer.compare(
                        e2.getId() != null ? e2.getId() : 0,
                        e1.getId() != null ? e1.getId() : 0))
                .map(this::toResponse)
                .toList();

        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, items.size());
        List<ExpenseResponse> pageItems = fromIndex >= items.size() ? List.of() : items.subList(fromIndex, toIndex);

        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<ExpenseResponse> pageData = new PageImpl<>(pageItems, pageable, items.size());

        return PageResponse.of(pageData, pageItems);
    }

    /**
     * List all expenses for the current farmer across all seasons.
     * Supports optional filtering by seasonId, search query, and date range.
     */
    public PageResponse<ExpenseResponse> listAllFarmerExpenses(
            Integer seasonId,
            String q,
            LocalDate from,
            LocalDate to,
            int page,
            int size) {

        User currentUser = getCurrentUser();
        Long userId = currentUser.getId();

        // Fetch expenses based on filters
        List<Expense> all;
        if (seasonId != null) {
            // Verify farmer has access to this season
            Season season = getSeasonForCurrentFarmer(seasonId);
            all = expenseRepository.findAllBySeason_Id(season.getId());
        } else if (q != null && !q.trim().isEmpty()) {
            all = expenseRepository.findAllByUser_IdAndItemNameContainingIgnoreCaseOrderByExpenseDateDesc(userId,
                    q.trim());
        } else {
            all = expenseRepository.findAllByUser_IdOrderByExpenseDateDesc(userId);
        }

        // Apply date filters
        List<ExpenseResponse> items = all.stream()
                .filter(expense -> {
                    if (from == null && to == null) {
                        return true;
                    }
                    LocalDate date = expense.getExpenseDate();
                    boolean afterFrom = from == null || !date.isBefore(from);
                    boolean beforeTo = to == null || !date.isAfter(to);
                    return afterFrom && beforeTo;
                })
                // Apply search filter if seasonId was used (q not applied via repo)
                .filter(expense -> {
                    if (seasonId == null || q == null || q.trim().isEmpty()) {
                        return true;
                    }
                    return expense.getItemName().toLowerCase().contains(q.toLowerCase().trim());
                })
                .sorted((e1, e2) -> {
                    // Sort by expenseDate desc, then by id desc
                    int dateCompare = e2.getExpenseDate().compareTo(e1.getExpenseDate());
                    if (dateCompare != 0)
                        return dateCompare;
                    return Integer.compare(
                            e2.getId() != null ? e2.getId() : 0,
                            e1.getId() != null ? e1.getId() : 0);
                })
                .map(this::toResponse)
                .toList();

        // Paginate
        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, items.size());
        List<ExpenseResponse> pageItems = fromIndex >= items.size() ? List.of() : items.subList(fromIndex, toIndex);

        Pageable pageable = PageRequest.of(page, size, Sort.by("expenseDate").descending());
        Page<ExpenseResponse> pageData = new PageImpl<>(pageItems, pageable, items.size());

        return PageResponse.of(pageData, pageItems);
    }

    public ExpenseResponse createExpense(Integer seasonId, CreateExpenseRequest request) {
        Season season = getSeasonForCurrentFarmer(seasonId);
        ensureSeasonOpenForExpenses(season);

        validateExpenseDateWithinSeason(season, request.getExpenseDate());

        User currentUser = getCurrentUser();

        BigDecimal totalCost = request.getUnitPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        Expense expense = Expense.builder()
                .user(currentUser)
                .season(season)
                .itemName(request.getItemName())
                .unitPrice(request.getUnitPrice())
                .quantity(request.getQuantity())
                .totalCost(totalCost)
                .expenseDate(request.getExpenseDate())
                .createdAt(LocalDateTime.now())
                .build();

        Expense saved = expenseRepository.save(expense);
        return toResponse(saved);
    }

    public ExpenseResponse getExpense(Integer id) {
        Expense expense = getExpenseForCurrentFarmer(id);
        return toResponse(expense);
    }

    public ExpenseResponse updateExpense(Integer id, UpdateExpenseRequest request) {
        Expense expense = getExpenseForCurrentFarmer(id);
        ensureSeasonOpenForExpenses(expense.getSeason());

        validateExpenseDateWithinSeason(expense.getSeason(), request.getExpenseDate());

        expense.setItemName(request.getItemName());
        expense.setUnitPrice(request.getUnitPrice());
        expense.setQuantity(request.getQuantity());
        expense.setTotalCost(request.getUnitPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity())));
        expense.setExpenseDate(request.getExpenseDate());

        Expense saved = expenseRepository.save(expense);
        return toResponse(saved);
    }

    public void deleteExpense(Integer id) {
        Expense expense = getExpenseForCurrentFarmer(id);
        ensureSeasonOpenForExpenses(expense.getSeason());

        expenseRepository.delete(expense);
    }

    private void ensureSeasonOpenForExpenses(Season season) {
        if (season == null) {
            throw new AppException(ErrorCode.SEASON_NOT_FOUND);
        }
        if (season.getStatus() == SeasonStatus.COMPLETED
                || season.getStatus() == SeasonStatus.CANCELLED
                || season.getStatus() == SeasonStatus.ARCHIVED) {
            throw new AppException(ErrorCode.EXPENSE_PERIOD_LOCKED);
        }
    }

    private void validateExpenseDateWithinSeason(Season season, LocalDate date) {
        LocalDate start = season.getStartDate();
        LocalDate end = season.getEndDate() != null ? season.getEndDate() : season.getPlannedHarvestDate();

        if (start == null || date.isBefore(start) || (end != null && date.isAfter(end))) {
            throw new AppException(ErrorCode.INVALID_SEASON_DATES);
        }
    }

    private Expense getExpenseForCurrentFarmer(Integer id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EXPENSE_NOT_FOUND));

        Season season = expense.getSeason();
        if (season == null) {
            throw new AppException(ErrorCode.SEASON_NOT_FOUND);
        }
        farmAccessService.assertCurrentUserCanAccessSeason(season);
        return expense;
    }

    private Season getSeasonForCurrentFarmer(Integer id) {
        Season season = seasonRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SEASON_NOT_FOUND));
        farmAccessService.assertCurrentUserCanAccessSeason(season);
        return season;
    }

    private User getCurrentUser() {
        return farmAccessService.getCurrentUser();
    }

    private ExpenseResponse toResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .seasonId(expense.getSeason() != null ? expense.getSeason().getId() : null)
                .userName(expense.getUser() != null ? expense.getUser().getUsername() : null)
                .seasonName(expense.getSeason() != null ? expense.getSeason().getSeasonName() : null)
                .itemName(expense.getItemName())
                .unitPrice(expense.getUnitPrice())
                .quantity(expense.getQuantity())
                .totalCost(expense.getTotalCost())
                .expenseDate(expense.getExpenseDate())
                .createdAt(expense.getCreatedAt())
                .build();
    }
}
