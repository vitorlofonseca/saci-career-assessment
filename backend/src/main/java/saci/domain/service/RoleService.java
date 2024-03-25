package saci.domain.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Role;
import saci.infrastructure.persistence.RoleRepository;

@Service
@AllArgsConstructor
public class RoleService {

    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }
}
