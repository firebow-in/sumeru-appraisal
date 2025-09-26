package com.sumeru.appraisal.controller;

import com.sumeru.appraisal.model.Appraisal;
import com.sumeru.appraisal.model.Project;
import com.sumeru.appraisal.repository.AppraisalRepository;
import com.sumeru.appraisal.repository.ProjectRepository;
import com.sumeru.appraisal.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AppraisalRepository appraisalRepository;
    private final ProjectRepository projectRepository;
    private final EmployeeRepository employeeRepository;

    public AdminController(AppraisalRepository appraisalRepository, ProjectRepository projectRepository, 
                          EmployeeRepository employeeRepository) {
        this.appraisalRepository = appraisalRepository;
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
    }

    // GET /api/admin/dashboard
    @GetMapping("dashboard")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        
        long totalEmployees = employeeRepository.count();
        long totalAppraisals = appraisalRepository.count();
        long totalProjects = projectRepository.count();
        
        dashboard.put("totalEmployees", totalEmployees);
        dashboard.put("totalAppraisals", totalAppraisals);
        dashboard.put("totalProjects", totalProjects);
        
        return ResponseEntity.ok(dashboard);
    }

    // GET /api/admin/appraisals
    @GetMapping("appraisals")
    public ResponseEntity<List<Appraisal>> getAllAppraisals() {
        List<Appraisal> appraisals = appraisalRepository.findAll();
        return ResponseEntity.ok(appraisals);
    }

    // GET /api/admin/projects
    @GetMapping("projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    // GET /api/admin/appraisals/analytics
    @GetMapping("appraisals/analytics")
    public ResponseEntity<Map<String, Object>> getAppraisalAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        long totalAppraisals = appraisalRepository.count();
        long pendingAppraisals = appraisalRepository.findByStatus("Pending").size();
        long completedAppraisals = appraisalRepository.findByStatus("Completed").size();
        
        analytics.put("totalAppraisals", totalAppraisals);
        analytics.put("pendingAppraisals", pendingAppraisals);
        analytics.put("completedAppraisals", completedAppraisals);
        
        return ResponseEntity.ok(analytics);
    }

    // GET /api/admin/projects/analytics
    @GetMapping("projects/analytics")
    public ResponseEntity<Map<String, Object>> getProjectAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.findByStatus("Active").size();
        long completedProjects = projectRepository.findByStatus("Completed").size();
        
        analytics.put("totalProjects", totalProjects);
        analytics.put("activeProjects", activeProjects);
        analytics.put("completedProjects", completedProjects);
        
        return ResponseEntity.ok(analytics);
    }
}
