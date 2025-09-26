package com.sumeru.repository;

import com.sumeru.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByEmployeeId(Long employeeId);
    List<Project> findByStatus(String status);
}