package saci.infrastructure;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import saci.domain.model.Level;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {
}
