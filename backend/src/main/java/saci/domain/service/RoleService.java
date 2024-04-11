package saci.domain.service;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Role;
import saci.infrastructure.RoleRepository;

@Service
@AllArgsConstructor
public class RoleService {

    private RoleRepository roleRepository;

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
}
