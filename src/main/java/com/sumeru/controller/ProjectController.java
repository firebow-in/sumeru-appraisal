package com.sumeru.controller;

import com.sumeru.entity.Project;
import com.sumeru.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/{employeeId}/projects")
    public List<Project> getEmployeeProjects(@PathVariable Long employeeId) {
        return projectService.getProjectsByEmployeeId(employeeId);
    }

    @PostMapping("/{employeeId}/projects")
    public Project createProject(@PathVariable Long employeeId, @RequestBody Project project) {
        project.setEmployeeId(employeeId);
        if (project.getStartDate() == null) {
            project.setStartDate(LocalDate.now());
        }
        return projectService.createProject(project);
    }

    @GetMapping("/projects/status/{status}")
    public List<Project> getProjectsByStatus(@PathVariable String status) {
        return projectService.getProjectsByStatus(status);
    }
}
