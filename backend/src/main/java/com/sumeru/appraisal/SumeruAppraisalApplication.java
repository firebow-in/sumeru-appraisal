package com.sumeru.appraisal;

import com.sumeru.appraisal.entity.Employee;
import com.sumeru.appraisal.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Arrays;

@SpringBootApplication
public class SumeruAppraisalApplication {
    public static void main(String[] args) {
        SpringApplication.run(SumeruAppraisalApplication.class, args);
    }

    @Bean
    CommandLineRunner seedEmployees(EmployeeRepository employeeRepository) {
        return args -> {
            // CEO
            upsertEmployee(employeeRepository,
                    new Employee(
                            "Abhijeet Ranadhir",
                            "abhijeet@sumeru.com",
                            "CEO",
                            "Management",
                            "Chief Executive Officer",
                            LocalDate.of(2020, 1, 1),
                            "+91-9876543210",
                            "Mumbai, India",
                            true
                    ),
                    null
            );

            // Manager (reports to CEO)
            Employee ceo = employeeRepository.findByEmail("abhijeet@sumeru.com").orElse(null);
            upsertEmployee(employeeRepository,
                    new Employee(
                            "Niharika",
                            "niharika@sumeru.com",
                            "Manager",
                            "Operations",
                            "Operations Manager",
                            LocalDate.of(2021, 3, 15),
                            "+91-9876543211",
                            "Bangalore, India",
                            true,
                            ceo
                    ),
                    ceo
            );

            // HR (reports to CEO)
            upsertEmployee(employeeRepository,
                    new Employee(
                            "Kiran",
                            "kiran@sumeru.com",
                            "HR",
                            "Human Resources",
                            "HR Manager",
                            LocalDate.of(2021, 6, 1),
                            "+91-9876543212",
                            "Delhi, India",
                            true,
                            ceo
                    ),
                    ceo
            );

            // Team under Manager
            Employee manager = employeeRepository.findByEmail("niharika@sumeru.com").orElse(null);
            for (String name : Arrays.asList("Hanumesh", "Basavaraj", "Karan", "Bharat", "Alvita", "Amarjeet", "Ananya")) {
                upsertEmployee(employeeRepository,
                        new Employee(
                                name,
                                name.toLowerCase() + "@sumeru.com",
                                "Engineer",
                                "Development",
                                "Software Engineer",
                                LocalDate.of(2022, 1, 10),
                                "",
                                "",
                                true,
                                manager
                        ),
                        manager
                );
            }
        };
    }

    private void upsertEmployee(EmployeeRepository repo, Employee candidate, Employee manager) {
        if (repo.existsByEmail(candidate.getEmail())) {
            // Ensure manager link is set if missing
            repo.findByEmail(candidate.getEmail()).ifPresent(existing -> {
                if (existing.getManager() == null && manager != null) {
                    existing.setManager(manager);
                    repo.save(existing);
                }
            });
            return;
        }
        if (manager != null) {
            candidate.setManager(manager);
        }
        repo.save(candidate);
    }
}