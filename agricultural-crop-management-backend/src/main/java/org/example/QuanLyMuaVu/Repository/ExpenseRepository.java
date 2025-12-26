package org.example.QuanLyMuaVu.Repository;

import org.example.QuanLyMuaVu.Entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findByItemNameContainingIgnoreCase(String itemName);

    List<Expense> findAllBySeason_Id(Integer seasonId);

    List<Expense> findAllBySeason_IdAndExpenseDateBetween(Integer seasonId, LocalDate from, LocalDate to);

    boolean existsBySeason_Id(Integer seasonId);

    // Methods for fetching all farmer's expenses
    List<Expense> findAllByUser_IdOrderByExpenseDateDesc(Long userId);

    List<Expense> findAllByUser_IdAndSeason_IdOrderByExpenseDateDesc(Long userId, Integer seasonId);

    List<Expense> findAllByUser_IdAndItemNameContainingIgnoreCaseOrderByExpenseDateDesc(Long userId, String itemName);

    /**
     * Sum total expenses for a season.
     * Used for dashboard expense totals.
     */
    @Query("SELECT COALESCE(SUM(e.totalCost), 0) FROM Expense e WHERE e.season.id = :seasonId")
    BigDecimal sumTotalCostBySeasonId(@Param("seasonId") Integer seasonId);
}
