package com.sumeru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.sumeru.entity.Employee;
import com.sumeru.repository.EmployeeRepository;

@SpringBootApplication
public class SumeruAppraisalApplication {

    public static void main(String[] args) {
        SpringApplication.run(SumeruAppraisalApplication.class, args);
    }
/* */
    // This will run after the app starts
    @Bean
    public org.springframework.boot.CommandLineRunner demo(EmployeeRepository repository) {
        return args -> {
            // Save a new record
        	Employee emp = new Employee();
            emp.setName("Tejas");
            emp.setRole("Developer");
            repository.save(emp);

            // Fetch and print all records
            repository.findAll().forEach(System.out::println);
        };
    }
    /* */
}
