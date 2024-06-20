package saci.domain.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Level;
import saci.domain.service.exceptions.AlreadyExistsException;
import saci.domain.service.exceptions.CoefficientOverlapException;
import saci.domain.service.exceptions.NotFoundException;
import saci.domain.service.validators.LevelValidator;
import saci.infrastructure.LevelRepository;

@Service
@RequiredArgsConstructor
public class LevelService {

    private final LevelRepository levelRepository;

    public void deleteLevelById(long levelId) {
        Optional<Level> level = levelRepository.findById(levelId);
        if (level.isPresent()) {
            levelRepository.deleteById(levelId);
        } else {
            throw new NotFoundException("Level not found with ID: " + levelId);
        }
    }

    public List<Level> getSortedLevelsByRoleIdAsc(Long roleId) {
        return levelRepository.findByRoleIdOrderByMinCoefficientAscMaxCoefficientAsc(roleId);
    }

    public Level createLevel(Level level) {
        int overlappingLevels =
                levelRepository.overlappingLevelsCounter(
                        level.getRoleId(), level.getMinCoefficient(), level.getMaxCoefficient());

        if (!LevelValidator.levelIsValid(level, overlappingLevels)) {
            throw new CoefficientOverlapException(
                    "Error Creating the Level: Overlapping Coefficients or Invalid Coefficients");
        }
        Optional<Level> optionalLevel = levelRepository.findByName(level.getName());
        if (optionalLevel.isPresent()) {
            throw new AlreadyExistsException("Level name already exists");
        }
        return levelRepository.save(level);
    }
}
