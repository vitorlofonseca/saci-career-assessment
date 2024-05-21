package saci.domain.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Knowledge;
import saci.domain.service.exceptions.AlreadyExistsException;
import saci.domain.service.exceptions.NotFoundException;
import saci.infrastructure.KnowledgeRepository;

@Service
@RequiredArgsConstructor
public class KnowledgeService {

    private final KnowledgeRepository knowledgeRepository;

    public Knowledge createKnowledge(Knowledge knowledge) {
        Optional<Knowledge> optionalKnowledge = knowledgeRepository.findByName(knowledge.getName());
        if (optionalKnowledge.isPresent()) {
            throw new AlreadyExistsException("Knowledge name already exists");
        }
        return knowledgeRepository.save(knowledge);
    }

    public List<Knowledge> getKnowledges() {
        return knowledgeRepository.findAll();
    }

    public void deleteKnowledgeById(long knowledgeId) {
        Optional<Knowledge> knowledge = knowledgeRepository.findById(knowledgeId);
        if (knowledge.isPresent()) {
            knowledgeRepository.deleteById(knowledgeId);
        } else {
            throw new NotFoundException("Knowledge not found with ID: " + knowledgeId);
        }
    }

    public Optional<Knowledge> findById(long knowledgeId) {
        return knowledgeRepository.findById(knowledgeId);
    }

    public List<Knowledge> getKnowledgesByRoleId(Long roleId) {
        return knowledgeRepository.findByRoleId(roleId);
    }

    public Knowledge editKnowledge(Long knowledgeId, Knowledge updatedKnowledge) {
        Knowledge existingKnowledge =
                knowledgeRepository
                        .findById(knowledgeId)
                        .orElseThrow(() -> new NotFoundException("Knowledge not found"));

        Optional<Knowledge> knowledgeWithSameName =
                knowledgeRepository.findByName(updatedKnowledge.getName());
        if (knowledgeWithSameName.isPresent()
                && !knowledgeWithSameName.get().getId().equals(knowledgeId)) {
            throw new AlreadyExistsException("Another knowledge with the same name already exists");
        }

        existingKnowledge.setName(updatedKnowledge.getName());
        existingKnowledge.setWeight(updatedKnowledge.getWeight());

        return knowledgeRepository.save(existingKnowledge);
    }
}
