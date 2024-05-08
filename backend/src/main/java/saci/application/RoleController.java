package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import saci.domain.model.Role;
import saci.domain.service.RoleService;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
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
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleService.createRole(role);
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
        return roles.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(roles);
    }

    @PutMapping("/{roleId}")
    @Operation(summary = "Edit a role", description = "Edit an existing role with the provided role ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Role edited successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Role not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Role> editRole(@PathVariable Long roleId, @Valid @RequestBody Role updatedRole) {
        Role editedRole = roleService.editRole(roleId, updatedRole);
        return ResponseEntity.ok(editedRole);
    }






}
