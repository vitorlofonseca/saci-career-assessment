package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saci.domain.model.Level;
import saci.domain.service.LevelService;
import saci.domain.service.exceptions.NotFoundException;

@RestController
@RequestMapping("/api/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService levelService;

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
        return levelService.createLevel(level);
    }

    @Operation(summary = "Get all of the Levels")
    @ApiResponses(
            value = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of all Levels",
                            content = {
                                    @Content(
                                            mediaType = "application/json",
                                            array =
                                            @ArraySchema(
                                                    schema = @Schema(implementation = Level.class)))
                            })
            })
    @GetMapping
    public ResponseEntity<List<Level>> getLevels(@RequestParam(required = false) Long role_id) {
        List<Level> levels;
        if (role_id != null) {
            levels = levelService.getLevelsByRoleId(role_id);
        } else {
            levels = levelService.getLevels();
        }
        return levels.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(levels);
    }

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
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
