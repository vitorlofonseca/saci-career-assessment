package saci.infrastructure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import saci.domain.model.Knowledge;

@Repository
public interface KnowledgeRepository extends JpaRepository<Knowledge, Long> {
    Optional<Knowledge> findByName(String name);
}
