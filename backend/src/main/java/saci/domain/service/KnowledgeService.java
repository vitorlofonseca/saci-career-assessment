package saci.domain.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import saci.domain.model.Knowledge;
import saci.domain.service.exceptions.AlreadyExistsException;
import saci.domain.service.exceptions.NotFoundException;
import saci.infrastructure.KnowledgeRepository;

@Service
public class KnowledgeService {

    private final KnowledgeRepository knowledgeRepository;

    public KnowledgeService(KnowledgeRepository knowledgeRepository) {
        this.knowledgeRepository = knowledgeRepository;
    }

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
}
