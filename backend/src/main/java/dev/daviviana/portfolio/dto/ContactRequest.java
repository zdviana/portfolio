package dev.daviviana.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Informe seu nome.")
        @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
        String name,

        @NotBlank(message = "Informe seu e-mail.")
        @Email(message = "Use um e-mail válido.")
        @Size(max = 254, message = "O e-mail deve ter no máximo 254 caracteres.")
        String email,

        @NotBlank(message = "Escreva uma mensagem.")
        @Size(min = 10, max = 5000, message = "A mensagem deve ter entre 10 e 5000 caracteres.")
        String message) {
}
