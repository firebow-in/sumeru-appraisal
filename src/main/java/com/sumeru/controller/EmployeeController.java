package com.sumeru.controller;

import com.sumeru.entity.Employee;
import com.sumeru.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    @GetMapping("/department/{department}")
    public List<Employee> getEmployeesByDepartment(@PathVariable String department) {
        return employeeService.getEmployeesByDepartment(department);
    }

    @GetMapping("/active")
    public List<Employee> getActiveEmployees() {
        return employeeService.getActiveEmployees();
    }

    @GetMapping("/search")
    public List<Employee> searchEmployees(@RequestParam(required = false) String name,
                                          @RequestParam(required = false) String role,
                                          @RequestParam(required = false) String department) {
        // Basic search implementation
        return employeeService.getAllEmployees().stream()
                .filter(e -> (name == null || e.getName().toLowerCase().contains(name.toLowerCase())) &&
                             (role == null || e.getRole().equalsIgnoreCase(role)) &&
                             (department == null || e.getDepartment().equalsIgnoreCase(department)))
                .toList();
    }
}
