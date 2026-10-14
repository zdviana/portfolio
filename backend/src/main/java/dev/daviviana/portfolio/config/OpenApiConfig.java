package dev.daviviana.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI portfolioOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Portfólio Davi Viana — API")
                .description("API REST do portfólio: projetos exibidos no site e mensagens de contato.")
                .version("v1")
                .contact(new Contact().name("Davi Viana").url("https://github.com/zdviana")));
    }
}
