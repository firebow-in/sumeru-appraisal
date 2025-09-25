package com.sumeru.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/employees/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEmployees", 150);
        stats.put("activeEmployees", 120);
        stats.put("pendingAppraisals", 15);
        stats.put("activeProjects", 25);
        stats.put("annualLeave", 5);
        stats.put("sickLeave", 1);
        stats.put("casualLeave", 3);
        stats.put("compOff", 1);
        return stats;
    }
}
