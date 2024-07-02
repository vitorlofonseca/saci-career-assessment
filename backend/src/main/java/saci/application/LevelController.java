package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import saci.domain.model.Level;
import saci.domain.service.LevelService;

@RestController
@RequestMapping("/api/levels")
@RequiredArgsConstructor
@Slf4j
public class LevelController {

    private final LevelService levelService;

    @Operation(summary = "Delete Level by ID", description = "Deletes a Level based on its ID")
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Level deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Level not found")
            })
    @DeleteMapping("/{levelId}")
    public ResponseEntity<Void> deleteLevelById(@PathVariable long levelId) {
        try {
            levelService.deleteLevelById(levelId);
            log.info("Level deleted with ID: {}", levelId);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error("Error deleting level with ID: {}", levelId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Create a Level")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "The Level was created",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = Level.class))
                            })
            })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Level createLevel(@RequestBody Level level) {
        try {
            return levelService.createLevel(level);
        } catch (Exception ex) {
            log.error("Error creating level: {}", ex.getMessage(), ex);
            throw ex; // You might want to handle this exception more gracefully depending on your application design
        }
    }

    @Operation(summary = "Get the sorted Levels")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Levels sorted",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            schema = @Schema(implementation = Level.class))
                            }),
                    @ApiResponse(responseCode = "404", description = "Level not found")
            })
    @GetMapping("/sorted/{roleId}")
    public ResponseEntity<List<Level>> getSortedLevels(@PathVariable Long roleId) {
        try {
            List<Level> levels = levelService.getSortedLevelsByRoleIdAsc(roleId);
            log.info("Retrieved {} sorted levels for role ID: {}", levels.size(), roleId);
            return ResponseEntity.ok(levels);
        } catch (Exception ex) {
            log.error("Error retrieving sorted levels for role ID: {}", roleId, ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
