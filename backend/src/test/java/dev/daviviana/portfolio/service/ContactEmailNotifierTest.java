package dev.daviviana.portfolio.service;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import java.io.IOException;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class ContactEmailNotifierTest {

    private static final Instant CREATED_AT = Instant.parse("2026-10-14T12:30:00Z");
    private static final String API_URL = "https://api.resend.com/emails";

    private final RestClient.Builder builder = RestClient.builder().baseUrl("https://api.resend.com");
    private final MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
    private final ContactEmailNotifier notifier =
            new ContactEmailNotifier(builder.build(), "Portfolio <onboarding@resend.dev>", "daviviana.dev@gmail.com");

    @Test
    void postsMessageToOwnerWithVisitorAsReplyTo() {
        server.expect(requestTo(API_URL))
                .andExpect(method(HttpMethod.POST))
                .andExpect(jsonPath("$.from").value("Portfolio <onboarding@resend.dev>"))
                .andExpect(jsonPath("$.to[0]").value("daviviana.dev@gmail.com"))
                .andExpect(jsonPath("$.reply_to").value("ana@exemplo.com"))
                .andExpect(jsonPath("$.subject").value("Contato pelo portfólio — Ana"))
                .andExpect(jsonPath("$.text").value(containsString("Olá, gostaria de conversar.")))
                .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON));

        notifier.onContactMessageCreated(event("Ana", "ana@exemplo.com"));

        server.verify();
    }

    @Test
    void removesLineBreaksFromSubject() {
        server.expect(requestTo(API_URL))
                .andExpect(jsonPath("$.subject").value("Contato pelo portfólio — Ana Bcc: alguem@exemplo.com"))
                .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON));

        notifier.onContactMessageCreated(
                new ContactMessageCreated(7L, "Ana\r\nBcc: alguem@exemplo.com", "ana@exemplo.com",
                        "Olá, gostaria de conversar.", CREATED_AT));

        server.verify();
    }

    @Test
    void doesNotPropagateApiError() {
        server.expect(requestTo(API_URL)).andRespond(withServerError());

        assertThatNoException().isThrownBy(() -> notifier.onContactMessageCreated(event("Ana", "ana@exemplo.com")));
    }

    @Test
    void doesNotPropagateNetworkFailure() {
        server.expect(requestTo(API_URL)).andRespond(request -> {
            throw new IOException("conexão recusada");
        });

        assertThatNoException().isThrownBy(() -> notifier.onContactMessageCreated(event("Ana", "ana@exemplo.com")));
    }

    private static ContactMessageCreated event(String name, String email) {
        return new ContactMessageCreated(7L, name, email, "Olá, gostaria de conversar.", CREATED_AT);
    }
}
