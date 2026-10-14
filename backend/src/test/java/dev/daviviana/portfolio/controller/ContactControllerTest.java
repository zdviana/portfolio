package dev.daviviana.portfolio.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.daviviana.portfolio.dto.ContactRequest;
import dev.daviviana.portfolio.dto.ContactResponse;
import dev.daviviana.portfolio.service.ContactService;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    private static final String VALID_BODY = """
            {"name": "Ana", "email": "ana@exemplo.com", "message": "Olá, tudo bem por aí?"}
            """;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ContactService contactService;

    @Test
    void validMessageReturnsCreated() throws Exception {
        when(contactService.save(any(ContactRequest.class)))
                .thenReturn(new ContactResponse(1L, Instant.parse("2026-01-01T10:00:00Z")));

        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID_BODY))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.createdAt").exists());
    }

    @Test
    void invalidMessageReturnsFieldErrors() throws Exception {
        String invalidBody = """
                {"name": " ", "email": "nao-e-email", "message": "curta"}
                """;

        mockMvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(invalidBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.message").exists());
    }
}
