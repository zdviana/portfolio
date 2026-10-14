package dev.daviviana.portfolio.dto;

import dev.daviviana.portfolio.model.Project;
import java.util.List;

public record ProjectResponse(
        Long id,
        String slug,
        String title,
        String description,
        List<String> tags,
        String repoUrl,
        String backendRepoUrl,
        String demoUrl,
        String imageUrl,
        boolean featured) {

    public static ProjectResponse from(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getSlug(),
                project.getTitle(),
                project.getDescription(),
                project.getTags(),
                project.getRepoUrl(),
                project.getBackendRepoUrl(),
                project.getDemoUrl(),
                project.getImageUrl(),
                project.isFeatured());
    }
}
