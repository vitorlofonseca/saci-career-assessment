package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
}
