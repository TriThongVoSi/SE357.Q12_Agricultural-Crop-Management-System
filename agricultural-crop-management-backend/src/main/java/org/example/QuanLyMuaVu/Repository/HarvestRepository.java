package org.example.QuanLyMuaVu.Repository;

import org.example.QuanLyMuaVu.Entity.Harvest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HarvestRepository extends JpaRepository<Harvest, Integer> {

    List<Harvest> findByHarvestDateBetween(LocalDate start, LocalDate end);

    List<Harvest> findAllBySeason_Id(Integer seasonId);

    List<Harvest> findAllBySeason_IdIn(Iterable<Integer> seasonIds);

    boolean existsBySeason_Id(Integer seasonId);

    @Query("SELECT COALESCE(SUM(h.quantity), 0) FROM Harvest h WHERE h.season.id = :seasonId")
    BigDecimal sumQuantityBySeasonId(@Param("seasonId") Integer seasonId);

    @Query("SELECT COALESCE(SUM(h.quantity * h.unit), 0) FROM Harvest h WHERE h.season.id = :seasonId")
    BigDecimal sumRevenueBySeasonId(@Param("seasonId") Integer seasonId);
}
