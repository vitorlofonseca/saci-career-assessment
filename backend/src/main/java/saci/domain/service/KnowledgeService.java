package saci.domain.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Knowledge;
import saci.domain.model.Role;
import saci.domain.service.exceptions.AlreadyExistsException;
import saci.domain.service.exceptions.NotFoundException;
import saci.infrastructure.KnowledgeRepository;
import saci.infrastructure.RoleRepository;

@Service
@RequiredArgsConstructor
public class KnowledgeService {

    private final KnowledgeRepository knowledgeRepository;
    private final RoleRepository roleRepository;

    public Knowledge createKnowledge(Knowledge knowledge) {
        Optional<Role> optionalRole = roleRepository.findById((knowledge.getRoleId()));
        if (!optionalRole.isPresent()) {
            throw new NotFoundException("Role not Found");
        }
        Role role = optionalRole.get();
        List<Knowledge> knowledges = role.getKnowledges();
        boolean knowledgeWithNameExists =
                role.getKnowledges().stream()
                        .anyMatch(
                                existingKnowledge ->
                                        existingKnowledge.getName().equals(knowledge.getName()));

        if (knowledgeWithNameExists) {
            throw new AlreadyExistsException(
                    "Knowledge with the same name already exists in this role");
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
