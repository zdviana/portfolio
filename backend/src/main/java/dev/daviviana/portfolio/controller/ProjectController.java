package dev.daviviana.portfolio.controller;

import dev.daviviana.portfolio.dto.ProjectResponse;
import dev.daviviana.portfolio.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "Projetos")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    @Operation(summary = "Lista os projetos em ordem de exibição")
    public List<ProjectResponse> list() {
        return projectService.listAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um projeto pelo id")
    public ProjectResponse get(@PathVariable Long id) {
        return projectService.findById(id);
    }
}
