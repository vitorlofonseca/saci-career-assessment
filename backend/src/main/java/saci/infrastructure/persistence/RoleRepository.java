package saci.infrastructure.persistence;

import org.springframework.data.repository.CrudRepository;
import saci.domain.model.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {}
