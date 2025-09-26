package com.sumeru.appraisal.controller;

import com.sumeru.appraisal.repository.EmployeeRepository;
import com.sumeru.appraisal.repository.FeedbackRepository;
import com.sumeru.appraisal.repository.AppraisalRepository;
import com.sumeru.appraisal.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final EmployeeRepository employeeRepository;
    private final FeedbackRepository feedbackRepository;
    private final AppraisalRepository appraisalRepository;
    private final ProjectRepository projectRepository;

    public DashboardController(EmployeeRepository employeeRepository, FeedbackRepository feedbackRepository, 
                             AppraisalRepository appraisalRepository, ProjectRepository projectRepository) {
        this.employeeRepository = employeeRepository;
        this.feedbackRepository = feedbackRepository;
        this.appraisalRepository = appraisalRepository;
        this.projectRepository = projectRepository;
    }

    // GET /api/employees/dashboard/stats
    @GetMapping("dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.findAll().stream()
                .filter(emp -> "Active".equals(emp.getStatus()))
                .count();
        long totalFeedbacks = feedbackRepository.count();
        long totalAppraisals = appraisalRepository.count();
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.findByStatus("Active").size();
        
        stats.put("totalEmployees", totalEmployees);
        stats.put("activeEmployees", activeEmployees);
        stats.put("totalFeedbacks", totalFeedbacks);
        stats.put("totalAppraisals", totalAppraisals);
        stats.put("totalProjects", totalProjects);
        stats.put("activeProjects", activeProjects);
        
        return ResponseEntity.ok(stats);
    }
}