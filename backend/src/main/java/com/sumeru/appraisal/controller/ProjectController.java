package com.sumeru.appraisal.controller;

import com.sumeru.appraisal.model.Project;
import com.sumeru.appraisal.repository.ProjectRepository;
import com.sumeru.appraisal.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public ProjectController(ProjectRepository projectRepository, EmployeeRepository employeeRepository) {
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    // GET /api/employees/{id}/projects
    @GetMapping("{id}/projects")
    public ResponseEntity<List<Project>> getProjectsByEmployeeId(@PathVariable Long id) {
        List<Project> projects = projectRepository.findByEmployeeIdOrderByStartDateDesc(id);
        return ResponseEntity.ok(projects);
    }

    // POST /api/employees/{id}/projects
    @PostMapping("{id}/projects")
    public ResponseEntity<Project> createProject(@PathVariable Long id, @RequestBody Project project) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    project.setEmployee(employee);
                    Project saved = projectRepository.save(project);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/employees/projects/status/{status}
    @GetMapping("projects/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(@PathVariable String status) {
        List<Project> projects = projectRepository.findByStatus(status);
        return ResponseEntity.ok(projects);
    }
}