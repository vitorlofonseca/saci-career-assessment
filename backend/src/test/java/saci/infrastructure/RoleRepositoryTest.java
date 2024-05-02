package saci.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import saci.domain.model.Role;

@DataJpaTest
class RoleRepositoryTest {

    @Autowired RoleRepository roleRepository;

    @Test
    void shouldPersistRole() {
        Role expectedRole = Role.builder().name("role").build();

        roleRepository.save(expectedRole);

        Optional<Role> role = roleRepository.findById(expectedRole.getId());
        assertThat(role.isPresent()).isTrue();
        assertThat(role.get()).isEqualTo(expectedRole);
    }

    @Test
    void shouldGetAllRoles() {
        Role expectedRole1 = Role.builder().name("role1").build();
        Role expectedRole2 = Role.builder().name("role2").build();
        List<Role> expectedRoles = List.of(expectedRole1, expectedRole2);
        roleRepository.saveAll(expectedRoles);

        List<Role> roles = roleRepository.findAll();

        assertThat(roles.isEmpty()).isFalse();
        assertThat(roles).containsAll(expectedRoles);
    }
}
