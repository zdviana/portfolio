package dev.daviviana.portfolio;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.daviviana.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class ApiIntegrationTest {

    private static final String CONTACT_BODY = """
            {"name": "Ana", "email": "ana@exemplo.com", "message": "Olá, gostaria de conversar."}
            """;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Test
    void listsSeededProjectsInOrder() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3))
                .andExpect(jsonPath("$[0].slug").value("portfolio"))
                .andExpect(jsonPath("$[0].tags").value(hasItem("React")))
                .andExpect(jsonPath("$[2].slug").value("agenda-estagio"))
                .andExpect(jsonPath("$[2].backendRepoUrl").value("https://github.com/zdviana/projeto_estagio_backend"));
    }

    @Test
    void storesContactMessage() throws Exception {
        long before = contactMessageRepository.count();

        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(CONTACT_BODY))
                .andExpect(status().isCreated());

        assertThat(contactMessageRepository.count()).isEqualTo(before + 1);
    }

    @Test
    void healthIsUp() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }
}
