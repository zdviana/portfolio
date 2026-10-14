package dev.daviviana.portfolio.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import dev.daviviana.portfolio.dto.ProjectResponse;
import dev.daviviana.portfolio.model.Project;
import dev.daviviana.portfolio.repository.ProjectRepository;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void listAllMapsProjectsInRepositoryOrder() {
        when(projectRepository.findAllByOrderByDisplayOrderAsc())
                .thenReturn(List.of(project("portfolio"), project("estufa-iot")));

        List<ProjectResponse> result = projectService.listAll();

        assertThat(result).extracting(ProjectResponse::slug).containsExactly("portfolio", "estufa-iot");
        assertThat(result.get(0).tags()).containsExactly("React");
    }

    @Test
    void findByIdThrowsNotFoundWhenMissing() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.findById(99L))
                .isInstanceOf(NotFoundException.class)
                .hasMessage("Projeto não encontrado: 99");
    }

    private static Project project(String slug) {
        return new Project(slug, "Título " + slug, "Descrição", List.of("React"), null, null, null, 1, false);
    }
}
