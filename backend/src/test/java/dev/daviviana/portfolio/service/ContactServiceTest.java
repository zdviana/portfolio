package dev.daviviana.portfolio.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import dev.daviviana.portfolio.dto.ContactRequest;
import dev.daviviana.portfolio.dto.ContactResponse;
import dev.daviviana.portfolio.model.ContactMessage;
import dev.daviviana.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactMessageRepository contactMessageRepository;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private ContactService contactService;

    @Test
    void saveTrimsFieldsAndReturnsSavedIdAndCreatedAt() {
        when(contactMessageRepository.save(any(ContactMessage.class))).thenAnswer(invocation -> {
            ContactMessage message = invocation.getArgument(0);
            ReflectionTestUtils.setField(message, "id", 7L);
            return message;
        });

        ContactResponse response = contactService.save(
                new ContactRequest("  Ana  ", "  ana@exemplo.com ", "  Olá, tudo bem?  "));

        ArgumentCaptor<ContactMessage> captor = ArgumentCaptor.forClass(ContactMessage.class);
        verify(contactMessageRepository).save(captor.capture());
        ContactMessage saved = captor.getValue();
        assertThat(saved.getName()).isEqualTo("Ana");
        assertThat(saved.getEmail()).isEqualTo("ana@exemplo.com");
        assertThat(saved.getMessage()).isEqualTo("Olá, tudo bem?");

        assertThat(response.id()).isEqualTo(7L);
        assertThat(response.createdAt()).isEqualTo(saved.getCreatedAt());
    }

    @Test
    void savePublishesEventWithSavedIdAndTrimmedValues() {
        when(contactMessageRepository.save(any(ContactMessage.class))).thenAnswer(invocation -> {
            ContactMessage message = invocation.getArgument(0);
            ReflectionTestUtils.setField(message, "id", 7L);
            return message;
        });

        contactService.save(new ContactRequest("  Ana  ", "  ana@exemplo.com ", "  Olá, tudo bem?  "));

        ArgumentCaptor<ContactMessageCreated> captor = ArgumentCaptor.forClass(ContactMessageCreated.class);
        verify(eventPublisher).publishEvent(captor.capture());
        ContactMessageCreated event = captor.getValue();
        assertThat(event.id()).isEqualTo(7L);
        assertThat(event.name()).isEqualTo("Ana");
        assertThat(event.email()).isEqualTo("ana@exemplo.com");
        assertThat(event.message()).isEqualTo("Olá, tudo bem?");
        assertThat(event.createdAt()).isNotNull();
    }
}
