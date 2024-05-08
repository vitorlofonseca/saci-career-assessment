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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import saci.domain.model.Knowledge;
import saci.domain.service.KnowledgeService;

@RestController
@RequestMapping("/api/knowledges")
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

    @Operation(summary = "Get all of the knowledges")
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

    @PutMapping("/{knowledgeId}")
    public ResponseEntity<Knowledge> editKnowledge(
            @PathVariable Long knowledgeId, @Valid @RequestBody Knowledge updatedKnowledge) {
        Knowledge editedKnowledge = knowledgeService.editKnowledge(knowledgeId, updatedKnowledge);
        return ResponseEntity.ok(editedKnowledge);
    }
}
