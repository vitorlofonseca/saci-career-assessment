package saci.infrastructure;

import org.springframework.data.repository.ListCrudRepository;
import saci.domain.model.Role;

public interface RoleRepository extends ListCrudRepository<Role, Long> {}
