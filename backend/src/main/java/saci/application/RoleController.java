package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import saci.domain.model.Role;
import saci.domain.service.RoleService;
import saci.domain.service.exceptions.AlreadyExistsException;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Validated
@Slf4j
public class RoleController {

    private final RoleService roleService;

    @Operation(summary = "Create a role")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "The role was created",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = Role.class))
                            })
            })
    @PostMapping
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role) {
        try {
            roleService.createRole(role);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (AlreadyExistsException ex) {
            log.error("Role creation failed, already exists: {}", role.getName(), ex);
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @Operation(summary = "Get all of the roles")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of all roles",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            array =
                                            @ArraySchema(
                                                    schema = @Schema(implementation = Role.class)))
                            })
            })
    @GetMapping
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> roles = roleService.getRoles();
        if (roles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(roles);
    }

    @Operation(
            summary = "Edit a role",
            description = "Edit an existing role with the provided role ID")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Role edited successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "404", description = "Role not found"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            })
    @PutMapping("/{roleId}")
    public ResponseEntity<Role> editRole(
            @PathVariable Long roleId, @Valid @RequestBody Role updatedRole) {
        try {
            Role editedRole = roleService.editRole(roleId, updatedRole);
            return ResponseEntity.ok(editedRole);
        } catch (Exception ex) {
            log.error("Error editing role with ID: {}", roleId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Delete role by ID", description = "Deletes a role based on its ID")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Role deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Role not found")
            })
    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> deleteRole(@PathVariable long roleId) {
        try {
            roleService.deleteRoleById(roleId);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error("Error deleting role with ID: {}", roleId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Get a role by ID", description = "Retrieve a role by its ID")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Role found",
                            content =
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Role.class))),
                    @ApiResponse(responseCode = "404", description = "Role not found")
            })
    @GetMapping("/{roleId}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long roleId) {
        try {
            Role role = roleService.getRoleById(roleId);
            return ResponseEntity.ok(role);
        } catch (Exception ex) {
            log.error("Error retrieving role with ID: {}", roleId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
