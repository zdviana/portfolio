package dev.daviviana.portfolio.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

class ContactEmailNotifierTest {

    private static final Instant CREATED_AT = Instant.parse("2026-10-14T12:30:00Z");

    private final JavaMailSender mailSender = mock(JavaMailSender.class);
    private final ContactEmailNotifier notifier =
            new ContactEmailNotifier(mailSender, "remetente@gmail.com", "daviviana.dev@gmail.com");

    @Test
    void sendsMessageToOwnerWithVisitorAsReplyTo() {
        ContactMessageCreated event = new ContactMessageCreated(
                7L, "Ana", "ana@exemplo.com", "Olá, gostaria de conversar.", CREATED_AT);

        notifier.onContactMessageCreated(event);

        SimpleMailMessage mail = capturedMail();
        assertThat(mail.getFrom()).isEqualTo("remetente@gmail.com");
        assertThat(mail.getTo()).containsExactly("daviviana.dev@gmail.com");
        assertThat(mail.getReplyTo()).isEqualTo("ana@exemplo.com");
        assertThat(mail.getSubject()).isEqualTo("Contato pelo portfólio — Ana");
        assertThat(mail.getText())
                .contains("Nome: Ana", "E-mail: ana@exemplo.com", "Data: 14/10/2026 09:30",
                        "Olá, gostaria de conversar.");
    }

    @Test
    void removesLineBreaksFromSubject() {
        ContactMessageCreated event = new ContactMessageCreated(
                7L, "Ana\r\nBcc: alguem@exemplo.com", "ana@exemplo.com", "Olá, gostaria de conversar.", CREATED_AT);

        notifier.onContactMessageCreated(event);

        String subject = capturedMail().getSubject();
        assertThat(subject).doesNotContain("\r", "\n");
        assertThat(subject).isEqualTo("Contato pelo portfólio — Ana Bcc: alguem@exemplo.com");
    }

    @Test
    void doesNotPropagateMailFailure() {
        doThrow(new MailSendException("SMTP indisponível")).when(mailSender).send(any(SimpleMailMessage.class));
        ContactMessageCreated event = new ContactMessageCreated(
                7L, "Ana", "ana@exemplo.com", "Olá, gostaria de conversar.", CREATED_AT);

        assertThatNoException().isThrownBy(() -> notifier.onContactMessageCreated(event));
    }

    private SimpleMailMessage capturedMail() {
        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(captor.capture());
        return captor.getValue();
    }
}
