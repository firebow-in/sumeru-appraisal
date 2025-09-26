package com.sumeru.appraisal.controller;

import com.sumeru.appraisal.entity.Appraisal;
import com.sumeru.appraisal.entity.Employee;
import com.sumeru.appraisal.repository.AppraisalRepository;
import com.sumeru.appraisal.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class AppraisalController {

    private final AppraisalRepository appraisalRepository;
    private final EmployeeRepository employeeRepository;

    public AppraisalController(AppraisalRepository appraisalRepository, EmployeeRepository employeeRepository) {
        this.appraisalRepository = appraisalRepository;
        this.employeeRepository = employeeRepository;
    }

    // GET /api/employees/{id}/appraisals
    @GetMapping("{id}/appraisals")
    public ResponseEntity<List<Appraisal>> getAppraisalsByEmployeeId(@PathVariable Long id) {
        List<Appraisal> appraisals = appraisalRepository.findByEmployeeIdOrderByYearDesc(id);
        return ResponseEntity.ok(appraisals);
    }

    // POST /api/employees/{id}/appraisals
    @PostMapping("{id}/appraisals")
    public ResponseEntity<Appraisal> createAppraisal(@PathVariable Long id, @RequestBody Appraisal appraisal) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    appraisal.setEmployee(employee);
                    if (appraisal.getAppraisalDate() == null) {
                        appraisal.setAppraisalDate(LocalDate.now());
                    }
                    Appraisal saved = appraisalRepository.save(appraisal);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/employees/appraisals/status/{status}
    @GetMapping("appraisals/status/{status}")
    public ResponseEntity<List<Appraisal>> getAppraisalsByStatus(@PathVariable String status) {
        List<Appraisal> appraisals = appraisalRepository.findByStatus(status);
        return ResponseEntity.ok(appraisals);
    }

    // GET /api/employees/org-chart - Get the organizational structure
    @GetMapping("org-chart")
    public ResponseEntity<List<Employee>> getOrgChart() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }
}