package dev.daviviana.portfolio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.List;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String slug;
    private String title;
    private String description;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(columnDefinition = "text[]")
    private List<String> tags;

    private String repoUrl;

    private String backendRepoUrl;
    private String demoUrl;
    private String imageUrl;
    private int displayOrder;
    private boolean featured;

    protected Project() {
    }

    public Project(String slug, String title, String description, List<String> tags, String repoUrl,
                   String demoUrl, String imageUrl, int displayOrder, boolean featured) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.repoUrl = repoUrl;
        this.demoUrl = demoUrl;
        this.imageUrl = imageUrl;
        this.displayOrder = displayOrder;
        this.featured = featured;
    }

    public Long getId() {
        return id;
    }

    public String getSlug() {
        return slug;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getRepoUrl() {
        return repoUrl;
    }

    public String getBackendRepoUrl() {
        return backendRepoUrl;
    }

    public String getDemoUrl() {
        return demoUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public boolean isFeatured() {
        return featured;
    }
}
