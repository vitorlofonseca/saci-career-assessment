package saci.domain.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import saci.domain.model.Level;
import saci.domain.service.exceptions.AlreadyExistsException;
import saci.domain.service.exceptions.NotFoundException;
import saci.infrastructure.LevelRepository;

@Service
@RequiredArgsConstructor
public class LevelService {

    private final LevelRepository LevelRepository;

    public Level createLevel(Level Level) {
        Optional<Level> optionalLevel = LevelRepository.findByName(Level.getName());
        if (optionalLevel.isPresent()) {
            throw new AlreadyExistsException("Level name already exists");
        }
        return LevelRepository.save(Level);
    }

    public List<Level> getLevels() {
        return LevelRepository.findAll();
    }

    public void deleteLevelById(long LevelId) {
        Optional<Level> Level = LevelRepository.findById(LevelId);
        if (Level.isPresent()) {
            LevelRepository.deleteById(LevelId);
        } else {
            throw new NotFoundException("Level not found with ID: " + LevelId);
        }
    }

    public Optional<Level> findById(long LevelId) {
        return LevelRepository.findById(LevelId);
    }

    public List<Level> getLevelsByRoleId(Long roleId) {
        return LevelRepository.findByRoleId(roleId);
    }
}
