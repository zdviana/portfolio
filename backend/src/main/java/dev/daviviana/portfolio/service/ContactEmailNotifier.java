package dev.daviviana.portfolio.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@ConditionalOnProperty(name = "app.mail.enabled", havingValue = "true")
public class ContactEmailNotifier {

    private static final Logger log = LoggerFactory.getLogger(ContactEmailNotifier.class);
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
            .withZone(ZoneId.of("America/Sao_Paulo"));

    private final JavaMailSender mailSender;
    private final String from;
    private final String to;

    public ContactEmailNotifier(JavaMailSender mailSender,
                                @Value("${spring.mail.username}") String from,
                                @Value("${app.mail.to}") String to) {
        this.mailSender = mailSender;
        this.from = from;
        this.to = to;
    }

    // Executa após o COMMIT, em outra thread: falha de SMTP não desfaz nem atrasa o POST.
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onContactMessageCreated(ContactMessageCreated event) {
        try {
            mailSender.send(buildMessage(event));
        } catch (MailException ex) {
            log.warn("Falha ao enviar e-mail da mensagem de contato {}", event.id(), ex);
        }
    }

    SimpleMailMessage buildMessage(ContactMessageCreated event) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(from);
        mail.setTo(to);
        // Responder no Gmail envia direto para o visitante.
        mail.setReplyTo(event.email());
        // \s também cobre CR/LF, evitando injeção de cabeçalhos no assunto.
        mail.setSubject("Contato pelo portfólio — " + event.name().replaceAll("\\s+", " ").trim());
        mail.setText("""
                Nome: %s
                E-mail: %s
                Data: %s

                Mensagem:
                %s
                """.formatted(event.name(), event.email(), DATE_FORMAT.format(event.createdAt()), event.message()));
        return mail;
    }
}
