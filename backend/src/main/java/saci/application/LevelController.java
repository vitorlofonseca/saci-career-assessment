package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import saci.domain.service.LevelService;
import saci.domain.service.exceptions.NotFoundException;

@RestController
@RequestMapping("/api/levels")
@RequiredArgsConstructor
public class LevelController {

    private final LevelService LevelService;

    @Operation(summary = "Delete Level by ID", description = "Deletes a Level based on its ID")
    @ApiResponses(
            value = {
                @ApiResponse(responseCode = "200", description = "Level deleted successfully"),
                @ApiResponse(responseCode = "404", description = "Level not found")
            })
    @DeleteMapping("/{levelId}")
    public ResponseEntity<Void> deleteLevelById(@PathVariable long levelId) {
        try {
            LevelService.deleteLevelById(levelId);
            return ResponseEntity.ok().build();
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
