package dev.daviviana.portfolio.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.net.http.HttpClient;
import java.time.Duration;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.MediaType;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Component
@ConditionalOnProperty(name = "app.mail.enabled", havingValue = "true")
public class ContactEmailNotifier {

    private static final Logger log = LoggerFactory.getLogger(ContactEmailNotifier.class);
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
            .withZone(ZoneId.of("America/Sao_Paulo"));
    private static final Duration TIMEOUT = Duration.ofSeconds(5);

    private final RestClient restClient;
    private final String from;
    private final String to;

    @Autowired
    public ContactEmailNotifier(@Value("${app.mail.api-key}") String apiKey,
                                @Value("${app.mail.from}") String from,
                                @Value("${app.mail.to}") String to) {
        this(createRestClient(apiKey), from, to);
    }

    ContactEmailNotifier(RestClient restClient, String from, String to) {
        this.restClient = restClient;
        this.from = from;
        this.to = to;
    }

    // Executa após o COMMIT, em outra thread: falha de rede ou da API não desfaz nem atrasa o POST.
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onContactMessageCreated(ContactMessageCreated event) {
        try {
            restClient.post()
                    .uri("/emails")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(buildRequest(event))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientException ex) {
            // Não logar a requisição: ela contém o e-mail e o conteúdo do visitante.
            log.warn("Falha ao enviar e-mail da mensagem de contato {}", event.id(), ex);
        }
    }

    private EmailRequest buildRequest(ContactMessageCreated event) {
        // \s também cobre CR/LF, evitando injeção de cabeçalhos no assunto.
        String subject = "Contato pelo portfólio — " + event.name().replaceAll("\\s+", " ").trim();
        String text = """
                Nome: %s
                E-mail: %s
                Data: %s

                Mensagem:
                %s
                """.formatted(event.name(), event.email(), DATE_FORMAT.format(event.createdAt()), event.message());
        // Responder no Gmail envia direto para o visitante.
        return new EmailRequest(from, List.of(to), event.email(), subject, text);
    }

    private static RestClient createRestClient(String apiKey) {
        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(
                HttpClient.newBuilder().connectTimeout(TIMEOUT).build());
        requestFactory.setReadTimeout(TIMEOUT);
        return RestClient.builder()
                .baseUrl("https://api.resend.com")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("User-Agent", "portfolio-api")
                .requestFactory(requestFactory)
                .build();
    }

    record EmailRequest(String from, List<String> to, @JsonProperty("reply_to") String replyTo,
                        String subject, String text) {
    }
}
