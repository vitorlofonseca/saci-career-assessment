package saci.application;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import saci.domain.model.Knowledge;
import saci.domain.service.KnowledgeService;

@RestController
@RequestMapping("/api/knowledge")
@RequiredArgsConstructor
public class KnowledgeController {

    private final KnowledgeService knowledgeService;

    @Operation(summary = "Create a knowledge")
    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "201",
                        description = "The knowledge was created",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Knowledge.class))
                        })
            })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Knowledge createKnowledge(@RequestBody Knowledge knowledge) {
        return knowledgeService.createKnowledge(knowledge);
    }

    @Operation(summary = "Get all of the knowledge")
    @ApiResponses(
            value = {
                @ApiResponse(
                        responseCode = "200",
                        description = "List of all knowledges",
                        content = {
                            @Content(
                                    mediaType = "application/json",
                                    array =
                                            @ArraySchema(
                                                    schema =
                                                            @Schema(
                                                                    implementation =
                                                                            Knowledge.class)))
                        })
            })
    @GetMapping
    public ResponseEntity<List<Knowledge>> getKnowledges() {
        List<Knowledge> knowledges = knowledgeService.getKnowledges();

        return knowledges.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(knowledges);
    }

    @Operation(
            summary = "Delete knowledge by ID",
            description = "Deletes a knowledge based on its ID")
    @ApiResponses(
            value = {
                @ApiResponse(responseCode = "200", description = "Knowledge deleted successfully"),
                @ApiResponse(responseCode = "404", description = "Knowledge not found")
            })
    @DeleteMapping("/{knowledgeId}")
    public ResponseEntity<Void> deleteKnowledgeById(@PathVariable long knowledgeId) {
        Optional<Knowledge> knowledge = knowledgeService.findById(knowledgeId);
        if (knowledge.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        knowledgeService.deleteKnowledgeById(knowledgeId);
        return ResponseEntity.ok().build();
    }
}
