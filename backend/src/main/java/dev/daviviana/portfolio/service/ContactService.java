package dev.daviviana.portfolio.service;

import dev.daviviana.portfolio.dto.ContactRequest;
import dev.daviviana.portfolio.dto.ContactResponse;
import dev.daviviana.portfolio.model.ContactMessage;
import dev.daviviana.portfolio.repository.ContactMessageRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ApplicationEventPublisher eventPublisher;

    public ContactService(ContactMessageRepository contactMessageRepository,
                          ApplicationEventPublisher eventPublisher) {
        this.contactMessageRepository = contactMessageRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public ContactResponse save(ContactRequest request) {
        ContactMessage saved = contactMessageRepository.save(new ContactMessage(
                request.name().trim(),
                request.email().trim(),
                request.message().trim()));
        eventPublisher.publishEvent(new ContactMessageCreated(
                saved.getId(), saved.getName(), saved.getEmail(), saved.getMessage(), saved.getCreatedAt()));
        return new ContactResponse(saved.getId(), saved.getCreatedAt());
    }
}
