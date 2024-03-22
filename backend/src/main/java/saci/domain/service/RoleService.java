package saci.domain.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import saci.infrastructure.persistence.RoleRepository;
import saci.domain.model.Role;

@Service
@AllArgsConstructor
public class RoleService {

    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

}
