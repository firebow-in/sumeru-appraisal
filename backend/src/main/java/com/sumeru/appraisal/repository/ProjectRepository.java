package com.sumeru.appraisal.repository;

import com.sumeru.appraisal.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByEmployeeId(Long employeeId);
    
    List<Project> findByStatus(String status);
    
    List<Project> findByPriority(String priority);
    
    @Query("SELECT p FROM Project p WHERE p.employee.id = :employeeId ORDER BY p.startDate DESC")
    List<Project> findByEmployeeIdOrderByStartDateDesc(@Param("employeeId") Long employeeId);
}