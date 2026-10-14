package dev.daviviana.portfolio.controller;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.daviviana.portfolio.dto.ProjectResponse;
import dev.daviviana.portfolio.service.NotFoundException;
import dev.daviviana.portfolio.service.ProjectService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProjectService projectService;

    @Test
    void listReturnsProjects() throws Exception {
        when(projectService.listAll()).thenReturn(List.of(new ProjectResponse(
                1L, "portfolio", "Portfólio", "Descrição", List.of("React"),
                "https://github.com/zdviana/portfolio", null, null, null, true)));

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].slug").value("portfolio"))
                .andExpect(jsonPath("$[0].tags[0]").value("React"))
                .andExpect(jsonPath("$[0].featured").value(true));
    }

    @Test
    void unknownIdReturnsNotFoundProblem() throws Exception {
        when(projectService.findById(anyLong())).thenThrow(new NotFoundException("Projeto não encontrado: 99"));

        mockMvc.perform(get("/api/projects/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.detail").value("Projeto não encontrado: 99"));
    }
}
