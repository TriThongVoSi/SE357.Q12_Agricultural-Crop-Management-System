package org.example.QuanLyMuaVu.Repository;

import org.example.QuanLyMuaVu.Entity.Farm;
import org.example.QuanLyMuaVu.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Integer> {

        List<Farm> findAllByOwner(User owner);

        Optional<Farm> findByIdAndOwner(Integer id, User owner);

        boolean existsByOwnerAndNameIgnoreCase(User owner, String name);

        /**
         * Check if an active farm with the same name exists for the owner.
         * Used to prevent duplicate farm names for ACTIVE farms only.
         * This allows users to create a new farm with the same name after soft-deleting
         * the old one.
         */
        boolean existsByOwnerAndNameIgnoreCaseAndActiveTrue(User owner, String name);

        boolean existsByOwnerAndNameIgnoreCaseAndActiveTrueAndIdNot(User owner, String name, Integer id);

        /**
         * Check if a farm has any plots.
         * More efficient than loading all plots into memory.
         */
        @org.springframework.data.jpa.repository.Query("SELECT COUNT(p) > 0 FROM Plot p WHERE p.farm.id = :farmId")
        boolean hasPlots(@org.springframework.data.repository.query.Param("farmId") Integer farmId);

        /**
         * Check if a farm has any seasons (through plots).
         * More efficient than loading all plots and seasons into memory.
         */
        @org.springframework.data.jpa.repository.Query("SELECT COUNT(s) > 0 FROM Season s WHERE s.plot.farm.id = :farmId")
        boolean hasSeasons(@org.springframework.data.repository.query.Param("farmId") Integer farmId);

        /**
         * Find farm by ID only if the owner matches.
         * Used for ownership verification.
         * 
         * @param farmId  the farm ID
         * @param ownerId the expected owner's user ID
         * @return Optional containing the farm if found and owned
         */
        @Query("SELECT f FROM Farm f WHERE f.id = :farmId AND f.owner.id = :ownerId")
        Optional<Farm> findByIdAndOwnerId(@Param("farmId") Integer farmId, @Param("ownerId") Long ownerId);

        /**
         * Check if a farm exists and is owned by the specified user.
         * 
         * @param farmId  the farm ID
         * @param ownerId the expected owner's user ID
         * @return true if farm exists and is owned by user
         */
        @Query("SELECT COUNT(f) > 0 FROM Farm f WHERE f.id = :farmId AND f.owner.id = :ownerId")
        boolean existsByIdAndOwnerId(@Param("farmId") Integer farmId, @Param("ownerId") Long ownerId);

        /**
         * Count active farms by owner ID.
         * Used for dashboard active farms count.
         */
        @Query("SELECT COUNT(f) FROM Farm f WHERE f.owner.id = :ownerId AND f.active = true")
        long countByOwnerIdAndActiveTrue(@Param("ownerId") Long ownerId);

        @Query("SELECT f FROM Farm f WHERE f.owner = :owner "
                        + "AND (:keyword IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) "
                        + "AND (:active IS NULL OR f.active = :active)")
        Page<Farm> searchByOwnerAndKeywordAndActive(
                        @Param("owner") User owner,
                        @Param("keyword") String keyword,
                        @Param("active") Boolean active,
                        Pageable pageable);
}
