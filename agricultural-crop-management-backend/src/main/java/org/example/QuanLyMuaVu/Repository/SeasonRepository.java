package org.example.QuanLyMuaVu.Repository;

import org.example.QuanLyMuaVu.Entity.Season;
import org.example.QuanLyMuaVu.Entity.User;
import org.example.QuanLyMuaVu.Enums.SeasonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Integer> {

    List<Season> findBySeasonNameContainingIgnoreCase(String seasonName);

    boolean existsBySeasonNameIgnoreCase(String seasonName);

    boolean existsByPlot_Id(Integer plotId);

    boolean existsByPlot_IdAndStatusIn(Integer plotId, Iterable<SeasonStatus> statuses);

    List<Season> findAllByPlot_Id(Integer plotId);

    List<Season> findAllByPlot_User(User user);

    List<Season> findAllByPlot_Farm_IdIn(Iterable<Integer> farmIds);

    List<Season> findAllByPlot_IdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Integer plotId,
            LocalDate endDate,
            LocalDate startDate);

    /**
     * Find all seasons for a given plot with status in the specified set.
     * Used by ActiveSeasonValidator to check for overlapping seasons.
     */
    List<Season> findByPlotAndStatusIn(org.example.QuanLyMuaVu.Entity.Plot plot, Iterable<SeasonStatus> statuses);

    /**
     * Find season by ID only if the farm owner matches.
     * Used for ownership verification: seasons.plot_id -> plots.farm_id ->
     * farms.owner_id
     * 
     * @param seasonId the season ID
     * @param ownerId  the expected farm owner's user ID
     * @return Optional containing the season if found and owned
     */
    @Query("SELECT s FROM Season s WHERE s.id = :seasonId AND s.plot.farm.owner.id = :ownerId")
    Optional<Season> findByIdAndFarmOwnerId(@Param("seasonId") Integer seasonId, @Param("ownerId") Long ownerId);

    /**
     * Find all seasons for farms owned by the specified user.
     * 
     * @param ownerId the farm owner's user ID
     * @return list of seasons for farms owned by the user
     */
    @Query("SELECT s FROM Season s WHERE s.plot.farm.owner.id = :ownerId")
    List<Season> findAllByFarmOwnerId(@Param("ownerId") Long ownerId);

    /**
     * Check if a season exists and is owned by the specified user (via plot ->
     * farm).
     * 
     * @param seasonId the season ID
     * @param ownerId  the expected farm owner's user ID
     * @return true if season exists and farm is owned by user
     */
    @Query("SELECT COUNT(s) > 0 FROM Season s WHERE s.id = :seasonId AND s.plot.farm.owner.id = :ownerId")
    boolean existsByIdAndFarmOwnerId(@Param("seasonId") Integer seasonId, @Param("ownerId") Long ownerId);

    /**
     * Count seasons by status for a specific farm owner.
     * Used for dashboard season status breakdown.
     */
    @Query("SELECT COUNT(s) FROM Season s WHERE s.status = :status AND s.plot.farm.owner.id = :ownerId")
    long countByStatusAndFarmOwnerId(@Param("status") SeasonStatus status, @Param("ownerId") Long ownerId);

    /**
     * Find the most recent ACTIVE season for an owner, ordered by start_date desc.
     * Used as default season for dashboard.
     */
    @Query("SELECT s FROM Season s WHERE s.status = 'ACTIVE' AND s.plot.farm.owner.id = :ownerId ORDER BY s.startDate DESC")
    List<Season> findActiveSeasonsByOwnerIdOrderByStartDateDesc(@Param("ownerId") Long ownerId);
}
