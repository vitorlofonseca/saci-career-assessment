package saci.infrastructure;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import saci.domain.model.Level;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
    Optional<Level> findByName(String name);

    @Query(
            "SELECT COUNT(*) FROM Level l WHERE l.roleId = :roleId AND (l.minCoefficient < :maxCoefficient AND l.maxCoefficient > :minCoefficient)")
    int overlappingLevelsCounter(
            @Param("roleId") Long roleId,
            @Param("minCoefficient") Integer minCoefficient,
            @Param("maxCoefficient") Integer maxCoefficient);
}
