package dev.daviviana.portfolio.service;

import dev.daviviana.portfolio.dto.ProjectResponse;
import dev.daviviana.portfolio.repository.ProjectRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> listAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(ProjectResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse findById(Long id) {
        return projectRepository.findById(id)
                .map(ProjectResponse::from)
                .orElseThrow(() -> new NotFoundException("Projeto não encontrado: " + id));
    }
}
