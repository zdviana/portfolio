package dev.daviviana.portfolio.repository;

import dev.daviviana.portfolio.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByOrderByDisplayOrderAsc();
}
