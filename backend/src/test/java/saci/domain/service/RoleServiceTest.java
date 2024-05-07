package saci.domain.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import saci.domain.model.Role;
import saci.infrastructure.RoleRepository;

@ExtendWith(MockitoExtension.class)
class yarRoleServiceTest {

    @Mock RoleRepository roleRepository;
    @InjectMocks RoleService roleService;

    @Test
    void shouldSaveRole() {
        Role expectedRole = Role.builder().name("role").build();
        given(roleRepository.save(expectedRole)).willReturn(expectedRole);

        Role role = roleService.createRole(expectedRole);

        assertThat(role).isEqualTo(expectedRole);
    }

    @Test
    void shouldListAllRoles() {
        Role expectedRole1 = Role.builder().name("role1").build();
        Role expectedRole2 = Role.builder().name("role").build();
        List<Role> expectedRoles = List.of(expectedRole1, expectedRole2);
        given(roleRepository.findAll()).willReturn(expectedRoles);

        List<Role> roles = roleService.getRoles();

        assertThat(roles).containsAll(expectedRoles);
    }
}
