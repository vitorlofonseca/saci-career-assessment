package saci.application;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import saci.domain.model.Role;
import saci.domain.service.RoleService;

@WebMvcTest(RoleController.class)
class RoleControllerTest {

//    @Autowired private MockMvc mockMvc;
//    @MockBean private RoleService roleService;
//
//       @Test
//       void shouldCreateRole() throws Exception {
//           Role expectedRole = Role.builder().name("role").build();
//          given(roleService.createRole(expectedRole)).willReturn(expectedRole);
//          String expectedJsonRole = new ObjectMapper().writeValueAsString(expectedRole);
//        mockMvc.perform(
//                post("/api/roles")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(expectedJsonRole))
//                .andExpect(status().isCreated())
//                .andExpect(content().json(expectedJsonRole));
//      }
//
//    @Test
//    void shouldListAllRoles() throws Exception {
//        Role expectedRole1 = Role.builder().name("role1").build();
//        Role expectedRole2 = Role.builder().name("role2").build();
//        List<Role> expectedRoles = List.of(expectedRole1, expectedRole2);
//        given(roleService.getRoles()).willReturn(expectedRoles);
//
//        mockMvc.perform(get("/api/roles"))
//                .andExpect(status().isOk())
//                .andExpect(content().json(new ObjectMapper().writeValueAsString(expectedRoles)));
//    }
}
