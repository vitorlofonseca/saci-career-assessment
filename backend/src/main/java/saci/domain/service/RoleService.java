package saci.domain.service;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Role;
import saci.domain.service.exceptions.NotFoundException;
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

    public Role editRole(Long roleId, Role updatedRole) {
        Role existingRole =
                roleRepository
                        .findById(roleId)
                        .orElseThrow(() -> new NotFoundException("Role not found"));

        existingRole.setName(updatedRole.getName());

        return roleRepository.save(existingRole);
    }
}
